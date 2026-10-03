import { Check } from "lucide-react";
import { CTA_LABEL, CTA_SUBTEXT } from "@/config";
import { AuditForm } from "./AuditForm";
import { WhatsAppContactButton } from "./WhatsAppContactButton";

const POINTS = [
  "Miramos durante una semana las llamadas y mensajes que se te escapan.",
  "Te damos la cifra en euros y qué harías para recuperarla.",
  "Sin permanencia, sin instalar nada y sin jerga.",
];

export function AuditSection() {
  return (
    <section id="auditoria" className="scroll-mt-16 bg-paper py-24 md:scroll-mt-[72px] md:py-32">
      {/* En escritorio las dos columnas se estiran a la misma altura (stretch es el valor por defecto del grid). */}
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            {CTA_LABEL}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">{CTA_SUBTEXT}</p>
          <ul className="mt-10 space-y-4 lg:mb-10">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3">
                <Check size={22} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          {/* Los talleres suelen preferir WhatsApp: va junto al formulario (en móvil, antes).
              En escritorio se empuja abajo para que su borde inferior coincida con el del formulario. */}
          <div className="mt-10 rounded-2xl border border-line bg-white p-6 lg:mt-auto">
            <p className="font-semibold text-navy">¿Prefieres WhatsApp?</p>
            <p className="mt-1 text-sm leading-relaxed">Escríbenos y te contestamos por el mismo chat.</p>
            <WhatsAppContactButton className="mt-4 w-full" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-10 lg:h-full">
            <AuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}
