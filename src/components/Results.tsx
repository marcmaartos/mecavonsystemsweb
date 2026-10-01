import { SavingsCalculator } from "./SavingsCalculator";

export function Results() {
  return (
    <section id="calculadora" className="scroll-mt-16 bg-white py-24 md:scroll-mt-[72px] md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            ¿Cuánto te cuestan las llamadas que no coges?
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Pon los números de tu taller. Cada llamada sin contestar es un trabajo que puede acabar
            en otro sitio.
          </p>
        </div>
        <div className="lg:col-span-8">
          <SavingsCalculator />
        </div>
      </div>
    </section>
  );
}
