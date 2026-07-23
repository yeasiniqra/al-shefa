import SectionTitle from "@/components/ui/SectionTitle";
import ProductCarousel from "@/components/product/ProductCarousel";
import { CATEGORY_PRODUCTS } from "@/data/categoryProducts";

/**
 * "Shop by Category" product section — renders one titled Splide product
 * carousel per category (default 6). Distinct from the photo-tile
 * `ShopByCategory` browse section: this one shows each category's *products*.
 *
 * Dynamic + API-ready (same contract as the other home sections):
 *   - `count` categories shown (default 6).
 *   - Categories that are inactive or have no products are skipped.
 *   - If nothing remains, the section is omitted.
 *
 * Props: groups (default CATEGORY_PRODUCTS — pass the admin/API data), count.
 */
const hasProducts = (c) =>
  c && c.isActive !== false && Array.isArray(c.products) && c.products.length > 0;

export default function CategoryProducts({ groups = CATEGORY_PRODUCTS, count = 6 }) {
  const visible = (groups || []).filter(hasProducts).slice(0, Math.max(0, count));

  if (visible.length === 0) return null;

  return (
    <section className="cat-products" aria-label="Shop by category">
      <div className="container">
        {visible.map((group) => (
          <div className="cat-products__row" key={group.id}>
            <SectionTitle title={group.title} />
            <ProductCarousel
              products={group.products}
              ariaLabel={`${group.title} products`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
