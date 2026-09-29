import Link from "next/link";
import { HOURS, LUNCH, SITE } from "@/data/site";
import { LUNCH_ITEMS, POPULAR } from "@/data/menu";
import { PopularGrid } from "./PopularGrid";
import { kr } from "./Badges";

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";
const h2 = "font-display text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]";

export function Popular() {
  return (
    <div className="overflow-x-clip">
      <section className={`${wrap} py-16 sm:py-24`} aria-labelledby="popular-h">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="popular-h" className={h2}>Our most-ordered pizzas</h2>
          <Link href="/menu" className="hidden min-h-[44px] items-center font-semibold text-brick underline-offset-4 hover:underline sm:flex">See full menu</Link>
        </div>
        <PopularGrid pizzas={POPULAR.slice(0, 6)} />
      </section>
    </div>
  );
}

export function MenuTeaser() {
  return (
    <section className="bg-cream py-16 sm:py-24" aria-labelledby="teaser-h">
      <div className={`${wrap} grid gap-8 md:grid-cols-2 md:items-center`}>
        <h2 id="teaser-h" className={`${h2} max-w-xl`}>Stop reading what’s inside. See what you’re ordering.</h2>
        <div>
          <p className="max-w-md leading-relaxed text-muted">
            The whole menu — pizzas, calzone and lunch — in one visual overview. Filter by vegetarian, vegan, spicy or white base, or search by ingredient.
          </p>
          <Link href="/menu" className="btn btn-primary mt-6">EXPLORE THE MENU</Link>
        </div>
      </div>
    </section>
  );
}

export function Lunch() {
  return (
    <section className={`${wrap} py-16 sm:py-24`} aria-labelledby="lunch-h">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="lunch-h" className={h2}>Lunch for {LUNCH.price} kr.</h2>
          <p className="mt-4 max-w-md text-muted">{LUNCH.note}</p>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {LUNCH_ITEMS.map((p) => (
            <li key={p.slug} className="flex items-baseline justify-between gap-4 py-3">
              <span><span className="font-semibold">{p.number ? `${p.number}. ` : ""}{p.name}</span>
                <span className="ml-2 text-sm text-muted">{p.ingredients}</span></span>
              <span className="shrink-0 font-semibold">
                {kr(p.category === "pizza" ? LUNCH.price : p.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Loyalty() {
  return (
    <section className="border-y border-line bg-cream py-16 sm:py-24" aria-labelledby="loyalty-h">
      <div className={wrap}>
        <div className="mx-auto max-w-5xl border-2 border-dashed border-ink/35 bg-paper p-6 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div aria-hidden="true" className="mx-auto flex h-40 w-40 -rotate-6 items-center justify-center rounded-full border-4 border-brick text-brick sm:h-44 sm:w-44">
              <div className="flex h-[86%] w-[86%] flex-col items-center justify-center rounded-full border border-brick">
                <span className="font-display text-7xl leading-none sm:text-8xl">10</span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.25em]">PIZZAS</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brick">Loyalty stamp card</p>
              <h2 id="loyalty-h" className={`${h2} mt-2`}>Every 10th pizza is free.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Regulars collect stamps on a coupon that stays in the shop, so there’s no card to carry. It’s stamped when you pick up your food.
              </p>
            </div>
          </div>
          <ol className="mt-10 grid grid-cols-5 gap-3 sm:grid-cols-10" aria-label="Stamp card: ten pizzas, the tenth is free">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <li key={n} className={`flex aspect-square items-center justify-center rounded-full border text-sm ${
                n === 10 ? "border-brick bg-brick text-[11px] font-bold tracking-wider text-paper" : "border-ink/35 font-display text-base text-ink/70"}`}>
                {n === 10 ? "FREE" : n}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 shrink-0 text-ochre" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function LargeOrders() {
  return (
    <section className="bg-olive text-paper" aria-labelledby="large-h">
      <div className={`${wrap} flex flex-col gap-7 py-10 md:flex-row md:items-center md:justify-between md:py-12`}>
        <div className="flex items-start gap-5">
          <div className="mt-1"><PhoneIcon /></div>
          <div>
            <p className="inline-block border border-paper/50 px-2 py-0.5 text-xs font-bold tracking-widest">10+ PIZZAS</p>
            <h2 id="large-h" className="mt-3 font-display text-2xl leading-snug sm:text-3xl">Large order? Call at least 24 hours ahead.</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/80">
              We’re a small pizzeria and happy to take large orders when agreed in advance — it keeps quality high for you and everyone else in the shop.
            </p>
          </div>
        </div>
        <a href={SITE.phoneHref} className="btn !min-h-[56px] shrink-0 bg-paper text-base text-ink hover:bg-cream">CALL {SITE.phoneDisplay}</a>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="story" className="bg-cream py-16 sm:py-24" aria-labelledby="story-h">
      <div className={`${wrap} grid gap-10 md:grid-cols-2 md:items-center`}>
        <h2 id="story-h" className={h2}>A slice of northern Italy, ten years on.</h2>
        <div className="space-y-5 leading-relaxed text-muted">
          <p>Good food shouldn’t cost a fortune. For ten years we’ve cooked with high-quality ingredients, changing a supplier only when we found something better.</p>
          <p>The dough is made with Italian flour for a crisp base and a light, airy crust — and you can take it home to bake your own pizza.</p>
          <p>Have a question or a special request? Call us — you’re always welcome to ask.</p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className={`${wrap} py-16 sm:py-24`} aria-labelledby="contact-h">
      <h2 id="contact-h" className={`${h2} mb-10`}>Visit or call</h2>
      <div className="grid gap-10 md:grid-cols-2">
        <address className="not-italic leading-relaxed">
          <p className="text-xl">{SITE.street}<br />{SITE.postalCode} {SITE.city}<br />{SITE.country}</p>
          <p className="mt-4"><a href={SITE.phoneHref} className="text-xl font-semibold text-brick underline-offset-4 hover:underline">{SITE.phoneDisplay}</a></p>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">OPEN IN MAPS</a>
        </address>
        <table className="w-full max-w-md text-left">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {HOURS.map((h) => (
              <tr key={h.day} className="border-b border-line">
                <th scope="row" className="py-3 font-normal">{h.day}</th>
                <td className="py-3 text-right font-semibold">{h.open ? `${h.open}–${h.close}` : "Closed"}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
