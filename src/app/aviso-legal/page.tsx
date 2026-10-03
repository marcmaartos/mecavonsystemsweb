import type { Metadata } from "next";
import { LegalIdentity, LegalPage } from "@/components/LegalPage";
import { BRAND_NAME, HOLDER } from "@/config";

export const metadata: Metadata = {
  title: "Aviso legal | Mecavon Systems",
  description: "Datos identificativos y condiciones de uso de la web de Mecavon Systems.",
  alternates: { canonical: "/aviso-legal" },
};

// Texto según la LSSI-CE (Ley 34/2002). Conviene revisarlo con un asesor legal.
export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Aviso legal"
      sections={[
        {
          title: "Datos identificativos",
          body: <LegalIdentity />,
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
          body: (
            <p>
              Esta web se rige por la legislación española. Para cualquier controversia serán
              competentes los juzgados y tribunales de {HOLDER.city}, salvo que la ley disponga otra cosa.
            </p>
          ),
        },
      ]}
    />
  );
}
