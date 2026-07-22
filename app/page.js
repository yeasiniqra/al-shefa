import Banner from "@/components/home/Banner/Banner";
import EspeciallyForYou from "@/components/home/EspeciallyForYou/EspeciallyForYou";

export default function Home() {
  return (
    <>
      <Banner />
      {/* default 4 boxes: */}
      <EspeciallyForYou />
      {/* admin-driven (up to 6) once your API is wired: */}
      {/* <EspeciallyForYou items={adminOffers} count={adminCount} /> */}
      <main className="container">
      </main>
    </>
  );
}
