import { ScanSearch, Route, Send } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    icon: ScanSearch,
    title: "Detecta",
    text: "Ve lo que se escapa: una llamada perdida, un presupuesto que lleva tres días sin respuesta, un cliente al que ya le toca la revisión.",
  },
  {
    icon: Route,
    title: "Sigue tus reglas",
    text: "Tú marcas a quién se escribe, cuándo y qué se dice. Nada sale sin tus normas.",
  },
  {
    icon: Send,
    title: "Actúa",
    text: "Escribe al cliente por WhatsApp, apunta la cita en tu agenda y solo te avisa de lo que necesita tu visto bueno.",
  },
];

export function System() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-16 bg-navy py-24 text-white md:scroll-mt-[72px] md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div>
          {/* En escritorio el tamaño se ajusta con clamp para que el título quepa en una línea (máx. 2,6rem como los demás). */}
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.7vw,2.6rem)]">
            Tres pasos. Ninguna pantalla nueva que aprender.
          </h2>
          {/* Mismo tamaño y color; desde 1280 px el espaciado entre letras se ajusta un pelo para que quepa en una línea. */}
          <p className="mt-6 text-lg leading-relaxed text-mist xl:tracking-[-0.015em]">
            Mecavon se conecta a tu teléfono, tu WhatsApp y tu agenda. Tú sigues trabajando como
            siempre; el sistema hace el resto.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal
                delay={i * 0.12}
                className="h-full rounded-2xl border border-white/15 bg-white/[0.04] p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-navy">
                    <Icon size={28} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-mist">Paso {i + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
