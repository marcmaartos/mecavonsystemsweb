import { Clock, CalendarX2, ShieldCheck } from "lucide-react";

const ITEMS = [
  {
    icon: Clock,
    title: "Te respondemos en menos de 24 h laborables",
    text: "Escribas por donde escribas: WhatsApp, email o el formulario.",
  },
  {
    icon: CalendarX2,
    title: "Sin permanencia",
    text: "Pagas mes a mes. Si no te compensa, lo dejas cuando quieras.",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimos el RGPD",
    text: "Los datos de tus clientes solo se usan para atenderles en tu nombre.",
    // PENDIENTE DE CONFIRMAR: añadir "Tus datos en servidores de la UE" solo cuando todos los
    // proveedores (incluida la API de WhatsApp) lo garanticen por contrato.
  },
  // PENDIENTE DE CONFIRMAR: activar solo cuando la garantía esté aprobada y recogida en el contrato.
  // {
  //   icon: BadgeCheck,
  //   title: "60 días para comprobarlo",
  //   text: "Si en 60 días no ves resultados, cancelas sin coste.",
  // },
];

export function Commitments() {
  return (
    <section id="compromisos" className="scroll-mt-16 bg-paper py-24 md:scroll-mt-[72px] md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
          Nuestros compromisos
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-line bg-white p-7">
              <Icon size={28} strokeWidth={2} className="shrink-0 text-navy" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
