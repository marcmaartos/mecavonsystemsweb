"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CTA_HREF, CTA_LABEL } from "@/config";

const NAV = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#precios", label: "Precios" },
  { href: "/#como-trabajamos", label: "Cómo trabajamos" },
  { href: "/#preguntas", label: "Preguntas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 md:h-[72px]">
        <Link href="/#inicio" onClick={close} className="py-1">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-graphite transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${CTA_HREF}`}
            className="inline-flex min-h-11 items-center rounded-lg bg-teal px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            {CTA_LABEL}
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy xl:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Principal"
        hidden={!open}
        className="border-t border-line bg-white px-5 pb-6 pt-2 xl:hidden"
      >
        <ul className="flex flex-col">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block border-b border-line py-3.5 text-base font-medium text-navy"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/${CTA_HREF}`}
          onClick={close}
          className="mt-5 flex min-h-12 items-center justify-center rounded-lg bg-teal px-5 font-semibold text-white"
        >
          {CTA_LABEL}
        </Link>
      </nav>
    </header>
  );
}
