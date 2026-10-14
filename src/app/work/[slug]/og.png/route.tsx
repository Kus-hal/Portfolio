import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { person } from "@/content/site";

// Same approach as /og.png: a static route, so the export writes /work/<slug>/og.png.
export const dynamic = "force-static";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

const fontDir = join(
  process.cwd(),
  "node_modules/@fontsource/space-grotesk/files",
);

export async function GET(
  _req: Request,
  { params }: RouteContext<"/work/[slug]/og.png">,
) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) return new Response("Not found", { status: 404 });
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
          gap: 16,
          fontSize: 30,
          color: "#666a73",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: study.accent.strong,
          }}
        />
        Case study · {person.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 0.95,
          }}
        >
          {study.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            fontWeight: 500,
            color: "#33353c",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          {study.sub}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
