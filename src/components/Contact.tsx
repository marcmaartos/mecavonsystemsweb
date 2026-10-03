import type { ReactNode } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { CONTACT_EMAIL, CTA_HREF, CTA_LABEL, EMAIL_HREF, PHONE, PHONE_HREF, SUPPORT_HOURS } from "@/config";
import { ContactButton } from "./ContactButton";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppContactButton } from "./WhatsAppContactButton";

/** Tarjeta de contacto: las tres (WhatsApp, email y teléfono) usan esta misma estructura. */
function ContactCard({
  icon,
  title,
  text,
  detail,
  button,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  /** Dato en texto pequeño bajo la descripción (nunca se parte en dos líneas). */
  detail?: string;
  button: ReactNode;
}) {
  return (
    <li className="flex flex-col rounded-2xl border-2 border-teal p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-navy">{icon}</span>
      <h3 className="mt-6 text-lg font-semibold text-navy">{title}</h3>
      {/* flex-1: el bloque de texto crece para que los tres botones queden alineados abajo. */}
      <div className="mt-2 min-w-0 flex-1">
        <p className="leading-relaxed">{text}</p>
        {detail && (
          <p className="mt-2 truncate text-sm font-medium text-navy" title={detail}>
            {detail}
          </p>
        )}
      </div>
      <div className="mt-6">{button}</div>
    </li>
  );
}

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

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          <ContactCard
            icon={<WhatsAppIcon className="h-6 w-6" />}
            title="WhatsApp"
            text="La forma más rápida. Escríbenos y te contestamos por el mismo chat."
            button={<WhatsAppContactButton />}
          />
          <ContactCard
            icon={<Mail size={24} strokeWidth={2} aria-hidden="true" />}
            title="Email"
            text="Para enviarnos documentos o contarnos algo con calma."
            detail={CONTACT_EMAIL}
            button={
              <ContactButton href={EMAIL_HREF} icon={<Mail size={24} strokeWidth={2} />}>
                Envíanos un email
              </ContactButton>
            }
          />
          <ContactCard
            icon={<Phone size={24} strokeWidth={2} aria-hidden="true" />}
            title="Teléfono"
            text="Si prefieres hablarlo de viva voz."
            detail={PHONE.cardDisplay}
            button={
              <ContactButton href={PHONE_HREF} icon={<Phone size={24} strokeWidth={2} />}>
                Llámanos
              </ContactButton>
            }
          />
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
