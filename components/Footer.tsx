import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ padding: "20px 0", textAlign: "center", borderTop: "1px solid var(--border)" }}>
      <p style={{ fontSize: "11px", color: "var(--text-subtle)" }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ fontFamily: "monospace", fontWeight: 600, color: "var(--accent)" }}>
          {siteConfig.handle}
        </span>
        {" "}· Built with Next.js &amp; Framer Motion
      </p>
    </footer>
  );
}
