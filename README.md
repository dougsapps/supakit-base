# SupaKit Base

A minimal Next.js 15 SaaS starter template with Supabase Auth, Drizzle ORM, Tailwind CSS, shadcn/ui, and Stripe billing.

## Stack

- **Framework:** Next.js 15 App Router
- **Auth:** Supabase Auth (magic link)
- **Database:** Supabase Postgres + Drizzle ORM
- **Styling:** Tailwind CSS + shadcn/ui
- **Billing:** Stripe (Checkout + Customer Portal + webhooks)
- **Email:** Resend

## Getting started

### 1. Clone and install

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local` with your real values:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API |
| `DATABASE_URL` | Supabase dashboard → Project Settings → Database → Transaction pooler URL |
| `RESEND_API_KEY` | resend.com → API Keys |
| `STRIPE_SECRET_KEY` | Stripe dashboard → Developers → API keys |
| `STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe dashboard → Webhooks → signing secret |
| `STRIPE_PRICE_ID` | Stripe dashboard → Products → your price ID |

### 3. Configure Supabase

- Enable **Email** provider in Authentication → Providers
- Set **Email confirmation** to "Magic link"
- Under Authentication → SMTP settings, add your Resend SMTP credentials so magic link emails are delivered via Resend

### 4. Push the database schema

```bash
pnpm db:push
```

### 5. Run locally

```bash
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Design systems

This boilerplate ships with all four design systems installed. Only one is active at a time.

| Design system | Status | To activate |
|---|---|---|
| shadcn/ui | **Active** | Already configured via `components.json` |
| DaisyUI | Installed | Uncomment the DaisyUI plugin in `tailwind.config.ts` |
| HeroUI | Installed | Replace `components/providers.tsx` with HeroUI provider |
| Chakra UI | Installed | Replace `components/providers.tsx` with Chakra provider |

## Stripe webhook

Register `https://your-domain.com/api/webhooks/stripe` in the Stripe dashboard.

Required events:
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Add all env vars from `.env.local.example` to Vercel environment variables
4. Deploy
