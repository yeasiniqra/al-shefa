"use client";

import Slider from "@/components/ui/Slider";
import BannerSlide from "./BannerSlide";
import { BANNERS } from "@/data/banners";
import { useViewportImages } from "@/hooks/useViewportImages";

/**
 * Home banner slider — the Al-Shefa port of Lazz Pharma's `Banner.jsx`.
 *
 * Same behaviour: an autoplaying, looping carousel whose images are chosen for
 * the current viewport (`useViewportImages`). Built on the reusable <Slider>
 * (vanilla Splide). The Splide options mirror Lazz's banner options.
 *
 * Data comes from data/banners.js (mock now, shaped for the future API).
 */
const BANNER_OPTIONS = {
  type: "loop",
  rewind: true,
  autoplay: true,
  interval: 4500,
  speed: 600,
  rewindSpeed: 1000,
  pauseOnHover: false,
  arrows: true,
  pagination: true,
  drag: true,
  width: "100%",
};

export default function Banner() {
  const banners = useViewportImages(BANNERS);

  if (!banners.length) return null;

  return (
    <section className="banner" aria-label="Promotions">
      <div className="container">
        <Slider
          className="banner__slider"
          options={BANNER_OPTIONS}
          data={banners}
          ariaLabel="Promotional banners"
          renderItem={(item, index) => (
            <BannerSlide item={item} priority={index === 0} />
          )}
        />
      </div>
    </section>
  );
}
