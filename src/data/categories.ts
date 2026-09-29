// Source of truth: https://www.pizzeria-imperia.dk/menus (Pizze, Hjemmelavet sandwich,
// Paste, Diverse, Frokosttilbud) — fetched 2026-09-29. Ingredients kept in Danish as published.
// Pizza data stays in ./menu.ts; this file adds every other category and assembles the menu.
import { LUNCH_ITEMS, MENU, type Pizza, type Tag } from "./menu";
import { LUNCH } from "./site";

export interface Row {
  slug: string;
  number?: number | null;
  name: string;
  ingredients: string;
  price: number;
  priceNote?: string;
  tags: Tag[];
  note?: string;
}

interface Base {
  id: string;
  /** Short label for the category navigation. */
  label: string;
  title: string;
  intro?: string;
  note?: string;
}
export interface PizzaCategory extends Base { kind: "pizza"; items: Pizza[] }
export interface ListCategory extends Base { kind: "list"; items: Row[] }
export type Category = PizzaCategory | ListCategory;

const V: Tag = "vegetarian", VG: Tag = "vegan", LF: Tag = "lactose-free";
const ASK = "Beef strips are not always available — ask staff when you order.";

function row(prefix: string, number: number | null, name: string, ingredients: string,
  price: number, tags: Tag[] = [], note?: string): Row {
  const slug = `${prefix}-${number ?? ""}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return { slug, number, name, ingredients, price, tags, note };
}

const sandwiches: Row[] = [
  row("sandwich", 50, "Prosciutto", "ost, salat, skinke, cherrytomater og valgfri dressing", 58),
  row("sandwich", 51, "Veneziana", "mozzarella, rucola, grilleret aubergine, cherrytomater og valgfri dressing", 70, [V]),
  row("sandwich", 52, "Estiva", "mozzarella, rucola, cherrytomater og valgfri dressing", 65, [V]),
  row("sandwich", 53, "Parma", "mozzarella, salat, lufttørret skinke, cherrytomater og valgfri dressing", 65),
  row("sandwich", 54, "Tonno", "salat, tun i dåse, rødløg, tomater og valgfri dressing", 65, [LF]),
  row("sandwich", 55, "Porchetta", "ost, salat, porchetta (svinesteg), cherrytomater og valgfri dressing", 64),
  row("sandwich", 56, "Erbivoro", "spinat, grilleret aubergine, grillerede artiskokker, soltørrede tomater og valgfri dressing", 78, [VG, V, LF]),
  row("sandwich", 57, "Pollo", "ost, salat, kyllingestrimler, cherrytomater og valgfri dressing", 60),
  row("sandwich", 58, "Oksekødstrimler", "ost, salat, oksekødstrimler, cherrytomater og valgfri dressing", 70, [], ASK),
  row("sandwich", 59, "Tacchino", "ost, salat, kalkun pålæg, cherrytomater og valgfri dressing", 65),
  row("sandwich", 60, "Calabria", "ost, rucola, stærk salame, soltørrede tomater og valgfri dressing", 65),
  row("sandwich", 61, "Pollo - Bacon", "ost, salat, kyllingestrimler, bacon, cherrytomater og valgfri dressing", 79),
  row("sandwich", 62, "Salmone", "mozzarella, rucola, røget laks, cherrytomater og valgfri dressing", 79),
  row("sandwich", 63, "Bresaola", "ost, salat, okseinderlår, cherrytomater og valgfri dressing", 69),
];

const pasta: Row[] = [
  row("pasta", 70, "Lasagna Bolognese", "kødsovs, bechamelsovs og grana padano", 89),
  row("pasta", 71, "Ravioli ai porcini", "Karl Johan svamper, tomat, fløde, pesto og grana padano", 85, [V]),
];

const salads: Row[] = [
  row("salad", 80, "Insalata Caprese", "rucola, mozzarella, cherrytomater, oliven, pesto, olivenolie og oregano", 75, [V]),
  row("salad", 81, "Insalata di tonno", "salat, tun i olie, cherrytomater, løg og valgfri dressing", 75),
  row("salad", 82, "Insalata di pollo", "salat, kyllingestrimler, cherrytomater og valgfri dressing", 75),
];

const breads: Row[] = [
  row("bread", null, "Focacciabrød", "friskbagt brød toppet med olivenolie, rosmarin og oregano", 40, [VG, V]),
  row("bread", null, "Focaccia", "med tomatsauce og ost", 45),
  row("bread", null, "Bruschetta", "ost, cherrytomater, hvidløg og pesto", 55, [V]),
];

// Lunch offer: same items and prices as the homepage lunch section.
const lunch: Row[] = LUNCH_ITEMS.map((i) => ({
  slug: `lunch-${i.slug}`,
  number: i.number,
  name: i.name,
  ingredients: i.ingredients,
  price: i.category === "pizza" ? LUNCH.price : i.price,
  tags: i.tags,
  note: i.category === "pizza" ? undefined : i.note,
}));

export const CATEGORIES: Category[] = [
  {
    id: "pizza", label: "PIZZA", title: "Pizza", kind: "pizza",
    intro: "Flavourful pizzas with great variety and honest prices. Normal and family size (a few in Large). Tap a pizza for details.",
    items: MENU.filter((p) => p.category === "pizza"),
  },
  {
    id: "sandwiches", label: "SANDWICHES", title: "Homemade sandwiches", kind: "list",
    intro: "Big, filling sandwiches. Ours are quite crisp — ask for them softer when you order.",
    note: "Say which dressing you want when you order: pesto, crème fraîche, garlic dressing, curry or olive oil.",
    items: sandwiches,
  },
  {
    id: "pasta", label: "PASTA", title: "Pasta", kind: "list",
    intro: "Hearty pasta dishes in large portions.",
    note: "Focaccia can be added to any pasta dish — ask when you order.",
    items: pasta,
  },
  { id: "salads", label: "SALADS", title: "Salads", kind: "list", intro: "Fresh, generous salads.", items: salads },
  { id: "breads", label: "BREADS", title: "Small bread dishes", kind: "list", intro: "Freshly baked bread and bruschetta.", items: breads },
  {
    id: "lunch", label: "LUNCH", title: "Lunch offer", kind: "list",
    intro: "Good food at good prices when hunger strikes.",
    note: LUNCH.note,
    items: lunch,
  },
];
