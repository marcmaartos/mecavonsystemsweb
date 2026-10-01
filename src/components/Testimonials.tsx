import Image from "next/image";
import { SHOW_TESTIMONIALS } from "@/config";

// ACTIVAR CUANDO HAYA CASOS REALES: rellena CASES con datos verdaderos (y permiso escrito del taller)
// y pon SHOW_TESTIMONIALS = true en src/config.ts. Mientras esté en false no se genera nada en el HTML.
const CASES: { logo: string; workshop: string; quote: string; figure: string; figureLabel: string }[] = [
  // {
  //   logo: "/images/clientes/taller-ejemplo.png",
  //   workshop: "Nombre real del taller, ciudad",
  //   quote: "Frase real del cliente.",
  //   figure: "0 €",
  //   figureLabel: "recuperados el primer mes (dato del panel)",
  // },
];

export function Testimonials() {
  if (!SHOW_TESTIMONIALS || CASES.length === 0) return null;

  return (
    <section id="casos" className="scroll-mt-16 bg-white py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
          Talleres que ya lo usan
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {CASES.map((c) => (
            <li key={c.workshop} className="flex flex-col rounded-2xl border border-line p-7">
              <Image src={c.logo} alt={`Logo de ${c.workshop}`} width={140} height={48} className="h-12 w-auto object-contain object-left" />
              <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-navy">“{c.quote}”</blockquote>
              <p className="mt-6 text-3xl font-bold text-navy">{c.figure}</p>
              <p className="text-sm">{c.figureLabel}</p>
              <p className="mt-4 text-sm font-medium text-graphite">{c.workshop}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
