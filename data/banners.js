/**
 * Home banner slider data — shaped like the future categories/banner API so
 * swapping to a real fetch later needs no remapping (same approach as
 * data/navCategories.js).
 *
 * Each banner:
 *   id       - stable key
 *   image    - local path now ("/images/banners/..."); a bare filename later,
 *              which lib/image.js `imageURL` resolves against the image server.
 *   viewport - "large" (desktop) | "medium" (tablet) | "small" (mobile).
 *              Ported from Lazz Pharma: the slider shows only the images whose
 *              viewport matches the current screen, with graceful fallback.
 *              All three below are tagged "large" (the supplied art is desktop
 *              width); add "small"/"medium" entries later for mobile-specific
 *              banners and they'll be picked automatically on smaller screens.
 *   link     - internal route ("/category/..."), a "tel:" number, or "" (none)
 *   alt      - accessible alt text
 */
export const BANNERS = [
  {
    id: "banner-1",
    image: "/images/banners/banner-1.png",
    viewport: "large",
    link: "/about",
    alt: "Welcome to AL-SHEFA — Medicines, Cosmetics & Surgery Items, all in one place",
  },
  {
    id: "banner-2",
    image: "/images/banners/banner-2.png",
    viewport: "large",
    link: "",
    alt: "AL-SHEFA — Your Health, Our Priority",
  },
  {
    id: "banner-3",
    image: "/images/banners/mobile1.png",
    viewport: "medium",
    link: "",
    alt: "AL-SHEFA — Medicines, Cosmetics & Surgery Items",
  },
];
