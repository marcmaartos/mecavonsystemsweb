import { Check } from "lucide-react";
import { CTA_LABEL, CTA_SUBTEXT } from "@/config";
import { AuditForm } from "./AuditForm";

const POINTS = [
  "Miramos durante una semana las llamadas y mensajes que se te escapan.",
  "Te damos la cifra en euros y qué harías para recuperarla.",
  "Sin permanencia, sin instalar nada y sin jerga.",
];

export function AuditSection() {
  return (
    <section id="auditoria" className="scroll-mt-16 bg-paper py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            {CTA_LABEL}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">{CTA_SUBTEXT}</p>
          <ul className="mt-10 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3">
                <Check size={22} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-10">
            <AuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}
