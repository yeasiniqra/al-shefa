/**
 * Central config — reads from env so dev/staging/prod just swap .env values.
 * Fill these in once the backend is ready; everything else already reads from here.
 */
export const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL || "",
  SITE_NAME: "AL-SHEFA",
  SITE_TAGLINE: "Your Trusted Online Pharmacy",
};
