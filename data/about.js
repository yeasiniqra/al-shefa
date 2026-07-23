/**
 * "About AL-SHEFA" home section — mock content shaped for the future CMS/API
 * (replace with a `getAboutSection()` fetch later; the component won't change).
 *
 *   heading/brand - split so the brand name can render in the accent colour
 *   paragraphs    - body copy (array -> mapped)
 *   highlights    - small trust badges { icon (lucide name or image), title }
 *   cta           - { label, href }
 *   image         - side image (local placeholder now; API URL later)
 */
export const ABOUT = {
  heading: "About",
  brand: "AL-SHEFA™",
  paragraphs: [
    "At Al-Shefa, we strive to make trusted online pharmacy & healthcare solutions easily accessible. From prescription medicines to personal care essentials and wellness products.",
    "We ensure 100% authentic products, expert guidance, and fast delivery—so you can enjoy a worry-free shopping experience.",
  ],
  highlights: [
    { id: "authentic", icon: "BadgeCheck", title: "Authentic Medicines" },
    { id: "rx-delivery", icon: "Truck", title: "Prescription Delivery" },
    { id: "secure", icon: "ShieldCheck", title: "Secure Payment" },
    { id: "easy", icon: "CreditCard", title: "Easy Payment" },
  ],
  cta: { label: "Learn More About Us", href: "/about" },
  image: "/images/about/pharmacy.png",
  imageAlt: "AL-SHEFA pharmacy interior",
};
