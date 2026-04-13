"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";

const bannerGradients = [
  { bg: "linear-gradient(135deg, #1a1040 0%, #0d0d18 100%)", accent: "#7c7fff", label: "#4a4a9f" },
  { bg: "linear-gradient(135deg, #0d1f30 0%, #090f18 100%)", accent: "#38bdf8", label: "#1a5a7a" },
  { bg: "linear-gradient(135deg, #0d2018 0%, #090f0e 100%)", accent: "#34d399", label: "#0a4a2a" },
  { bg: "linear-gradient(135deg, #1f0d2a 0%, #110a18 100%)", accent: "#c084fc", label: "#5a2a7a" },
  { bg: "linear-gradient(135deg, #1a180d 0%, #120f09 100%)", accent: "#fb923c", label: "#6a4a10" },
];

const platformTag: (tech: string[]) => string = (tech) => {
  if (tech.some((t) => /react native|expo/i.test(t))) return "Mobile App";
  if (tech.some((t) => /wordpress/i.test(t))) return "WordPress";
  if (tech.some((t) => /next\.js/i.test(t))) return "Next.js";
  return "Web Platform";
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const theme = bannerGradients[index % bannerGradients.length];
  const tag = platformTag(project.tech);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3 }}
      style={{
        display: "flex", flexDirection: "column",
        borderRadius: "10px", overflow: "hidden",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        transition: "border-color 0.15s, box-shadow 0.15s",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = theme.accent + "60";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px -6px ${theme.accent}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Banner */}
      <div style={{
        height: "90px", flexShrink: 0,
        background: theme.bg,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "flex-end",
        padding: "0 14px 10px",
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${theme.accent}18 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}18 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }} />
        {/* Orb */}
        <div style={{
          position: "absolute", top: "-30px", right: "-20px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        {/* Platform tag */}
        <span style={{
          position: "relative", zIndex: 1,
          fontFamily: "monospace", fontSize: "9.5px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: theme.accent, opacity: 0.9,
          padding: "2px 7px", borderRadius: "4px",
          background: theme.accent + "18",
          border: `1px solid ${theme.accent}30`,
        }}>
          {tag}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px", gap: "8px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.3, color: "var(--text)", margin: 0 }}>
          {project.title}
        </h3>

        <p style={{ fontSize: "12px", lineHeight: 1.65, color: "var(--text-muted)", flex: 1, margin: 0 }}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "4px" }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        {(project.github && project.github !== "#") || (project.live && project.live !== "#") ? (
          <div style={{
            display: "flex", gap: "10px", paddingTop: "10px",
            borderTop: "1px solid var(--border)", marginTop: "2px",
            alignItems: "center",
          }}>
            {project.github && project.github !== "#" && (
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 500, color: "var(--text-subtle)", textDecoration: "none", transition: "color 0.12s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-subtle)")}
              >
                <Github size={11} strokeWidth={2} /> Source
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: theme.accent, textDecoration: "none", transition: "opacity 0.12s", marginLeft: "auto" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <ExternalLink size={11} strokeWidth={2} /> Live Site
              </a>
            )}
          </div>
        ) : (
          <div style={{ paddingTop: "10px", borderTop: "1px solid var(--border)", marginTop: "2px" }}>
            <span style={{ fontSize: "10.5px", color: "var(--text-subtle)", fontStyle: "italic" }}>Private / NDA</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
