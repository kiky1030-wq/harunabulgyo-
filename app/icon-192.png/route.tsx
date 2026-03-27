import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 192,
          height: 192,
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            color: "#EEECEA",
            fontSize: 80,
            fontWeight: 300,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          佛
        </div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
