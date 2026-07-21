import Link from "next/link";
import { SearchX, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <div className="notfound__icon">
          <SearchX size={40} strokeWidth={1.5} />
        </div>

        <span className="notfound__code">404</span>

        <h2 className="notfound__title">Page Not Found</h2>
        <p className="notfound__text">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has
          been moved. Let&apos;s get you back to shopping.
        </p>

        <div className="notfound__actions">
          <Link href="/" className="notfound__btn notfound__btn--primary">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <Link href="/search" className="notfound__btn notfound__btn--ghost">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;