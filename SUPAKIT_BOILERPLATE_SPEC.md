# SupaKit Base Boilerplate — Build Spec
### For Claude Code | Stage 1 of 3
### Output: A public GitHub template repo at github.com/supakit-pro/base

---

## What this is

A minimal, generic Next.js SaaS starter template. It is not a finished product. It is the clean foundation that SupaKit copies for every user project. It must be:

- Generic enough to work as a starting point for any SaaS idea
- Pre-configured so the first `pnpm build` passes with zero errors
- Pre-installed with all four design systems (only one active at a time)
- Wired to Supabase and Vercel with placeholder environment variables
- Free of any product-specific code, branding, or business logic

This boilerplate is built once, published to GitHub, and never touched by end users directly. SupaKit copies it via the GitHub API when a new project is created.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router | Industry standard, Vercel-native |
| Language | TypeScript | Type safety, better Claude Code output |
| Database | Supabase (Postgres) | SupaKit's core integration |
| ORM | Drizzle ORM | Lightweight, Claude Code performs well with it |
| Auth | Supabase Auth — magic link only | Simplest, no password complexity |
| Styling | Tailwind CSS | Required by all four design systems |
| Package manager | pnpm | Faster, consistent with IndieKit conventions |
| Deployment | Vercel | SupaKit's core integration |

---

## Design Systems — All Pre-installed, One Active at a Time

All four design systems are installed as npm packages in `package.json`. None are configured by default. SupaKit activates the correct one by committing the appropriate config file at project creation time.

| Design System | Package | Config file SupaKit commits |
|---|---|---|
| shadcn/ui | `shadcn` (via CLI) | `components.json` |
| DaisyUI | `daisyui` | `tailwind.config.ts` with plugin enabled |
| HeroUI | `@heroui/react` | `providers.tsx` with HeroUI provider |
| Chakra UI | `@chakra-ui/react` | `providers.tsx` with Chakra provider |

The boilerplate ships with shadcn/ui as the default active design system. The other three are installed but their config files are not present — they activate only when SupaKit commits the right config.

---

## Folder Structure

```
supakit-base/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Magic link request form
│   │   └── confirm/
│   │       └── route.ts          # Magic link confirmation handler
│   ├── (app)/
│   │   ├── layout.tsx            # Authenticated app shell with nav
│   │   └── dashboard/
│   │       └── page.tsx          # Placeholder dashboard page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page / homepage
├── components/
│   ├── ui/                       # shadcn/ui components (pre-installed)
│   ├── auth/
│   │   └── login-form.tsx        # Magic link form component
│   ├── layout/
│   │   ├── navbar.tsx            # Top navigation
│   │   └── footer.tsx            # Simple footer
│   └── providers.tsx             # App providers wrapper (ready for design system swap)
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase browser client
│   │   ├── server.ts             # Supabase server client
│   │   └── middleware.ts         # Session refresh helper
│   ├── db/
│   │   ├── index.ts              # Drizzle client
│   │   └── schema.ts             # Base schema (users table only)
│   └── utils.ts                  # Shared utilities (cn helper etc)
├── middleware.ts                  # Auth protection middleware
├── drizzle.config.ts             # Drizzle configuration
├── tailwind.config.ts            # Tailwind config (DaisyUI slot ready)
├── components.json               # shadcn/ui config (default active)
├── .env.local.example            # All expected env vars listed with placeholders
├── .env                          # Listed in .gitignore — never committed
├── .gitignore                    # Includes .env, .env.local, node_modules
├── CLAUDE.md                     # Empty — SupaKit writes this at project creation
├── PRODUCT_SPEC.md               # Empty — SupaKit writes this at project creation
├── package.json                  # All dependencies including all 4 design systems
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md                     # Brief setup instructions
```

---

## Pages and Routes

### Landing page (`/`)

A minimal, clean homepage shell. Not opinionated — no product name, no specific copy. Designed to be the first thing Claude Code overwrites when building a real product.

Contents:
- Simple hero section with placeholder heading ("Your SaaS name here") and subheading
- Single CTA button linking to `/login`
- Navbar with logo placeholder and Login button
- Footer with placeholder copyright
- Uses shadcn/ui Button and Card components

This page exists so the app has a working root route. It is intentionally generic.

### Login page (`/login`)

Magic link only. No password field.

- Email input field
- "Send magic link" button
- On submit: calls Supabase `signInWithOtp`
- On success: shows confirmation message ("Check your email for a magic link")
- On error: shows plain-English error message
- Clean, centred layout — works with any design system

### Magic link confirmation (`/auth/confirm`)

Route handler (not a page). Handles the token exchange when user clicks the link in their email:
- Exchanges the token for a session
- Redirects to `/dashboard` on success
- Redirects to `/login?error=true` on failure

### Dashboard (`/dashboard`)

Placeholder authenticated page. Shows:
- "Welcome, [user email]" heading
- "Your dashboard is ready. Start building." body copy
- Sign out button

This is the first page users land on after login. Claude Code will replace this with real content.

Protected by middleware — redirects to `/login` if no session.

---

## Authentication

Magic link only via Supabase Auth.

**Flow:**
1. User enters email on `/login`
2. Supabase sends magic link email
3. User clicks link → hits `/auth/confirm` route
4. Token exchanged for session
5. Session stored in cookie via Supabase SSR helpers
6. User redirected to `/dashboard`

**Middleware (`middleware.ts`):**
- Refreshes session on every request
- Protects all routes under `/(app)/` — redirects to `/login` if no valid session
- Public routes: `/`, `/login`, `/auth/confirm`

**Supabase SSR setup:**
Uses `@supabase/ssr` package for cookie-based session management. Both browser client (`lib/supabase/client.ts`) and server client (`lib/supabase/server.ts`) configured correctly.

---

## Database — Drizzle ORM

### Schema (`lib/db/schema.ts`)

Minimal schema. One table only:

```typescript
// users table — extends Supabase auth.users
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => authUsers.id),
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

No other tables. This is the absolute minimum. Claude Code adds tables when building real features.

### Migrations

A single initial migration file creating the profiles table. Located at `drizzle/migrations/0000_initial.sql`.

---

## Environment Variables

### `.env.local.example` (committed to repo)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-transaction-pooler-url

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
AUTH_SECRET=generate-with-openssl-rand-base64-32

# Payments (add when ready — placeholders prevent build failures)
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
LEMON_SQUEEZY_API_KEY=placeholder
PADDLE_API_KEY=placeholder
DODO_PAYMENTS_API_KEY=placeholder
POLAR_ACCESS_TOKEN=placeholder

# Email
RESEND_API_KEY=placeholder
```

### `.env` — in `.gitignore`, never committed

### `.env.local` — in `.gitignore`, never committed

Created by the user (or Claude Code) from `.env.local.example`. Contains real values.

---

## Design System Configuration Detail

### Default: shadcn/ui (active out of the box)

`components.json` present and configured:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsx": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Pre-installed components: Button, Card, Input, Label, Form (the minimum needed for the login page and dashboard).

### DaisyUI (installed, not active)

Package in `package.json`. `tailwind.config.ts` has a commented-out DaisyUI plugin block. SupaKit uncomments it when user selects DaisyUI.

### HeroUI (installed, not active)

Package in `package.json`. `providers.tsx` has a commented-out HeroUI provider block. SupaKit commits an active version when selected.

### Chakra UI (installed, not active)

Package in `package.json`. `providers.tsx` has a commented-out Chakra provider block. SupaKit commits an active version when selected.

---

## package.json — Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "latest",
    "@supabase/ssr": "latest",
    "drizzle-orm": "latest",
    "postgres": "latest",
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest",
    "daisyui": "latest",
    "@heroui/react": "latest",
    "@chakra-ui/react": "latest"
  },
  "devDependencies": {
    "drizzle-kit": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

---

## What Must Be True When This Is Done

Before this boilerplate is published to GitHub, every item below must pass:

- [ ] `pnpm install` completes with no errors
- [ ] `pnpm build` completes with no errors and no warnings
- [ ] `pnpm dev` starts a working local server
- [ ] `/` route renders the landing page without errors
- [ ] `/login` route renders the magic link form without errors
- [ ] `/dashboard` route redirects to `/login` when no session is active
- [ ] `.env` is confirmed in `.gitignore`
- [ ] `.env.local` is confirmed in `.gitignore`
- [ ] `CLAUDE.md` exists at repo root (empty)
- [ ] `PRODUCT_SPEC.md` exists at repo root (empty)
- [ ] All four design system packages are present in `package.json`
- [ ] shadcn/ui is the active default design system
- [ ] No TypeScript errors on build
- [ ] No hardcoded credentials anywhere in the codebase
- [ ] README.md exists with basic setup instructions

---

## What This Boilerplate Does NOT Include

These are intentionally excluded. Claude Code adds them when building real projects on top of this template.

- No multi-tenancy or team/organisation logic
- No payment processing or subscription logic
- No admin panel
- No email templates
- No API routes beyond auth
- No database tables beyond profiles
- No onboarding flow
- No user settings page
- No role-based access control
- No analytics
- No error monitoring (Sentry etc)
- No testing setup
- No CI/CD configuration
- No i18n

---

## GitHub Repository Setup

Once the build passes all checks:

1. Create a new public repository at `github.com/supakit-pro/base`
2. Enable "Template repository" in GitHub Settings → General
3. Push the boilerplate as the initial commit
4. Confirm the "Use this template" button appears on the repo page
5. Test the GitHub API "create from template" call works correctly

The repo must be **public** for the GitHub API template creation to work without additional OAuth scope.

---

## Opening Claude Code Prompt for This Stage

Copy and paste this as your first message when opening this project in Claude Code:

```
Read ~/.claude/CLAUDE.md.

Your task is to build the SupaKit base boilerplate from the spec in BOILERPLATE_SPEC.md.

This is a template repository — not a finished product. Build it exactly as specified. 
Do not add features beyond what is listed. Keep it minimal and generic.

Before writing any code:
1. Confirm you have read the full spec
2. List the files you will create in order
3. Identify any ambiguities in the spec before starting

Model: claude-sonnet-4-6
Effort: High
Mode: Ask for approval

Do not write any code until you have completed steps 1–3 and I have confirmed.
```

---

*SupaKit Boilerplate Spec V1.0 — Stage 1 handoff to Claude Code*
