"use client";

const TECHS = [
  { name: "PHP",           color: "#7c7fff" },
  { name: "React",         color: "#61dafb" },
  { name: "React Native",  color: "#61dafb" },
  { name: "TypeScript",    color: "#3178c6" },
  { name: "Next.js",       color: "#ffffff" },
  { name: "MySQL",         color: "#4479a1" },
  { name: "CodeIgniter",   color: "#ef4223" },
  { name: "Expo",          color: "#ffffff" },
  { name: "Tailwind CSS",  color: "#38bdf8" },
  { name: "Firebase",      color: "#ffca28" },
  { name: "AWS S3",        color: "#ff9900" },
  { name: "Git",           color: "#f54d27" },
  { name: "Bootstrap",     color: "#7952b3" },
  { name: "jQuery",        color: "#0769ad" },
  { name: "Nativewind",    color: "#38bdf8" },
  { name: "GitLab CI/CD",  color: "#fc6d26" },
  { name: "REST APIs",     color: "#7c7fff" },
  { name: "Figma",         color: "#f24e1e" },
];

// Duplicate for seamless loop
const ITEMS = [...TECHS, ...TECHS];

export default function TechMarquee() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-card)",
      overflow: "hidden",
      padding: "14px 0",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: "linear-gradient(90deg, var(--bg-card), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: "linear-gradient(270deg, var(--bg-card), transparent)",
        pointerEvents: "none",
      }} />

      <div className="marquee-track">
        {ITEMS.map((tech, i) => (
          <span key={i} className="marquee-item" style={{ "--dot-color": tech.color } as React.CSSProperties}>
            <span className="marquee-dot" />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
