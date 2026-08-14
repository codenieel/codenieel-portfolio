import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#09090f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #ffffff22 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          {/* Handle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "#ffffff18",
                border: "1px solid #ffffff30",
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#eeeeee",
                letterSpacing: "1px",
                display: "flex",
              }}
            >
              {"<codenieel />"}
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "78px",
              fontWeight: 800,
              color: "#eeeef8",
              letterSpacing: "-3px",
              lineHeight: 1.0,
              marginBottom: "16px",
              display: "flex",
            }}
          >
            Daniel Dalde
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#cccccc",
              letterSpacing: "0.5px",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Full-Stack Developer
          </div>

          {/* Stack */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#8080a0",
              letterSpacing: "1px",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            PHP · React · React Native · TypeScript
          </div>

          {/* Divider */}
          <div
            style={{
              width: "360px",
              height: "2px",
              background:
                "linear-gradient(90deg, #ffffff40 0%, transparent 100%)",
              marginBottom: "32px",
              display: "flex",
            }}
          />

          {/* URL + CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#cccccc",
                opacity: 0.7,
                letterSpacing: "0.5px",
                display: "flex",
              }}
            >
              codenieel-portfolio.vercel.app
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#eeeeee",
                borderRadius: "8px",
                padding: "8px 18px",
                fontSize: "18px",
                fontWeight: 700,
                color: "#09090f",
                letterSpacing: "0.3px",
              }}
            >
              View Portfolio →
            </div>
          </div>
        </div>

        {/* Logo box */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "220px",
            height: "220px",
            borderRadius: "36px",
            background: "#ffffff0f",
            border: "1.5px solid #ffffff25",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "80px",
            fontWeight: 700,
            color: "#eeeeee",
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
