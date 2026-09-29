// Source of truth: https://www.pizzeria-imperia.dk/menus (fetched 2026-09-28).
// Ingredients are kept verbatim in Danish as published. Prices in DKK.
export type Tag =
  | "vegetarian" | "vegan" | "spicy" | "extra-spicy"
  | "lactose-free" | "dairy-free" | "lunch" | "white-base";

export interface Pizza {
  slug: string;
  number: number | null;
  name: string;
  category: "pizza" | "other";
  ingredients: string;
  price: number;
  /** Second size price; label as published ("Familie" or "Large"). */
  bigPrice?: number;
  bigLabel?: "Familie" | "Large";
  tags: Tag[];
  /** Optional photo at /public/images/pizzas/<slug>.jpg — add real photography here. */
  image?: string;
  /** Extra note published by the restaurant. */
  note?: string;
  popular?: boolean;
}

const ASK = "Beef strips are not always available — ask staff.";

function p(
  number: number | null, name: string, ingredients: string, price: number,
  bigPrice?: number, tags: Tag[] = [],
  extra: Partial<Pizza> = {},
): Pizza {
  const slug = `${number ?? ""}-${name}`.toLowerCase()
    .replace(/\s*\(.*?\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    slug, number, name, category: "pizza", ingredients, price,
    bigPrice, bigLabel: bigPrice ? "Familie" : undefined, tags, ...extra,
  };
}

const L: Tag = "lunch", V: Tag = "vegetarian", W: Tag = "white-base";

export const MENU: Pizza[] = [
  p(1, "Margherita", "tomatsovs og ost", 85, 155, [L, V]),
  p(2, "Prosciutto", "tomatsovs, ost og skinke", 90, 165, [L]),
  p(3, "Capricciosa", "tomatsovs, ost, skinke og champignon", 93, 165, [L]),
  p(4, "Quattro Stagioni", "tomatsovs, ost, skinke, champignon, paprika og artiskokker", 95, 180),
  p(5, "Pepperoni", "tomatsovs, ost og pepperoni", 93, 165, [L], { popular: true }),
  p(6, "Martino", "tomatsovs, ost, kylling og grana padano", 95, 185, [L], { popular: true }),
  p(7, "Porchetta", "ost, svinesteg, scamorza og grillerede artiskokker", 100, 195),
  p(8, "Padana", "tomat, ost, gorgonzola, løg, cocktailpølser og bacon", 100, 195),
  p(9, "Bolognese", "tomat, ost, kødsovs og løg", 98, 190),
  p(10, "Vegetale", "tomatsovs, ost, champignon, peberfrugt, artiskokker, oliven og løg", 95, 180, [V]),
  p(11, "Siciliana", "tomat, ost, capers, oliven og ansjoser", 95, 185),
  p(12, "Vichinga", "tomat, ost, skinke, pepperoni og bacon", 100, 195, [], { popular: true }),
  p(13, "Calzone", "tomat, ost, skinke og champignon", 95, undefined, [], { note: "Indbagt (folded, baked closed)." }),
  p(14, "Esotica", "tomatsovs, ost, skinke og ananas", 93, 175, [L]),
  p(15, "Spinaci", "tomatsovs, ost, artiskokker og friske spinat", 90, 180, [V]),
  p(16, "Danese", "tomat, ost, cocktailpølser, æg og bacon", 100, 185, [], { bigLabel: "Large" }),
  p(17, "Pesto", "ost, pesto, champignon, artiskokker og løg", 95, 190, [V], { note: "Green base (grønbund)." }),
  p(18, "Pollo", "tomat, ost, kylling og champignon", 95, 185, [L]),
  p(19, "Salerno", "tomat, ost, kødstrimler, løg og champignon", 100, 190, [], { note: ASK }),
  p(20, "Barese", "tomat, ost, kødstrimler og paprika", 98, 190, [], { note: ASK }),
  p(21, "Quattro Formaggi", "tomat, ost, mozzarella, gorgonzola og grana padano", 100, 195, [V], { popular: true }),
  p(22, "Calabrese", "tomat, ost, stærk salame, rucola og cherrytomater", 95, 185, ["spicy"]),
  p(23, "Paesana", "tomat, ost, skinke, salsiccia og spinat", 95, 190),
  p(24, "Parma", "tomat, ost, gorgonzola og lufttørret skinke", 100, 190, [], { popular: true }),
  p(25, "Giovanni", "tomat, ost, mozzarella, rucola, cherrytomater og grana padano", 100, 195, [V], { popular: true }),
  p(26, "Marco", "tomat, ost, lufttørret skinke, rucola og cherrytomater", 94, 185),
  p(28, "Vegano", "tomatsovs, kartofler, løg, champignon, spinat og pesto", 98, 185, ["vegan", V, "lactose-free"]),
  p(29, "Patate", "pesto, ost, kogt kartofler, bacon og rosmarin", 100, 185, [], { popular: true, note: "Green base (grønbund)." }),
  p(30, "Contadina", "tomatsovs, pesto, grilleret aubergine, grillerede artiskokker, rødløg", 98, 195, ["vegan", V, "dairy-free"]),
  p(31, "Imperia", "tomatsovs, ost, kyllingestrimler, peberfrugt, rucola, soltørrede tomater og pesto", 100, 190, [], { popular: true }),
  p(32, "Mascarpone", "mascarpone, ost, luftørret skinke, rucola, grana padano og olivenolie", 100, 195, [W]),
  p(33, "Alessia", "mascarpone, ost, tyndekartofler, kyllingestrimler, rosmarin og olivenolie", 100, 195, [W], { popular: true }),
  p(34, "Salmone", "mascarpone, ost, røget laks, friskespinat, cherrytomater og pesto", 100, 195, [W], { bigLabel: "Large" }),
  p(35, "Ditte", "tomatsovs, ost, stærk salame, jalapeños og grana padano", 98, 190, ["extra-spicy"], { popular: true }),
  p(36, "Tonno", "tomatsovs, ost, champignon, tun og rødløg", 95, 190),
  p(37, "Bianca", "ricotta, ost, kartofler, champignon og olivenolie", 95, 190, [V, W]),
  p(38, "Nicola", "mascarpone, ost, kyllingestrimler, rucola, grana padano og olivenolie", 98, 195, [W]),
  p(39, "Salat", "tomatsovs, ost, oksekødstrimler, salat og creme fraiche", 100, 195),
  p(40, "Bocelli", "mascarpone, ost, stærk salame, friske spinat, grana padano og olivenolie", 100),
  p(41, "Sanremo", "tomatsovs, ost, scamorzaost, grilleret aubergine, soltørrede tomater og pesto", 100, 195, [V]),
  p(42, "Bresaola", "mascarpone, ost, okseinderlår, rucola, soltørrede tomater og pesto", 110, 195, [], { popular: true }),
  {
    slug: "panino", number: null, name: "Panino", category: "other",
    ingredients: "med mozzarella, stærk salame, porchetta eller andet pålæg",
    price: 65, tags: [L],
    note: "Focaccia sandwich, served hot and crisp; any dressing can be added.",
  },
  {
    slug: "focaccia", number: null, name: "Focaccia", category: "other",
    ingredients: "tomat, ost", price: 45, tags: [L],
  },
];

export const POPULAR = MENU.filter((m) => m.popular);

export const LUNCH_ITEMS = MENU.filter((m) => m.tags.includes("lunch"));

export const TAG_LABEL: Record<Tag, string> = {
  vegetarian: "Vegetarian", vegan: "Vegan", spicy: "Spicy", "extra-spicy": "Extra spicy",
  "lactose-free": "Lactose-free", "dairy-free": "Dairy-free", lunch: "Lunch", "white-base": "White base",
};
