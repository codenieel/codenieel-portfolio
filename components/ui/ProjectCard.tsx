"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";

const banners = [
  "linear-gradient(135deg, #1a1040 0%, #0d0d18 100%)",
  "linear-gradient(135deg, #0d1f30 0%, #090f18 100%)",
  "linear-gradient(135deg, #0d2018 0%, #090f0e 100%)",
  "linear-gradient(135deg, #1f0d2a 0%, #110a18 100%)",
  "linear-gradient(135deg, #1a180d 0%, #120f09 100%)",
];
const bannerAccents = ["#7c7fff", "#38bdf8", "#34d399", "#c084fc", "#fb923c"];

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.38, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2 }}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px -4px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Banner */}
      <div
        style={{
          height: "80px",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: "0 14px 10px",
          background: banners[index % banners.length],
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55, color: bannerAccents[index % bannerAccents.length] }}>
          {project.tech[0]}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px", gap: "8px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.4, color: "var(--text)" }}>
          {project.title}
        </h3>

        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "var(--text-muted)", flex: 1 }}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "2px" }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        {(project.github !== "#" || (project.live && project.live !== "#")) && (
          <div style={{ display: "flex", gap: "12px", paddingTop: "10px", borderTop: "1px solid var(--border)", marginTop: "2px" }}>
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
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 500, color: "var(--text-subtle)", textDecoration: "none", transition: "color 0.12s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-subtle)")}
              >
                <ExternalLink size={11} strokeWidth={2} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
