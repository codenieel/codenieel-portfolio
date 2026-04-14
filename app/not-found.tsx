import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      textAlign: "center",
      padding: "20px",
      gap: "16px",
    }}>
      <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>
        404
      </span>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>
        Page not found
      </h1>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "340px", lineHeight: 1.7, margin: 0 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "10px 22px", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, color: "#fff",
          background: "var(--accent)", textDecoration: "none",
        }}
      >
        ← Back to Home
      </Link>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--text-subtle)", marginTop: "8px" }}>
        codenieel.dev
      </p>
    </div>
  );
}
