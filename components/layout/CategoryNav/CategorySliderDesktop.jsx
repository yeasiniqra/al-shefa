"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Splide from "@splidejs/splide";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryFlyout from "./CategoryFlyout";

import "@splidejs/splide/css/core";

/**
 * Desktop category bar.
 *
 * SLIDER — vanilla Splide (the project's standard slider), mounted on the
 * server-rendered markup inside an effect. We hide Splide's built-in arrows
 * (`arrows: false`) and drive our own prev/next buttons so they keep the
 * site's styling and the begin/end auto-hide behaviour.
 *
 * FLYOUT — the hover mega-menu is rendered OUTSIDE the Splide track, as a
 * sibling of the slider, and positioned under the hovered item. A slider
 * clips its track (`overflow: hidden`) to hide off-screen slides; if the
 * flyout lived inside a slide it would be clipped by that same overflow —
 * which is the dropdown-cut-off bug. Rendering it outside the track lets it
 * drop below the bar (and its sub-levels fan out) with nothing clipping it.
 */
export default function CategorySliderDesktop({ categories = [] }) {
  const rootRef = useRef(null); // the .splide element Splide enhances
  const sliderRef = useRef(null); // positioning context for the flyout
  const splideRef = useRef(null); // the live Splide instance
  const closeTimer = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [flyout, setFlyout] = useState(null); // { id, items, left }

  // ---- Mount Splide on the rendered markup ----
  useEffect(() => {
    if (!rootRef.current) return undefined;

    const splide = new Splide(rootRef.current, {
      autoWidth: true, // each slide sizes to its label (a tag list, not cards)
      gap: "30px",
      arrows: false, // we render our own styled arrows
      pagination: false,
      drag: true,
      speed: 400,
    });

    const syncArrows = () => {
      const end = splide.Components.Controller.getEnd();
      setIsBeginning(splide.index <= 0);
      setIsEnd(splide.index >= end);
    };

    splide.on("mounted move updated resized", syncArrows);
    splide.mount();
    splideRef.current = splide;

    return () => {
      splide.destroy();
      splideRef.current = null;
    };
  }, [categories]);

  const goPrev = () => splideRef.current?.go("<");
  const goNext = () => splideRef.current?.go(">");

  // ---- Flyout open/close (hover intent) ----
  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openFlyout = useCallback(
    (cat, itemEl) => {
      clearCloseTimer();
      if (!sliderRef.current || !itemEl) return;
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      const left = Math.max(0, itemRect.left - sliderRect.left);
      setFlyout({ id: cat.id, items: cat.children, left });
    },
    [clearCloseTimer]
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setFlyout(null), 120);
  }, [clearCloseTimer]);

  // Clean up a pending timer if the component unmounts mid-hover.
  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return (
    <div className="category-nav__desktop">
      <div className="container category-slider" ref={sliderRef}>
        <button
          type="button"
          onClick={goPrev}
          className={`category-slider__arrow category-slider__arrow--left${
            isBeginning ? " is-hidden" : ""
          }`}
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="splide category-slider__splide" ref={rootRef}>
          <div className="splide__track">
            <ul className="splide__list">
              {categories.map((cat) => {
                const hasChildren = cat.children && cat.children.length > 0;
                return (
                  <li
                    key={cat.id}
                    className="splide__slide category-slider__item"
                    onMouseEnter={(e) =>
                      hasChildren
                        ? openFlyout(cat, e.currentTarget)
                        : scheduleClose()
                    }
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={cat.permalink ? `/category/${cat.permalink}` : "/"}
                      className={`category-slider__link${
                        flyout?.id === cat.id ? " is-active" : ""
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}

              <li className="splide__slide category-slider__item category-slider__item--viewall">
                <Link href="/categories" className="category-slider__viewall">
                  View All
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          className={`category-slider__arrow category-slider__arrow--right${
            isEnd ? " is-hidden" : ""
          }`}
          aria-label="Scroll categories right"
        >
          <ChevronRight size={18} />
        </button>

        {flyout && (
          <div
            className="category-flyout-portal"
            style={{ left: `${flyout.left}px` }}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <CategoryFlyout items={flyout.items} />
          </div>
        )}
      </div>
    </div>
  );
}
