import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label={CONFIG.SITE_NAME}>
      <Image
        src="/images/logo.png"
        alt={`${CONFIG.SITE_NAME} logo`}
        width={100}
        height={100}
        className="logo__img"
        priority
      />
    </Link>
  );
}
