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
- **Google Forms** as the data sink for orders and B2B requests (write-only; data lands in Google Sheets)
- **Framer Motion** for animations
- **Bootstrap 5 + Sass** for styling; inline `<style jsx>` blocks for component-scoped overrides

## Architecture

### Routing & Rendering
- File-based routing under `src/app/`
- Dynamic routes: `/orders/[id]`, `/party-rentals/[category]`
- Server components by default; use `'use client'` directive for interactive components
- `next.config.js`: images unoptimized, trailing slashes enabled

### State Management
- Cart state managed via React Context (`src/components/cart/CartProvider.tsx`)
- All client components access cart via the `useCart()` hook exported from `CartProvider.tsx`
- Cart persists to localStorage under key `'esteam-cart'`
- Cart methods: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`, `getTotal()`, `getItemCount()`
- Discount code support: `applyDiscount(code)` returns `{ success, message }`; `removeDiscount()` clears it
- Discount state: `discountCode` (string | null), `discountPercent` (number, e.g. 10 = 10%)
- Hardcoded discount codes in `CartProvider.tsx`: `SAVE10` (10%), `SAVE20` (20%), `ESTEAM15` (15%)

### API Routes
- `POST /api/orders` — generates order ID, submits to Google Forms, returns `{ success, orderId }`; accepts `discountCode` and `discountPercent` fields
- `POST /api/order-requests` — validates and submits B2B inquiry to Google Forms
- Order IDs are generated as `'EST-' + Math.random().toString(36).slice(2, 9).toUpperCase()`
- Checkout is demo-only — no real payment processing (no PayPal, Stripe, or Square)
- Checkout flow: 2-step (Customer Info → Payment); demo card form collects card number, name, expiry, CVV but does not charge anything
- If Google Forms env vars are not set, API logs a warning and still returns success (dev fallback)

### Data
- Static handicraft products in `src/data/products.ts` (12 items, categories as plain strings)
- Static party rental products in `src/data/rentalProducts.ts` (17 categories, ~100+ items)
- No database — orders and B2B requests are written to Google Sheets via Google Forms
- Google Forms helpers in `src/lib/googleForms.ts`: `submitOrderToGoogleForms()`, `submitOrderRequestToGoogleForms()`, `generateOrderId()`
- Order confirmation page (`/orders/[id]`) reads from `sessionStorage` key `'esteam-last-order'` (set at checkout); shows "Order not found" on direct URL visits or refreshes

### TypeScript
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Core interfaces in `src/types/index.ts`: `Product`, `CartItem`, `Order`, `CustomerInfo`, `OrderRequestFormData`, `PaymentInfo`

### Animation Pattern
- Framer Motion used for staggered list entrances (product cards, rental rows) and page-level fade-ins
- Typical pattern: `variants` with `container` (staggerChildren) and `item` (y + opacity) on product grids

## Environment Variables

Copy `.env.example` to `.env.local`. All variables are server-side only (no `NEXT_PUBLIC_` prefix).

### Google Forms Setup

**Finding entry IDs:**
1. Open the Google Form preview in a browser
2. Open DevTools → Network tab
3. Submit a test response
4. Find the POST request to `formResponse`; the request body shows `entry.XXXXXXXXX=value`
5. Copy those IDs to `.env.local`

**Orders form** — create a Google Form with Short Answer fields:
Order ID, First Name, Last Name, Email, Phone, Address, City, ZIP, Items, Total, Date

**Order Requests form** — create a Google Form with:
- Short Answer: Customer Name, Customer Phone, Customer Email, Product Options, Comments
- Checkboxes: Customer Type, Items, T-shirt Colors, Preferred Contact
