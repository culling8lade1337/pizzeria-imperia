# Pizzeria Imperia — concept redesign

A concept redesign of the Pizzeria Imperia website (Copenhagen), built as a portfolio project.
Not affiliated with the restaurant. Menu data is taken from the official site.

**Idea:** "Stop reading what's inside. See what you're ordering." — a visual menu where the food comes first.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · fully static, Vercel-ready

## Features
- Visual pizza menu with search, dietary filters and category navigation
- Accessible pizza modal (keyboard navigation, focus trap, Esc to close)
- Draggable pizza scroll handle and staggered entrance animations
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots

## Run locally
    npm install
    npm run dev

## Photos
Put photos in `public/images/pizzas/` named `<number>-<name>.jpg` (see `node scripts/wire-images.mjs --list`), then run `node scripts/wire-images.mjs`.
