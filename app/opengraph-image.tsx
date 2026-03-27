import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "하루하나불교 — 오늘의 불교 경전 구절";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#EEECEA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.25em",
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            Daily Buddhist Scripture
          </span>
        </div>

        {/* Main quote */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 300,
              color: "#1a1a1a",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            마음은 모든 것의 근원이다.
          </div>
          <div style={{ fontSize: 22, color: "#555", letterSpacing: "0.05em" }}>
            — 법구경
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ fontSize: 20, color: "#1a1a1a", letterSpacing: "0.08em" }}>
            하루하나불교
          </span>
          <span style={{ fontSize: 16, color: "#888" }}>lotusread.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
