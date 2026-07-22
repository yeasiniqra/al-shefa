"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

/**
 * Renders one level of a category flyout, and recurses into itself for any
 * item that has children — this is what makes "Beauty > Skincare > Skin
 * Care Set" (3 levels) work with the exact same component as a plain
 * 2-level menu. No depth limit baked in.
 */
export default function CategoryFlyout({ items, level = 2 }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className={`category-flyout category-flyout--level-${level}`}>
      <ul className="category-flyout__list">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <li
              key={item.id}
              className="category-flyout__item"
              onMouseEnter={() => hasChildren && setActiveId(item.id)}
              onMouseLeave={() =>
                setActiveId((prev) => (prev === item.id ? null : prev))
              }
            >
              <Link
                href={`/category/${item.permalink}`}
                className="category-flyout__link"
              >
                <span className="category-flyout__icon">
                  <CategoryIcon name={item.iconImage} size={16} />
                </span>
                <span className="category-flyout__label">{item.name}</span>
                {hasChildren && (
                  <ChevronRight size={14} className="category-flyout__chevron" />
                )}
              </Link>

              {hasChildren && activeId === item.id && (
                <CategoryFlyout items={item.children} level={level + 1} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
