"use client";
import { useEffect, useRef } from "react";
import type { Pizza } from "@/data/menu";
import { SITE } from "@/data/site";
import { Photo } from "./Photo";
import { Badges, kr } from "./Badges";

interface Props {
  pizza: Pizza; index: number; total: number;
  onClose: () => void; onStep: (dir: -1 | 1) => void;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';

export function PizzaModal({ pizza, index, total, onClose, onStep }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll lock + initial focus (return focus is handled by the parent).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "Tab" && ref.current) {
        const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const label = pizza.number ? String(pizza.number) : pizza.name.charAt(0);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 sm:items-center sm:p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="pizza-title"
        className="relative grid max-h-[100dvh] w-full max-w-5xl overflow-y-auto bg-paper sm:max-h-[90dvh] md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
          <Photo src={pizza.image} alt={`${pizza.name} pizza`} label={label} priority
            sizes="(min-width:768px) 512px, 100vw" />
        </div>
        <div className="flex flex-col gap-5 p-6 sm:p-10">
          <button data-close type="button" onClick={onClose} aria-label="Close details"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-paper/90 text-xl hover:bg-cream">
            <span aria-hidden>×</span>
          </button>
          <p className="text-sm text-muted">
            {pizza.number ? `No. ${pizza.number}` : "Lunch menu"}
          </p>
          <h2 id="pizza-title" className="font-display text-4xl leading-tight sm:text-5xl">{pizza.name}</h2>
          <p className="leading-relaxed text-muted">{pizza.ingredients}</p>
          {pizza.note && <p className="text-sm text-muted">{pizza.note}</p>}
          <Badges tags={pizza.tags} />
          <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5">
            <div><dt className="text-sm text-muted">{pizza.bigPrice ? "Normal" : "Price"}</dt>
              <dd className="text-2xl font-semibold">{kr(pizza.price)}</dd></div>
            {pizza.bigPrice && (
              <div><dt className="text-sm text-muted">{pizza.bigLabel}</dt>
                <dd className="text-2xl font-semibold">{kr(pizza.bigPrice)}</dd></div>)}
          </dl>
          {pizza.tags.includes("lunch") && (
            <p className="text-sm">Lunch price applies on weekdays 11:30–15:30 (see menu note).</p>)}
          <a href={SITE.phoneHref} className="btn btn-primary mt-auto">CALL TO ORDER · {SITE.phoneDisplay}</a>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous pizza"
              className="min-h-[44px] px-3 text-sm font-semibold hover:text-brick">← Previous</button>
            <span className="text-sm text-muted" aria-live="polite">{index + 1} of {total}</span>
            <button type="button" onClick={() => onStep(1)} aria-label="Next pizza"
              className="min-h-[44px] px-3 text-sm font-semibold hover:text-brick">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
