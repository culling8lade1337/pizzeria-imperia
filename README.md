# Pizzeria Imperia — portfolio rebuild

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion. Fully static.

    npm install
    npm run dev          # http://localhost:3000
    npm run typecheck && npm run lint && npm run build

## Photography (important)
The official site has no per-pizza photos. Add your own/permitted shots:
- Hero: `public/images/hero.jpg` (portrait ~1200×1500)
- Pizzas: `public/images/pizzas/<slug>.jpg` (4:5, ≥1200px wide), then set `image: "/images/pizzas/<slug>.jpg"`
  on the item in `src/data/menu.ts`. Until then a numbered "plate" placeholder is shown.

## Data
`src/data/menu.ts` mirrors https://www.pizzeria-imperia.dk/menus. No item 27 (published as "kommer snart").
Lunch flag: nos. 1, 2, 3, 5, 6, 18 are on the lunch page; no. 14 is tagged lunch only on the main menu page — verify with the restaurant.
