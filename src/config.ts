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
  text: "Programa piloto: Taller Pro a 1.000 €/mes durante 90 días. Solo 3 talleres.",
};

export type PlanFeature = {
  text: string;
  /** Gancho: muestra limitada de algo que Taller Pro hace sin límite. Se marca con una estrella. */
  hook?: boolean;
};

export const PLANS: {
  name: string;
  price: number;
  goal: string;
  featured?: boolean;
  includes?: string;
  features: PlanFeature[];
  /** Nota bajo la lista (solo si el plan tiene ganchos). */
  hookNote?: string;
}[] = [
  {
    name: "Taller",
    price: 890,
    goal: "Para que no se te escape ningún cliente",
    features: [
      { text: "Llamadas perdidas atendidas por WhatsApp 24 h" },
      { text: "Citas, confirmación y recordatorios" },
      { text: "Seguimiento de presupuestos por WhatsApp" },
      { text: "Aviso de vehículo listo y traspaso a una persona" },
      { text: "1 campaña de reactivación de clientes al trimestre", hook: true },
      { text: "Petición de reseñas en Google a 20 clientes al mes", hook: true },
      { text: "Informe mensual con «lo que podrías recuperar con Pro»", hook: true },
    ],
    hookNote: "Incluye una muestra de Taller Pro",
  },
  {
    name: "Taller Pro",
    price: 2000,
    goal: "Para llenar la agenda, no solo ordenarla",
    featured: true,
    includes: "Todo lo del Taller, sin límites, más:",
    features: [
      { text: "Reactivación continua de clientes" },
      { text: "Avisos de mantenimiento e ITV" },
      { text: "Lista de espera para huecos libres" },
      { text: "Seguimiento post-reparación y reseñas a todos los clientes" },
      { text: "Reunión mensual de resultados y optimización" },
      { text: "Soporte prioritario y varios centros" },
    ],
  },
];

export const PRICING_PERKS = [
  { icon: "zero", text: "Sin coste de alta" },
  { icon: "upgrade", text: "¿Subes a Pro en los primeros 3 meses? Te descontamos tu último mes de Taller" },
] as const;
