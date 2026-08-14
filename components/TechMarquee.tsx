const TECHS = [
  "PHP", "React", "React Native", "TypeScript", "Next.js", "MySQL",
  "Prisma", "Node.js", "Express", "CodeIgniter", "Expo", "Tailwind CSS",
  "Firebase", "Supabase", "AWS S3", "Git", "Bootstrap", "jQuery",
  "Nativewind", "GitLab CI/CD", "Docker", "REST APIs", "Figma",
];

const ITEMS = [...TECHS, ...TECHS];

export default function TechMarquee() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-card)",
      overflow: "hidden",
      padding: "16px 0",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", zIndex: 2,
        background: "linear-gradient(90deg, var(--bg-card) 30%, transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", zIndex: 2,
        background: "linear-gradient(270deg, var(--bg-card) 30%, transparent)",
        pointerEvents: "none",
      }} />

      <div className="marquee-track">
        {ITEMS.map((tech, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
