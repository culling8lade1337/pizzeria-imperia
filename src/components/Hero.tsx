"use client";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Photo } from "./Photo";
import { SITE } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);

  return (
    <section ref={ref} className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }} className="order-2 lg:order-1">
        <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
          A little taste of Italy in the heart of Copenhagen.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Handcrafted pizzas, fresh ingredients and honest prices — made for Copenhagen.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/menu" className="btn btn-primary">VIEW MENU</Link>
          <a href={SITE.phoneHref} className="btn btn-ghost">CALL TO ORDER</a>
        </div>
      </motion.div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden bg-cream lg:order-2 lg:aspect-[5/6]">
        <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
          <Photo src="/images/hero.jpg" alt="A freshly baked pizza from Pizzeria Imperia" label="I" priority
            sizes="(min-width:1024px) 45vw, 100vw" />
        </motion.div>
        {/* Text sits outside the parallax layer: image itself is untouched */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/90 [text-shadow:0_1px_8px_rgba(0,0,0,.5)]">
            Pizzeria Imperia
          </p>
          <p lang="it" className="mt-1 font-display text-[1.7rem] italic leading-tight text-paper [text-shadow:0_1px_14px_rgba(0,0,0,.55)] sm:text-4xl">
            La tua strada per l&apos;Italia
          </p>
        </div>
      </div>
    </section>
  );
}
