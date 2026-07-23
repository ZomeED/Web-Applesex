import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Configuración de Sanity (Reemplazar con tus credenciales de escritura reales)
// Para escribir/importar productos necesitas un Token de Escritura (Write Token) que se crea en sanity.io/manage
const SANITY_WRITE_TOKEN = 'skhuVQ84hDpsmEml50TmVAmGs59j5JSkfIPlk2jfDW2Tpkpz65ujhJ1DopYp6DWPLzIaugvaTj8nRfQsUmP0tr8xuuZtJvuEdyUhhNQUpg7CPeJW0g63omFxTWtx7e3MlDfrYBKxYjZxwhH87dlG6A6Uod19I08HjkDdXj9jPqjhAxK7UYdt'; 
const SANITY_PROJECT_ID = 'hs1mheh1'; // Reemplazar por tu ID real de Sanity

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  token: SANITY_WRITE_TOKEN,
  useCdn: false, // false para asegurar que leemos/escribimos datos frescos
  apiVersion: '2024-03-01',
});

// Función auxiliar para parsear una línea CSV de forma robusta con soporte para comillas dobles de Excel/Sheets
function parseCSVLine(line) {
  let cleaned = line.trim().replace(/;+$/, '');
  
  // Si la línea entera empieza y termina con comilla por exportación doble
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1);
  }
  
  // Reducir comillas dobles escapadas ("" -> ")
  cleaned = cleaned.replace(/""/g, '"');

  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    const nextChar = cleaned[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

// Descargar una imagen desde una URL y subirla como asset a Sanity
async function uploadImageFromUrl(url, productName) {
  try {
    const response = await fetch(url.trim());
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir la imagen a Sanity
    const filename = `${productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename,
      contentType: 'image/jpeg',
    });
    
    console.log(`✓ Imagen subida con éxito: ${filename}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`✕ Error al descargar/subir imagen (${url.trim()}):`, error.message);
    return null;
  }
}

async function migrar() {
  if (SANITY_PROJECT_ID === 'applesex-demo-project-id' || !SANITY_WRITE_TOKEN || SANITY_WRITE_TOKEN.startsWith('TU_')) {
    console.error('ERROR: Debes configurar tu SANITY_PROJECT_ID y SANITY_WRITE_TOKEN reales en el script para importar.');
    return;
  }

  const csvPath = path.resolve('productos.csv');
  if (!fs.existsSync(csvPath)) {
    console.error(`ERROR: No se encuentra el archivo productos.csv en la ruta: ${csvPath}`);
    return;
  }

  const content = fs.readFileSync(csvPath, 'utf-8');
  // Dividir por líneas pero gestionando saltos de línea dentro de comillas (básico)
  const lines = content.split(/\r?\n/);
  
  // La primera línea son las cabeceras
  const headers = parseCSVLine(lines[0]);
  console.log('Columnas detectadas en el CSV:', headers);

  let creados = 0;
  let omitidos = 0;

  for (let idx = 1; idx < lines.length; idx++) {
    const line = lines[idx];
    if (!line.trim()) continue;

    const row = parseCSVLine(line);

    // Validación de robustez: Si el CSV tiene menos columnas de las necesarias (como la línea 4 truncada)
    if (row.length < 8) {
      console.warn(`⚠️ [Línea ${idx + 1}] OMITIDA: Faltan columnas básicas (la línea parece incompleta o rota).`);
      omitidos++;
      continue;
    }

    const [nombre, sku, descripcion, precioStr, stockStr, categoria, slug, estado, urlsImagenesStr] = row;

    console.log(`\nProcesando producto [${idx}]: ${nombre}...`);

    const precio = parseFloat(precioStr) || 0;
    const stock = parseInt(stockStr, 10) || 0;

    // Procesar múltiples imágenes
    let imageAsset = null;
    if (urlsImagenesStr) {
      // Las URLs de las imágenes vienen separadas por coma
      const urls = urlsImagenesStr.split(',');
      if (urls.length > 0 && urls[0].trim() !== '') {
        // En Sanity, para el catálogo principal solemos subir y vincular la primera imagen del carrusel
        console.log(`Descargando imagen principal de: ${urls[0].trim()}...`);
        imageAsset = await uploadImageFromUrl(urls[0], nombre);
      }
    }

    // Mapear y normalizar categorías al nuevo esquema de la web
    let normalizedCategory = 'JUGUETES';
    const rawCat = (categoria || '').toUpperCase().trim();
    const cleanName = (nombre || '').toUpperCase();
    
    if (rawCat === 'COSMÉTICA SENSORIAL' || rawCat === 'MASAJES Y COSMÉTICA') {
      normalizedCategory = 'COSMÉTICA SENSORIAL';
    } else if (rawCat === 'SALUD Y BIENESTAR' || rawCat === 'SALUD ÍNTIMA') {
      normalizedCategory = 'SALUD ÍNTIMA';
    } else if (rawCat === 'BDSM' || rawCat === 'FETISH Y BDSM') {
      if (cleanName.includes('PLUG') || cleanName.includes('BEADS') || cleanName.includes('BOLAS')) {
        normalizedCategory = 'JUGUETES';
      } else {
        normalizedCategory = 'BDSM';
      }
    } else {
      if (cleanName.includes('ACEITE DE MASAJE ORGÁNICO NATURAL')) {
        normalizedCategory = 'SALUD ÍNTIMA';
      } else if (cleanName.includes('ACEITE') || cleanName.includes('VELA')) {
        normalizedCategory = 'COSMÉTICA SENSORIAL';
      } else {
        normalizedCategory = 'JUGUETES';
      }
    }

    // Crear el documento del producto para Sanity
    const doc = {
      _type: 'product',
      name: nombre,
      slug: {
        _type: 'slug',
        current: slug || nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
      category: normalizedCategory,
      description: descripcion,
      price: precio,
      stock: stock,
      image: imageAsset,
    };

    try {
      const result = await sanityClient.create(doc);
      console.log(`✓ Producto creado en Sanity con ID: ${result._id}`);
      creados++;
    } catch (err) {
      console.error(`✕ Error al crear el producto en Sanity:`, err.message);
    }
  }

  console.log(`\n--- MIGRACIÓN FINALIZADA ---`);
  console.log(`Productos creados con éxito: ${creados}`);
  console.log(`Productos omitidos por formato inválido: ${omitidos}`);
}

migrar();
