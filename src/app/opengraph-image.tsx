import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mecavon Systems: Tú reparas. Mecavon se encarga del resto.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const icon = await readFile(join(process.cwd(), "src/app/icon.svg"));
  const iconSrc = `data:image/svg+xml;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#152E68",
          color: "#FFFFFF",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={112} height={112} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: 4 }}>MECAVON</span>
            <span style={{ fontSize: 24, letterSpacing: 14, color: "#C9D3E3" }}>SYSTEMS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            Tú reparas. Mecavon se encarga del resto.
          </span>
          <span style={{ fontSize: 30, color: "#C9D3E3" }}>Automatización para talleres de automoción</span>
        </div>
      </div>
    ),
    size,
  );
}
