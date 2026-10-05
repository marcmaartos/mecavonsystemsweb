import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SITE_URL } from "@/config";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Automatización gestionada para talleres: atendemos las llamadas perdidas por WhatsApp, cerramos citas, seguimos presupuestos y hacemos que tus clientes vuelvan. Auditoría gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mecavon Systems | Automatización para talleres de automoción",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tú reparas. Mecavon se encarga del resto.",
    description,
    siteName: "Mecavon Systems",
    locale: "es_ES",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
