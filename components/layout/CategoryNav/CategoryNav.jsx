import CategorySliderDesktop from "./CategorySliderDesktop";
import CategoryGridMobile from "./CategoryGridMobile";
import { MOCK_NAV_CATEGORIES } from "@/data/navCategories";

/**
 * Server Component on purpose — same pattern as Header/index.jsx. Once the
 * categories API is ready, replace the mock import below with a real fetch
 * (e.g. `await getNavCategories()`) right here; CategorySliderDesktop and
 * CategoryGridMobile just receive `categories` as a prop and never change.
 *
 * Both the desktop slider and mobile grid render from the SAME data — CSS
 * (not JS branching) decides which one is visible at a given screen size,
 * so there's no hydration mismatch and no duplicate fetching.
 */
export default async function CategoryNav() {
  const categories = MOCK_NAV_CATEGORIES; // TODO: await getNavCategories() once API is live

  return (
    <nav className="category-nav" aria-label="Product categories">
      <CategorySliderDesktop categories={categories} />
      <CategoryGridMobile categories={categories} />
    </nav>
  );
}
