"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Smartphone, X } from "lucide-react";
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

function PhoneFrameModal({ url, fullScreenUrl, title, accent, onClose }: { url: string; fullScreenUrl: string; title: string; accent: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "380px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>{title}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a
                href={fullScreenUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, color: accent, textDecoration: "none", padding: "5px 10px", borderRadius: "6px", border: `1px solid ${accent}40`, background: `${accent}12` }}
              >
                <ExternalLink size={11} /> Full Screen
              </a>
              <button
                onClick={onClose}
                style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", color: "#fff" }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Phone frame */}
          <div style={{
            width: "375px",
            height: "680px",
            borderRadius: "44px",
            background: "#111",
            border: "8px solid #2a2a2a",
            boxShadow: `0 0 0 1px #3a3a3a, 0 32px 80px -12px rgba(0,0,0,0.8), 0 0 40px -8px ${accent}30`,
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}>
            {/* Notch */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: "120px", height: "28px",
              background: "#111",
              borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px",
              zIndex: 10,
            }} />
            <iframe
              src={url}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "36px" }}
              title={title}
              allow="geolocation"
            />
          </div>

          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: "320px" }}>
            Live web preview · some native features (push notifications, camera) require the mobile app
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const theme = bannerGradients[index % bannerGradients.length];
  const tag = platformTag(project.tech);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
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
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(${theme.accent}18 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}18 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }} />
          <div style={{
            position: "absolute", top: "-30px", right: "-20px",
            width: "100px", height: "100px", borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          {project.featured && (
            <span style={{
              position: "absolute", top: "10px", right: "10px", zIndex: 1,
              display: "inline-flex", alignItems: "center", gap: "3px",
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "2px 7px", borderRadius: "4px",
              background: theme.accent + "25",
              border: `1px solid ${theme.accent}50`,
              color: theme.accent,
            }}>
              ★ Featured
            </span>
          )}
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
          <div style={{ paddingTop: "10px", borderTop: "1px solid var(--border)", marginTop: "2px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
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
            {project.demoUrl && (
              <button
                onClick={() => setShowDemo(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: 600, color: theme.accent,
                  background: `${theme.accent}14`, border: `1px solid ${theme.accent}40`,
                  borderRadius: "5px", padding: "3px 9px", cursor: "pointer",
                  transition: "opacity 0.12s", marginLeft: "auto",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <Smartphone size={11} strokeWidth={2} /> Try App
              </button>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: theme.accent, textDecoration: "none", transition: "opacity 0.12s", marginLeft: project.demoUrl ? "0" : "auto" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <ExternalLink size={11} strokeWidth={2} /> Live Site
              </a>
            )}
            {!project.github && !project.live && !project.demoUrl && (
              <span style={{ fontSize: "10.5px", color: "var(--text-subtle)", fontStyle: "italic" }}>Private / NDA</span>
            )}
          </div>
        </div>
      </motion.article>

      {showDemo && project.demoUrl && (
        <PhoneFrameModal
          url={project.demoUrl ?? ""}
          fullScreenUrl={project.demoUrl}
          title={project.title}
          accent={theme.accent}
          onClose={() => setShowDemo(false)}
        />
      )}
    </>
  );
}
