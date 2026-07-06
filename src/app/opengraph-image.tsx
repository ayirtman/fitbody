import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TempleFit - Your body is a temple. Maintain it.";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0c0e12",
          color: "#f2f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect x="3" y="5" width="26" height="4" rx="1.5" fill="#e9b44c" />
            <rect x="6" y="12" width="4.5" height="15" rx="1.5" fill="#f2f1ec" />
            <rect x="13.75" y="12" width="4.5" height="15" rx="1.5" fill="#f2f1ec" />
            <rect x="21.5" y="12" width="4.5" height="15" rx="1.5" fill="#f2f1ec" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>
            <span>TEMPLE</span>
            <span style={{ color: "#e9b44c" }}>FIT</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Your body is a temple.</span>
          <span style={{ color: "#e9b44c" }}>Maintain it.</span>
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#9aa1ac" }}>
          Free workouts, physio & meal prep for working dads
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 14,
            background: "#e9b44c",
          }}
        />
      </div>
    ),
    size,
  );
}
