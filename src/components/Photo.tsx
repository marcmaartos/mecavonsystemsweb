import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

const imgPath = (file: string) => path.join(process.cwd(), "public", "img", file);

/** true si la foto existe en /public/img (se comprueba al compilar). */
export function photoExists(file: string) {
  return existsSync(imgPath(file));
}

/**
 * Ruta pública de la foto con una versión basada en la fecha del archivo. Si sustituyes una foto
 * por otra con el mismo nombre, la versión cambia y el navegador y la caché de Next.js no sirven la antigua.
 */
export function photoSrc(file: string) {
  const version = Math.round(statSync(imgPath(file)).mtimeMs).toString(36);
  return `/img/${file}?v=${version}`;
}

/**
 * Ancho y alto reales de un JPEG de /public/img, leídos de su cabecera al compilar.
 * Sirven para reservar el hueco y que la página no salte al cargar la foto.
 */
export function jpegSize(file: string): { width: number; height: number } | null {
  if (!photoExists(file)) return null;
  const buf = readFileSync(imgPath(file));
  let i = 2; // tras la marca de inicio FFD8
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    // Marcadores SOF (C0–CF salvo C4, C8 y CC): contienen las dimensiones.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/**
 * Hueco para una foto real de /public/img. Mientras el archivo no exista muestra un recuadro gris
 * con el texto "Foto". Basta con copiar el archivo y volver a compilar para que aparezca.
 */
export function Photo({
  file,
  alt,
  sizes,
  className = "",
}: {
  file: string;
  alt: string;
  sizes: string;
  /** Proporción y márgenes del hueco, p. ej. "aspect-[4/3] mt-10". */
  className?: string;
}) {
  const box = `relative overflow-hidden rounded-2xl ${className}`;

  if (!photoExists(file)) {
    return (
      <div className={`${box} flex items-center justify-center bg-line`} aria-hidden="true">
        <span className="text-lg font-medium text-graphite">Foto</span>
      </div>
    );
  }

  return (
    <div className={box}>
      {/* next/image carga en diferido por defecto y sirve el tamaño justo para cada pantalla. */}
      <Image src={photoSrc(file)} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
