import { PhoneMissed, FileClock, CalendarX2, ClipboardList } from "lucide-react";
import { Reveal } from "./Reveal";
import Image from "next/image";
import { jpegSize, photoSrc } from "./Photo";

// Copia la foto en public/img/mecanico.jpg. Si no existe, la sección se muestra sin foto.
const MECHANIC_PHOTO = "mecanico.jpg";
const mechanic = jpegSize(MECHANIC_PHOTO);

const PAINS = [
  {
    icon: PhoneMissed,
    title: "Llamadas que nadie coge",
    text: "Con las manos en un motor no puedes contestar. Ese cliente no deja mensaje: llama al siguiente taller de la lista.",
  },
  {
    icon: FileClock,
    title: "Presupuestos en el aire",
    text: "Lo mandas el martes y el viernes sigue sin respuesta. Nadie tiene un rato para llamar y preguntar.",
  },
  {
    icon: CalendarX2,
    title: "Clientes que no vuelven",
    text: "La revisión, el cambio de aceite, la ITV. Si nadie se lo recuerda, acaba haciéndolo en otro sitio.",
  },
  {
    icon: ClipboardList,
    title: "Horas de oficina",
    text: "Apuntar citas, confirmarlas, moverlas. Cada minuto al teléfono es un minuto fuera del elevador.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="scroll-mt-16 bg-white py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Fila 1: texto (centrado en vertical) a la izquierda y foto a la derecha. En móvil, la foto va debajo del botón. */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem] md:text-3xl lg:text-[2.35rem]">
              Tu taller no pierde dinero en el elevador. Lo pierde en el teléfono.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              No es culpa de cómo trabajas. Es que nadie puede estar debajo de un coche y al
              teléfono a la vez.
            </p>
            <p className="mt-8 text-lg font-semibold text-navy">¿Cuántas llamadas se te escaparon esta semana?</p>
            <a
              href="#calculadora"
              className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-lg border-2 border-navy px-7 font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto"
            >
              Calcula lo que pierdes
            </a>
          </div>

          {mechanic && (
            // Cuadrada en escritorio y 4/3 en móvil, recortada repartiendo entre arriba y abajo (center 40 %).
            <Image
              src={photoSrc(MECHANIC_PHOTO)}
              alt="Mecánico revisando los bajos de un coche en el elevador"
              width={mechanic.width}
              height={mechanic.height}
              loading="lazy"
              sizes="(min-width: 1152px) 530px, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] h-auto w-full rounded-2xl object-cover object-[center_40%] shadow-lg shadow-navy/10 md:aspect-square"
            />
          )}
        </div>

        {/* Fila 2: las 4 tarjetas (4 columnas en escritorio, 2x2 en tablet, una columna en móvil). */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {PAINS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="h-full rounded-2xl border border-line px-6 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-navy">
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
