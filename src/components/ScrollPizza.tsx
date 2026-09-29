"use client";
import { useEffect, useRef, useState } from "react";

const DEG_PER_PX = 1.8; // ~200px of drag ≈ 360°
const TOUCH_THRESHOLD = 6; // px of intentional movement before a touch takes over

/**
 * A small pizza that doubles as a scroll handle. Enhancement only: wheel, touch,
 * keyboard and native scrollbars keep working exactly as before.
 */
export function ScrollPizza() {
  const disc = useRef<HTMLDivElement>(null);
  const st = useRef({ id: -1, startY: 0, lastY: 0, engaged: false, angle: 0, pending: 0, raf: 0, k: 4 });
  const [active, setActive] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const paint = () => {
    if (disc.current) disc.current.style.transform = `rotate(${st.current.angle}deg)`;
  };

  const flush = () => {
    const s = st.current;
    s.raf = 0;
    if (s.pending) {
      window.scrollBy({ top: s.pending, behavior: "instant" });
      s.pending = 0;
    }
    paint();
  };

  const schedule = () => {
    if (!st.current.raf) st.current.raf = requestAnimationFrame(flush);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = st.current;
    s.id = e.pointerId;
    s.startY = s.lastY = e.clientY;
    s.engaged = e.pointerType === "mouse";
    // Map a comfortable drag range to the whole page, like a scrollbar thumb.
    const max = document.documentElement.scrollHeight - window.innerHeight;
    s.k = Math.min(10, Math.max(2.5, max / (window.innerHeight * 0.7)));
    setActive(true);
    setHinted(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = st.current;
    if (e.pointerId !== s.id) return;
    if (!s.engaged) {
      if (Math.abs(e.clientY - s.startY) < TOUCH_THRESHOLD) return;
      s.engaged = true;
      s.lastY = e.clientY;
      return;
    }
    const dy = e.clientY - s.lastY;
    s.lastY = e.clientY;
    s.pending += dy * s.k;
    if (!reduced) s.angle += dy * DEG_PER_PX;
    schedule();
  };

  const release = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = st.current;
    if (e.pointerId !== s.id) return;
    s.id = -1;
    s.engaged = false;
    setActive(false);
    flush();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    window.scrollBy({ top: dir * 120, behavior: reduced ? "auto" : "smooth" });
    if (!reduced) { st.current.angle += dir * 45; paint(); }
  };

  useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

  return (
    <button type="button" aria-label="Drag to scroll"
      onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={release} onPointerCancel={release} onKeyDown={onKeyDown}
      className={`fixed right-4 top-1/2 z-40 h-12 w-12 -translate-y-1/2 cursor-grab touch-none select-none rounded-full transition-opacity active:cursor-grabbing sm:right-6 sm:h-14 sm:w-14 lg:right-8 ${
        active ? "opacity-100" : "opacity-80 hover:opacity-100 focus-visible:opacity-100"}`}>
      <span aria-hidden="true" className={`block h-full w-full transition-transform duration-150 ${active && !reduced ? "scale-105" : ""}`}>
        <span ref={disc} className="block h-full w-full will-change-transform" style={{ transformOrigin: "center" }}>
          <svg viewBox="0 0 64 64" className="h-full w-full">
            <circle cx="32" cy="32" r="30" fill="#C9963A" />
            <circle cx="32" cy="32" r="25.5" fill="#9A3A22" />
            <circle cx="32" cy="32" r="23" fill="#F1DEA7" />
            <g stroke="#9A3A22" strokeOpacity=".4" strokeWidth="1">
              <line x1="32" y1="9" x2="32" y2="55" />
              <line x1="12" y1="20.5" x2="52" y2="43.5" />
              <line x1="12" y1="43.5" x2="52" y2="20.5" />
            </g>
            <g fill="#9A3A22">
              <circle cx="22" cy="24" r="3.2" /><circle cx="42" cy="22" r="3.2" />
              <circle cx="45" cy="39" r="3.2" /><circle cx="27" cy="45" r="3.2" />
              <circle cx="33" cy="33" r="3.2" />
            </g>
          </svg>
        </span>
      </span>
      {!hinted && (
        <>
          <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute -top-3 left-1/2 h-2 w-3 -translate-x-1/2 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7l5-5 5 5" /></svg>
          <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute -bottom-3 left-1/2 h-2 w-3 -translate-x-1/2 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l5 5 5-5" /></svg>
        </>
      )}
    </button>
  );
}
