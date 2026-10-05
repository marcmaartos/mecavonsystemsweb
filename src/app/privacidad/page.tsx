import type { Metadata } from "next";
import { LegalIdentity, LegalPage } from "@/components/LegalPage";
import { PRIVACY_EMAIL } from "@/config";

export const metadata: Metadata = {
  title: "Política de privacidad | Mecavon Systems",
  description: "Cómo trata Mecavon Systems los datos que nos envías a través de la web.",
  alternates: { canonical: "/privacidad" },
};

// Conviene revisar este texto con un asesor legal.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      sections={[
        {
          title: "Quién es el responsable",
          body: <LegalIdentity />,
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
          body: (
            <p>
              Conservamos los datos del formulario mientras dure la relación y, si no llegas a ser
              cliente, como máximo 12 meses desde el último contacto.
            </p>
          ),
        },
        {
          title: "Con quién los compartimos",
          body: (
            <>
              <p>No vendemos tus datos. Solo los tratan, por nuestra cuenta, estos proveedores:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Vercel: alojamiento de la web.</li>
                <li>Web3Forms: envío de los datos del formulario de auditoría a nuestro correo.</li>
                <li>Google: correo electrónico, si nos escribes por email.</li>
                <li>WhatsApp (Meta): mensajería, si nos escribes por WhatsApp.</li>
              </ul>
            </>
          ),
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
