import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, ogImage, person } from "@/content/site";

// A route (not the opengraph-image convention) so the static export emits a real `og.png`
// that any host serves as image/png. Rendered once at build time.
export const dynamic = "force-static";

const fontDir = join(
  process.cwd(),
  "node_modules/@fontsource/space-grotesk/files",
);

export async function GET() {
  const [bold, medium] = await Promise.all([
    readFile(join(fontDir, "space-grotesk-latin-700-normal.woff")),
    readFile(join(fontDir, "space-grotesk-latin-500-normal.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "84px 96px",
        background: "#f4f5f7",
        color: "#17181c",
        fontFamily: "Space Grotesk",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 28,
          color: "#666a73",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#ff9f1c",
          }}
        />
        {hero.availability}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 0.98,
          }}
        >
          {person.name}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 28,
            fontSize: 40,
            fontWeight: 500,
          }}
        >
          <span>{hero.role.strong}</span>
          <span style={{ color: "#666a73" }}>{hero.role.rest}</span>
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 40 }}
      >
        {[18, 40, 26, 34].map((h, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: h,
              borderRadius: 3,
              background: "#2743ff",
            }}
          />
        ))}
      </div>
    </div>,
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
