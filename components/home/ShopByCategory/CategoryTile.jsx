import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

/**
 * One category tile. The whole card is a single Link (like OfferCard) — no
 * nested <a>, "View All" is a styled span, not a separate anchor.
 */
export default function CategoryTile({ item }) {
  return (
    <Link href={`/category/${item.permalink}`} className="sbc-tile">
      <span className="sbc-tile__image-wrap">
        {item.largeImage ? (
          // Local placeholder illustration today; swap for real product
          // photography later — same field, same markup, no code change.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.largeImage} alt="" className="sbc-tile__image" />
        ) : (
          <span className="sbc-tile__icon-fallback">
            <CategoryIcon name={item.iconImage} size={32} />
          </span>
        )}
      </span>

      <span className="sbc-tile__name">{item.name}</span>
      <span className="sbc-tile__viewall">View All</span>
    </Link>
  );
}
