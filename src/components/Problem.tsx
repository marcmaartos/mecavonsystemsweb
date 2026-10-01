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
      {/* En móvil el orden es texto, tarjetas y foto. En escritorio la foto sube a la columna izquierda. */}
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-10">
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
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

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
          {PAINS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="h-full rounded-2xl border border-line p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-navy">
                  <Icon size={24} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {mechanic && (
          <Image
            src={photoSrc(MECHANIC_PHOTO)}
            alt="Mecánico revisando los bajos de un coche en el elevador"
            width={mechanic.width}
            height={mechanic.height}
            loading="lazy"
            sizes="(min-width: 1152px) 450px, (min-width: 1024px) 40vw, 100vw"
            className="max-h-[420px] w-full rounded-2xl object-cover object-[center_30%] shadow-lg shadow-navy/10 lg:col-span-5 lg:col-start-1 lg:row-start-2"
          />
        )}
      </div>
    </section>
  );
}
