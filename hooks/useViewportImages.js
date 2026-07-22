"use client";

import { useEffect, useState } from "react";
import { filterImagesByViewPort } from "@/lib/image";

/**
 * Returns the subset of `images` whose `viewport` tag matches the current
 * screen (see lib/image.js `filterImagesByViewPort`). SSR-safe: it starts from
 * a deterministic desktop width (so server render and the first client render
 * agree — no hydration mismatch), then refines on mount and on every resize.
 *
 * This is the Al-Shefa equivalent of the `window.innerWidth` responsive image
 * switch that Lazz Pharma runs in `Banner.jsx`.
 */
export function useViewportImages(images) {
  const [filtered, setFiltered] = useState(() =>
    filterImagesByViewPort(images, 1280)
  );

  useEffect(() => {
    const apply = () =>
      setFiltered(filterImagesByViewPort(images, window.innerWidth));

    apply(); // correct to the real viewport now that we're on the client
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [images]);

  return filtered;
}
