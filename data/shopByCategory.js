/**
 * "Shop By Category" homepage row — a curated, admin-picked subset of
 * categories with hero photography, distinct from the full category tree in
 * `data/navCategories.js` (which drives the header slider). Same shape as
 * every other category object ({ name, iconImage, largeImage, permalink })
 * for consistency, plus `isActive` so admin can toggle a tile off without
 * deleting it (same convention as `data/offers.js`).
 *
 * `largeImage` is currently a hand-made placeholder illustration. Swap it
 * for real product photography (e.g. "/uploads/categories/medicines.jpg")
 * once available — nothing else needs to change, CategoryImage renders
 * whatever path is given.
 *
 * TODO once API is ready:
 *   export async function getShopByCategory() {
 *     const res = await fetch(`${CONFIG.API_BASE_URL}/CategoryArea/HomeCategory`, {
 *       next: { revalidate: 3600 },
 *     });
 *     return res.json();
 *   }
 */
export const SHOP_BY_CATEGORY = [
  {
    id: "medicines",
    name: "Medicines",
    permalink: "medicine",
    iconImage: "Pill",
    largeImage: "/images/shop-by-category/medicines-category.jpg",
    isActive: true,
  },
  {
    id: "cosmetics-skincare",
    name: "Cosmetics & Skincare",
    permalink: "beauty/skincare",
    iconImage: "Droplet",
    largeImage: "/images/shop-by-category/cosmetics-category.jpg",
    isActive: true,
  },
  {
    id: "surgery-items",
    name: "Surgery Items",
    permalink: "surgery-items",
    iconImage: "Scissors",
    largeImage: "/images/shop-by-category/surgery-category.jpg",
    isActive: true,
  },
  {
    id: "health-care-devices",
    name: "Health Care Devices",
    permalink: "health-care-devices",
    iconImage: "Stethoscope",
    largeImage: "/images/shop-by-category/healthcare-category.jpg",
    isActive: true,
  },
  {
    id: "baby-care",
    name: "Baby Care",
    permalink: "baby-mom-care",
    iconImage: "Baby",
    largeImage: "/images/shop-by-category/babycare-category.jpg",
    isActive: true,
  },
  {
    id: "health-supplements",
    name: "Health Supplements",
    permalink: "supplement",
    iconImage: "Tablets",
    largeImage: "/images/shop-by-category/supplements-category.jpg",
    isActive: true,
  },
  {
    id: "personal-care",
    name: "Personal Care",
    permalink: "beauty/personal-care",
    iconImage: "ShowerHead",
    largeImage: "/images/shop-by-category/personalcare-category.jpg",
    isActive: true,
  },
  {
    id: "offers-deals",
    name: "Offers & Deals",
    permalink: "offers",
    iconImage: "Gift",
    largeImage: "/images/shop-by-category/offers-category.jpg",
    isActive: true,
  },
];
