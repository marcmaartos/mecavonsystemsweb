import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CONTACT_EMAIL, HOLDER, HOLDER_TEXT, PHONE, SITE_URL } from "@/config";

export type LegalSection = { title: string; body: ReactNode };

/** Datos del titular y de contacto: idénticos en aviso legal, privacidad y cookies. */
export function LegalIdentity() {
  return (
    <ul className="list-disc space-y-1 pl-5">
      <li>Titular: {HOLDER_TEXT}</li>
      <li>Domicilio: {HOLDER.city}, España</li>
      <li>Email: {CONTACT_EMAIL}</li>
      <li>Teléfono: {PHONE.cardDisplay}</li>
      <li>Web: {SITE_URL}</li>
    </ul>
  );
}

/** Plantilla común para aviso legal, privacidad y cookies. */
export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <Header />
      <main id="contenido" className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
              <div className="mt-2 space-y-3 leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
