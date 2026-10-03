import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { proiectePublicate } from "@/data/proiecte";
import { proiectDupaSlug } from "@/lib/proiecte";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Proiect de mobilă la comandă Amber";

export function generateStaticParams() {
  return proiectePublicate.map((p) => ({ slug: p.slug }));
}

// Imaginea de share: prima poză a proiectului, decupată la 1200×630, cu sertarul galben din logo.
// Randările primesc eticheta „Proiect 3D” și aici.
export default async function Image({ params }) {
  const { slug } = await params;
  const proiect = proiectDupaSlug(slug);
  const img = proiect.imagini[0];
  const date = await readFile(join(process.cwd(), "public", img.src), "base64");

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: "#111111" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${date}`}
          alt=""
          width={1200}
          height={630}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {img.tip === "randare" ? (
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 40,
              padding: "12px 18px",
              background: "#111111",
              color: "#FFFFFF",
              fontSize: 26,
              letterSpacing: 3,
            }}
          >
            PROIECT 3D
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 48,
            width: 180,
            height: 14,
            background: "#FFD100",
          }}
        />
      </div>
    ),
    size,
  );
}
