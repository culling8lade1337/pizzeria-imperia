import Link from "next/link";
import { SITE } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:bg-paper focus:p-3">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" aria-label="Pizzeria Imperia, home" className="block shrink-0">
          <span className="block border border-ink/70 p-[3px]">
            <span className="plaque-grain block border border-ink/25 bg-cream px-3 py-1 text-center sm:px-4 sm:py-1.5">
              <span className="block font-display text-[1.05rem] leading-none tracking-wide sm:text-xl">Pizzeria Imperia</span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.3em] text-muted sm:block">København</span>
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-semibold sm:gap-4">
          <Link href="/menu" className="flex min-h-[44px] items-center px-3 hover:text-brick">MENU</Link>
          <Link href="/#story" className="hidden min-h-[44px] items-center px-3 hover:text-brick sm:flex">ABOUT</Link>
          <Link href="/#contact" className="hidden min-h-[44px] items-center px-3 hover:text-brick sm:flex">CONTACT</Link>
          <a href={SITE.phoneHref} aria-label="Call to order" className="btn btn-primary !min-h-[44px] !px-4">
            <span className="sm:hidden">CALL</span><span className="hidden sm:inline">CALL TO ORDER</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
