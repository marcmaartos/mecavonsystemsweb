// Validación del formulario de auditoría (se ejecuta en el navegador antes de enviar a Web3Forms).

export type AuditField = "nombre" | "taller" | "telefono" | "email" | "contacto" | "horario" | "consentimiento";
export type AuditErrors = Partial<Record<AuditField, string>>;

export const CONTACT_OPTIONS = ["llamada", "whatsapp"] as const;
export const SCHEDULE_OPTIONS = ["manana", "mediodia", "tarde"] as const;

/** Móvil o fijo español, con o sin +34 / 0034, admitiendo espacios, puntos y guiones. */
export function isSpanishPhone(value: string) {
  const digits = value.replace(/[\s.\-()]/g, "").replace(/^(\+34|0034)/, "");
  return /^[6789]\d{8}$/.test(digits);
}

export function validateAudit(get: (field: AuditField) => string): AuditErrors {
  const errors: AuditErrors = {};
  if (!get("nombre")) errors.nombre = "Escribe tu nombre.";
  if (!get("taller")) errors.taller = "Escribe el nombre de tu taller.";
  if (!isSpanishPhone(get("telefono")))
    errors.telefono = "Escribe un teléfono español de 9 cifras, por ejemplo 612 345 678.";
  const email = get("email");
  if (!email) errors.email = "Escribe tu email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Revisa el email, por ejemplo nombre@taller.com.";
  if (!get("consentimiento")) errors.consentimiento = "Marca la casilla para que podamos contactarte.";
  return errors;
}
