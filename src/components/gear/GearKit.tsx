import Link from "next/link";
import { gearForEquipment, gearUrl } from "@/data/gear";
import type { Equipment } from "@/lib/types";

/**
 * "The kit" - quiet affiliate module shown only when a movement or routine
 * actually needs equipment. Styled like the rest of the cards; clearly
 * disclosed, never banner-like.
 */
export default function GearKit({ equipment }: { equipment: Equipment[] }) {
  const items = gearForEquipment(equipment);
  if (items.length === 0) return null;

  return (
    <section className="card p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">
          The kit
        </h2>
        <Link
          href="/gear"
          className="text-xs text-muted transition-colors hover:text-gold"
        >
          All gear →
        </Link>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={gearUrl(item)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group block"
            >
              <p className="text-sm font-semibold text-cream transition-colors group-hover:text-gold">
                {item.name} ↗
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                {item.why}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-edge pt-3 text-[11px] leading-relaxed text-muted">
        Affiliate links - buying through them supports TempleFit at no extra
        cost to you.{" "}
        <Link href="/disclosure" className="underline hover:text-gold">
          How this works
        </Link>
      </p>
    </section>
  );
}
