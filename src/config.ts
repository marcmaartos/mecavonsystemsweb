// Datos que cambian a menudo. Todo lo marcado "PLACEHOLDER" hay que sustituirlo antes de publicar.
// Regla de la web: aquí solo va información verdadera. Si algo no está confirmado, se deja vacío o comentado.

export const SITE_URL = "https://mecavon.es"; // PLACEHOLDER: confirma el dominio definitivo

export const CTA_LABEL = "Auditoría gratuita";
export const CTA_SUBTEXT = "Te decimos cuánto dinero pierdes en una semana. Gratis y sin compromiso.";
export const CTA_HREF = "#auditoria";

export const WHATSAPP = {
  // Formato internacional sin "+" ni espacios. PLACEHOLDER: pon tu número real.
  number: "34XXXXXXXXX",
  message: "Hola, quiero la auditoría gratuita para mi taller",
};

export const whatsappUrl = () =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`;

/** Días desde la auditoría hasta que el sistema funciona. PLACEHOLDER: null mientras no esté confirmado. */
export const SETUP_DAYS: number | null = null;

export const setupTimeText = () =>
  SETUP_DAYS
    ? `En ${SETUP_DAYS} días desde la auditoría`
    : "Te confirmamos el plazo exacto en la auditoría";

export const COMPANY = {
  legalName: "[Razón social]", // PLACEHOLDER
  taxId: "[XXXXXXXX]", // PLACEHOLDER
  address: "[Dirección]", // PLACEHOLDER
  registry: "[Datos del Registro Mercantil pendientes]", // PLACEHOLDER (solo si es sociedad)
};

export const SUPPORT_HOURS = "De lunes a viernes, de 9:00 a 18:00"; // PLACEHOLDER: confirma el horario real

export const CONTACT_EMAIL = "hola@mecavon.es"; // PLACEHOLDER: buzón real

export const PHONE = {
  display: "+34 XXX XXX XXX", // PLACEHOLDER: como se muestra en la web
  tel: "+34XXXXXXXXX", // PLACEHOLDER: mismo número sin espacios, para el enlace tel:
};

export const PRIVACY_EMAIL = CONTACT_EMAIL; // email para ejercer derechos RGPD

export type SocialNetwork = "linkedin" | "instagram" | "facebook" | "youtube";

/** Redes sociales. Ocultas en el footer hasta que existan los perfiles. PLACEHOLDER: URLs provisionales. */
export const SOCIAL_LINKS: { network: SocialNetwork; url: string }[] = [
  { network: "linkedin", url: "https://www.linkedin.com/company/mecavon" },
  { network: "instagram", url: "https://www.instagram.com/mecavon" },
];

/** Activar cuando haya casos reales con permiso del cliente. Mientras sea false no se genera nada en el HTML. */
export const SHOW_TESTIMONIALS = false;

export const CALCULATOR = {
  workingDaysPerMonth: 22,
  defaults: { missedCallsPerDay: 3, averageTicket: 180, bookingRate: 30 },
};

export const PILOT = {
  text: "Programa piloto: Avanzado a 500 €/mes durante 90 días. Plazas limitadas",
};

export const PLANS: {
  name: string;
  price: number;
  goal: string;
  audience?: string;
  featured?: boolean;
  includes?: string;
  features: string[];
}[] = [
  {
    name: "Básico",
    price: 500,
    goal: "No perder llamadas",
    features: [
      "Llamadas perdidas atendidas por WhatsApp 24 h",
      "Solicitud de cita desde el chat",
      "Traspaso a una persona cuando hace falta",
    ],
  },
  {
    name: "Avanzado",
    price: 1000,
    goal: "Agenda y presupuestos",
    featured: true,
    includes: "Todo lo del Básico, más:",
    features: [
      "Confirmación y recordatorios de cita",
      "Lista de espera para huecos libres",
      "Seguimiento y aprobación de presupuestos por WhatsApp",
      "Aviso de vehículo listo",
      "Optimización mensual",
    ],
  },
  {
    name: "Premium",
    price: 2000,
    goal: "Clientes que vuelven",
    audience: "Para talleres grandes o con varios centros",
    includes: "Todo lo del Avanzado, más:",
    features: [
      "Reactivación de clientes que hace tiempo que no vienen",
      "Avisos de mantenimiento e ITV",
      "Seguimiento post-reparación y petición de reseñas",
      "Reunión mensual de resultados",
      "Soporte prioritario",
    ],
  },
];
