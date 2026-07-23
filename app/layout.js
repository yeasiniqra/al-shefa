import { Poppins } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import CategoryNav from "@/components/layout/CategoryNav/CategoryNav";
import Footer from "@/components/layout/Footer/Footer";
import "./globals.css";
import "./responsive.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "AL-SHEFA - Your Trusted Online Pharmacy",
  description: "Welcome to AL-SHEFA - Your Trusted Online Pharmacy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        <CategoryNav />
        <main>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}