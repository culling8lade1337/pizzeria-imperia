import { TAG_LABEL, type Tag } from "@/data/menu";

const SHOWN: Tag[] = ["vegan", "vegetarian", "spicy", "extra-spicy", "lactose-free", "dairy-free", "white-base"];

export function Badges({ tags }: { tags: Tag[] }) {
  const list = tags.filter((t) => SHOWN.includes(t));
  if (!list.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Dietary information">
      {list.map((t) => (
        <li key={t} className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
          t.includes("spicy") ? "border-brick text-brick" : "border-line text-muted"}`}>
          {TAG_LABEL[t]}
        </li>
      ))}
    </ul>
  );
}

export const kr = (n: number) => `${n} kr.`;
