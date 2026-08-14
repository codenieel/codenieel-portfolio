import { Cloud, Network } from "lucide-react";

// slug: Simple Icons (cdn.simpleicons.org) identifier; null = no brand mark, use a generic icon instead
const TECHS = [
  { name: "PHP", slug: "php" },
  { name: "React", slug: "react" },
  { name: "React Native", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "MySQL", slug: "mysql" },
  { name: "Prisma", slug: "prisma" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express", slug: "express" },
  { name: "CodeIgniter", slug: "codeigniter" },
  { name: "Expo", slug: "expo" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Firebase", slug: "firebase" },
  { name: "Supabase", slug: "supabase" },
  { name: "AWS S3", slug: null },
  { name: "Git", slug: "git" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "jQuery", slug: "jquery" },
  { name: "Nativewind", slug: "tailwindcss" },
  { name: "GitLab CI/CD", slug: "gitlab" },
  { name: "Docker", slug: "docker" },
  { name: "REST APIs", slug: null },
  { name: "Figma", slug: "figma" },
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
            {tech.slug ? (
              // eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative logo from a static icon CDN, not worth the next/image SVG-optimizer/CSP setup
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt=""
                width={14}
                height={14}
                className="marquee-icon"
              />
            ) : tech.name === "AWS S3" ? (
              <Cloud size={13} strokeWidth={2} />
            ) : (
              <Network size={13} strokeWidth={2} />
            )}
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
