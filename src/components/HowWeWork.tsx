import { ClipboardCheck, Rocket, CalendarClock, FileChartColumn, UserRound } from "lucide-react";
import { setupTimeText } from "@/config";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Auditoría",
    text: "Durante una semana miramos qué llamadas, presupuestos y clientes se te escapan, y te lo ponemos en euros.",
  },
  {
    icon: Rocket,
    title: "Puesta en marcha",
    text: `Configuramos tus normas, lo probamos contigo y lo activamos. ${setupTimeText()}.`,
  },
  {
    icon: CalendarClock,
    title: "Seguimiento semanal",
    text: "Cada semana revisamos contigo qué ha funcionado y ajustamos lo que haga falta.",
  },
  {
    icon: FileChartColumn,
    title: "Informe mensual en euros",
    text: "Cada mes te enviamos lo que el sistema ha recuperado: citas, presupuestos aceptados y clientes que han vuelto.",
  },
];

export function HowWeWork() {
  return (
    <section id="como-trabajamos" className="scroll-mt-16 bg-white py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            Cómo trabajamos contigo
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Es un servicio gestionado: nuestro equipo lo monta, lo vigila y lo mejora. Tú no tienes
            que aprender ningún programa.
          </p>
        </div>

        <Photo
          file="taller.jpg"
          alt="Coche azul con el capó abierto y sin ruedas, sobre caballetes en un taller"
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="mt-12 aspect-[16/9] md:aspect-[21/9]"
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full rounded-2xl border border-line p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-navy">
                    <Icon size={24} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-graphite">Paso {i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-start gap-3 rounded-2xl bg-navy px-6 py-5 text-lg font-medium text-white">
          <UserRound size={26} strokeWidth={2} className="mt-0.5 shrink-0 text-mist" aria-hidden="true" />
          Tienes un responsable de cuenta asignado que conoce tu taller.
        </p>
      </div>
    </section>
  );
}
