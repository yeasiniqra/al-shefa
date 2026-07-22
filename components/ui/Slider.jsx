"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";

import "@splidejs/splide/css";

/**
 * Reusable slider — the Al-Shefa equivalent of Lazz Pharma's
 * `components/utilities/Slider.jsx`. Same contract ({ options, data, Template }),
 * but built on the VANILLA `@splidejs/splide` core instead of
 * `@splidejs/react-splide`, because the React wrapper doesn't support React 19.
 *
 * Splide is mounted imperatively on server-rendered markup (the same technique
 * as CategorySliderDesktop), so it works with SSR and needs no React-19-only
 * wrapper. Splide `options` objects from Lazz port over unchanged.
 *
 * Props:
 *   options    - Splide options object (loop, autoplay, gap, breakpoints, …)
 *   data       - array of items; each should have a stable `id`
 *   renderItem - (item, index) => ReactNode, rendered inside each slide
 *   className  - extra class on the .splide root
 *   ariaLabel  - accessible label for the carousel
 */
function Carousel({ options, data, renderItem, className, ariaLabel }) {
  const rootRef = useRef(null);

  // Mount once for this data set. When `data` changes, the parent gives this
  // component a new `key`, so React unmounts (destroying Splide on intact DOM)
  // and remounts fresh — avoiding any clash between Splide's loop clones and
  // React's reconciliation.
  useEffect(() => {
    if (!rootRef.current) return undefined;
    const splide = new Splide(rootRef.current, options);
    splide.mount();
    return () => splide.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`splide${className ? ` ${className}` : ""}`}
      ref={rootRef}
      aria-label={ariaLabel}
    >
      <div className="splide__track">
        <ul className="splide__list">
          {data.map((item, index) => (
            <li className="splide__slide" key={item.id ?? index}>
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Slider({
  options = {},
  data = [],
  renderItem,
  className = "",
  ariaLabel,
}) {
  if (!data || data.length === 0) return null;

  // Remount the carousel when the slide set changes (see Carousel note above).
  const key = data.map((d, i) => d.id ?? i).join("|");

  return (
    <Carousel
      key={key}
      options={options}
      data={data}
      renderItem={renderItem}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
}
