import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getDb } from '../../db/client';
import { orders, orderItems } from '../../db/schema';
import { getAllProducts } from '../../lib/products';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { name, email, deliveryMethod, address, items, couponCode } = body;

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'El carrito está vacío' }), { status: 400 });
    }

    const hasDiscount = couponCode && couponCode.toUpperCase() === 'APPLESEX20';

    // Obtener catálogo dinámico (de Sanity o Local)
    const productsList = await getAllProducts();
    const productsMap = new Map(productsList.map(p => [p.id, p]));

    // Calcular el total y preparar line items para Stripe
    let subtotal = 0;
    const lineItemsForStripe: Array<{ price_data: any; quantity: number }> = [];

    for (const item of items) {
      const dbProduct = productsMap.get(item.id);
      if (dbProduct) {
        subtotal += dbProduct.price * item.quantity;
        
        const finalUnitPrice = hasDiscount ? dbProduct.price * 0.80 : dbProduct.price;

        lineItemsForStripe.push({
          price_data: {
            currency: 'eur',
            product_data: {
              name: dbProduct.name + (hasDiscount ? ' (20% Dto. APPLESEX20)' : ''),
            },
            unit_amount: Math.round(finalUnitPrice * 100), // En céntimos
          },
          quantity: item.quantity,
        });
      } else {
        return new Response(JSON.stringify({ error: `Producto no encontrado: ${item.id}` }), { status: 400 });
      }
    }

    const discountAmount = hasDiscount ? subtotal * 0.20 : 0;
    const discountedSubtotal = subtotal - discountAmount;

    // Coste de envío
    let shippingCost = 0;
    if (deliveryMethod === 'envio') {
      shippingCost = discountedSubtotal >= 50 ? 0 : 4.95;
      
      if (shippingCost > 0) {
        lineItemsForStripe.push({
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Gastos de Envío Discreto',
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }
    }

    const totalOrder = discountedSubtotal + shippingCost;

    // Obtener variables de entorno (Cloudflare Bindings)
    const env = locals.runtime?.env;
    const stripeSecretKey = env?.STRIPE_SECRET_KEY;

    // Generar un ID único para el pedido en nuestra base de datos
    const orderId = 'ped_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Inicializar D1 Database
    let db: any = null;
    try {
      db = getDb(env);
    } catch (err) {
      console.warn('Base de datos D1 no disponible (ej. en compilación local estática):', err);
    }

    // Registrar el pedido en la base de datos (si está disponible)
    if (db) {
      try {
        await db.insert(orders).values({
          id: orderId,
          customerName: name,
          customerEmail: email,
          deliveryMethod: deliveryMethod,
          addressLine1: address?.addressLine1 || null,
          city: address?.city || null,
          postalCode: address?.postalCode || null,
          total: totalOrder,
          status: (stripeSecretKey && stripeSecretKey !== 'YOUR_STRIPE_SECRET_KEY') ? 'pending' : 'paid', // En modo demo ya se marca pagado
          stripeSessionId: (stripeSecretKey && stripeSecretKey !== 'YOUR_STRIPE_SECRET_KEY') ? null : `demo_${orderId}`,
          createdAt: new Date().toISOString(),
        });

        // Registrar cada producto en la tabla de detalle
        for (const item of items) {
          const dbProduct = productsMap.get(item.id);
          if (dbProduct) {
            await db.insert(orderItems).values({
              orderId: orderId,
              productId: dbProduct.id,
              productName: dbProduct.name,
              quantity: item.quantity,
              price: dbProduct.price,
            });
          }
        }
      } catch (dbErr) {
        console.error('Error al insertar el pedido en la base de datos D1:', dbErr);
        // Continuamos de todos modos para que el cliente pueda realizar el pago
      }
    }

    // Si Stripe no está configurado, ofrecemos la simulación elegante (Modo Demo)
    if (!stripeSecretKey || stripeSecretKey === 'YOUR_STRIPE_SECRET_KEY') {
      console.log('--- MODO DEMO / SIMULACIÓN ACTIVADO ---');
      console.log('Pedido Registrado en D1:', orderId);
      
      const successUrl = new URL(`/compra-exitosa?demo=true&orderId=${orderId}`, request.url).toString();
      
      return new Response(JSON.stringify({ 
        url: successUrl,
        demo: true,
        message: 'Pasarela en modo simulación (Stripe no configurado en Cloudflare)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Flujo real de Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20' as any,
    });

    const successUrl = new URL(`/compra-exitosa?orderId=${orderId}`, request.url).toString();
    const cancelUrl = new URL('/carrito', request.url).toString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: lineItemsForStripe,
      mode: 'payment',
      allow_promotion_codes: true, // Habilita cupones en el portal de Stripe
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: orderId,
        customer_name: name,
        delivery_method: deliveryMethod,
        address: JSON.stringify(address)
      }
    });

    // Actualizar la base de datos con el Stripe Session ID real
    if (db) {
      try {
        await db.update(orders)
          .set({ stripeSessionId: session.id })
          .where(eq(orders.id, orderId));
      } catch (dbUpdateErr) {
        console.error('Error al actualizar el stripeSessionId del pedido:', dbUpdateErr);
      }
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Error en API checkout:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
