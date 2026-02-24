# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint check
```

No test framework is configured.

## Tech Stack

- **Next.js 15** with App Router (React 19, TypeScript 5.7)
- **Supabase** for PostgreSQL database
- **Framer Motion** for animations
- **Bootstrap 5 + Sass** for styling

## Architecture

### Routing & Rendering
- File-based routing under `src/app/`
- Dynamic routes: `/orders/[id]`, `/party-rentals/[category]`
- Server components by default; use `'use client'` directive for interactive components
- `next.config.js`: images unoptimized, trailing slashes enabled

### State Management
- Cart state managed via React Context (`src/components/cart/CartProvider.tsx`)
- Cart persists to localStorage
- No global state library (Redux/Zustand)

### API Routes
- `POST/GET /api/orders` - Order CRUD
- `POST /api/order-requests` - Lead form submissions (B2B bulk inquiries)
- RESTful patterns with basic validation

### Data
- Static product data in `src/data/products.ts` and `src/data/rentalProducts.ts`
- Database tables: `orders`, `order_items`, `order_requests`
- Supabase client in `src/lib/supabase.ts` with graceful fallback if unconfigured

### TypeScript
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Type definitions in `src/types/index.ts`

## Environment Variables

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Setup

See `supabase/README.md` for migration and setup instructions.
