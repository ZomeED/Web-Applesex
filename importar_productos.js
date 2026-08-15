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

function hasWord(text, word) {
  const regex = new RegExp('(?:^|[^a-z0-9\\u00C0-\\u00FF])' + word + '(?:[^a-z0-9\\u00C0-\\u00FF]|$)', 'i');
  return regex.test(text);
}

function classify(name, desc) {
  const n = name.toLowerCase();
  const d = desc.toLowerCase();
  const isLipstickToy = (n.includes('vibrador') || n.includes('vibradora') || n.includes('bala') || n.includes('dildo') || n.includes('plug')) && 
                         !(n.includes('gel') || n.includes('crema') || n.includes('líquido') || n.includes('liquido') || n.includes('aceite') || n.includes('lubricante') || n.includes('espuma') || n.includes('gloss'));

  // 1. COSMÉTICA / BIENESTAR check FIRST (liquid, gels, oils, sprays, pens, supplements etc. are never physical toys)
  const isCosmeticOrWellnessLiquid = !isLipstickToy && (
    n.includes('lubricante') || n.includes('lube') || n.includes('aceite') || hasWord(n, 'vela') ||
    n.includes('bálsamo') || n.includes('balsamo') || n.includes('crema') || n.includes('retardante') ||
    n.includes('vibrador líquido') || n.includes('vibrador liquido') || n.includes('afrodisíaco') ||
    n.includes('afrodisiaco') || n.includes('gotas de amor') || hasWord(n, 'drops') || n.includes('feromonas') ||
    n.includes('gel de masaje') || n.includes('pintura corporal') || n.includes('gel íntimo') || n.includes('gel intimo') ||
    n.includes('estimulante clítoris') || n.includes('estimulante de clítoris') || n.includes('estimulante clitoris') || 
    n.includes('gel estimulante') || hasWord(n, 'gel') || hasWord(n, 'pen') || hasWord(n, 'pens') ||
    hasWord(n, 'pincel') || hasWord(n, 'pintura') || hasWord(n, 'pinturas') || hasWord(n, 'boli') ||
    n.includes('gloss') || n.includes('labial') || n.includes('espuma') || n.includes('crunchy') ||
    n.includes('caramelo') || n.includes('peta zeta') || n.includes('popping candies') ||
    n.includes('potenciador') || n.includes('vigorizante') || n.includes('suplemento') || n.includes('pastillas') || n.includes('comprimidos') || n.includes('cápsulas') || n.includes('capsulas') ||
    (n.includes('estimulante') && (n.includes('gel') || n.includes('crema') || n.includes('espuma') || n.includes('gloss') || n.includes('aplicador') || n.includes('bio') || n.includes('efecto') || n.includes('lluvia') || n.includes('frio') || n.includes('frío')))
  );

  if (isCosmeticOrWellnessLiquid) {
    let cat = 'COSMÉTICA';
    let sub = 'Lubricantes';
    if (n.includes('limpieza íntima') || n.includes('jabon intimo') || n.includes('jabón íntimo')) {
      return { category: 'BIENESTAR', subcategory: 'Higiene y Limpieza' };
    }
    if (n.includes('aceite') || hasWord(n, 'vela')) {
      sub = 'Aceites y Velas de Masaje';
    } else if (n.includes('vibrador líquido') || n.includes('vibrador liquido') || n.includes('retardante') || n.includes('estimulante') || n.includes('bálsamo') || n.includes('balsamo') || n.includes('crema') || n.includes('gel') || hasWord(n, 'pen') || hasWord(n, 'pens') || hasWord(n, 'pincel') || hasWord(n, 'pintura') || hasWord(n, 'boli') || n.includes('gloss') || n.includes('labial') || n.includes('espuma') || n.includes('crunchy')) {
      sub = 'Estimulantes y Retardantes';
    } else if (n.includes('afrodisíaco') || n.includes('afrodisiaco') || n.includes('gotas') || hasWord(n, 'drops') || n.includes('potenciador') || n.includes('vigorizante') || n.includes('suplemento') || n.includes('pastillas') || n.includes('cápsulas') || n.includes('capsulas') || n.includes('comprimidos')) {
      sub = 'Afrodisíacos';
    } else if (n.includes('comestible') || n.includes('sabor') || n.includes('caramelo') || n.includes('peta zeta') || n.includes('popping candies')) {
      sub = 'Comestibles';
    } else if (n.includes('feromona') || n.includes('feromonas') || n.includes('perfume')) {
      sub = 'Feromonas';
    }
    return { category: cat, subcategory: sub };
  }

  // 2. Male masturbator checks (always JUGUETES > Para Pene)
  const isMaleMasturbator = 
    n.includes('masturbador') || n.includes('quickshot') || n.includes('headshot') || 
    n.includes('fleshlight') || n.includes('stroker') || n.includes('tenga') || 
    n.includes('torso') || n.includes('muñeca') || n.includes('muneca') || n.includes('busto') ||
    n.includes('pocket shot') || n.includes('extensor') || n.includes('funda con extensión') ||
    n.includes('cloneboy') || n.includes('kit clonador') || n.includes('bonnie blue');

  // 3. ANAL (Plugs, anal beads, anal vibrators, anal dildos)
  const isAnal = 
    !isMaleMasturbator && (
      n.includes('plug') || n.includes('anal') || n.includes('anales') || n.includes('prostático') || n.includes('prostatico') ||
      n.includes('perineal') || n.includes('próstata') || n.includes('prostata') || n.includes('enema') || n.includes('ducha anal') ||
      n.includes('ass-gasm') || n.includes('buttplug') || n.includes('fisting') || n.includes('dilatador anal') ||
      hasWord(n, 'ano') ||
      d.includes('juego anal') || d.includes('dilatación anal') || d.includes('penetración anal')
    );

  if (isAnal) {
    let sub = 'Plugs';
    if (n.includes('vibrador') || n.includes('vibrante') || n.includes('vibe') || n.includes('pulsación') || n.includes('ass-gasm') || n.includes('twist ecstasy') || n.includes('giratorio')) {
      sub = 'Vibradores Anales';
    } else if (n.includes('prostático') || n.includes('prostatico') || n.includes('próstata') || n.includes('prostata')) {
      sub = 'Prostáticos';
    } else if (n.includes('limpiador') || n.includes('ducha') || n.includes('enema') || hasWord(n, 'pera') || n.includes('irrigador')) {
      sub = 'Higiene y Limpieza Anal';
    } else if (n.includes('dildo') || n.includes('dong') || n.includes('consolador')) {
      sub = 'Dildos';
    }
    return { category: 'ANAL', subcategory: sub };
  }

  // 4. LENCERÍA
  const isLingerie = 
    n.includes('peignoir') || n.includes('midnight mirage') || n.includes('teddy') || n.includes('bodystocking') ||
    n.includes('bodystockin') || n.includes('babydoll') || n.includes('corset') || hasWord(n, 'tanga') ||
    n.includes('medias') || n.includes('lencería') || n.includes('lingerie') || n.includes('liguero') ||
    n.includes('body con') || n.includes('pezoneras') || n.includes('panties') || n.includes('crotchless') ||
    n.includes('calzoncillo') || n.includes('suspensorio') || hasWord(n, 'boxer') || hasWord(n, 'bóxer') ||
    n.includes('disfraz') || n.includes('conjunto sexy') || n.includes('picardías') || n.includes('picardias') ||
    n.includes('sujetador') || n.includes('braga') || hasWord(n, 'bata') || n.includes('monokini') || 
    n.includes('ouvert') || hasWord(n, 'lace') || n.includes('encaje') ||
    (hasWord(n, 'body') && !n.includes('wand') && !n.includes('massager') && !n.includes('masajeador') && !n.includes('pen') && !n.includes('boli')) ||
    ((hasWord(n, 'conjunto') || hasWord(n, 'conjuntos')) && !n.includes('anillo') && !n.includes('anilla') && !n.includes('plug') && !n.includes('anal') && !n.includes('dildo') && !n.includes('juego') && !n.includes('dados') && !n.includes('copa') && !n.includes('copas') && !n.includes('menstrual') && !n.includes('mentrual')) ||
    d.includes('lencería penthouse') || d.includes('colección penthouse') || d.includes('sensual lencería');

  if (isLingerie) {
    let sub = 'Conjuntos';
    if (n.includes('peignoir') || n.includes('camisón') || n.includes('camison') || hasWord(n, 'bata') || n.includes('picardías') || n.includes('picardias') || n.includes('babydoll')) {
      sub = 'Picardías y Camisones';
    } else if (n.includes('body') || n.includes('teddy') || n.includes('bodystocking') || n.includes('bodystockin')) {
      sub = 'Bodys';
    } else if (n.includes('media') || n.includes('liguero') || n.includes('garter') || n.includes('pantimedias')) {
      sub = 'Medias y Ligueros';
    } else if (n.includes('pezonera')) {
      sub = 'Pezoneras';
    } else if (hasWord(n, 'tanga') || n.includes('panty') || n.includes('panties') || n.includes('braguita') || n.includes('ouvert')) {
      sub = 'Tangas y panties';
    } else if (n.includes('calzoncillo') || n.includes('suspensorio') || hasWord(n, 'boxer') || hasWord(n, 'bóxer') || n.includes('slip')) {
      sub = 'Suspensorios y calzoncillos';
    } else if (n.includes('disfraz') || n.includes('disfraces') || n.includes('colegiala') || n.includes('enfermera') || n.includes('sirvienta') || n.includes('maid')) {
      sub = 'Disfraces';
    }
    return { category: 'LENCERÍA', subcategory: sub };
  }

  // 5. BDSM
  const isBdsm = 
    n.includes('esposas') || n.includes('atadura') || n.includes('ataduras') || n.includes('cuerda') ||
    n.includes('restricción') || n.includes('collar') || n.includes('fusta') || n.includes('azotador') ||
    hasWord(n, 'pala') || n.includes('mordaza') || n.includes('antifaz') || n.includes('antifaces') ||
    n.includes('arnés') || n.includes('arnes') || n.includes('columpio') || n.includes('kit bdsm') ||
    n.includes('shibari') || n.includes('bondage') || n.includes('pinzas para pezones') || n.includes('pinzas pezones') ||
    n.includes('látigo') || n.includes('latigo') || n.includes('máscara') || n.includes('mascara') ||
    n.includes('plumero') || n.includes('plumeros');

  if (isBdsm) {
    let sub = 'Esposas y Ataduras';
    if (n.includes('arnés') || n.includes('arnes')) {
      sub = 'Arneses';
    } else if (n.includes('fusta') || n.includes('azotador') || hasWord(n, 'pala') || n.includes('látigo') || n.includes('latigo') || n.includes('plumero') || n.includes('plumeros')) {
      sub = 'Fustas y Azotadores';
    } else if (n.includes('columpio') || n.includes('mobiliario') || n.includes('cojín') || n.includes('cojin')) {
      sub = 'Mobiliario sexual';
    } else if (n.includes('mordaza') || n.includes('antifaz') || n.includes('antifaces') || n.includes('máscara') || n.includes('mascara') || n.includes('gag') || n.includes('blindfold')) {
      sub = 'Antifaces y Mordazas';
    } else if (n.includes('electro') || n.includes('tens') || n.includes('electroestimulador')) {
      sub = 'Electroestimulación';
    } else if (n.includes('kit') || n.includes('pack')) {
      sub = 'Kits';
    }
    return { category: 'BDSM', subcategory: sub };
  }

  // 6. BIENESTAR / SALUD ÍNTIMA
  const isWellbeing = 
    n.includes('suelo pélvico') || n.includes('suelo pelvico') || n.includes('kegel') || n.includes('bolas chinas') ||
    n.includes('dilatador') || n.includes('dilatadores') || n.includes('copa') || n.includes('copas') || 
    n.includes('menstrual') || n.includes('mentrual') || n.includes('menstruales') || n.includes('mentruales') ||
    n.includes('compresa') || n.includes('preservativo') || n.includes('condón') || n.includes('condon') ||
    n.includes('limpiador de juguetes') || n.includes('limpiador juguetes') || n.includes('cleaner') || n.includes('toy wash') ||
    (hasWord(n, 'wash') && n.includes('juguetes'));

  if (isWellbeing) {
    let sub = 'Higiene y Limpieza';
    if (n.includes('suelo pélvico') || n.includes('suelo pelvico') || n.includes('kegel') || n.includes('bolas chinas')) {
      sub = 'Suelo Pélvico';
    } else if (n.includes('dilatador') || n.includes('dilatadores')) {
      sub = 'Dilatadores';
    } else if (n.includes('menstrual') || n.includes('mentrual') || n.includes('menstruales') || n.includes('mentruales') || n.includes('copa') || n.includes('copas')) {
      sub = 'Salud Menstrual';
    } else if (n.includes('preservativo') || n.includes('condón') || n.includes('condon')) {
      sub = 'Preservativos';
    } else if (n.includes('limpiador de juguetes') || n.includes('limpiador juguetes') || n.includes('cleaner') || n.includes('toy wash') || hasWord(n, 'wash')) {
      sub = 'Higiene y Limpieza';
    }
    return { category: 'BIENESTAR', subcategory: sub };
  }

  // 7. JUGUETES
  // Juegos y Regalos
  if (
    n.includes('tarot') || n.includes('juego') || n.includes('cartas') || 
    hasWord(n, 'dado') || hasWord(n, 'dados') || n.includes('regalo') || 
    n.includes('libro') || n.includes('kit de inicio para parejas') || 
    n.includes('parchis') || n.includes('parchís') || n.includes('roulette') || 
    n.includes('ruleta') || n.includes('twister') || n.includes('baraja') ||
    n.includes('sexmatch') || n.includes('calendario') || n.includes('calendarios')
  ) {
    return { category: 'JUGUETES', subcategory: 'Juegos y regalos' };
  }

  const hasDildoKeywords = n.includes('dildo') || n.includes('consolador') || n.includes('dong');
  if (
    !hasDildoKeywords && (
      isMaleMasturbator ||
      n.includes('anillo') || n.includes('anilla') || n.includes('bomba') || n.includes('egg') || 
      n.includes('funda') || hasWord(n, 'pene') || n.includes('para él') || n.includes('para el') ||
      n.includes('testículos') || n.includes('testiculos') || n.includes('succión para pene') ||
      n.includes('vagina')
    )
  ) {
    return { category: 'JUGUETES', subcategory: 'Para Pene' };
  }

  if (n.includes('dildo') || n.includes('consolador') || n.includes('realista') || n.includes('sin vibración') || n.includes('sin vibracion') || n.includes('dong')) {
    return { category: 'JUGUETES', subcategory: 'Dildos' };
  }

  if (n.includes('parejas') || n.includes('pareja') || n.includes('we-vibe') || n.includes('we vibe') || n.includes('estimulador doble') || n.includes('vibrador doble')) {
    return { category: 'JUGUETES', subcategory: 'Para Parejas' };
  }

  if (n.includes('succión') || n.includes('succion') || n.includes('succionador') || n.includes('satisfyer') || n.includes('clítoris') || n.includes('clitoris') || n.includes('estimulador clitoral') || n.includes('air pulse') || n.includes('pulsos de aire') || n.includes('pulsaciones') || n.includes('estimulador de clítoris') || n.includes('wave vibrador') || n.includes('estimulador clitoris') || n.includes('romp wave') || n.includes('pulsador') || n.includes('lengua rotativa') || (n.includes('estimulador') && n.includes('lengua'))) {
    return { category: 'JUGUETES', subcategory: 'Succionadores y Estimuladores' };
  }

  if (n.includes('remoto') || n.includes('mando') || n.includes('app') || n.includes('aplicación') || n.includes('aplicacion') || n.includes('bluetooth') || n.includes('inalámbrico') || n.includes('inalambrico') || n.includes('panties vibradoras') || n.includes('huevo vibrador')) {
    return { category: 'JUGUETES', subcategory: 'Control remoto' };
  }

  return { category: 'JUGUETES', subcategory: 'Vibradores' };
}

// Función auxiliar para parsear el archivo CSV de forma robusta soportando saltos de línea y comillas internas
function parseCSV(text) {
  const lines = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(cell.trim());
      lines.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (row.length > 0 || cell !== '') {
    row.push(cell.trim());
    lines.push(row);
  }
  return lines;
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

  console.log('Limpiando base de datos de productos actuales en Sanity para evitar duplicaciones...');
  try {
    await sanityClient.delete({ query: '*[_type == "product"]' });
    console.log('✓ Base de datos de productos limpia en Sanity.');
  } catch (err) {
    console.warn('⚠️ No se pudieron limpiar los productos anteriores:', err.message);
  }

  const csvPath = path.resolve('productos.csv');
  if (!fs.existsSync(csvPath)) {
    console.error(`ERROR: No se encuentra el archivo productos.csv en la ruta: ${csvPath}`);
    return;
  }

  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  if (rows.length === 0) {
    console.error('El archivo CSV está vacío.');
    return;
  }
  
  // La primera línea son las cabeceras
  const headers = rows[0];
  console.log('Columnas detectadas en el CSV:', headers);

  let creados = 0;
  let omitidos = 0;

  for (let idx = 1; idx < rows.length; idx++) {
    const row = rows[idx];
    if (row.length === 1 && row[0] === '') continue; // línea vacía

    // Validación de robustez: Si el CSV tiene menos columnas de las necesarias
    if (row.length < 8) {
      console.warn(`⚠️ [Fila ${idx + 1}] OMITIDA: Faltan columnas básicas (tiene ${row.length} columnas).`);
      omitidos++;
      continue;
    }

    const [nombre, sku, descripcion, precioStr, stockStr, categoria, slug, estado, urlsImagenesStr] = row;

    console.log(`\nProcesando producto [${idx}]: ${nombre}...`);

    const precio = parseFloat(precioStr) || 0;
    const stock = parseInt(stockStr, 10) || 0;

    // Procesar múltiples imágenes
    let imageAsset = null;
    const imagesAssets = [];
    if (urlsImagenesStr) {
      // Las URLs de las imágenes vienen separadas por coma
      const urls = urlsImagenesStr.split(',').map(url => url.trim()).filter(Boolean);
      for (let i = 0; i < urls.length; i++) {
        console.log(`Descargando imagen ${i + 1} de ${urls.length} para: ${nombre}...`);
        const asset = await uploadImageFromUrl(urls[i], `${nombre}-${i}`);
        if (asset) {
          imagesAssets.push(asset);
          if (i === 0) {
            imageAsset = asset;
          }
        }
      }
    }

    // Clasificar producto usando las reglas del catálogo unificado
    const proposed = classify(nombre, descripcion);
    let subcategory2 = null;

    const n = (nombre || '').toLowerCase();
    const d = (descripcion || '').toLowerCase();
    const combined = `${n} ${d}`;

    const hasRemoteKeywords = 
       hasWord(combined, 'remoto') || 
       hasWord(combined, 'app') || 
       hasWord(combined, 'apps') || 
       hasWord(combined, 'bluetooth') || 
       hasWord(combined, 'inalámbrico') || 
       hasWord(combined, 'inalambrico') || 
       combined.includes('mando a distancia') || 
       combined.includes('con mando') || 
       combined.includes('aplicación móvil') || 
       combined.includes('aplicacion movil') || 
       combined.includes('control por') || 
       combined.includes('controlado por') || 
       combined.includes('controlada por') || 
       hasWord(n, 'panties vibradoras') || 
       hasWord(n, 'huevo vibrador');

    const hasCouplesKeywords = 
      hasWord(combined, 'parejas') || hasWord(combined, 'pareja') || 
      hasWord(combined, 'we-vibe') || hasWord(combined, 'we vibe') || 
      hasWord(combined, 'estimulador doble') || hasWord(combined, 'vibrador doble');

    if (proposed.subcategory === 'Control remoto') {
      if (n.includes('vibrador') || n.includes('vibe') || n.includes('bala') || n.includes('balas') || n.includes('satisfyer') || n.includes('succión') || n.includes('succion')) {
        subcategory2 = 'Vibradores';
      } else if (n.includes('plug') || n.includes('anal')) {
        subcategory2 = 'Plugs';
      } else if (hasCouplesKeywords) {
        subcategory2 = 'Para Parejas';
      }
    } else if (proposed.subcategory === 'Para Parejas') {
      if (hasRemoteKeywords) {
        subcategory2 = 'Control remoto';
      } else {
        subcategory2 = 'Vibradores';
      }
    } else {
      if (hasRemoteKeywords) {
        subcategory2 = 'Control remoto';
      } else if (hasCouplesKeywords) {
        subcategory2 = 'Para Parejas';
      }
    }

    const cleanSlug = (slug || nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/[^a-zA-Z0-9\-_]/g, '');

    // Crear el documento del producto para Sanity (idempotente usando createOrReplace)
    const doc = {
      _type: 'product',
      _id: `product-${cleanSlug}`,
      name: nombre,
      slug: {
        _type: 'slug',
        current: slug || nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
      category: proposed.category,
      subcategory: proposed.subcategory,
      subcategory2: subcategory2,
      description: descripcion,
      price: precio,
      stock: stock,
      image: imageAsset,
      images: imagesAssets,
    };

    try {
      const result = await sanityClient.createOrReplace(doc);
      console.log(`✓ Producto procesado en Sanity con ID: ${result._id}`);
      creados++;
    } catch (err) {
      console.error(`✕ Error al procesar el producto en Sanity:`, err.message);
    }
  }

  console.log(`\n--- MIGRACIÓN FINALIZADA ---`);
  console.log(`Productos creados con éxito: ${creados}`);
  console.log(`Productos omitidos por formato inválido: ${omitidos}`);
}

migrar();
