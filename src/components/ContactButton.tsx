import type { ReactNode } from "react";

/**
 * Botón de contacto (WhatsApp, email, teléfono): verde sólido, texto blanco e icono a la izquierda.
 * Todos los botones de contacto usan este componente para que tengan el mismo tamaño y estilo.
 */
export function ContactButton({
  href,
  icon,
  children,
  external = false,
  className = "",
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`flex min-h-14 items-center justify-center gap-2.5 rounded-lg bg-teal px-4 text-center font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${className}`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      {children}
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}
