import SectionTitle from "@/components/ui/SectionTitle";
import OfferCard from "./OfferCard";
import { OFFERS } from "@/data/offers";

/**
 * Dynamic offer row from the admin panel.
 *   - `count` boxes shown; default 4, hard-capped at 6.
 *   - Boxes with no content (no title/label) or isActive === false are dropped.
 *   - If nothing remains, the whole section is omitted.
 *
 * Props: title (default "Especially For You"), items (admin data; default OFFERS), count (default 4, max 6)
 */
const MAX_BOXES = 6;
const DEFAULT_BOXES = 6;

const hasContent = (o) => o && o.isActive !== false && (o.title || o.label);

export default function EspeciallyForYou({
  title = "Especially For You",
  items = OFFERS,
  count = DEFAULT_BOXES,
}) {
  const limit = Math.max(0, Math.min(Number(count) || DEFAULT_BOXES, MAX_BOXES));
  const visible = (items || []).filter(hasContent).slice(0, limit);

  if (visible.length === 0) return null;

  return (
    <section className="efy" aria-label={title}>
      <div className="container">
        <SectionTitle title={title} />
        <div className="efy__grid" style={{ "--efy-cols": visible.length }}>
          {visible.map((item) => (
            <OfferCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}