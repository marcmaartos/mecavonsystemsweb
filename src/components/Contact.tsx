import { Clock, Mail, Phone } from "lucide-react";
import { CONTACT_EMAIL, CTA_HREF, CTA_LABEL, PHONE, SUPPORT_HOURS, whatsappUrl } from "@/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

const OPTIONS = [
  {
    icon: <WhatsAppIcon className="h-6 w-6" />,
    title: "WhatsApp",
    text: "La forma más rápida. Escríbenos y te contestamos por el mismo chat.",
    href: whatsappUrl(),
    label: "Abrir WhatsApp",
    external: true,
  },
  {
    icon: <Mail size={24} strokeWidth={2} aria-hidden="true" />,
    title: "Email",
    text: "Para enviarnos documentos o contarnos algo con calma.",
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
  },
  {
    icon: <Phone size={24} strokeWidth={2} aria-hidden="true" />,
    title: "Teléfono",
    text: "Si prefieres hablarlo de viva voz.",
    href: `tel:${PHONE.tel}`,
    label: PHONE.display,
  },
];

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-16 bg-white py-20 md:scroll-mt-[72px] md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
          Habla con nosotros
        </h2>
        <p className="mt-4 flex items-center gap-2 text-graphite">
          <Clock size={20} strokeWidth={2} className="shrink-0" aria-hidden="true" />
          {SUPPORT_HOURS}
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {OPTIONS.map((o) => (
            <li key={o.title} className="flex flex-col rounded-2xl border border-line p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-navy">
                {o.icon}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-navy">{o.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed">{o.text}</p>
              <a
                href={o.href}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-6 flex min-h-12 items-center justify-center rounded-lg border-2 border-teal px-5 text-center font-semibold text-teal transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {o.label}
                {o.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-navy-600 px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xl font-semibold leading-snug sm:text-2xl">
            ¿No sabes por dónde empezar? Pide tu auditoría gratuita
          </p>
          <a
            href={CTA_HREF}
            className="flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
