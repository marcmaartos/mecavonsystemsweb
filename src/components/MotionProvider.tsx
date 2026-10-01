"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Carga las animaciones en un chunk aparte para no bloquear el primer render.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
