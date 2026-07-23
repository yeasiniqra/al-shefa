/**
 * Formatting helpers.
 *
 * The reference design shows prices with a "$" symbol, so that's the default.
 * AL-SHEFA is a Bangladesh pharmacy — switch the whole app to Taka by changing
 * this ONE constant to "৳" (or pass a per-product `currency`, which the API can
 * return). Nothing else needs to change.
 */
export const CURRENCY = "৳";

export function formatPrice(value, currency = CURRENCY) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return `${currency}${n.toFixed(2)}`;
}

/** Percent off, from selling price vs original (MRP). Prefer an explicit
 *  `discount` field from the API when present; this is the fallback. */
export function discountPercent(price, mrp) {
  if (!mrp || mrp <= price) return 0;
  return Math.round((1 - price / mrp) * 100);
}
