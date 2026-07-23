/**
 * "Shop by Category" product carousels — mock data shaped like the future API
 * so backend integration needs no UI refactor (same approach as the other
 * data/* files).
 *
 * Response shape (per category group):
 *   { id, title, permalink, isActive, products: Product[] }
 *
 * Product shape (what a product endpoint will return, normalised):
 *   id            - stable id / SKU
 *   name          - product name           ("Paracetamol 650mg")
 *   subtitle      - form / pack size line   ("Tablet", "Skin Cleanser 125ml")
 *   slug          - product-detail permalink -> /product/[slug]
 *   image         - image path/URL (local placeholder now; API URL later)
 *   price         - selling price (number)
 *   mrp           - original price, struck through when > price
 *   discount      - percent OFF badge (explicit; API provides it)
 *   currency      - symbol (falls back to CURRENCY in lib/format.js)
 *   inStock       - false => "Out of Stock" + disabled Add to Cart
 *   requiresRx    - true  => prescription-required (Rx gate at cart/checkout)
 *   tag           - optional ribbon ("Bestseller", "Flash Sale"); "" = none
 *
 * Swap `data/categoryProducts.js` -> a `getShopByCategory()` fetch later; the
 * components read this shape and won't change.
 */

// Compact builder — documents the product shape and keeps the list readable.
const mk = (id, name, subtitle, price, mrp, discount, extra = {}) => ({
  id,
  name,
  subtitle,
  slug: id,
  image: `/images/productImg/${id}.png`,
  price,
  mrp,
  discount,
  currency: "৳",
  inStock: true,
  requiresRx: false,
  tag: "",
  ...extra,
});

export const CATEGORY_PRODUCTS = [
  {
    id: "medicines",
    title: "Medicines",
    permalink: "medicine",
    isActive: true,
    products: [
      mk("paracetamol-650", "Paracetamol 650mg", "Tablet", 2.5, 3.0, 16, { requiresRx: true, tag: "Bestseller", inStock: false }),
      mk("napa-extra", "Napa Extra", "Tablet", 1.8, 2.2, 18, { requiresRx: true }),
      mk("omeprazole-20", "Omeprazole 20mg", "Capsule", 3.4, 4.0, 15, { requiresRx: true }),
      mk("ace-500", "Ace 500mg", "Tablet", 1.2, 1.5, 20),
      mk("cough-syrup", "Adovas Cough Syrup", "100ml", 2.9, 3.5, 17),
      mk("ors-saline", "ORS Saline", "Sachet 20pcs", 2.0, 2.5, 20, { tag: "Bestseller" }),
      mk("antacid-plus", "Antacid Plus", "Suspension 200ml", 2.6, 3.2, 19),
      mk("metformin-500", "Metformin 500mg", "Tablet", 2.3, 2.8, 18, { requiresRx: true }),
    ],
  },
  {
    id: "vitamins-supplements",
    title: "Vitamins & Supplements",
    permalink: "supplements",
    isActive: true,
    products: [
      mk("vitamin-c-1000", "Vitamin C 1000mg", "Tablet", 4.2, 5.0, 16, { tag: "Bestseller" }),
      mk("vitamin-d3", "Vitamin D3", "Softgel 60pcs", 6.5, 7.5, 13),
      mk("multivitamin", "Daily Multivitamin", "Tablet 60pcs", 7.9, 9.5, 17),
      mk("omega-3", "Omega-3 Fish Oil", "1000mg 90 Softgels", 9.5, 11.0, 14),
      mk("calcium-d", "Calcium + D", "Tablet 60pcs", 5.4, 6.5, 17),
      mk("zinc-tablets", "Zinc 50mg", "Tablet 30pcs", 3.2, 3.8, 16),
      mk("iron-folic", "Iron + Folic Acid", "Tablet 30pcs", 3.6, 4.3, 16),
      mk("biotin", "Biotin 10000mcg", "Tablet 60pcs", 8.2, 9.9, 17),
    ],
  },
  {
    id: "personal-care",
    title: "Personal Care",
    permalink: "personal-care",
    isActive: true,
    products: [
      mk("cetaphil-gentle", "Cetaphil Gentle", "Skin Cleanser 125ml", 8.99, 10.5, 14, { tag: "Bestseller" }),
      mk("himalaya-neem", "Himalaya Neem", "Face Wash 150ml", 3.2, 3.8, 16),
      mk("hand-sanitizer", "Hand Sanitizer", "500ml", 2.8, 3.5, 20),
      mk("antiseptic-liquid", "Antiseptic Liquid", "Savlon 250ml", 3.1, 3.7, 16),
      mk("body-lotion", "Nourishing Body Lotion", "400ml", 5.5, 6.6, 17),
      mk("herbal-shampoo", "Herbal Shampoo", "375ml", 4.4, 5.2, 15),
      mk("toothpaste", "Whitening Toothpaste", "150g", 2.2, 2.7, 19),
      mk("deodorant", "Roll-On Deodorant", "50ml", 3.3, 3.9, 15),
    ],
  },
  {
    id: "cosmetics-skincare",
    title: "Cosmetics & Skincare",
    permalink: "beauty/skincare",
    isActive: true,
    products: [
      mk("sunscreen-spf50", "Sunscreen SPF 50+", "PA+++ 100ml", 7.8, 9.2, 15, { tag: "Bestseller" }),
      mk("moisturizer-cream", "Moisturizing Cream", "Soft & Hydrated 50ml", 6.4, 7.5, 15),
      mk("vitc-serum", "Vitamin C Serum", "30ml", 9.9, 12.0, 18),
      mk("aloe-gel", "Aloe Vera Gel", "300ml", 3.9, 4.6, 15),
      mk("micellar-water", "Micellar Water", "400ml", 5.2, 6.2, 16),
      mk("lip-balm", "Lip Balm SPF 15", "Pack of 3", 2.7, 3.3, 18),
      mk("night-cream", "Repair Night Cream", "50ml", 8.6, 10.4, 17),
      mk("facial-toner", "Facial Toner", "200ml", 4.1, 4.9, 16),
    ],
  },
  {
    id: "baby-mom-care",
    title: "Baby & Mom Care",
    permalink: "baby-mom-care",
    isActive: true,
    products: [
      mk("baby-diapers", "Baby Diapers", "Medium 48pcs", 11.5, 13.5, 15, { tag: "Bestseller" }),
      mk("baby-wipes", "Baby Wipes", "Sensitive 80pcs", 2.4, 2.9, 17),
      mk("baby-lotion", "Baby Lotion", "200ml", 3.8, 4.5, 16),
      mk("baby-shampoo", "No-Tears Baby Shampoo", "200ml", 3.6, 4.3, 16),
      mk("feeding-bottle", "Anti-Colic Feeding Bottle", "250ml", 5.9, 7.0, 16),
      mk("baby-powder", "Baby Powder", "200g", 2.5, 3.0, 17),
      mk("maternity-vits", "Maternity Multivitamin", "Tablet 30pcs", 8.4, 9.9, 15),
      mk("nipple-cream", "Soothing Nipple Cream", "30g", 4.7, 5.6, 16),
    ],
  },
  {
    id: "medical-devices",
    title: "Medical Devices",
    permalink: "health-devices",
    isActive: true,
    products: [
      mk("accu-chek-active", "Accu-Chek Active", "Glucometer", 25.0, 28.0, 11, { tag: "Bestseller" }),
      mk("surgical-mask", "Surgical Face Mask", "50pcs", 5.5, 6.5, 15),
      mk("digital-thermometer", "Digital Thermometer", "Fever Scan", 4.2, 5.0, 16),
      mk("bp-monitor", "Digital BP Monitor", "Automatic", 32.0, 38.0, 16),
      mk("pulse-oximeter", "Pulse Oximeter", "Fingertip SpO2", 14.5, 17.0, 15),
      mk("nebulizer", "Compressor Nebulizer", "Adult & Child", 27.0, 32.0, 16),
      mk("first-aid-kit", "First Aid Kit", "42 Pieces", 9.8, 11.5, 15),
      mk("weighing-scale", "Digital Weighing Scale", "Body Weight", 12.9, 15.0, 14),
    ],
  },
];
