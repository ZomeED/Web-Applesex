export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  subcategory?: string; // Clasificación secundaria
  subcategory2?: string | null; // Segunda subcategoría opcional
  material?: string;     // Atributo de material
  characteristics?: string[]; // Etiquetas de filtrado avanzado
  image: string;
  images?: string[];
  stock?: number;
  brand?: string;
  shortDescription?: string;
  stimulationType?: 'Estimuladores' | 'Succionadores';
  isFeatured?: boolean;
}

import { sanityClient, isSanityConfigured } from '../db/sanity';

export const localProducts: Product[] = [
  {
      "id": "prod-1",
      "name": "ACEITE DE MASAJE EFECTO CALOR",
      "slug": "aceite-de-masaje-efecto-calor",
      "description": "Shunga lanza este fabuloso aceite de masaje sensual de origen oriental de alta calidad para estimular los sentidos de forma sensual. Tan solo hay que aplicar una pequeña cantidad de este aceite en la zona deseada y extender suavemente sobre la piel dejando una sensación estimulante y agradable. Efecto calor. Exquisito e intenso sabor. Aumenta la sensibilidad y sensaciones. Cantidad: 100 ml. Fabricado según la tradición milenaria oriental, con este aceite de una dulzura absoluta, te deslizarás fantásticamente sobre el cuerpo de tu amante produciendo una sensación afrodisíaca. Ingredientes naturales fusionados con principios activos logran un gran resultado.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/33166c52-16bf-4e86-9aa5-b864277c365a.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/33166c52-16bf-4e86-9aa5-b864277c365a.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/d16437fa-3959-4606-bef1-af8a69f4a9e5.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/6bb5cd93-fe02-4dae-8501-f65b6fcaa1f6.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/250493ee-97eb-4beb-afa1-9194a90db67f.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/08abbbbc-05ab-4211-9079-9421b44d95fe.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/8721396a-dc0b-4b71-8657-0411cac4e250.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/25ea3b40-2a22-44bf-96bb-b6d69608b5a4.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/fdbdd20d-2e25-41fd-a880-612578d82b1e.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/a855ac94-4f32-4b78-b7aa-d422738a10ff.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/f611c044-2f66-4f48-9c51-a0cb90a755f8.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": null
  },
  {
      "id": "prod-2",
      "name": "ACEITE DE MASAJE EFECTO CALOR ORGÁNICO - TÉ VERDE",
      "slug": "aceite-de-masaje-efecto-calor-organico-te-verde",
      "description": "Para utilizar durante los juegos previos para intensificar las sensaciones y prolongar el placer. Este delicioso aceite de calefacción comestible está diseñado especialmente para zonas erógenas. Utilizado en pequeñas gotas, este aceite acentúa el placer de las sensaciones en tus partes favoritas del cuerpo. Se activa con el cálido aliento de suaves besos íntimos. Perfecto para zonas erógenas. Proporciona un efecto calor activado por un aliento caliente. Delicioso sabor. Acentúa sensaciones. 100% orgánico. Envase: 100 ml. Aroma: té verde. Ingredientes naturales fusionados con principios activos logran un gran resultado.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/d8fb48f2-9be8-48ef-88ed-5c3c6e7f80a3.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/d8fb48f2-9be8-48ef-88ed-5c3c6e7f80a3.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": null
  },
  {
      "id": "prod-3",
      "name": "ACEITE DE MASAJE ORGÁNICO NATURAL",
      "slug": "aceite-de-masaje-organico-natural",
      "description": "¿Quieres dar masajes como nunca antes? ¿Que la mano y la piel se fundan en uno? ¿Quieres dejar a tu pareja con ganas de más cada vez que uses este aceite? No esperes más y pruébalo, solo te vas a quedar con ganas de repetir una y otra vez. Este aceite está inspirado en el arte erótico japonés. Es una verdadera invitación a un viaje que te dejará con la boca abierta. Estos cosméticos elegantes son una oda de sensualidad, excitación y pasión. ¿Te atreves? ¡Que empiece el viaje! CARACTERISTICAS: Elaborado 100% con aceites naturales prensados en frío; Sabores deliciosos; Vitamina E (antioxidante); Sin residuos grasos; No obstruye los poros de la piel; Envase: 240 ML; Aroma: Natural. Shunga es líder mundial en cosmética Erótica, sus ingredientes naturales fusionado con principios activos logran un gran resultado. Entrar en el mundo erótico de Shunga es viajar al pasado. Traducido literalmente, Shunga significa ‘imagen de primavera’, una manera delicada de decir ‘relaciones sexuales’ entre personas. Esta palabra se usaba para designar las pinturas eróticas japonesas del siglo XVI, XVII y XVIII, un tipo llamado ukiyo-e, que no eran otra cosa que obras sobre madera o pergamino con escenas sensuales y episodios de amor carnal, siempre elaborados con mucho cuidado y buen gusto. El arte Shunga, aunque oculto durante siglos, marcó el principio de la industria pornográfica para la clase media nipona y sirvió durante generaciones como enseñanza para los hijos y las hijas de muchas familias.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/bfd6defc-390c-4468-9da3-e7d713725719.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/bfd6defc-390c-4468-9da3-e7d713725719.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": "Para Parejas"
  },
  {
      "id": "prod-4",
      "name": "ACEITE DE MASAJE ORGÁNICO",
      "slug": "aceite-de-masaje-organico",
      "description": "¿Quieres dar masajes como nunca antes? ¿Que la mano y la piel se fundan en uno? ¿Quieres dejar a tu pareja con ganas de más cada vez que uses este aceite? No esperes más y pruébalo, solo te vas a quedar con ganas de repetir una y otra vez. Este aceite está inspirado en el arte erótico japonés. Elaborado 100% con aceites naturales prensados en frío. Sabores deliciosos. Vitamina E (antioxidante). Sin residuos grasos. No obstruye los poros de la piel. Envase: 240 ML. Aromas: Almendra, té verde, mango y frambuesa.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/720b5e09-0cba-41c3-9a91-99b12a6ce281.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/720b5e09-0cba-41c3-9a91-99b12a6ce281.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/b37e2c9f-62a4-452e-8e81-24375056e62f.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/6ee82018-ffed-4c43-be90-f49cc5eea105.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/ed91d566-5365-43f5-851a-026bb124e53b.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": "Para Parejas"
  },
  {
      "id": "prod-5",
      "name": "ACEITE DE MASAJE ERÓTICO",
      "slug": "aceite-de-masaje-erotico",
      "description": "Aceite de masaje sensual de origen oriental de alta calidad, compuesto por una mezcla de aceites esenciales de almendras dulces, semillas de uva, sésamo, aguacate, esencia pura de Ylang-Ylang y Yohime. Estimulante de todos los sentidos, especialmente seleccionado por su suavidad al extenderlo sobre la piel sin dejar sensación grasienta. Testado dermatológicamente, no produce reacción alérgica y es totalmente inocuo para la piel. Envase transparente de 240 ml.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/aee0a4e5-927c-437f-9c82-0661ebe4cb25.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/aee0a4e5-927c-437f-9c82-0661ebe4cb25.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/dbc96d74-c5eb-4698-bc45-1bf18efd4971.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/9a88afd0-f9b8-41a5-8efa-0eb81721b8ad.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/f2f63cf8-9bc0-498d-807d-cbe4466c708c.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/8044ab50-fe3f-4a76-b9a1-74828af9cef5.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/52658419-d577-462b-a213-ead0f35a9e0a.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/72595e99-e450-484c-b151-659b67e1e4cc.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/24d1efb6-e949-4352-b423-013ba0f22cf9.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/5699b6f8-3e03-4c18-a746-99ff2ad0165c.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/de64807b-639d-4559-8175-69f3e7e92baf.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/cba227f5-ac68-465d-b18b-819282272984.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/e2a95d35-4a1c-4d70-a57b-e23d308a558f.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": null
  },
  {
      "id": "prod-6",
      "name": "MINI CARESS BY CANDELIGHT - VELA MASAJE",
      "slug": "shunga-170ml-mini-caress-by-candelight-vela-masaje-te-verde",
      "description": "Combina la suavidad de un dulce masaje con un ambiente íntimo y sensual. Esta vela de masaje Shunga te encenderá tus sentidos con los aromas sensuales y te deleitará además con un cálido aceite para masajear a tu pareja. Enciende la mecha de la candela y deja que arda durante veinte minutos, luego vierte la cera caliente sobre la piel. Contenido 170 ml.",
      "price": 29.95,
      "category": "COSMÉTICA",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603594-img_27813_4e2e25edad613a770230202d8e13434a_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603594-img_27813_4e2e25edad613a770230202d8e13434a_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603594-img_27816_2ced7f2e31ef7227558b9a907d747625_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603595-img_27815_d3cb502b652b4ae6070286fd313e3549_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603594-img_27814_733919d5ca3baecaf62212604bafdc8c_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731947603593-img_27812_47764797e2c71d96b2d5242dc139fddc_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731786630124-14073.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/5052babb-3990-4c56-83cf-5f51c1736809.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/af65694b-d7e8-4a6d-8af9-ece6a238d354.jpg"
      ],
      "subcategory": "Aceites y Velas de Masaje",
      "subcategory2": "Para Parejas"
  },
  {
      "id": "prod-7",
      "name": "ASS-GASM INTIMOTION - ESTIMULADOR ANAL Y PERINEAL",
      "slug": "ass-gasm-intimotion-estimulador-anal-y-perineal",
      "description": "Estimulador anal y perineal recargable con tecnología IntiMotion, movimiento giratorio, 4 motores, múltiples velocidades, anillo de sujeción ergonómico, control remoto inalámbrico y diseño anatómico para una estimulación intensa y cómoda. Material: silicona premium y ABS.",
      "price": 99.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/326b35ea-4935-420c-8c4f-ceb630bc175d.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/326b35ea-4935-420c-8c4f-ceb630bc175d.jpg"
      ],
      "subcategory": "Vibradores Anales",
      "subcategory2": "Control remoto"
  },
  {
      "id": "prod-8",
      "name": "TWIST ECSTASY - ESTIMULADOR ANAL CON GIRO",
      "slug": "twist-ecstasy-estimulador-anal-con-giro",
      "description": "Estimulador anal giratorio recargable con tecnología de movimiento rotatorio continuo, múltiples velocidades, diseño ergonómico, silicona premium suave al tacto, recarga USB y funcionamiento silencioso. Material: silicona premium y ABS.",
      "price": 99.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/6ef38288-9fdc-4cda-b7ce-6ea63abc7ccf.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/6ef38288-9fdc-4cda-b7ce-6ea63abc7ccf.jpg"
      ],
      "subcategory": "Vibradores Anales",
      "subcategory2": null
  },
  {
      "id": "prod-9",
      "name": "LUSH KISS PLUSH - ESTIMULADOR CLITORAL DE SUCCIÓN Y LICKING",
      "slug": "lush-kiss-plush-estimulador-clitoral-de-succion-y-licking",
      "description": "Estimulador clitoriano con tecnología de succión y lamido, efecto combinado de besos, succiones y vibraciones, 8 modos, silicona premium suave, diseño ergonómico, recarga USB y resistencia al agua. Material: silicona premium y ABS.",
      "price": 99.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/3c78ddd2-44a5-4228-928d-043a6e585229.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/3c78ddd2-44a5-4228-928d-043a6e585229.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": null
  },
  {
      "id": "prod-10",
      "name": "G-TOUCH PULSE PRO - VIBRADOR RABBIT PARA PUNTO G Y CLÍTORIS",
      "slug": "g-touch-pulse-pro-vibrador-rabbit-para-punto-g-y-clitoris",
      "description": "Vibrador rabbit para estimulación simultánea del punto G y el clítoris con 3 motores independientes, múltiples velocidades y patrones, silicona premium, diseño ergonómico, recarga USB y resistencia al agua. Material: silicona premium y ABS.",
      "price": 99.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/25167cb3-545f-4ca8-93da-1f96c60ff6b9.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/25167cb3-545f-4ca8-93da-1f96c60ff6b9.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": null
  },
  {
      "id": "prod-11",
      "name": "GIZI LITE VIBRADOR DUAL PUNTO G Y CLÍTORIS",
      "slug": "gizi-lite-vibrador-dual-punto-g-y-clitoris",
      "description": "Vibrador dual para punto G y clítoris con dos motores independientes, 5 velocidades, forma ergonómica, silicona suave, carga por cable y resistencia a salpicaduras.",
      "price": 54.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/89e6652c-0fc6-4ee3-95ed-4d651432ed47.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/89e6652c-0fc6-4ee3-95ed-4d651432ed47.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": null
  },
  {
      "id": "prod-12",
      "name": "HELEN ESTIMULADOR RABBIT & VIBRADOR THRUSTING",
      "slug": "helen-estimulador-rabbit-and-vibrador-thrusting",
      "description": "Estimulador rabbit con movimiento thrusting y vibración, 5 modos, carga magnética, silicona supersuave, resistente al agua y diseño ergonómico para una experiencia más realista.",
      "price": 49.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/4eb145ec-1795-4865-abb2-ced80fffd14a.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/4eb145ec-1795-4865-abb2-ced80fffd14a.png"
      ],
      "subcategory": "Vibradores",
      "subcategory2": null
  },
  {
      "id": "prod-13",
      "name": "FLIP VIBRADOR WAND SILENCIOSO 10 MODOS",
      "slug": "flip-vibrador-wand-silencioso-10-modos",
      "description": "Masajeador wand potente y silencioso con 10 modos, silicona premium, diseño ligero, resistente al agua y hasta 60 minutos de autonomía.",
      "price": 39.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/a8ea5dbe-f31c-4a4d-bc2b-7013d0f99ae0.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/a8ea5dbe-f31c-4a4d-bc2b-7013d0f99ae0.jpg"
      ],
      "subcategory": "Vibradores",
      "subcategory2": null
  },
  {
      "id": "prod-14",
      "name": "REVERB ESTIMULADOR PUNTO G Y SUCCIONADOR DE CLÍTORIS",
      "slug": "reverb-estimulador-punto-g-y-succionador-de-clitoris",
      "description": "Estimulador de punto G con punta flexible y bulbosa, silicona premium, vibración ajustable, recargable por USB y resistente al agua.",
      "price": 59.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/5b1f41a4-a640-460c-b6c1-f173ae924759.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/5b1f41a4-a640-460c-b6c1-f173ae924759.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": null
  },
  {
      "id": "prod-15",
      "name": "VIBRADOR CON RABBIT",
      "slug": "vibrador-con-rabbit",
      "description": "Diseño premium con impulsos rítmicos y prolongación lateral flexible, elegante y versátil, con dos variantes de color.",
      "price": 89.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/c6164838-b987-4bef-96e2-969e034dfbaa.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/c6164838-b987-4bef-96e2-969e034dfbaa.jpg"
      ],
      "subcategory": "Vibradores",
      "subcategory2": null
  },
  {
      "id": "prod-16",
      "name": "DOBLE ESTIMULADOR CON MOVIMIENTO",
      "slug": "doble-estimulador-con-movimiento",
      "description": "Estimulador ergonómico con movimiento rotatorio en el eje principal y base curvada con lengüeta, pensado para combinar estilo y tecnología.",
      "price": 79.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/815299a1-48bd-48fb-8e4c-64456d178097.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/815299a1-48bd-48fb-8e4c-64456d178097.jpg"
      ],
      "subcategory": "Vibradores",
      "subcategory2": null
  },
  {
      "id": "prod-17",
      "name": "DOBLE ESTIMULADOR CON SUCCIÓN",
      "slug": "doble-estimulador-con-succion",
      "description": "Diseño versátil con efecto envolvente en la parte superior y brazo flexible en la base, creado para ofrecer nuevas posibilidades de uso.",
      "price": 79.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/73f66020-6797-427b-a4e8-845d11dcdb84.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW/assets/73f66020-6797-427b-a4e8-845d11dcdb84.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": null
  },
  {
      "id": "prod-18",
      "name": "SATISFYER - AIR PUMP VIBRATOR 5+ VIBRADOR PUNTO G INFLABLE CON APP - AZUL",
      "slug": "-satisfyer-air-pump-vibrator-5-vibrador-punto-g-inflable-con-app-azul",
      "description": "Información del producto Satisfyer Air Pump Vibrator 5 Connect App. El Air Pump Vibrator 5 Connect App te mima con un eje hinchable y potentes vibraciones que se pueden utilizar de forma independiente. Controla el vibrador para experiencias únicas con el Satisfyer Connect App. Compatible con la aplicación gratuita de Satisfyer, disponible para iOS y Android. Eje inflable para estimulación intensificada. El potente motor transmite ritmos de vibración intensa por todo el dispositivo. 15 años de garantía. Diámetro ajustable individualmente. Vibración profunda muy potente. Silicona respetuosa con el cuerpo. También se puede utilizar sin necesidad de la aplicación. Programas predefinidos y editables. Infinidad de programas variados con la aplicación. Modo susurro. Batería de iones de litio. Cable de carga magnético USB incluido. Fácil de limpiar. El eje voluminoso con la punta ancha y redondeada está diseñado específicamente para la estimulación de tu punto G.",
      "price": 79.95,
      "category": "JUGUETES",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1730026342143-35900-thickbox_default.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1730026342143-35900-thickbox_default.jpg"
      ],
      "subcategory": "Succionadores y Estimuladores",
      "subcategory2": "Control remoto"
  },
  {
      "id": "prod-19",
      "name": "PLUG ANAL UNISEX CON VENTOSA",
      "slug": "plug-anal-unisex-con-ventosa",
      "description": "Plug anal unisex para la estimulación del punto P y G - todo en un juguete. Este suave y flexible plug anal es ideal para ambos sexos. Para él, se coloca en el perineo para estimular y masajear la próstata tanto directa como indirectamente. Para ella, este juguete en forma de consolador puede ser usado como el plug anal o también funciona perfectamente como un juguete sexual estimulando el punto G. Tiene la textura suave para la introducción fácil, la forma anatómica para ajustarse perfectamente y la base acampanada para la extracción fácil. También cuenta con la ventosa en la base para fijarlo en una superficie plana y disfrutar libremente. Unisex. Ventosa fuerte. Texturizado. Material: PVC. Medidas: Ver foto. Se recomienda el uso de lubricante.",
      "price": 9.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731518895483-img_70149_a0554765814677d02a3c286f11a0a046_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731518895483-img_70149_a0554765814677d02a3c286f11a0a046_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731519047300-img_74633_701cd2ae16f262460fd6e98a5175b2cc_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731519047301-img_74630_9cabb3e877d0de1e668b1590cce77020_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-20",
      "name": "PLUG ANAL SILICONA",
      "slug": "plug-anal-silicona",
      "description": "Intensifica tu placer con Intese toys, un concepto clasico que no todos consiguen hacer. Si te gusta el sexo anal con Anal Level 1 es perfecto por muchos motivos. Su punta conica avanza a su parte ancha inferior estimulando la zona anal y dilatando suavemente sintiendo placer gracias a la silicona suave y sedosa medica que permite un avanze superior. Elegante fuerte e imponente es Anal Level 1 que te proporciona la sensación que necesitas. Una sola pieza compacta y resistente hará tus juegos anales un momento perfecto. Flexible y con la dureza perfecta para el juego anal. Libre de phalatos. Apto para usar bajo el agua. 100% silicona suave y sedodsa. Material seguro para el cuerpo. Medidas: 2.3 x 10.5 cm.",
      "price": 9.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520307424-img_143808_8b32fdecbd6d19d6437bd1fdf7201740_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520307424-img_143808_8b32fdecbd6d19d6437bd1fdf7201740_1.png",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520307425-img_59780_67f4dae8aaa2aae74563ede1a3db721b_1.gif"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-21",
      "name": "PLUG ANAL SILICONA",
      "slug": "plug-anal-silicona",
      "description": "Intensifica tu placer con Intese toys, un concepto clasico que no todos consiguen hacer. Si te gusta el sexo anal con Anal Level 1 es perfecto por muchos motivos. Su punta conica avanza a su parte ancha inferior estimulando la zona anal y dilatando suavemente sintiendo placer gracias a la silicona suave y sedosa medica que permite un avanze superior. Elegante fuerte e imponente es Anal Level 1 que te proporciona la sensación que necesitas. Una sola pieza compacta y resistente hará tus juegos anales un momento perfecto. Flexible y con la dureza perfecta para el juego anal. Libre de phalatos. Apto para usar bajo el agua. 100% silicona suave y sedodsa. Material seguro para el cuerpo. Medidas: 2.3 x 10.5 cm.",
      "price": 14.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520630757-img_143810_e690a2ecdaef8594a3a106661218cf3f_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520630757-img_143810_e690a2ecdaef8594a3a106661218cf3f_1.png",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520307425-img_59780_67f4dae8aaa2aae74563ede1a3db721b_1.gif"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-22",
      "name": "PLUG ANAL SILICONA",
      "slug": "plug-anal-silicona",
      "description": "Intensifica tu placer con Intese toys, un concepto clasico que no todos consiguen hacer. Si te gusta el sexo anal con Anal Level 1 es perfecto por muchos motivos. Su punta conica avanza a su parte ancha inferior estimulando la zona anal y dilatando suavemente sintiendo placer gracias a la silicona suave y sedosa medica que permite un avanze superior. Elegante fuerte e imponente es Anal Level 1 que te proporciona la sensación que necesitas. Una sola pieza compacta y resistente hará tus juegos anales un momento perfecto. Flexible y con la dureza perfecta para el juego anal. Libre de phalatos. Apto para usar bajo el agua. 100% silicona suave y sedodsa. Material seguro para el cuerpo. Medidas: 2.3 x 10.5 cm.",
      "price": 16.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520630756-img_143811_614c2c03df03e8012ee9965e484183a9_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520630756-img_143811_614c2c03df03e8012ee9965e484183a9_1.png",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731520307425-img_59780_67f4dae8aaa2aae74563ede1a3db721b_1.gif"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-23",
      "name": "ANAL BEADS - 29 CM",
      "slug": "anal-beads-29-cm",
      "description": "¿Estás preparado para disfrutar del sexo anal? Ahora Addicted toys te lo pone fácil con esta cadena de bolas anales para que puedas disfrutar cómo nunca. Cuentan con 8 bolas que van aumentando de tamaño según se van adentrando en tu interior, de tacto suave y con anilla para facilitar su extracción y jugar de forma segura. En una de las cadenas las bolas son redondeadas, para una mejor inserción para principiantes. Cadena de bolas anales perfecta para principiantes. Material: tpr suave y sedoso. Ideal para principiantes y avanzados. Fácil de limpiar. Anillas de extracción fácil. Longitud total: 29 cm.",
      "price": 11.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731523911004-img_82240_e6de3d475ba16532eb690e7a0c8f7ca2_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731523911004-img_82240_e6de3d475ba16532eb690e7a0c8f7ca2_1.png"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-24",
      "name": "PLUG ANAL SILICONA PREMIUM - MODELO 2",
      "slug": "plug-anal-silicona-premium-silexpan-termorreactivo",
      "description": "Model 2 es un plug anal termorreactivo con varios tamaños y forma lisa diseñado para la exploración anal, ofreciendo una experiencia sensual y placentera. Este producto innovador combina las propiedades de un tapón anal convencional con características termorreactivas que responden al calor corporal, proporcionando sensaciones adicionales y aumentando la comodidad durante su uso. El plug está fabricado con materiales de alta calidad y seguros para el cuerpo, lo que garantiza una experiencia placentera y sin riesgos. Su diseño ergonómico facilita la inserción y garantiza un ajuste cómodo dentro del canal anal. Además, la base del plug está diseñada de manera segura para evitar la inserción completa y garantizar la extracción sin problemas. La característica termorreactiva del plug implica que el material utilizado tiene la capacidad de cambiar su temperatura en respuesta al calor corporal. Esto no solo mejora la comodidad durante el uso, sino que también agrega una dimensión adicional de sensación a medida que el plug se adapta a la temperatura del cuerpo. El proceso de termorreactividad no solo se limita a la adaptación de la temperatura, sino que también puede potenciar la sensación táctil y la flexibilidad del plug, creando una experiencia más personalizada y sensual. La capacidad del plug para ajustarse a las variaciones individuales de temperatura corporal garantiza una experiencia única para cada usuario. Como con todos los juguetes sexuales, se recomienda el uso de lubricantes a base de agua para facilitar la inserción y mejorar la comodidad. La limpieza adecuada antes y después de cada uso es esencial para mantener la higiene del juguete y prevenir posibles irritaciones o infecciones. SILEXD. SilexD ofrece una gama de consoladores con piel de silicona extra suave de alta calidad con relleno de SILEXPAN de doble densidad y núcleo interno duro, para una sensación extremadamente realista y una experiencia de placer incomparable. La revolucionaria fórmula patentada del material SILEXPAN utilizado para rellenar nuestros productos permite una mejor densidad y mayor flexibilidad del consolador. Dándole una sensación magnifica y mayor elasticidad. SilexD ofrece la piel de silicona de mejor calidad del mercado. Esta silicona de grado platino no contiene ftalatos ni látex, es segura para el cuerpo, es hipoalergénica y no porosa, lo que la hace fácil de limpiar y más duradera. Color: Negro. Material: Silexpan / Silicona. Impermeabilización: Resistente al agua-IPX8. Zona de estimulación: Anal.",
      "price": 17.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526548118-img_159497_25edef6d7884b8cae15883b58a76fe76_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526548118-img_159497_25edef6d7884b8cae15883b58a76fe76_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526548118-img_159494_01c7c3296afa72a97dd57c13956498ca_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526548118-img_159493_591e4c0c53e208d3af33489ed7cfa1f7_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526548118-img_159908_948789585dd6a9c76c2b136690ae3d65_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-25",
      "name": "PLUG ANAL SILICONA PREMIUM - MODELO 1",
      "slug": "modelo-1-plug-anal-silicona-premium-silexpan-termorreactivo",
      "description": "Model 1 es un plug anal termorreactivo con varios tamaños y forma lisa diseñado para la exploración anal, ofreciendo una experiencia sensual y placentera. Este producto innovador combina las propiedades de un tapón anal convencional con características termorreactivas que responden al calor corporal, proporcionando sensaciones adicionales y aumentando la comodidad durante su uso. El plug está fabricado con materiales de alta calidad y seguros para el cuerpo, lo que garantiza una experiencia placentera y sin riesgos. Su diseño ergonómico facilita la inserción y garantiza un ajuste cómodo dentro del canal anal. Además, la base del plug está diseñada de manera segura para evitar la inserción completa y garantizar la extracción sin problemas. La característica termorreactiva del plug implica que el material utilizado tiene la capacidad de cambiar su temperatura en respuesta al calor corporal. Esto no solo mejora la comodidad durante el uso, sino que también agrega una dimensión adicional de sensación a medida que el plug se adapta a la temperatura del cuerpo. El proceso de termorreactividad no solo se limita a la adaptación de la temperatura, sino que también puede potenciar la sensación táctil y la flexibilidad del plug, creando una experiencia más personalizada y sensual. La capacidad del plug para ajustarse a las variaciones individuales de temperatura corporal garantiza una experiencia única para cada usuario. Como con todos los juguetes sexuales, se recomienda el uso de lubricantes a base de agua para facilitar la inserción y mejorar la comodidad. La limpieza adecuada antes y después de cada uso es esencial para mantener la higiene del juguete y prevenir posibles irritaciones o infecciones. SILEXD. SilexD ofrece una gama de consoladores con piel de silicona extra suave de alta calidad con relleno de SILEXPAN de doble densidad y núcleo interno duro, para una sensación extremadamente realista y una experiencia de placer incomparable. La revolucionaria fórmula patentada del material SILEXPAN utilizado para rellenar nuestros productos permite una mejor densidad y mayor flexibilidad del consolador. Dándole una sensación magnifica y mayor elasticidad. SilexD ofrece la piel de silicona de mejor calidad del mercado. Esta silicona de grado platino no contiene ftalatos ni látex, es segura para el cuerpo, es hipoalergénica y no porosa, lo que la hace fácil de limpiar y más duradera. Color: Negro. Material: Silexpan / Silicona. Impermeabilización: Resistente al agua-IPX8. Zona de estimulación: Anal.",
      "price": 19.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955240-img_159439_1c315742e64923ef1d45d2080de8b128_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955240-img_159439_1c315742e64923ef1d45d2080de8b128_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159438_0be2432bad6b4a0c434b89bc3841a151_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-26",
      "name": "PLUG ANAL SILICONA PREMIUM - MODELO 1",
      "slug": "modelo-1-plug-anal-silicona-premium-silexpan-termorreactivo",
      "description": "Model 1 es un plug anal termorreactivo con varios tamaños y forma lisa diseñado para la exploración anal, ofreciendo una experiencia sensual y placentera. Este producto innovador combina las propiedades de un tapón anal convencional con características termorreactivas que responden al calor corporal, proporcionando sensaciones adicionales y aumentando la comodidad durante su uso. El plug está fabricado con materiales de alta calidad y seguros para el cuerpo, lo que garantiza una experiencia placentera y sin riesgos. Su diseño ergonómico facilita la inserción y garantiza un ajuste cómodo dentro del canal anal. Además, la base del plug está diseñada de manera segura para evitar la inserción completa y garantizar la extracción sin problemas. La característica termorreactiva del plug implica que el material utilizado tiene la capacidad de cambiar su temperatura en respuesta al calor corporal. Esto no solo mejora la comodidad durante el uso, sino que también agrega una dimensión adicional de sensación a medida que el plug se adapta a la temperatura del cuerpo. El proceso de termorreactividad no solo se limita a la adaptación de la temperatura, sino que también puede potenciar la sensación táctil y la flexibilidad del plug, creando una experiencia más personalizada y sensual. La capacidad del plug para ajustarse a las variaciones individuales de temperatura corporal garantiza una experiencia única para cada usuario. Como con todos los juguetes sexuales, se recomienda el uso de lubricantes a base de agua para facilitar la inserción y mejorar la comodidad. La limpieza adecuada antes y después de cada uso es esencial para mantener la higiene del juguete y prevenir posibles irritaciones o infecciones. SILEXD. SilexD ofrece una gama de consoladores con piel de silicona extra suave de alta calidad con relleno de SILEXPAN de doble densidad y núcleo interno duro, para una sensación extremadamente realista y una experiencia de placer incomparable. La revolucionaria fórmula patentada del material SILEXPAN utilizado para rellenar nuestros productos permite una mejor densidad y mayor flexibilidad del consolador. Dándole una sensación magnifica y mayor elasticidad. SilexD ofrece la piel de silicona de mejor calidad del mercado. Esta silicona de grado platino no contiene ftalatos ni látex, es segura para el cuerpo, es hipoalergénica y no porosa, lo que la hace fácil de limpiar y más duradera. Color: Negro. Material: Silexpan / Silicona. Impermeabilización: Resistente al agua-IPX8. Zona de estimulación: Anal.",
      "price": 24.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159436_dee29b067bc89d294405906da4f58aad_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159436_dee29b067bc89d294405906da4f58aad_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159438_0be2432bad6b4a0c434b89bc3841a151_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-27",
      "name": "PLUG ANAL SILICONA PREMIUM - MODELO 1",
      "slug": "modelo-1-plug-anal-silicona-premium-silexpan-termorreactivo",
      "description": "Model 1 es un plug anal termorreactivo con varios tamaños y forma lisa diseñado para la exploración anal, ofreciendo una experiencia sensual y placentera. Este producto innovador combina las propiedades de un tapón anal convencional con características termorreactivas que responden al calor corporal, proporcionando sensaciones adicionales y aumentando la comodidad durante su uso. El plug está fabricado con materiales de alta calidad y seguros para el cuerpo, lo que garantiza una experiencia placentera y sin riesgos. Su diseño ergonómico facilita la inserción y garantiza un ajuste cómodo dentro del canal anal. Además, la base del plug está diseñada de manera segura para evitar la inserción completa y garantizar la extracción sin problemas. La característica termorreactiva del plug implica que el material utilizado tiene la capacidad de cambiar su temperatura en respuesta al calor corporal. Esto no solo mejora la comodidad durante el uso, sino que también agrega una dimensión adicional de sensación a medida que el plug se adapta a la temperatura del cuerpo. El proceso de termorreactividad no solo se limita a la adaptación de la temperatura, sino que también puede potenciar la sensación táctil y la flexibilidad del plug, creando una experiencia más personalizada y sensual. La capacidad del plug para ajustarse a las variaciones individuales de temperatura corporal garantiza una experiencia única para cada usuario. Como con todos los juguetes sexuales, se recomienda el uso de lubricantes a base de agua para facilitar la inserción y mejorar la comodidad. La limpieza adecuada antes y después de cada uso es esencial para mantener la higiene del juguete y prevenir posibles irritaciones o infecciones. SILEXD. SilexD ofrece una gama de consoladores con piel de silicona extra suave de alta calidad con relleno de SILEXPAN de doble densidad y núcleo interno duro, para una sensación extremadamente realista y una experiencia de placer incomparable. La revolucionaria fórmula patentada del material SILEXPAN utilizado para rellenar nuestros productos permite una mejor densidad y mayor flexibilidad del consolador. Dándole una sensación magnifica y mayor elasticidad. SilexD ofrece la piel de silicona de mejor calidad del mercado. Esta silicona de grado platino no contiene ftalatos ni látex, es segura para el cuerpo, es hipoalergénica y no porosa, lo que la hace fácil de limpiar y más duradera. Color: Negro. Material: Silexpan / Silicona. Impermeabilización: Resistente al agua-IPX8. Zona de estimulación: Anal.",
      "price": 29.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159434_601623fc534101e93635e025e7ebbc26_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159434_601623fc534101e93635e025e7ebbc26_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159438_0be2432bad6b4a0c434b89bc3841a151_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-28",
      "name": "PLUG ANAL SILICONA PREMIUM - MODELO 1",
      "slug": "modelo-1-plug-anal-silicona-premium-silexpan-termorreactivo",
      "description": "Model 1 es un plug anal termorreactivo con varios tamaños y forma lisa diseñado para la exploración anal, ofreciendo una experiencia sensual y placentera. Este producto innovador combina las propiedades de un tapón anal convencional con características termorreactivas que responden al calor corporal, proporcionando sensaciones adicionales y aumentando la comodidad durante su uso. El plug está fabricado con materiales de alta calidad y seguros para el cuerpo, lo que garantiza una experiencia placentera y sin riesgos. Su diseño ergonómico facilita la inserción y garantiza un ajuste cómodo dentro del canal anal. Además, la base del plug está diseñada de manera segura para evitar la inserción completa y garantizar la extracción sin problemas. La característica termorreactiva del plug implica que el material utilizado tiene la capacidad de cambiar su temperatura en respuesta al calor corporal. Esto no solo mejora la comodidad durante el uso, sino que también agrega una dimensión adicional de sensación a medida que el plug se adapta a la temperatura del cuerpo. El proceso de termorreactividad no solo se limita a la adaptación de la temperatura, sino que también puede potenciar la sensación táctil y la flexibilidad del plug, creando una experiencia más personalizada y sensual. La capacidad del plug para ajustarse a las variaciones individuales de temperatura corporal garantiza una experiencia única para cada usuario. Como con todos los juguetes sexuales, se recomienda el uso de lubricantes a base de agua para facilitar la inserción y mejorar la comodidad. La limpieza adecuada antes y después de cada uso es esencial para mantener la higiene del juguete y prevenir posibles irritaciones o infecciones. SILEXD. SilexD ofrece una gama de consoladores con piel de silicona extra suave de alta calidad con relleno de SILEXPAN de doble densidad y núcleo interno duro, para una sensación extremadamente realista y una experiencia de placer incomparable. La revolucionaria fórmula patentada del material SILEXPAN utilizado para rellenar nuestros productos permite una mejor densidad y mayor flexibilidad del consolador. Dándole una sensación magnifica y mayor elasticidad. SilexD ofrece la piel de silicona de mejor calidad del mercado. Esta silicona de grado platino no contiene ftalatos ni látex, es segura para el cuerpo, es hipoalergénica y no porosa, lo que la hace fácil de limpiar y más duradera. Color: Negro. Material: Silexpan / Silicona. Impermeabilización: Resistente al agua-IPX8. Zona de estimulación: Anal.",
      "price": 34.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159432_2f53f8c974426d41cbe53400a675a275_1.jpg",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159432_2f53f8c974426d41cbe53400a675a275_1.jpg",
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731526955241-img_159438_0be2432bad6b4a0c434b89bc3841a151_1.jpg"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-29",
      "name": "PLUG ANAL SHELKI SILICONA - FUCSIA",
      "slug": "plug-anal-shelki-silicona-fucsia",
      "description": "Intensifica tu placer con Intese toys, un concepto clasico que no todos consiguen hacer. Con este lujoso plug anal experimentarás el juego estimulando todos los puntos. Al introducirlo por su punta conica suave y sedodas penetrará poco a poco hasta sentirlo dentro, además dispone de una base que no permite introducirlo mas de lo debido. Fabricado en silicona grado medico suave y sedosa y con base en forma de diamante, este plug no solo es un objeto elegante, es un objeto de placer. 100% Silicona suave y sedosa. Flexible pero con la dureza perfecta para el juego anal. Apto para usar bajo el agua. Libre de Phalatos.",
      "price": 14.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731584280665-img_143813_3dcce56aac9eb74c2726e20b4e7f3048_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731584280665-img_143813_3dcce56aac9eb74c2726e20b4e7f3048_1.png"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  },
  {
      "id": "prod-30",
      "name": "PLUG ANAL SHELKI SILICONA - FUCSIA",
      "slug": "plug-anal-shelki-silicona-fucsia",
      "description": "Intensifica tu placer con Intese toys, un concepto clasico que no todos consiguen hacer. Con este lujoso plug anal experimentarás el juego estimulando todos los puntos. Al introducirlo por su punta conica suave y sedodas penetrará poco a poco hasta sentirlo dentro, además dispone de una base que no permite introducirlo mas de lo debido. Fabricado en silicona grado medico suave y sedosa y con base en forma de diamante, este plug no solo es un objeto elegante, es un objeto de placer. 100% Silicona suave y sedosa. Flexible pero con la dureza perfecta para el juego anal. Apto para usar bajo el agua. Libre de Phalatos.",
      "price": 19.95,
      "category": "ANAL",
      "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731584280664-img_143819_061ce6a6a72c3df3857847999a97233c_1.png",
      "images": [
          "https://cdn.zyrosite.com/cdn-ecommerce/store_01JB4WV751ADTRHJ2SN3ETMVVW%2Fassets%2F1731584280664-img_143819_061ce6a6a72c3df3857847999a97233c_1.png"
      ],
      "subcategory": "Plugs",
      "subcategory2": null
  }
];

export async function getAllProducts(): Promise<Product[]> {
  if (isSanityConfigured()) {
    try {
      const query = `*[_type == "product"] {
        "id": _id,
        name,
        "slug": slug.current,
        description,
        shortDescription,
        price,
        oldPrice,
        "image": image.asset->url,
        "images": images[].asset->url,
        category,
        subcategory,
        subcategory2,
        material,
        characteristics,
        stock,
        brand,
        stimulationType,
        isFeatured
      }`;
      const sanityProducts = await sanityClient.fetch(query);
      if (sanityProducts && sanityProducts.length > 0) {
        return sanityProducts;
      }
    } catch (err) {
      console.warn('Sanity request failed, falling back to local products dataset:', err);
    }
  }
  return localProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find(p => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug);
}
