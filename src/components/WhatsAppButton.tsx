"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/config";
import { WhatsAppIcon } from "./WhatsAppIcon";


const INTERACTIVE = "a, button, input, select, textarea, label, output, summary";

export function WhatsAppButton() {
  // Se aparta mientras el formulario está en pantalla y siempre que tenga debajo un campo,
  // botón o enlace (en móvil los campos ocupan todo el ancho y quedarían tapados).
  const ref = useRef<HTMLAnchorElement>(null);
  const [overForm, setOverForm] = useState(false);
  const [overControl, setOverControl] = useState(false);

  useEffect(() => {
    const form = document.getElementById("auditoria");
    if (!form) return;
    const io = new IntersectionObserver(([entry]) => setOverForm(entry.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const fab = ref.current;
      if (!fab) return;
      const r = fab.getBoundingClientRect();
      const points: [number, number][] = [
        [r.left + r.width / 2, r.top + r.height / 2],
        [r.left + 4, r.top + 4],
        [r.right - 4, r.top + 4],
        [r.left + 4, r.bottom - 4],
        [r.right - 4, r.bottom - 4],
      ];
      const covers = points.some(([x, y]) =>
        document.elementsFromPoint(x, y).some((el) => !fab.contains(el) && el.closest(INTERACTIVE)),
      );
      setOverControl(covers);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const hidden = overForm || overControl;

  return (
    <a
      ref={ref}
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`whatsapp-fab fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-lg shadow-black/25 transition-[background-color,opacity,transform] duration-200 hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:right-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <WhatsAppIcon />
    </a>
  );
}
