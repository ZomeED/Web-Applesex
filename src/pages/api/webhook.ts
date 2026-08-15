import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getDb } from '../../db/client';
import { orders } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  const stripeSecretKey = env?.STRIPE_SECRET_KEY;
  const webhookSecret = env?.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: 'Stripe no configurado' }), { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20' as any,
  });

  const signature = request.headers.get('stripe-signature');
  const bodyText = await request.text();

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret);
    } else {
      // En desarrollo local sin webhook secret, parseamos el cuerpo directamente.
      // ADVERTENCIA: En producción esto es inseguro y se debe usar siempre la firma de firma.
      console.warn('[STRIPE WEBHOOK] Procesando sin verificación de firma (STRIPE_WEBHOOK_SECRET no configurado)');
      event = JSON.parse(bodyText);
    }
  } catch (err: any) {
    console.error('Error de firma de webhook de Stripe:', err.message);
    return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), { status: 400 });
  }

  // Manejar el evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const stripeSessionId = session.id;

    if (orderId) {
      try {
        const db = getDb(env);
        
        // Extraer cupones / promociones aplicadas
        let promoCode: string | null = null;
        let discountAmount = 0;

        if (session.total_details?.breakdown?.discounts) {
          const discount = session.total_details.breakdown.discounts[0];
          if (discount?.discount) {
            const coupon = discount.discount.coupon;
            promoCode = coupon.name || coupon.id || null;
            discountAmount = discount.amount / 100; // Convertir de céntimos a Euros
          }
        }

        // Actualizar el estado del pedido a pagado en D1
        await db.update(orders)
          .set({ 
            status: 'paid',
            stripeSessionId: stripeSessionId,
            promoCode: promoCode,
            discountAmount: discountAmount
          })
          .where(eq(orders.id, orderId));

        console.log(`[WEBHOOK SUCCESS] Pedido ${orderId} verificado y marcado como pagado.`);
      } catch (dbErr) {
        console.error('Error al actualizar pedido desde webhook:', dbErr);
        return new Response(JSON.stringify({ error: 'Error al actualizar base de datos' }), { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
