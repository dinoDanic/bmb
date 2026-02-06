ALTER TABLE "categories" RENAME COLUMN "name" TO "display_name";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "featured" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_slug_unique" UNIQUE("slug");