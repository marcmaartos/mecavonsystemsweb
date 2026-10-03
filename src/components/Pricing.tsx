import { BadgeEuro, Check, Star, TrendingUp } from "lucide-react";
import { CTA_HREF, CTA_LABEL, PILOT, PLANS, PRICING_PERKS } from "@/config";

const price = new Intl.NumberFormat("es-ES", { useGrouping: "always" } as Intl.NumberFormatOptions);

const PERK_ICONS = { zero: BadgeEuro, upgrade: TrendingUp };

/** Caja verde clara de la lista de funcionalidades: la misma en los dos packs. */
const featuresBox = "flex-1 rounded-xl border border-teal/30 bg-teal/5 p-5";
const featuresBoxTitle = "mb-3 text-sm font-semibold text-teal-700";

/** Mismo botón en los dos packs: verde sólido, texto blanco, mismo tamaño, radio y hover. */
const planButton =
  "flex min-h-12 items-center justify-center rounded-lg bg-teal px-6 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function Pricing() {
  return (
    <section id="precios" className="scroll-mt-16 bg-paper py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            Precios claros, sin letra pequeña.
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Lo montamos y lo gestionamos nosotros. Tú eliges hasta dónde llegar.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-xl bg-navy-600 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-semibold sm:text-lg">{PILOT.text}</p>
            <p className="mt-1 text-sm text-white/80">{PILOT.note}</p>
          </div>
          <a
            href={CTA_HREF}
            className="flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-teal px-6 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA_LABEL}
          </a>
        </div>

        {/* En móvil van uno debajo de otro con Taller Pro primero; en escritorio, Taller a la izquierda. */}
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-2xl bg-white p-7 sm:p-9 ${
                plan.featured
                  ? "order-first border-2 border-navy shadow-xl shadow-navy/10 md:order-none"
                  : "border-2 border-line"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white sm:left-9">
                  Recomendado
                </span>
              )}
              <h3 className="text-2xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-1 text-graphite">{plan.goal}</p>
              <p className="mt-6 flex items-baseline gap-1.5 text-navy">
                <span className="text-5xl font-bold tracking-tight">{price.format(plan.price)} €</span>
                <span className="text-graphite">/mes</span>
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-graphite">
                <Check size={16} strokeWidth={2.5} className="shrink-0 text-teal" aria-hidden="true" />
                Sin permanencia · Cancela cuando quieras
              </p>

              {plan.includes && <p className="mt-7 text-sm font-semibold text-navy">{plan.includes}</p>}
              {/* Misma caja en los dos packs. flex-1 la estira para que el botón quede alineado en ambas tarjetas. */}
              <div className={`${plan.includes ? "mt-3" : "mt-7"} flex flex-1 flex-col`}>
                <div className={featuresBox}>
                <p className={featuresBoxTitle}>{plan.boxTitle}</p>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex gap-3 text-[0.95rem] leading-snug">
                      {f.hook ? (
                        <Star size={20} strokeWidth={2} className="shrink-0 fill-teal text-teal" aria-hidden="true" />
                      ) : (
                        <Check size={20} strokeWidth={2.5} className="shrink-0 text-teal" aria-hidden="true" />
                      )}
                      <span>
                        {f.text}
                        {f.hook && <span className="sr-only"> (muestra de Taller Pro)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
              {plan.hookNote && (
                <p className="mt-5 flex items-center gap-2 rounded-lg bg-paper px-3 py-2 text-sm font-medium text-navy">
                  <Star size={16} strokeWidth={2} className="shrink-0 fill-teal text-teal" aria-hidden="true" />
                  {plan.hookNote}
                </p>
              )}

              <a href={CTA_HREF} className={`mt-8 ${planButton}`}>
                {CTA_LABEL}
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRICING_PERKS.map((perk) => {
            const Icon = PERK_ICONS[perk.icon];
            return (
              <li key={perk.text} className="flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4">
                <Icon size={24} strokeWidth={2} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                <span className="font-medium leading-snug text-navy">{perk.text}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm text-graphite">IVA no incluido. Sin permanencia: pagas mes a mes.</p>
      </div>
    </section>
  );
}
