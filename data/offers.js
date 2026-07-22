/**
 * "Especially For You" offer boxes — shaped like the future admin/API response.
 * Each box: { id, label, title, subtitle, icon, color, buttonLabel, link, isActive }
 *   icon  - lucide-react NAME (e.g. "Store") OR an image URL (admin can send either)
 *   color - theme color (hex) for the icon circle + button + glow
 *   link  - "/route" (internal), "tel:..." , or "https://..." ; "" = not clickable
 *   isActive / empty-content boxes are hidden automatically.
 * NOTE: icons below are lucide stand-ins; your admin supplies the real brand icons/images.
 */
export const OFFERS = [
  { id: 1, label: "",     title: "Order Via WhatsApp", subtitle: "01712-691258", icon: "MessageCircle", color: "#25D366", buttonLabel: "Call Now",            link: "https://wa.me/8801712-691258",   isActive: true },
  { id: 2, label: "UPTO", title: "10% OFF",            subtitle: "+ Cashback",  icon: "ClipboardPlus",  color: "#17B0A6", buttonLabel: "Upload Prescription", link: "/prescription",      isActive: true },
  { id: 3, label: "UPTO", title: "14% OFF",            subtitle: "+ Cashback",  icon: "Store",          color: "#7CB342", buttonLabel: "Register Pharmacy",   link: "/register-pharmacy", isActive: true },
  { id: 4, label: "UPTO", title: "60% OFF",            subtitle: "+ Cashback",  icon: "Building2",      color: "#8B5CF6", buttonLabel: "HealthCare",          link: "/healthcare",        isActive: true },
  { id: 5, label: "UPTO", title: "10% OFF",            subtitle: "16778",       icon: "Headphones",     color: "#FB8C00", buttonLabel: "Call To Order",       link: "tel:16778",          isActive: true },
  { id: 6, label: "UPTO", title: "25% OFF",            subtitle: "",            icon: "TestTube",       color: "#F05252", buttonLabel: "Lab Test",            link: "/lab-test",          isActive: true },
];