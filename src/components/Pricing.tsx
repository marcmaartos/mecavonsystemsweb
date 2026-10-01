import { Check } from "lucide-react";
import { CTA_HREF, CTA_LABEL, PILOT, PLANS } from "@/config";

const price = new Intl.NumberFormat("es-ES", { useGrouping: "always" } as Intl.NumberFormatOptions);

export function Pricing() {
  return (
    <section id="precios" className="scroll-mt-16 bg-paper py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            Precios claros, sin letra pequeña.
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Nuestro equipo lo monta y lo gestiona. Tú eliges hasta dónde quieres llegar.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-xl bg-navy-600 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-semibold sm:text-lg">{PILOT.text}</p>
          <a
            href={CTA_HREF}
            className="flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-teal px-6 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA_LABEL}
          </a>
        </div>

        <ul className="mt-6 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-2xl bg-white p-7 sm:p-8 ${
                plan.featured ? "border-2 border-navy shadow-xl shadow-navy/10" : "border border-line"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                  Recomendado
                </span>
              )}
              <h3 className="text-xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-1 text-graphite">{plan.goal}</p>
              {plan.audience && <p className="mt-2 text-sm font-medium text-navy-600">{plan.audience}</p>}
              <p className="mt-6 flex items-baseline gap-1.5 text-navy">
                <span className="text-4xl font-bold tracking-tight">{price.format(plan.price)} €</span>
                <span className="text-graphite">/mes</span>
              </p>

              {plan.includes && <p className="mt-6 text-sm font-medium text-navy">{plan.includes}</p>}
              <ul className={`${plan.includes ? "mt-3" : "mt-6"} flex-1 space-y-3`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.95rem] leading-snug">
                    <Check size={20} strokeWidth={2.5} className="shrink-0 text-teal" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={CTA_HREF}
                className={`mt-8 flex min-h-12 items-center justify-center rounded-lg px-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                  plan.featured
                    ? "bg-teal text-white hover:bg-teal-700"
                    : "border-2 border-teal text-teal hover:bg-teal hover:text-white"
                }`}
              >
                {CTA_LABEL}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-graphite">IVA no incluido. Sin permanencia: pagas mes a mes.</p>
      </div>
    </section>
  );
}
