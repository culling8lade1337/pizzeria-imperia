import type { Pizza } from "@/data/menu";
import { Photo } from "./Photo";
import { Badges, kr } from "./Badges";

interface Props {
  pizza: Pizza;
  onOpen?: (p: Pizza, trigger: HTMLElement) => void;
  priority?: boolean;
}

export function PizzaCard({ pizza, onOpen, priority }: Props) {
  const label = pizza.number ? String(pizza.number) : pizza.name.charAt(0);
  const body = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Photo src={pizza.image} alt={`${pizza.name} pizza`} label={label} priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 text-left">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight">
            {pizza.number && <span className="mr-2 text-brick">{pizza.number}.</span>}
            {pizza.name}
          </h3>
          <p className="shrink-0 font-semibold">{kr(pizza.price)}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted">{pizza.ingredients}</p>
        <div className="mt-auto pt-1"><Badges tags={pizza.tags} /></div>
      </div>
    </>
  );
  const cls = "group flex h-full w-full flex-col border border-line bg-paper";
  if (!onOpen) return <article className={cls}>{body}</article>;
  return (
    <button type="button" onClick={(e) => onOpen(pizza, e.currentTarget)}
      aria-haspopup="dialog" aria-label={`${pizza.name}, ${kr(pizza.price)}. Open details`}
      className={`${cls} transition-colors hover:border-ink`}>
      {body}
    </button>
  );
}
