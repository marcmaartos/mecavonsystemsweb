"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Consentimiento de cookies según la guía de la AEPD: aceptar y rechazar con el mismo peso,
// opción de configurar por categorías (desactivadas por defecto) y posibilidad de cambiarlo después.
// Hoy la web solo usa cookies técnicas; cuando añadas analítica o marketing, cárgalos solo si
// getConsent() devuelve true para su categoría.

const COOKIE = "mecavon_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 meses
const OPEN_EVENT = "open-cookie-settings";

export type Consent = { analytics: boolean; marketing: boolean; date: string };

export function getConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split("=")[1]));
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const value: Consent = { analytics, marketing, date: new Date().toISOString() };
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
}

/** Botón para reabrir la configuración (se usa en el footer). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Configurar cookies
    </button>
  );
}

const btn =
  "min-h-11 rounded-lg px-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Leer la cookie solo es posible en el navegador, así que se decide tras montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getConsent()) setOpen(true);
    const reopen = () => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setConfiguring(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  // Marca el <html> para que el botón flotante de WhatsApp no se solape con el banner.
  useEffect(() => {
    document.documentElement.dataset.cookieBanner = open ? "open" : "closed";
  }, [open]);

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setOpen(false);
    setConfiguring(false);
  };

  if (!open) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-title"
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(21,46,104,0.12)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-lg sm:rounded-2xl sm:border"
    >
      <h2 id="cookies-title" className="font-semibold text-navy">
        Cookies
      </h2>
      <p className="mt-2 text-sm leading-relaxed">
        Usamos cookies técnicas, necesarias para que la web funcione. Con tu permiso usaríamos
        también cookies de analítica y marketing. Más información en la{" "}
        <Link href="/cookies" className="font-medium text-navy underline underline-offset-2">
          política de cookies
        </Link>
        .
      </p>

      {configuring && (
        <fieldset className="mt-4 space-y-1 border-t border-line pt-3">
          <legend className="sr-only">Elige qué cookies aceptas</legend>
          <label className="flex min-h-11 items-center justify-between gap-4 text-sm">
            <span>
              <span className="font-medium text-navy">Técnicas</span> — siempre activas
            </span>
            <input type="checkbox" checked disabled className="h-5 w-5 accent-teal" />
          </label>
          <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm">
            <span>
              <span className="font-medium text-navy">Analítica</span> — saber qué partes de la web se usan
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-5 w-5 shrink-0 accent-teal"
            />
          </label>
          <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm">
            <span>
              <span className="font-medium text-navy">Marketing</span> — medir campañas de publicidad
            </span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="h-5 w-5 shrink-0 accent-teal"
            />
          </label>
        </fieldset>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {/* Aceptar y rechazar con el mismo diseño, como exige la AEPD. */}
        <button type="button" onClick={() => decide(false, false)} className={`${btn} bg-teal text-white hover:bg-teal-700`}>
          Rechazar
        </button>
        <button type="button" onClick={() => decide(true, true)} className={`${btn} bg-teal text-white hover:bg-teal-700`}>
          Aceptar
        </button>
        {configuring ? (
          <button
            type="button"
            onClick={() => decide(analytics, marketing)}
            className={`${btn} col-span-2 border-2 border-teal text-teal hover:bg-teal hover:text-white`}
          >
            Guardar mi elección
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfiguring(true)}
            className={`${btn} col-span-2 border-2 border-teal text-teal hover:bg-teal hover:text-white`}
          >
            Configurar
          </button>
        )}
      </div>
    </section>
  );
}
