"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { CTA_LABEL } from "@/config";
import { validateAudit, type AuditErrors, type AuditField } from "@/lib/audit";

type Status = "idle" | "sending" | "sent" | "error";

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
  const [viaWhatsApp, setViaWhatsApp] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validateAudit((f) => String(data.get(f) ?? "").trim());
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/auditoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error();
      setViaWhatsApp(data.get("contacto") === "whatsapp");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-8">
        <CircleCheck size={44} strokeWidth={2} className="text-teal" aria-hidden="true" />
        <h3 className="text-2xl font-semibold text-navy">¡Recibido! Tu auditoría está en marcha.</h3>
        <p className="leading-relaxed">
          {viaWhatsApp
            ? "Te escribimos por WhatsApp en la franja que has elegido para empezar."
            : "Te llamamos en la franja que has elegido para empezar."}{" "}
          En una semana te decimos cuánto dinero se te está escapando.
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
        <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
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

      {/* Campo trampa para bots: invisible para personas. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="web">No rellenar</label>
        <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 min-h-14 rounded-lg bg-teal px-7 font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-70"
      >
        {status === "sending" ? "Enviando…" : `Pedir mi ${CTA_LABEL.toLowerCase()}`}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.
        </p>
      )}
    </form>
  );
}
