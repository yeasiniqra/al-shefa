import SectionTitle from "@/components/ui/SectionTitle";
import CategoryTile from "./CategoryTile";
import { SHOP_BY_CATEGORY } from "@/data/shopByCategory";

/**
 * "Shop By Category" homepage row (matches the reference design: photo tile
 * + name + "View All" per category). Same dynamic contract as
 * EspeciallyForYou: admin-curated `items`, inactive/empty tiles dropped,
 * whole section hidden if nothing remains.
 *
 * Props: title (default "Shop By Category"), items (default SHOP_BY_CATEGORY), count (default 8, max 12)
 */
const MAX_TILES = 12;
const DEFAULT_TILES = 8;

const hasContent = (c) => c && c.isActive !== false && c.name && (c.largeImage || c.iconImage);

export default function ShopByCategory({
  title = "Shop By Category",
  items = SHOP_BY_CATEGORY,
  count = DEFAULT_TILES,
}) {
  const limit = Math.max(0, Math.min(Number(count) || DEFAULT_TILES, MAX_TILES));
  const visible = (items || []).filter(hasContent).slice(0, limit);

  if (visible.length === 0) return null;

  return (
    <section className="sbc" aria-label={title}>
      <div className="container">
        <SectionTitle title={title} />
        <div className="sbc__grid" style={{ "--sbc-cols": visible.length }}>
          {visible.map((item) => (
            <CategoryTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
