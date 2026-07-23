import Banner from "@/components/home/Banner/Banner";
import ShopByCategory from "@/components/home/ShopByCategory/ShopByCategory";
import EspeciallyForYou from "@/components/home/EspeciallyForYou/EspeciallyForYou";
import CategoryProducts from "@/components/home/CategoryProducts/CategoryProducts";
import About from "@/components/home/About/About";
import LatestBlogs from "@/components/home/LatestBlogs/LatestBlogs";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Banner />
      {/* default 4 boxes: */}
      <EspeciallyForYou />
      {/* admin-driven (up to 6) once your API is wired: */}
      {/* <EspeciallyForYou items={adminOffers} count={adminCount} /> */}
      <ShopByCategory />
      {/* 6 category rows, each a Splide product carousel (default 6) */}
      <CategoryProducts />
      <About />
      <LatestBlogs />
      <Testimonials />
      <WhyChooseUs />
    </>
  );
}
