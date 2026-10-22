import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };

/** Branded OG image: brand mark + page title on the dark cinematic background. */
export const ogImage = (title: string, eyebrow: string = site.tagline) =>
  new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0b0c0e", color: "#f4f4f5", fontFamily: "sans-serif", backgroundImage: "radial-gradient(circle at 85% 0%, rgba(198,244,50,0.18), transparent 50%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#c6f432", color: "#0b0c0e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>▶</div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#c6f432", textTransform: "uppercase", letterSpacing: 4, marginBottom: 20 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 50 ? 64 : 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
