import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración del cliente de Sanity.io
// Reemplaza 'applesex-demo-project-id' con el ID real desde el dashboard de Sanity.
export const SANITY_PROJECT_ID = 'hs1mheh1';
export const SANITY_DATASET = 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true, // Habilita el CDN de Sanity para respuestas ultra rápidas (<50ms)
  apiVersion: '2024-03-01',
});

// Inicializador del constructor de URLs para optimizar y redimensionar imágenes al vuelo
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Función auxiliar para verificar si Sanity está configurado con valores reales
 */
export function isSanityConfigured(): boolean {
  return SANITY_PROJECT_ID !== 'applesex-demo-project-id' && SANITY_PROJECT_ID.trim() !== '';
}
