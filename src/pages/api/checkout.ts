import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// Datos estáticos para verificar los precios en el servidor (para evitar manipulaciones en el cliente)
const catalogPrices: Record<number, { name: string; price: number }> = {
  1: { name: 'Vibe Minimalist Bullet', price: 39.99 },
  2: { name: 'Sensation Air-Pulse', price: 59.99 },
  3: { name: 'Elixir de Masaje Premium', price: 19.99 }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { name, email, deliveryMethod, address, items } = body;

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'El carrito está vacío' }), { status: 400 });
    }

    // Calcular el total
    let subtotal = 0;
    const lineItemsForStripe: Array<{ price_data: any; quantity: number }> = [];

    for (const item of items) {
      const dbProduct = catalogPrices[item.id];
      if (dbProduct) {
        subtotal += dbProduct.price * item.quantity;
        
        lineItemsForStripe.push({
          price_data: {
            currency: 'eur',
            product_data: {
              name: dbProduct.name,
            },
            unit_amount: Math.round(dbProduct.price * 100), // En céntimos
          },
          quantity: item.quantity,
        });
      }
    }

    // Coste de envío
    let shippingCost = 0;
    if (deliveryMethod === 'envio') {
      shippingCost = subtotal >= 50 ? 0 : 4.95;
      
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

    // Obtener variables de entorno (Cloudflare Bindings)
    // En Astro con adaptador de Cloudflare, están en `locals.runtime.env`
    const env = locals.runtime?.env;
    const stripeSecretKey = env?.STRIPE_SECRET_KEY;

    // Si Stripe no está configurado (por ejemplo, en desarrollo local inicial)
    // Ofrecemos una simulación elegante (Modo Demo) para que el MVP sea utilizable inmediatamente
    if (!stripeSecretKey || stripeSecretKey === 'YOUR_STRIPE_SECRET_KEY') {
      console.log('--- MODO DEMO / SIMULACIÓN ACTIVADO ---');
      console.log('Cliente:', name, email);
      console.log('Productos:', items);
      console.log('Entrega:', deliveryMethod, address);
      
      // Devolvemos una URL del propio sitio que simula el éxito
      // En una URL de producción, Stripe redirigiría aquí
      const successUrl = new URL('/compra-exitosa?demo=true', request.url).toString();
      
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

    const successUrl = new URL('/compra-exitosa', request.url).toString();
    const cancelUrl = new URL('/carrito', request.url).toString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'], // Puedes añadir 'bizum' en el panel de Stripe de producción
      line_items: lineItemsForStripe,
      mode: 'payment',
      allow_promotion_codes: true, // Habilita la casilla de cupones de descuento nativa de Stripe
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        customer_name: name,
        delivery_method: deliveryMethod,
        address: JSON.stringify(address)
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Error en API checkout:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
