import type { Metadata } from "next";
import { MenuBrowser } from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description: "The full Pizzeria Imperia menu — see every pizza, filter by vegetarian, vegan, spicy or lunch, and call to order.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <h1 className="font-display text-5xl leading-tight sm:text-6xl">The menu</h1>
      <p className="mt-4 max-w-xl text-muted">Tap a pizza for details. Order by phone — normal and family sizes. Ingredients are listed as published in Danish.</p>
      <div className="mt-8"><MenuBrowser /></div>
    </div>
  );
}
