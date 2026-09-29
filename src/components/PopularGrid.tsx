"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import type { Pizza } from "@/data/menu";
import { PizzaCard } from "./PizzaCard";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Cfg { cols: number; dist: number }

// Grid columns match the Tailwind grid (1 / 2 at sm / 3 at lg); distance shrinks on small screens.
function measure(): Cfg {
  const w = window.innerWidth;
  if (w >= 1024) return { cols: 3, dist: 150 };
  if (w >= 640) return { cols: 2, dist: 100 };
  return { cols: 1, dist: 48 };
}

export function PopularGrid({ pizzas }: { pizzas: Pizza[] }) {
  const reduce = useReducedMotion();
  const [cfg, setCfg] = useState<Cfg | null>(null);

  // Runs before paint after hydration, so there is no visible flash before the animated version mounts.
  useIsoLayoutEffect(() => {
    if (reduce) { setCfg(null); return; }
    const update = () => setCfg((prev) => {
      const next = measure();
      return prev && prev.cols === next.cols && prev.dist === next.dist ? prev : next;
    });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reduce]);

  return (
    <ul key={cfg ? "anim" : "static"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pizzas.map((p, i) => {
        if (!cfg) return <li key={p.slug} className="flex"><PizzaCard pizza={p} /></li>;
        const dir = i % 2 === 0 ? -1 : 1; // 1st from the left, 2nd from the right, ...
        return (
          <motion.li key={p.slug} className="flex"
            initial={{ opacity: 0, x: dir * cfg.dist, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % cfg.cols) * 0.12 }}>
            <PizzaCard pizza={p} />
          </motion.li>
        );
      })}
    </ul>
  );
}
