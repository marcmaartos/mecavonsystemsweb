import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieBanner";
import { CONTACT_EMAIL, CTA_LABEL, EMAIL_HREF, PHONE, PHONE_HREF, SUPPORT_HOURS } from "@/config";
// activar cuando existan los perfiles (junto con el bloque comentado de redes, más abajo):
// import { SocialIcons } from "./SocialIcons";
// import { SOCIAL_LINKS } from "@/config";

const SITE_LINKS = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#precios", label: "Precios" },
  { href: "/#como-trabajamos", label: "Cómo trabajamos" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#auditoria", label: CTA_LABEL },
];

const LEGAL_LINKS = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/cookies", label: "Política de cookies" },
];

const linkClass = "flex min-h-11 items-center hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy text-mist">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Automatización gestionada para talleres de automoción. Tú reparas, Mecavon se encarga del resto.
          </p>
          {/* activar cuando existan los perfiles: las URLs (placeholder) están en SOCIAL_LINKS de src/config.ts
          <div className="mt-6">
            <SocialIcons links={SOCIAL_LINKS} />
          </div>
          */}
        </div>

        <nav aria-label="Web" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Web</h2>
          <ul className="mt-3 text-sm">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-3 text-sm">
            <li>
              <a href={EMAIL_HREF} className={`${linkClass} break-all`}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_HREF} className={linkClass}>
                {PHONE.cardDisplay}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm">{SUPPORT_HOURS}</p>
        </div>

        <nav aria-label="Legal" className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-3 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className={`${linkClass} text-left`} />
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-6 pb-24 text-sm sm:px-8 md:pb-6">
          © {new Date().getFullYear()} Mecavon Systems
        </p>
      </div>
    </footer>
  );
}
