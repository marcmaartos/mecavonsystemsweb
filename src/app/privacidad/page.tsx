import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { COMPANY, PRIVACY_EMAIL } from "@/config";

export const metadata: Metadata = {
  title: "Política de privacidad | Mecavon Systems",
  description: "Cómo trata Mecavon Systems los datos que nos envías a través de la web.",
  alternates: { canonical: "/privacidad" },
};

// PLACEHOLDER: texto base. Revísalo con un asesor legal antes de publicar la web.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      sections={[
        {
          title: "Quién es el responsable",
          body: (
            <p>
              {COMPANY.legalName}, con CIF {COMPANY.taxId} y domicilio en {COMPANY.address}. Puedes
              escribirnos a {PRIVACY_EMAIL}.
            </p>
          ),
        },
        {
          title: "Qué datos recogemos",
          body: (
            <p>
              Los que nos das en el formulario de auditoría: nombre, nombre del taller, teléfono,
              email (si lo indicas) y cómo prefieres que te contactemos.
            </p>
          ),
        },
        {
          title: "Para qué los usamos",
          body: (
            <p>
              Solo para contactarte y hacerte la auditoría que nos has pedido. No los usamos para
              nada más ni los vendemos a nadie.
            </p>
          ),
        },
        {
          title: "Base legal",
          body: <p>Tu consentimiento, que das al marcar la casilla del formulario. Puedes retirarlo cuando quieras.</p>,
        },
        {
          title: "Cuánto tiempo los guardamos",
          body: <p>Mientras dure la relación contigo y, después, el tiempo que obligue la ley. [Plazo concreto pendiente].</p>,
        },
        {
          title: "Con quién los compartimos",
          body: <p>[Lista de proveedores que tratan datos por cuenta de Mecavon pendiente: alojamiento web, email, WhatsApp, CRM].</p>,
        },
        {
          title: "Tus derechos",
          body: (
            <p>
              Puedes pedir acceder, corregir o borrar tus datos, oponerte a su uso o pedir su
              portabilidad escribiendo a {PRIVACY_EMAIL}. Si crees que no los tratamos bien, puedes
              reclamar ante la Agencia Española de Protección de Datos (aepd.es).
            </p>
          ),
        },
      ]}
    />
  );
}
