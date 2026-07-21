import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import { MOCK_CATEGORIES } from "@/data/categories";

/**
 * Server Component on purpose: once the categories API is ready, replace the
 * mock import below with a real fetch (e.g. `await getCategories()`), inside
 * this same component — no changes needed in MainHeader/SearchBar since they
 * just receive `categories` as a prop.
 */
export default async function Header() {
  const categories = MOCK_CATEGORIES; // TODO: await getCategories() once API is live

  return (
    <header className="site-header">
      <TopBar />
      <MainHeader categories={categories} />
    </header>
  );
}
