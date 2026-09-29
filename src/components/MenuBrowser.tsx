"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Pizza } from "@/data/menu";
import { CATEGORIES, type Category, type PizzaCategory, type Row } from "@/data/categories";
import { SITE } from "@/data/site";
import { PizzaCard } from "./PizzaCard";
import { PizzaModal } from "./PizzaModal";
import { Badges, kr } from "./Badges";

const DIET: { id: string; label: string; test: (r: Row) => boolean }[] = [
  { id: "all", label: "ALL", test: () => true },
  { id: "vegetarian", label: "VEGETARIAN", test: (r) => r.tags.includes("vegetarian") },
  { id: "vegan", label: "VEGAN", test: (r) => r.tags.includes("vegan") },
  { id: "spicy", label: "SPICY", test: (r) => r.tags.includes("spicy") || r.tags.includes("extra-spicy") },
  { id: "white", label: "WHITE BASE", test: (r) => r.tags.includes("white-base") },
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MenuBrowser() {
  const [diet, setDiet] = useState("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const navScroller = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  const visible: Category[] = useMemo(() => {
    const test = (DIET.find((d) => d.id === diet) ?? DIET[0]).test;
    const q = norm(query.trim());
    const match = (r: Row) => test(r) && (!q || norm(`${r.number ?? ""} ${r.name} ${r.ingredients}`).includes(q));
    return CATEGORIES.map((c): Category =>
      c.kind === "pizza"
        ? { ...c, items: c.items.filter(match) }
        : { ...c, items: c.items.filter(match) },
    ).filter((c) => c.items.length > 0);
  }, [diet, query]);

  const total = visible.reduce((n, c) => n + c.items.length, 0);
  const pizzas: Pizza[] = (visible.find((c): c is PizzaCategory => c.kind === "pizza")?.items) ?? [];
  const idx = openSlug ? pizzas.findIndex((p) => p.slug === openSlug) : -1;

  // Scroll-spy: highlight the category whose section crosses the upper part of the viewport.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-section]"));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      if (Date.now() < lockUntil.current) return;
      for (const en of entries) {
        if (en.isIntersecting) setActive(en.target.getAttribute("data-menu-section") ?? "all");
      }
    }, { rootMargin: "-25% 0px -65% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  // Keep the active tab visible in the horizontally scrolling nav (mobile).
  useEffect(() => {
    const nav = navScroller.current;
    const btn = nav?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (nav && btn) {
      nav.scrollTo({ left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2, behavior: prefersReduced() ? "auto" : "smooth" });
    }
  }, [active]);

  const go = (id: string) => {
    setActive(id);
    lockUntil.current = Date.now() + 900;
    const el = document.getElementById(id === "all" ? "menu-top" : `cat-${id}`);
    el?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  };

  const close = useCallback(() => {
    setOpenSlug(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);
  const step = useCallback((dir: -1 | 1) => {
    setOpenSlug((cur) => {
      const i = pizzas.findIndex((p) => p.slug === cur);
      if (i < 0) return cur;
      return pizzas[(i + dir + pizzas.length) % pizzas.length].slug;
    });
  }, [pizzas]);

  return (
    <div>
      <label htmlFor="menu-search" className="sr-only">Search the menu by name, number or ingredient</label>
      <input id="menu-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, number or ingredient"
        className="mb-3 min-h-[48px] w-full border border-line bg-paper px-4 text-base placeholder:text-muted focus:border-ink" />
      <div role="group" aria-label="Dietary filter" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {DIET.map((d) => (
          <button key={d.id} type="button" aria-pressed={diet === d.id} onClick={() => setDiet(d.id)}
            className={`min-h-[44px] shrink-0 border px-4 text-xs font-semibold tracking-wider transition-colors ${
              diet === d.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>
            {d.label}
          </button>
        ))}
      </div>

      <nav aria-label="Menu categories"
        className="sticky top-16 z-20 -mx-5 mt-6 border-b border-line bg-paper/95 px-5 backdrop-blur sm:top-[72px] sm:mx-0 sm:px-0">
        <div ref={navScroller} className="relative flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[{ id: "all", label: "ALL" }, ...visible.map((c) => ({ id: c.id, label: c.label }))].map((c) => (
            <a key={c.id} href={c.id === "all" ? "#menu-top" : `#cat-${c.id}`} data-nav={c.id}
              aria-current={active === c.id ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); go(c.id); }}
              className={`flex min-h-[44px] shrink-0 items-center border-b-2 px-4 text-xs font-semibold tracking-wider transition-colors ${
                active === c.id ? "border-brick text-brick" : "border-transparent hover:text-brick"}`}>
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <p className="py-4 text-sm text-muted" role="status" aria-live="polite">
        {total} {total === 1 ? "item" : "items"}
      </p>
      <div id="menu-top" className="scroll-mt-32 sm:scroll-mt-36" />

      {total === 0 ? (
        <div className="border border-line p-10 text-center">
          <p className="font-display text-2xl">Nothing matches “{query}”.</p>
          <button type="button" className="btn btn-ghost mt-5"
            onClick={() => { setQuery(""); setDiet("all"); }}>Clear search and filters</button>
        </div>
      ) : (
        visible.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} data-menu-section={c.id} aria-labelledby={`h-${c.id}`}
            className="scroll-mt-32 border-t border-ink/15 pb-14 pt-10 first:border-t-0 first:pt-2 sm:scroll-mt-36">
            <header className="mb-8 max-w-2xl">
              <h2 id={`h-${c.id}`} className="font-display text-3xl leading-tight sm:text-4xl">{c.title}</h2>
              {c.intro && <p className="mt-3 leading-relaxed text-muted">{c.intro}</p>}
              {c.note && <p className="mt-2 text-sm leading-relaxed text-muted">{c.note}</p>}
            </header>
            {c.kind === "pizza" ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {c.items.map((p, i) => (
                  <li key={p.slug} className="flex">
                    <PizzaCard pizza={p} priority={i < 3}
                      onOpen={(pz, el) => { trigger.current = el; setOpenSlug(pz.slug); }} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid gap-x-14 md:grid-cols-2">
                {c.items.map((r) => (
                  <li key={r.slug} className="border-b border-line py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl leading-snug">
                        {r.number ? <span className="mr-2 text-brick">{r.number}.</span> : null}{r.name}
                      </h3>
                      <p className="shrink-0 font-semibold">{kr(r.price)}</p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{r.ingredients}</p>
                    {r.note && <p className="mt-1 text-sm text-muted">{r.note}</p>}
                    <div className="mt-2"><Badges tags={r.tags} /></div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))
      )}

      <div className="mt-6 flex flex-col items-start gap-3 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">We take orders by phone.</p>
        <a href={SITE.phoneHref} className="btn btn-primary">CALL TO ORDER · {SITE.phoneDisplay}</a>
      </div>

      {idx >= 0 && <PizzaModal pizza={pizzas[idx]} index={idx} total={pizzas.length} onClose={close} onStep={step} />}
    </div>
  );
}
