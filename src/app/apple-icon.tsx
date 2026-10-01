import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Icono para "Añadir a pantalla de inicio" en iPhone (no admite SVG).
export default async function AppleIcon() {
  const icon = await readFile(join(process.cwd(), "src/app/icon.svg"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#152E68" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${icon.toString("base64")}`} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
