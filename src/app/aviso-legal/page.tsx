import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BRAND_NAME, CONTACT_EMAIL, PHONE, SITE_URL } from "@/config";

export const metadata: Metadata = {
  title: "Aviso legal | Mecavon Systems",
  description: "Datos identificativos y condiciones de uso de la web de Mecavon Systems.",
  alternates: { canonical: "/aviso-legal" },
};

// PLACEHOLDER: texto base según la LSSI-CE (Ley 34/2002). Revísalo con un asesor legal.
export default function LegalNoticePage() {
  const email = CONTACT_EMAIL;
  return (
    <LegalPage
      title="Aviso legal"
      sections={[
        {
          title: "Datos identificativos",
          body: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Titular: {BRAND_NAME}</li>
              <li>Email: {email}</li>
              <li>Teléfono: {PHONE.display}</li>
              <li>Web: {SITE_URL}</li>
            </ul>
          ),
        },
        {
          title: "Uso de la web",
          body: (
            <p>
              Al navegar por esta web aceptas usarla de forma lícita. La información que publicamos
              describe nuestros servicios y puede cambiar; las condiciones de cada contratación se
              recogen en su propio contrato.
            </p>
          ),
        },
        {
          title: "Propiedad intelectual",
          body: (
            <p>
              Los textos, el logotipo y el diseño de esta web pertenecen a {BRAND_NAME} o
              se usan con permiso. No puedes copiarlos ni reutilizarlos sin nuestra autorización.
            </p>
          ),
        },
        {
          title: "Responsabilidad",
          body: (
            <p>
              Las estimaciones de la calculadora son orientativas y no son una promesa de
              resultados. No respondemos del contenido de webs externas a las que enlacemos.
            </p>
          ),
        },
        {
          title: "Legislación aplicable",
          body: <p>Esta web se rige por la legislación española. [Jurisdicción competente pendiente].</p>,
        },
      ]}
    />
  );
}
