/**
 * TEMPORARY mock data — shaped exactly like the future categories API
 * response so swapping to a real fetch later needs no remapping.
 *
 * Every category — top-level or nested — shares the SAME shape:
 *   { id, name, permalink, iconImage, largeImage, children }
 *
 * - iconImage: small icon shown in the nav / flyout / mobile grid.
 *     For now this holds a lucide-react icon NAME (e.g. "Pill") so the demo
 *     renders without needing real icon assets. Once the API returns real
 *     image URLs (e.g. "/uploads/categories/beauty.png"), <CategoryIcon />
 *     automatically renders an <img> instead — no other code changes.
 * - largeImage: reserved for a bigger banner image (category page hero /
 *     future mega-menu promo banner). Not rendered yet — wire it in
 *     wherever a category banner is needed later.
 * - children: same shape, recursively. The flyout menu component is
 *     recursive too, so this supports 2 levels (like "Beauty" below) or
 *     more, without any component changes.
 *
 * TODO once API is ready:
 *   export async function getNavCategories() {
 *     const res = await fetch(`${CONFIG.API_BASE_URL}/CategoryArea/AllCategory`, {
 *       next: { revalidate: 3600 },
 *     });
 *     return res.json();
 *   }
 */
export const MOCK_NAV_CATEGORIES = [
  {
    id: "home",
    name: "Home",
    permalink: "",
    iconImage: "Home",
    largeImage: "",
    children: [],
  },
  {
    id: "medicine",
    name: "Medicine",
    permalink: "medicine",
    iconImage: "Pill",
    largeImage: "",
    children: [],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    permalink: "healthcare",
    iconImage: "HeartPulse",
    largeImage: "",
    children: [],
  },
  {
    id: "beauty",
    name: "Beauty",
    permalink: "beauty",
    iconImage: "Sparkles",
    largeImage: "",
    children: [
      {
        id: "beauty-all",
        name: "All",
        permalink: "beauty",
        iconImage: "LayoutGrid",
        largeImage: "",
        children: [],
      },
      {
        id: "skincare",
        name: "Skincare",
        permalink: "beauty/skincare",
        iconImage: "Droplet",
        largeImage: "",
        children: [
          {
            id: "skincare-set",
            name: "Skin Care Set",
            permalink: "beauty/skincare/skin-care-set",
            iconImage: "Package",
            largeImage: "",
            children: [],
          },
          {
            id: "serums-ampoules",
            name: "Serums & Ampoules",
            permalink: "beauty/skincare/serums-ampoules",
            iconImage: "FlaskConical",
            largeImage: "",
            children: [],
          },
          {
            id: "cream-moisturizer",
            name: "Cream & Moisturizer",
            permalink: "beauty/skincare/cream-moisturizer",
            iconImage: "Droplets",
            largeImage: "",
            children: [],
          },
          {
            id: "sunscreen-uv",
            name: "Sunscreen & UV Protections",
            permalink: "beauty/skincare/sunscreen-uv-protections",
            iconImage: "Sun",
            largeImage: "",
            children: [],
          },
        ],
      },
      {
        id: "haircare",
        name: "Haircare",
        permalink: "beauty/haircare",
        iconImage: "Scissors",
        largeImage: "",
        children: [],
      },
      {
        id: "personal-care-beauty",
        name: "Personal Care",
        permalink: "beauty/personal-care",
        iconImage: "ShowerHead",
        largeImage: "",
        children: [],
      },
      {
        id: "fragrance-perfume",
        name: "Fragrance & Perfume",
        permalink: "beauty/fragrance-perfume",
        iconImage: "SprayCan",
        largeImage: "",
        children: [],
      },
    ],
  },
  {
    id: "sexual-wellness",
    name: "Sexual Wellness",
    permalink: "sexual-wellness",
    iconImage: "ShieldPlus",
    largeImage: "",
    children: [],
  },
  {
    id: "baby-mom-care",
    name: "Baby & Mom Care",
    permalink: "baby-mom-care",
    iconImage: "Baby",
    largeImage: "",
    children: [],
  },
  {
    id: "herbal",
    name: "Herbal",
    permalink: "herbal",
    iconImage: "Leaf",
    largeImage: "",
    children: [],
  },
  {
    id: "home-care",
    name: "Home Care",
    permalink: "home-care",
    iconImage: "House",
    largeImage: "",
    children: [],
  },
  {
    id: "supplement",
    name: "Supplement",
    permalink: "supplement",
    iconImage: "Tablets",
    largeImage: "",
    children: [],
  },
  {
    id: "food-nutrition",
    name: "Food and Nutrition",
    permalink: "food-and-nutrition",
    iconImage: "Salad",
    largeImage: "",
    children: [],
  },
  {
    id: "pet-care",
    name: "Pet Care",
    permalink: "pet-care",
    iconImage: "PawPrint",
    largeImage: "",
    children: [],
  },
  {
    id: "veterinary",
    name: "Veterinary",
    permalink: "veterinary",
    iconImage: "Stethoscope",
    largeImage: "",
    children: [],
  },
  {
    id: "homeopathy",
    name: "Homeopathy",
    permalink: "homeopathy",
    iconImage: "FlaskRound",
    largeImage: "",
    children: [],
  },
];
