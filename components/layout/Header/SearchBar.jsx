"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typed from "typed.js";
import { ChevronDown, Search } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function SearchBar({
  categories = [],
  placeholderStrings = [
    "Search for medicine...",
    "Search for Napa Extra...",
    "Search for Vitamin C...",
    "Search for baby products...",
    "Search for health devices...",
  ],
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(categories[0] || null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const typed = new Typed(inputRef.current, {
      strings: placeholderStrings,
      attr: "placeholder",
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      bindInputFocusEvents: true,
      smartBackspace: true,
    });

    return () => typed.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selected?.permalink) params.set("category", selected.permalink);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit} role="search">
      <div className="searchbar__category" ref={dropdownRef}>
        <button
          type="button"
          className="searchbar__category-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selected?.name || "All Categories"}</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <ul className="searchbar__dropdown" role="listbox">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  className="searchbar__dropdown-item"
                  onClick={() => {
                    setSelected(cat);
                    setIsOpen(false);
                  }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="searchbar__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search for medicine, products"
      />

      <button type="submit" className="searchbar__submit" aria-label="Search">
        <Search size={20} />
      </button>
    </form>
  );
}