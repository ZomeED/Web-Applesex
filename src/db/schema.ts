import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Categorías de productos (ej. Lencería, Juguetes, Cosmética)
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
});

// Catálogo de Productos
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').references(() => categories.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  oldPrice: real('old_price'), // Para ofertas
  stock: integer('stock').notNull().default(0),
  images: text('images'), // JSON String array: ["url1.jpg", "url2.jpg"]
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Usuarios (Administradores de la tienda)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Pedidos (Órdenes de Compra)
export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  deliveryMethod: text('delivery_method').notNull().default('envio'), // 'envio' / 'recogida'
  addressLine1: text('address_line1'),
  addressLine2: text('address_line2'),
  city: text('city'),
  postalCode: text('postal_code'),
  province: text('province').default('Murcia'),
  total: real('total').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'paid', 'shipped', 'cancelled'
  stripeSessionId: text('stripe_session_id').unique(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Detalle del Pedido
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: text('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});
