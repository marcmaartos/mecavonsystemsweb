// Datos que cambian a menudo. Todo lo marcado "PLACEHOLDER" hay que sustituirlo antes de publicar.
// Regla de la web: aquí solo va información verdadera. Si algo no está confirmado, se deja vacío o comentado.

export const SITE_URL = "https://mecavon-systems.vercel.app"; // cambiar cuando haya dominio propio

export const CTA_LABEL = "Auditoría gratuita";
export const CTA_SUBTEXT = "Te decimos cuánto dinero pierdes en una semana. Gratis y sin compromiso.";
export const CTA_HREF = "#auditoria";

export const WHATSAPP = {
  // Formato internacional sin "+", espacios ni guiones (lo exige wa.me).
  number: "34686767387",
  /** Mensaje predefinido de todos los enlaces de WhatsApp de la web. */
  message: "Hola, tengo un taller y me interesa la auditoría gratuita",
};

/** Días desde la auditoría hasta que el sistema funciona. PLACEHOLDER: null mientras no esté confirmado. */
export const SETUP_DAYS: number | null = null;

export const setupTimeText = () =>
  SETUP_DAYS
    ? `En ${SETUP_DAYS} días desde la auditoría`
    : "Te confirmamos el plazo exacto en la auditoría";

/** Nombre con el que se identifica la web. Sin CIF/NIF ni datos de empresa por decisión del titular. */
export const BRAND_NAME = "Mecavon Systems";

/** Titular de la web para las páginas legales (todavía no hay sociedad constituida). */
export const HOLDER = {
  name: "Marc Martos Salvany",
  city: "[TU CIUDAD]", // PLACEHOLDER: ciudad del domicilio y de los juzgados competentes
};
export const HOLDER_TEXT = `${HOLDER.name}, que opera bajo el nombre comercial ${BRAND_NAME}`;

export const SUPPORT_HOURS = "De lunes a viernes, de 9:00 a 18:00"; // PLACEHOLDER: confirma el horario real

export const CONTACT_EMAIL = "marcmartossalvany@gmail.com";

export const PHONE = {
  display: "+34 686767387", // formato sin espacios (no se usa en la web ahora mismo)
  cardDisplay: "+34 686 76 73 87", // como se muestra en contacto, footer y páginas legales
  tel: "+34686767387", // mismo número sin espacios, para el enlace tel:
};

export const PRIVACY_EMAIL = CONTACT_EMAIL; // email para ejercer derechos RGPD

// Enlaces de contacto: todos los botones y enlaces de la web usan estos tres, para que sean idénticos.
/** https://wa.me/34686767387?text=Hola%2C%20tengo%20un%20taller%20y%20me%20interesa%20la%20auditor%C3%ADa%20gratuita */
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`;
/** mailto:marcmartossalvany@gmail.com?subject=Auditor%C3%ADa%20gratuita%20Mecavon */
export const EMAIL_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Auditoría gratuita Mecavon")}`;
/** tel:+34686767387 */
export const PHONE_HREF = `tel:${PHONE.tel}`;

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
  text: "Primer mes de Taller Pro a 990 €",
  /** Línea pequeña bajo el texto del banner. */
  note: "Después 1.490 €/mes · Solo 3 talleres · Sin permanencia",
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
  /** Título dentro de la caja verde de funcionalidades. */
  boxTitle: string;
  features: PlanFeature[];
  /** Nota bajo la lista (solo si el plan tiene ganchos). */
  hookNote?: string;
}[] = [
  {
    name: "Taller",
    price: 890,
    goal: "Para que no se te escape ningún cliente",
    boxTitle: "Qué incluye",
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
    price: 1490,
    goal: "Para llenar la agenda, no solo ordenarla",
    featured: true,
    includes: "Todo lo del Taller, sin límites, más:",
    boxTitle: "Lo que añade Pro",
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
