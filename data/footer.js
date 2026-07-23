/**
 * Footer content — fully configurable (nav columns, contact, social, app links,
 * payment methods). Swap for a settings/CMS fetch later; the Footer component
 * just maps over this shape.
 *
 * `icon` values are string keys the Footer maps to brand glyphs (react-icons);
 * unknown keys fall back to a text label (e.g. bKash / Nagad).
 */
export const FOOTER = {
  brand: {
    name: "AL-SHEFA",
    logo: "/images/logo.png",
    description:
      "Your trusted online pharmacy for genuine medicines, healthcare & wellness products in Bangladesh.",
  },
  contact: {
    phone: "+8801712-691258",
    email: "ecom@alshefa.com.bd",
    address: "Dhaka, Bangladesh",
  },
  social: [
    { id: "facebook", icon: "facebook", href: "https://facebook.com", label: "Facebook" },
    { id: "instagram", icon: "instagram", href: "https://instagram.com", label: "Instagram" },
    { id: "twitter", icon: "twitter", href: "https://twitter.com", label: "Twitter" },
    { id: "linkedin", icon: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  ],
  columns: [
    {
      id: "shop",
      title: "Shop",
      links: [
        { label: "Medicines", href: "/category/medicine" },
        { label: "Vitamins & Supplements", href: "/category/supplements" },
        { label: "Beauty", href: "/category/beauty" },
        { label: "Baby & Mom Care", href: "/category/baby-mom-care" },
        { label: "Elderly Care", href: "/category/elderly-care" },
        { label: "Personal Care", href: "/category/personal-care" },
        { label: "Health Devices", href: "/category/health-devices" },
        { label: "Petcare", href: "/category/pet-care" },
      ],
    },
    {
      id: "service",
      title: "Customer Service",
      links: [
        { label: "How to Order", href: "/how-to-order" },
        { label: "Shipping & Delivery", href: "/shipping-delivery" },
        { label: "Return & Refund", href: "/return-refund" },
        { label: "FAQs", href: "/faqs" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Branch Locator", href: "/branches" },
        { label: "Media Center", href: "/media" },
        { label: "Be a Partner", href: "/partner" },
        { label: "Corporate Sales", href: "/corporate-sales" },
      ],
    },
  ],
  apps: {
    heading: "Let's Socialize",
    subtext: "Follow Us & Get the Latest Updates",
    items: [
      { id: "google-play", icon: "google-play", label: "GET IT ON", sublabel: "Google Play", href: "#" },
      { id: "app-store", icon: "app-store", label: "Download on the", sublabel: "App Store", href: "#" },
    ],
  },
  payments: [
    { id: "visa", icon: "visa", label: "Visa" },
    { id: "mastercard", icon: "mastercard", label: "Mastercard" },
    { id: "amex", icon: "amex", label: "American Express" },
    { id: "bkash", icon: "bkash", label: "bKash" },
    { id: "nagad", icon: "nagad", label: "Nagad" },
  ],
  copyright: "© 2026 AL-SHEFA™ All Rights Reserved.",
};
