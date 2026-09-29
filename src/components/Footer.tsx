import Link from "next/link";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Pizzeria Imperia</p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">Your shortcut to Italy — Nørre Farimagsgade, Copenhagen.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col text-sm font-semibold">
          {[["MENU", "/menu"], ["ABOUT", "/#story"], ["CONTACT", "/#contact"]].map(([l, h]) => (
            <Link key={l} href={h} className="flex min-h-[44px] items-center hover:text-paper/70">{l}</Link>))}
          <a href={SITE.phoneHref} className="flex min-h-[44px] items-center hover:text-paper/70">CALL TO ORDER</a>
        </nav>
        <address className="text-sm not-italic leading-relaxed text-paper/80">
          {SITE.street}<br />{SITE.postalCode} {SITE.city}<br />{SITE.country}<br />
          <a href={SITE.phoneHref} className="underline">{SITE.phoneDisplay}</a><br />
          <a href={SITE.smileyUrl} target="_blank" rel="noopener noreferrer" className="underline">Food safety reports (Smiley)</a>
          <br /><span className="text-paper/50">CVR {SITE.cvr}</span>
        </address>
      </div>
    </footer>
  );
}
