import type { APIRoute } from 'astro';
import { getAllProducts } from '../../lib/products';

export const GET: APIRoute = async () => {
  try {
    const products = await getAllProducts();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
