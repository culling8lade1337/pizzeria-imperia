"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src?: string; alt: string; label: string; sizes: string;
  priority?: boolean; className?: string;
}

/** next/image with an editorial "plate" fallback until real photography is added. */
export function Photo({ src, alt, label, sizes, priority, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={`${alt} (photo coming soon)`}
        className={`flex items-center justify-center bg-cream ${className}`}>
        <span className="flex aspect-square w-3/5 max-w-[240px] items-center justify-center rounded-full border border-line bg-paper">
          <span className="font-display text-5xl text-brick/80">{label}</span>
        </span>
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority}
      onError={() => setFailed(true)} className={`object-cover ${className}`} />
  );
}
