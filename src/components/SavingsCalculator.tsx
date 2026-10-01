"use client";

import { useId, useState } from "react";
import { CALCULATOR, CTA_HREF, CTA_LABEL } from "@/config";

const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: "always",
} as Intl.NumberFormatOptions);
const integer = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 });

type FieldKey = keyof typeof CALCULATOR.defaults;

const FIELDS: { key: FieldKey; label: string; hint: string; min: number; max: number; step: number }[] = [
  { key: "missedCallsPerDay", label: "Llamadas perdidas al día", hint: "Las que no coges o llegan fuera de horario", min: 0, max: 100, step: 1 },
  { key: "averageTicket", label: "Ticket medio (€)", hint: "Lo que factura de media un trabajo", min: 0, max: 10000, step: 10 },
  { key: "bookingRate", label: "% que acabaría en cita", hint: "Si alguien les hubiera contestado a tiempo", min: 0, max: 100, step: 5 },
];

function clamp(n: number, min: number, max: number) {
  return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : 0;
}

export function SavingsCalculator() {
  const id = useId();
  // Guardamos el texto tal cual para que se pueda borrar el campo mientras se escribe.
  const [raw, setRaw] = useState<Record<FieldKey, string>>(() => ({
    missedCallsPerDay: String(CALCULATOR.defaults.missedCallsPerDay),
    averageTicket: String(CALCULATOR.defaults.averageTicket),
    bookingRate: String(CALCULATOR.defaults.bookingRate),
  }));

  const value = (f: (typeof FIELDS)[number]) => clamp(parseFloat(raw[f.key].replace(",", ".")), f.min, f.max);
  const [calls, ticket, rate] = FIELDS.map(value);
  const lostJobs = calls * CALCULATOR.workingDaysPerMonth * (rate / 100);
  const lostPerMonth = Math.round(lostJobs * ticket);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {FIELDS.map((f) => (
          <div key={f.key} className="flex flex-col">
            <label htmlFor={`${id}-${f.key}`} className="text-sm font-medium text-navy">
              {f.label}
            </label>
            <input
              id={`${id}-${f.key}`}
              type="number"
              inputMode="decimal"
              min={f.min}
              max={f.max}
              step={f.step}
              value={raw[f.key]}
              onChange={(e) => setRaw((r) => ({ ...r, [f.key]: e.target.value }))}
              aria-describedby={`${id}-${f.key}-hint`}
              className="mt-2 block min-h-12 w-full rounded-lg border border-line bg-white px-4 text-lg font-semibold text-navy tabular-nums focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
            />
            <span id={`${id}-${f.key}-hint`} className="mt-1.5 text-xs leading-snug text-graphite">
              {f.hint}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-navy p-6 text-white sm:p-7">
        <p className="text-mist">Pierdes aprox.</p>
        <output
          htmlFor={FIELDS.map((f) => `${id}-${f.key}`).join(" ")}
          aria-live="polite"
          className="mt-1 block text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
        >
          {euros.format(lostPerMonth)} <span className="text-2xl font-semibold sm:text-3xl">al mes</span>
        </output>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Son unos {integer.format(lostJobs)} trabajos al mes que se van a otro taller, contando{" "}
          {CALCULATOR.workingDaysPerMonth} días laborables.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-graphite">Estimación orientativa. En la auditoría lo medimos con tus llamadas reales.</p>
        <a
          href={CTA_HREF}
          className="flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-teal px-6 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          {CTA_LABEL}
        </a>
      </div>
    </div>
  );
}
