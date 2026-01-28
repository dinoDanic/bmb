CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_id" integer,
	"description" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"price" real NOT NULL,
	"category_id" integer,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"product_details_id" integer,
	CONSTRAINT "products_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "product_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"width" real,
	"height" real,
	"depth" real,
	"weight" real,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_details_id_product_details_id_fk" FOREIGN KEY ("product_details_id") REFERENCES "public"."product_details"("id") ON DELETE no action ON UPDATE no action;