import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

/**
 * Mobile shows ONLY top-level categories, each linking straight to that
 * category's product listing — no hover/flyout, no subcategories. Tapping
 * "Medicine" goes directly to /category/medicine and shows its products.
 */
export default function CategoryGridMobile({ categories = [] }) {
  const tiles = categories.filter((cat) => cat.permalink); // skip "Home" tab

  return (
    <div className="category-nav__mobile">
      <ul className="category-grid">
        {tiles.map((cat) => (
          <li key={cat.id} className="category-grid__item">
            <Link href={`/category/${cat.permalink}`} className="category-grid__link">
              <span className="category-grid__icon">
                <CategoryIcon name={cat.iconImage} size={20} />
              </span>
              <span className="category-grid__label">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
