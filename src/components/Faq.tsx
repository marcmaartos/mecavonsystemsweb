import { ChevronDown } from "lucide-react";
import { setupTimeText } from "@/config";

// REVISAR: las respuestas marcadas describen cómo funciona el servicio; confírmalas antes de publicar.
const FAQS = [
  {
    q: "¿Tengo que cambiar de número?",
    a: "No. Sigues con tu número y tu WhatsApp de siempre. Solo se desvían al sistema las llamadas que no coges.", // REVISAR
  },
  {
    q: "¿Qué pasa con los datos de mis clientes (RGPD)?",
    a: "Solo los usamos para atender a tus clientes en tu nombre, nunca para otra cosa. Firmamos contigo el contrato de encargado del tratamiento que exige el RGPD y puedes pedir que los borremos cuando quieras.", // REVISAR
  },
  {
    q: "¿Qué hace si un cliente pregunta algo complicado?",
    a: "Te lo pasa a ti. Si es un diagnóstico, una queja o algo que no está en tus normas, Mecavon le dice al cliente que le llamas tú y te manda un resumen por WhatsApp.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Pagas mes a mes y lo dejas cuando quieras.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    // El plazo sale de SETUP_DAYS en src/config.ts, igual que en "Cómo trabajamos contigo".
    a: `${setupTimeText()}. Antes configuramos tus normas, lo probamos contigo y solo entonces lo activamos.`,
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-16 bg-white py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem] lg:col-span-4">
          Preguntas frecuentes
        </h2>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown
                  size={24}
                  strokeWidth={2}
                  className="shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
