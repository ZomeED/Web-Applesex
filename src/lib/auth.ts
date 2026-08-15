import { getDb } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { sign, verify } from 'hono/jwt';

/**
 * Genera un hash SHA-256 para la contraseña usando la Web Crypto API nativa.
 * Ideal para entornos Serverless como Cloudflare Workers sin dependencias externas pesadas.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Si la base de datos de usuarios está vacía, inserta automáticamente un usuario administrador
 * de demostración para facilitar el primer inicio de sesión local o en staging.
 */
export async function seedAdminIfEmpty(db: any) {
  try {
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length === 0) {
      const defaultEmail = 'admin@applesex.com';
      const defaultPass = 'applesex2026';
      const passwordHash = await hashPassword(defaultPass);
      
      await db.insert(users).values({
        id: 'admin-1',
        email: defaultEmail,
        passwordHash: passwordHash,
        role: 'admin',
      });
      console.log(`[SEED D1] Usuario administrador creado por defecto:`);
      console.log(`Email: ${defaultEmail}`);
      console.log(`Contraseña: ${defaultPass}`);
    }
  } catch (error) {
    console.error('Error al auto-sembrar el usuario administrador:', error);
  }
}

/**
 * Crea un token de sesión JWT válido por 24 horas para el usuario admin.
 */
export async function generateSessionToken(email: string, secret: string): Promise<string> {
  const payload = {
    email,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 horas
  };
  return await sign(payload, secret, 'HS256');
}

/**
 * Verifica el token JWT y devuelve el email del usuario si es válido, o un error detallado si falla.
 */
export async function verifySessionToken(token: string, secret: string): Promise<{ email: string } | { error: string }> {
  try {
    const payload = await verify(token, secret, 'HS256');
    if (payload && typeof payload === 'object' && payload.email) {
      return { email: payload.email as string };
    }
    return { error: 'El token no contiene un email válido.' };
  } catch (e: any) {
    return { error: e.message || String(e) };
  }
}
