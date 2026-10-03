import type { Metadata } from "next";
import { LegalIdentity, LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Política de cookies | Mecavon Systems",
  description: "Qué cookies usa la web de Mecavon Systems y cómo puedes configurarlas.",
  alternates: { canonical: "/cookies" },
};

// Texto base. Si añades analítica o marketing, actualiza la tabla con las cookies reales que instalen.
export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      sections={[
        {
          title: "Quién es el responsable",
          body: <LegalIdentity />,
        },
        {
          title: "Qué son las cookies",
          body: (
            <p>
              Son pequeños archivos que la web guarda en tu navegador para recordar información,
              como tu elección sobre las propias cookies.
            </p>
          ),
        },
        {
          title: "Qué cookies usamos hoy",
          body: (
            <>
              <p>Ahora mismo esta web solo usa una cookie técnica, necesaria para respetar tu elección:</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead className="border-b border-line text-navy">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Nombre</th>
                      <th className="py-2 pr-4 font-semibold">Para qué sirve</th>
                      <th className="py-2 pr-4 font-semibold">Tipo</th>
                      <th className="py-2 font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line">
                      <td className="py-2 pr-4">mecavon_consent</td>
                      <td className="py-2 pr-4">Guardar tu elección sobre cookies</td>
                      <td className="py-2 pr-4">Técnica, propia</td>
                      <td className="py-2">6 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                No usamos cookies de analítica ni de marketing. Si en el futuro las añadimos, solo se
                activarán si las aceptas y lo indicaremos en esta página.
              </p>
            </>
          ),
        },
        {
          title: "Cómo cambiar tu elección",
          body: (
            <>
              <p>Puedes cambiarla cuando quieras desde aquí o desde el pie de cualquier página:</p>
              <CookieSettingsButton className="min-h-11 rounded-lg border-2 border-teal px-5 font-semibold text-teal hover:bg-teal hover:text-white" />
              <p>También puedes borrar las cookies desde la configuración de tu navegador.</p>
            </>
          ),
        },
      ]}
    />
  );
}
