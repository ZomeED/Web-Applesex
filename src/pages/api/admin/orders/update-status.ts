import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/client';
import { orders } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    // 1. Verificar autenticación
    const sessionToken = cookies.get('admin_session')?.value;
    const env = locals.runtime?.env;
    const secret = env?.SESSION_SECRET || 'applesex-fallback-super-secret-key-2026';

    if (!sessionToken) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const adminEmail = await verifySessionToken(sessionToken, secret);
    if (!adminEmail) {
      return new Response(JSON.stringify({ error: 'Sesión inválida o expirada' }), { status: 401 });
    }

    // 2. Procesar datos
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    // Validar estados permitidos
    const allowedStatuses = ['pending', 'paid', 'shipped', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado no permitido' }), { status: 400 });
    }

    // 3. Actualizar en D1
    const db = getDb(env);
    await db.update(orders)
      .set({ status })
      .where(eq(orders.id, orderId));

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error: any) {
    console.error('Error al actualizar estado del pedido:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
