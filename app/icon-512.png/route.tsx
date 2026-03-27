import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "108px",
        }}
      >
        <div
          style={{
            color: "#EEECEA",
            fontSize: 220,
            fontWeight: 300,
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          佛
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
