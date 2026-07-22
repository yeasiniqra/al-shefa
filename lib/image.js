import { CONFIG } from "./config";

/**
 * Image helpers — ported from Lazz Pharma's `Service/imageResolver.js` and
 * `shared/image.util.js`, adapted for Al-Shefa.
 */

export const IMAGE_SIZE = {
  SMALL: "Small",
  ICON: "Icons",
  ORIGINAL: "Orginal", // (API's spelling — kept intentionally)
};

export const IMAGE_OF = {
  BANNER: "Banner",
  PRODUCT: "Product",
  SLIDER: "Slider",
  GALLERY: "Gallery",
  OFFER: "Offer",
};

/**
 * Resolve an image reference to a usable `src`.
 * - A local path ("/images/...") or absolute URL ("http…") is returned as-is,
 *   so today's local/mock assets work with zero config.
 * - A bare filename (what the real API will send) is resolved against the
 *   image server, exactly like Lazz's `imageURL`:
 *     {IMAGE_URL}/Content/ImageData/{imageOf}/{size}/{name}
 */
export function imageURL(name, imageOf = IMAGE_OF.BANNER, size = IMAGE_SIZE.ORIGINAL) {
  if (!name) return "";
  if (name.startsWith("/") || name.startsWith("http")) return name;
  return `${CONFIG.IMAGE_URL}/Content/ImageData/${imageOf}/${size}/${name}`;
}

/**
 * Viewport-based banner filtering — ported from Lazz Pharma's
 * `filterImagesByViewPort`. Each image carries a `viewport` tag
 * ("large" | "medium" | "small"); we return only the set matching the current
 * screen width, with graceful fallback so a banner is always shown:
 *   >= 764px            -> large
 *   400–763px           -> medium (falls back to large)
 *   < 400px             -> small  (falls back to medium -> large)
 *
 * Pass an explicit `width` for SSR/deterministic first render; it defaults to
 * `window.innerWidth` on the client and a desktop width on the server.
 */
const RANGE = { LARGE: 764, MEDIUM: 400 };

const pick = (images, viewport) =>
  images.filter((b) => (b.viewport || "large").toLowerCase() === viewport);

export function filterImagesByViewPort(images = [], width) {
  const w =
    typeof width === "number"
      ? width
      : typeof window !== "undefined"
      ? window.innerWidth
      : 1280;

  let out = [];
  if (w >= RANGE.LARGE) {
    out = pick(images, "large");
  } else if (w >= RANGE.MEDIUM) {
    out = pick(images, "medium");
    if (!out.length) out = pick(images, "large");
  } else {
    out = pick(images, "small");
    if (!out.length) out = pick(images, "medium");
    if (!out.length) out = pick(images, "large");
  }

  return out.length ? out : images;
}
