import { CONTACT_OPTIONS, SCHEDULE_OPTIONS, validateAudit, type AuditField } from "@/lib/audit";

const MAX: Record<AuditField, number> = {
  nombre: 100,
  taller: 150,
  telefono: 20,
  email: 200,
  contacto: 20,
  horario: 20,
  consentimiento: 10,
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Formato no válido" }, { status: 400 });
  }

  const get = (f: AuditField) => {
    const v = body[f];
    return typeof v === "string" ? v.trim().slice(0, MAX[f]) : "";
  };

  // Campo trampa relleno: es un bot. Respondemos OK para no darle pistas.
  if (typeof body.web === "string" && body.web.trim()) return Response.json({ ok: true });

  if (Object.keys(validateAudit(get)).length > 0) {
    return Response.json({ error: "Faltan datos o no son válidos" }, { status: 422 });
  }

  const solicitud = {
    nombre: get("nombre"),
    taller: get("taller"),
    telefono: get("telefono"),
    email: get("email"),
    contacto: (CONTACT_OPTIONS as readonly string[]).includes(get("contacto")) ? get("contacto") : "llamada",
    horario: (SCHEDULE_OPTIONS as readonly string[]).includes(get("horario")) ? get("horario") : "manana",
  };

  // PENDIENTE: enviar `solicitud` a tu email o CRM (por ejemplo con Resend, Brevo o HubSpot).
  // Mientras tanto solo queda registrada en los logs del servidor.
  console.info("[auditoria] Nueva solicitud:", solicitud.taller, solicitud.contacto, solicitud.horario);

  return Response.json({ ok: true });
}
