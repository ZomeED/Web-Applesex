CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text,
	`product_id` text NOT NULL,
	`product_name` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text,
	`delivery_method` text DEFAULT 'envio' NOT NULL,
	`address_line1` text,
	`address_line2` text,
	`city` text,
	`postal_code` text,
	`province` text DEFAULT 'Murcia',
	`total` real NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`stripe_session_id` text,
	`promo_code` text,
	`discount_amount` real,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`old_price` real,
	`stock` integer DEFAULT 0 NOT NULL,
	`images` text,
	`is_featured` integer DEFAULT false,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_stripe_session_id_unique` ON `orders` (`stripe_session_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);