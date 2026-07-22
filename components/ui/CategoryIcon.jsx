import * as Icons from "lucide-react";
import Image from "next/image";

/**
 * Renders a category's `iconImage` value.
 *
 * - If it's a path/URL ("/uploads/..." or "https://...") it renders an
 *   <Image>. This is what the real API will send once category icons are
 *   uploaded as images.
 * - Otherwise it's treated as a lucide-react icon NAME (today's mock data,
 *   e.g. "Pill", "Leaf") and renders that icon glyph — an easy stand-in
 *   until real icon images exist, with zero markup changes needed later.
 * - Unknown/typo'd names fall back to a generic `Package` icon instead of
 *   crashing the page.
 */
export function CategoryIcon({ name, size = 20, className = "" }) {
  if (!name) return null;

  const isImagePath = name.startsWith("/") || name.startsWith("http");

  if (isImagePath) {
    return (
      <Image
        src={name}
        alt=""
        width={size}
        height={size}
        className={className}
      />
    );
  }

  const IconComponent = Icons[name] || Icons.Package;
  return <IconComponent size={size} className={className} aria-hidden="true" />;
}
