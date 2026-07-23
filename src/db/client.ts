import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(env: any) {
  if (!env || !env.DB) {
    throw new Error('La base de datos Cloudflare D1 (DB) no está configurada o no está disponible en este entorno.');
  }
  return drizzle(env.DB, { schema });
}
