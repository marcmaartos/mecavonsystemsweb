import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las fotos de /img llevan "?v=<fecha del archivo>" (ver src/components/Photo.tsx) para que,
    // al sustituir una foto por otra con el mismo nombre, no se sirva la versión antigua en caché.
    localPatterns: [{ pathname: "/img/**" }],
  },
};

export default nextConfig;
