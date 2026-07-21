import { Mail, PhoneCall } from "lucide-react";
import { CONFIG } from "@/lib/config";

export default function TopBar({
  message = `Welcome to ${CONFIG.SITE_NAME} – ${CONFIG.SITE_TAGLINE}`,

}) {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__message">{message}</p>

        <div className="topbar__links">
          <a href='tel:01712691258' className="topbar__link">
            <PhoneCall size={16} />
            +8801712-691258
          </a>
          <span className="topbar__divider" aria-hidden="true" />
          <a href='mailto:alshefa@gmail.com' className="topbar__link">
            <Mail size={16} />
            alshefa@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
