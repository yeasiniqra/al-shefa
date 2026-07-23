import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FOOTER } from "@/data/footer";

/**
 * Global site footer — fully data-driven from data/footer.js (nav columns,
 * contact, social, app links, payment methods are all configurable). Rendered
 * once in the root layout so it appears on every page.
 *
 * `icon` string keys map to brand glyphs here; unknown keys (bKash, Nagad)
 * gracefully fall back to their text label.
 */
const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

const APP_ICONS = { "google-play": FaGooglePlay, "app-store": FaApple };

const PAYMENT_ICONS = {
  visa: FaCcVisa,
  mastercard: FaCcMastercard,
  amex: FaCcAmex,
};

export default function Footer({ data = FOOTER }) {
  const { brand, contact, social, columns, apps, payments, copyright } = data;

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        {/* Brand + contact + social */}
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} />
          </Link>
          <p className="site-footer__desc">{brand.description}</p>

          <ul className="site-footer__contact">
            {contact.phone ? (
              <li>
                <FaPhoneAlt aria-hidden="true" />
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
              </li>
            ) : null}
            {contact.email ? (
              <li>
                <FaEnvelope aria-hidden="true" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            ) : null}
            {contact.address ? (
              <li>
                <FaMapMarkerAlt aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
            ) : null}
          </ul>

        </div>

        {/* Navigation columns */}
        {columns.map((col) => (
          <nav className="site-footer__col" key={col.id} aria-label={col.title}>
            <h3 className="site-footer__col-title">{col.title}</h3>
            <ul className="site-footer__links">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* App download */}
        <div className="site-footer__apps">
          <h3 className="site-footer__col-title">{apps.heading}</h3>
          {apps.subtext ? <p className="site-footer__apps-text">{apps.subtext}</p> : null}
          <div className="site-footer__badges">
            <ul className="site-footer__social">
              {social.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <li key={s.id}>
                    <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                      {Icon ? <Icon aria-hidden="true" /> : s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="accept__payment">
              <span>Accepted Payment Methods</span>
              <ul className="site-footer__payments">
                {payments.map((p) => {
                  const Icon = PAYMENT_ICONS[p.icon];
                  return (
                    <li key={p.id} className={`payment-chip payment-chip--${p.id}`} title={p.label}>
                      {Icon ? (
                        <Icon className="payment-chip__icon" aria-label={p.label} />
                      ) : (
                        <span className="payment-chip__text">{p.label}</span>
                      )}
                    </li>
                  );
                })}
          </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright + payment methods */}
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p className="site-footer__copyright">{copyright}</p>
          <div>
          <p className="copy__right__footer">
            {/* Desktop */}
            <span className="desktop-footer">
              Pharmacy Software & Website Developed By -{' '}
              <a
                className="text-white"
                href="http://iqrasys.com/"
                target="_blank"
                rel="noreferrer"
              >
                Iqrasys Solutions Ltd
              </a>{" "}
              <a className="text-white" href="tel:+8801778772327">
                (+8801778772327)
              </a>
            </span>

            {/* Mobile */}
            <span className="mobile-footer">
              <a
                className="text-white"
                href="http://iqrasys.com/"
                target="_blank"
                rel="noreferrer"
              >
                Developed By
              </a>{" "}
              -{" "}
              <a
                className="text-white"
                href="tel:+8801778772327"
              >
                Iqrasys Solutions Ltd
              </a>
            </span>
          </p>
          </div>      
        </div>
      </div>
    </footer>
  );
}
