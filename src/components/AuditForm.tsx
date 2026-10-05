"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { CONTACT_EMAIL, CTA_LABEL, WHATSAPP_HREF } from "@/config";
import { validateAudit, type AuditErrors, type AuditField } from "@/lib/audit";

type Status = "idle" | "sending" | "sent" | "error";

// Web3Forms: la clave de acceso es pública por diseño (solo permite enviar a tu email).
// Se configura con la variable de entorno NEXT_PUBLIC_WEB3FORMS_KEY (en Vercel y en .env.local).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const CONTACT_LABELS: Record<string, string> = { llamada: "Llamada", whatsapp: "WhatsApp" };
const SCHEDULE_LABELS: Record<string, string> = { manana: "Por la mañana", mediodia: "A mediodía", tarde: "Por la tarde" };

const inputClass =
  "mt-2 block min-h-12 w-full rounded-lg border border-line bg-white px-4 text-navy placeholder:text-graphite/70 transition-colors focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/20 aria-[invalid=true]:border-red-700";

function Required() {
  return (
    <span className="text-red-700" aria-hidden="true">
      {" "}*
    </span>
  );
}

function Field({
  id,
  label,
  error,
  required,
  ...props
}: {
  id: AuditField;
  label: string;
  error?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required ? <Required /> : <span className="font-normal text-graphite"> (opcional)</span>}
      </label>
      <input
        id={id}
        name={id}
        className={inputClass}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<AuditErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (f: string) => String(data.get(f) ?? "").trim();

    const found = validateAudit((f) => get(f));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Antispam: la casilla "botcheck" está oculta; solo un bot la marcaría. No se envía nada.
    if (data.get("botcheck")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      if (!WEB3FORMS_KEY) throw new Error("Falta NEXT_PUBLIC_WEB3FORMS_KEY");
      const taller = get("taller");
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva solicitud de auditoría – ${taller}`,
          from_name: "Web Mecavon",
          replyto: get("email"),
          // Campos con etiqueta clara: así aparecen en el email.
          Nombre: get("nombre"),
          Taller: taller,
          Teléfono: get("telefono"),
          Email: get("email"),
          "Prefiere que le contacten por": CONTACT_LABELS[get("contacto")] ?? get("contacto"),
          "Franja horaria": SCHEDULE_LABELS[get("horario")] ?? get("horario"),
          "Acepta la política de privacidad": "Sí",
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) throw new Error(result?.message ?? `HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("No se pudo enviar el formulario de auditoría:", err);
      // No se vacía el formulario: el cliente conserva lo que ha escrito.
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-8">
        <CircleCheck size={44} strokeWidth={2} className="text-teal" aria-hidden="true" />
        <p className="text-xl font-semibold text-teal-700">
          ¡Recibido! Te contactaremos muy pronto para empezar tu auditoría.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <p className="text-sm text-graphite">
        Los campos con <span className="text-red-700">*</span> son obligatorios.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="nombre" label="Tu nombre" autoComplete="name" required error={errors.nombre} />
        <Field id="taller" label="Nombre del taller" autoComplete="organization" required error={errors.taller} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="telefono"
          label="Teléfono"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="612 345 678"
          required
          error={errors.telefono}
        />
        <Field id="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-navy">¿Cómo prefieres que te contactemos?</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {[
            { value: "llamada", label: "Llamada" },
            { value: "whatsapp", label: "Prefiero WhatsApp" },
          ].map((o, i) => (
            <label
              key={o.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-line px-4 has-[:checked]:border-teal has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-teal/20"
            >
              <input
                type="radio"
                name="contacto"
                value={o.value}
                defaultChecked={i === 0}
                className="h-5 w-5 accent-teal focus:outline-none"
              />
              <span className="text-navy">{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="horario" className="text-sm font-medium text-navy">
          ¿Qué franja te viene mejor?
        </label>
        <select id="horario" name="horario" className={inputClass} defaultValue="manana">
          <option value="manana">Por la mañana</option>
          <option value="mediodia">A mediodía</option>
          <option value="tarde">Por la tarde</option>
        </select>
      </div>

      {/* Antispam (honeypot) que reconoce Web3Forms: oculto para personas; solo un bot lo marcaría. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            required
            aria-required
            className="mt-0.5 h-6 w-6 shrink-0 accent-teal focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/20"
            aria-invalid={errors.consentimiento ? true : undefined}
            aria-describedby={errors.consentimiento ? "consentimiento-error" : undefined}
          />
          <label htmlFor="consentimiento" className="text-sm leading-relaxed">
            He leído la{" "}
            <Link href="/privacidad" target="_blank" className="font-medium text-navy underline underline-offset-2">
              política de privacidad
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </Link>{" "}
            y acepto que Mecavon Systems use estos datos solo para la auditoría.
            <Required />
          </label>
        </div>
        {errors.consentimiento && (
          <p id="consentimiento-error" className="mt-1.5 text-sm text-red-700">
            {errors.consentimiento}
          </p>
        )}
      </div>

      <div className="mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-14 w-full rounded-lg bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Enviando..." : `Pedir mi ${CTA_LABEL.toLowerCase()}`}
        </button>
        <p className="mt-2 text-xs text-graphite">
          Al enviar aceptas nuestra{" "}
          <Link href="/privacidad" className="underline underline-offset-2 hover:text-navy">
            política de privacidad
          </Link>
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          No se ha podido enviar. Escríbenos por{" "}
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener" className="underline underline-offset-2">
            WhatsApp
          </a>{" "}
          o a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
