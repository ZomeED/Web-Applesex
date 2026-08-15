import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, seedAdminIfEmpty, generateSessionToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  let isJson = false;
  try {
    let email = '';
    let password = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      isJson = true;
      const body = await request.json();
      email = body.email;
      password = body.password;
    } else {
      const formData = await request.formData();
      email = formData.get('email') as string || '';
      password = formData.get('password') as string || '';
    }

    if (!email || !password) {
      const errorMsg = 'Faltan campos obligatorios';
      if (isJson) {
        return new Response(JSON.stringify({ error: errorMsg }), { status: 400 });
      }
      return new Response(null, {
        status: 302,
        headers: { 'Location': `/admin/login?error=${encodeURIComponent(errorMsg)}` }
      });
    }

    const env = locals.runtime?.env;
    const db = getDb(env);

    // Auto-sembrar administrador si la base de datos está vacía
    await seedAdminIfEmpty(db);

    // Buscar el usuario por email
    const userList = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase())).limit(1);
    if (userList.length === 0) {
      const errorMsg = 'Usuario o contraseña incorrectos';
      if (isJson) {
        return new Response(JSON.stringify({ error: errorMsg }), { status: 401 });
      }
      return new Response(null, {
        status: 302,
        headers: { 'Location': `/admin/login?error=${encodeURIComponent(errorMsg)}` }
      });
    }

    const user = userList[0];
    
    // Comparar los hashes de la contraseña
    const hashedInput = await hashPassword(password);
    if (user.passwordHash !== hashedInput) {
      const errorMsg = 'Usuario o contraseña incorrectos';
      if (isJson) {
        return new Response(JSON.stringify({ error: errorMsg }), { status: 401 });
      }
      return new Response(null, {
        status: 302,
        headers: { 'Location': `/admin/login?error=${encodeURIComponent(errorMsg)}` }
      });
    }

    // Generar el token de sesión (JWT)
    const secret = env?.SESSION_SECRET || 'applesex-fallback-super-secret-key-2026';
    const token = await generateSessionToken(user.email, secret);

    // Guardar el token en las cookies
    cookies.set('admin_session', token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD, // Habilitado solo en producción (HTTPS)
      sameSite: 'lax', // Permite que se envíe tras la redirección
      maxAge: 60 * 60 * 24, // 24 horas
    });

    if (isJson) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(null, {
      status: 302,
      headers: { 'Location': '/admin' }
    });

  } catch (error: any) {
    console.error('Error en API login:', error);
    const errorMsg = error.message || 'Error interno del servidor';
    if (isJson) {
      return new Response(JSON.stringify({ error: errorMsg }), { status: 500 });
    }
    return new Response(null, {
      status: 302,
      headers: { 'Location': `/admin/login?error=${encodeURIComponent(errorMsg)}` }
    });
  }
};
