import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { System } from "@/components/System";
import { Results } from "@/components/Results";
import { Pricing } from "@/components/Pricing";
import { HowWeWork } from "@/components/HowWeWork";
import { Commitments } from "@/components/Commitments";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { AuditSection } from "@/components/AuditSection";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Header />
      <MotionProvider>
        <main id="contenido">
          <Hero />
          <Problem />
          <System />
          <Results />
          <Pricing />
          <HowWeWork />
          <Commitments />
          <Testimonials />
          <Faq />
          <AuditSection />
          <Contact />
        </main>
      </MotionProvider>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
