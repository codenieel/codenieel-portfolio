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
              "radial-gradient(circle, #7c7fff22 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Left glow */}
        <div
          style={{
            position: "absolute",
            left: "-100px",
            top: "50%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #6366f120 0%, transparent 70%)",
            transform: "translateY(-50%)",
          }}
        />

        {/* Right glow */}
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #6366f115 0%, transparent 70%)",
            transform: "translateY(-50%)",
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
                background: "#6366f118",
                border: "1px solid #6366f140",
                borderRadius: "8px",
                padding: "6px 16px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#9d9fff",
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
              color: "#9d9fff",
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
                "linear-gradient(90deg, #6366f150 0%, transparent 100%)",
              marginBottom: "32px",
              display: "flex",
            }}
          />

          {/* URL */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#9d9fff",
              opacity: 0.8,
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            codenieel-portfolio.vercel.app
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
            background: "#6366f110",
            border: "1.5px solid #6366f130",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "80px",
            fontWeight: 700,
            color: "#9d9fff",
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
