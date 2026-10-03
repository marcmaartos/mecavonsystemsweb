import Image from "next/image";
import { CalendarCheck, FileClock, FileCheck2, PhoneMissed, Check } from "lucide-react";
import { CTA_HREF, CTA_LABEL, CTA_SUBTEXT } from "@/config";
import { photoExists, photoSrc } from "./Photo";

// Foto de fondo: copia una foto real del taller (horizontal, ~2000 px de ancho) en public/img/hero.jpg.
// Mientras no exista, el hero se queda en azul marino liso (un recuadro "Foto" aquí taparía el titular).
const HERO_PHOTO = "hero.jpg";
const hasPhoto = photoExists(HERO_PHOTO);

const ACTIVITY = [
  {
    time: "09:12",
    icon: PhoneMissed,
    title: "Llamada perdida",
    detail: "Mecavon le escribió por WhatsApp al minuto",
  },
  {
    time: "09:31",
    icon: CalendarCheck,
    title: "Cita reservada",
    detail: "Cambio de pastillas, jueves a las 10:00",
  },
  {
    time: "11:05",
    icon: FileClock,
    title: "Presupuesto sin respuesta",
    detail: "3 días esperando. Recordatorio enviado",
  },
  {
    time: "12:48",
    icon: FileCheck2,
    title: "Presupuesto aceptado",
    detail: "Embrague Seat León",
  },
];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy text-white">
      {hasPhoto && (
        <>
          {/* Sin carga diferida a propósito: es lo primero que se ve al entrar. */}
          <Image
            src={photoSrc(HERO_PHOTO)}
            alt="Coche desmontado dentro de un taller"
            fill
            loading="eager"
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          {/* Móvil y tableta: velo uniforme al 90 %. Escritorio: degradado del 92 % (lado del texto)
              al 70 % (lado de la tarjeta) para que el coche se intuya a la derecha. */}
          <div
            className="absolute inset-0 -z-10 bg-navy/90 lg:bg-transparent lg:bg-linear-to-r lg:from-navy/92 lg:to-navy/70"
            aria-hidden="true"
          />
        </>
      )}

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="text-balance text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            Tú reparas.
            <br />
            Mecavon se encarga del resto.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Contestamos las llamadas que no puedes coger, recordamos los presupuestos que se
            quedan en el aire y avisamos a tus clientes cuando toca volver. Todo por WhatsApp,
            sin que sueltes la llave.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start">
            {/* Botón principal y su línea de apoyo van juntos, con el mismo ancho. */}
            <div className="flex flex-col sm:w-72">
              <a
                href={CTA_HREF}
                className="flex min-h-14 items-center justify-center rounded-lg bg-teal px-7 text-center font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {CTA_LABEL}
              </a>
              <p className="mt-2 text-sm leading-snug text-mist">{CTA_SUBTEXT}</p>
            </div>
            <a
              href="#como-funciona"
              className="mt-3 flex min-h-14 items-center justify-center rounded-lg border-2 border-white/70 px-7 text-center font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-0"
            >
              Ver cómo funciona
            </a>
          </div>

          <p className="mt-8 flex items-start gap-2 text-sm text-mist">
            <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0" aria-hidden="true" />
            Con tu número y tu WhatsApp de siempre. Nada que instalar en el taller.
          </p>
        </div>

        <div className="lg:col-span-5">
          <figure className="rounded-2xl bg-white p-5 text-navy shadow-2xl shadow-black/25 sm:p-6">
            <figcaption className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-semibold">Hoy en tu taller</span>
              <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-graphite">
                Ejemplo
              </span>
            </figcaption>

            <ol className="divide-y divide-line">
              {ACTIVITY.map(({ time, icon: Icon, title, detail }) => (
                <li key={time} className="flex gap-4 py-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper text-navy">
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold">{title}</span>
                      <time className="text-sm tabular-nums text-graphite">{time}</time>
                    </span>
                    <span className="mt-0.5 block text-sm text-graphite">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="flex items-center justify-between rounded-xl bg-navy px-4 py-3.5 text-white">
              <span className="text-sm text-mist">Trabajo recuperado hoy</span>
              <span className="text-xl font-bold tabular-nums">780 €</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
