CREATE TABLE IF NOT EXISTS "profiles" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "display_name" text,
  "stripe_customer_id" text,
  "stripe_subscription_id" text,
  "subscription_status" text NOT NULL DEFAULT 'free',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
