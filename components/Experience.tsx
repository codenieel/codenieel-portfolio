"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import { experiences } from "@/lib/data";

const bulletIcons: { test: RegExp; icon: string }[] = [
  { test: /clear ballistics|humimic/i,         icon: "🛒" },
  { test: /tokkatok.*marketplace|real estate/i, icon: "🏠" },
  { test: /react native|mobile app/i,           icon: "📱" },
  { test: /bbh/i,                               icon: "🌐" },
  { test: /payment|gateway|paypal|stripe/i,     icon: "💳" },
  { test: /api|integration|ignition|scada/i,    icon: "🔌" },
  { test: /ci\/cd|gitlab|git|deploy/i,          icon: "🚀" },
  { test: /wordpress|wp/i,                      icon: "🔵" },
  { test: /seo|performance|optim/i,             icon: "⚡" },
  { test: /design|brand|creative|graphic/i,     icon: "🎨" },
  { test: /marketing|social media|campaign/i,   icon: "📣" },
  { test: /training|documentation|staff/i,      icon: "📚" },
];

function getBulletIcon(text: string) {
  const match = bulletIcons.find((b) => b.test.test(text));
  return match?.icon ?? "▸";
}

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-container">
        <SectionHeading label="Career" title="Experience" />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ duration: 0.18 }}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Card header */}
                <div style={{
                  padding: "14px 18px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-card-hover)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Accent bar */}
                    <span style={{
                      display: "block", width: "3px", height: "36px",
                      borderRadius: "3px",
                      background: exp.current ? "var(--accent)" : "var(--border-strong)",
                      flexShrink: 0,
                    }} />
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontSize: "12px", fontWeight: 500, color: exp.current ? "var(--accent)" : "var(--text-muted)", marginTop: "2px" }}>
                        {exp.company}
                      </p>
                      <p style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10.5px", color: "var(--text-subtle)", marginTop: "2px" }}>
                        <MapPin size={9} strokeWidth={2} />
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    {exp.current && (
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 600, color: "var(--text-muted)" }}>
                        <span style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: "#22c55e",
                          boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
                          display: "inline-block", flexShrink: 0,
                        }} />
                        Active
                      </span>
                    )}
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
                      background: exp.current ? "var(--accent-subtle)" : "var(--bg-section)",
                      border: `1px solid ${exp.current ? "var(--accent-subtle-border)" : "var(--border)"}`,
                      color: exp.current ? "var(--accent)" : "var(--text-subtle)",
                      whiteSpace: "nowrap",
                    }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets grid */}
                <div style={{
                  padding: "14px 18px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "8px",
                }}>
                  {exp.bullets.map((bullet, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.28, delay: 0.04 + j * 0.05 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "9px",
                        padding: "9px 11px",
                        borderRadius: "8px",
                        background: "var(--bg-section)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span style={{ fontSize: "13px", flexShrink: 0, lineHeight: 1.5 }}>
                        {getBulletIcon(bullet)}
                      </span>
                      <p style={{ fontSize: "11.5px", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
