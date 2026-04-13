"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import { experiences } from "@/lib/data";

// Icons mapped to each bullet by keyword
const bulletIcons: { test: RegExp; icon: string }[] = [
  { test: /clear ballistics/i,  icon: "🛒" },
  { test: /tokkatok.*marketplace|real estate/i, icon: "🏠" },
  { test: /react native|mobile app/i, icon: "📱" },
  { test: /bbh/i, icon: "🌐" },
  { test: /payment|gateway|paypal|stripe/i, icon: "💳" },
  { test: /api|integration/i, icon: "🔌" },
  { test: /ci\/cd|gitlab|deploy/i, icon: "🚀" },
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

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
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
                {/* Card header strip */}
                <div style={{
                  padding: "16px 20px",
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
                      borderRadius: "3px", background: "var(--accent)", flexShrink: 0,
                    }} />
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--accent)", marginTop: "3px" }}>
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Status dot */}
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 600, color: "var(--text-muted)" }}>
                      <span style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
                        display: "inline-block",
                        flexShrink: 0,
                      }} />
                      Active
                    </span>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "4px 10px", borderRadius: "5px",
                      background: "var(--accent-subtle)", border: "1px solid var(--accent-subtle-border)", color: "var(--accent)",
                    }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets grid */}
                <div style={{
                  padding: "16px 20px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "10px",
                }}>
                  {exp.bullets.map((bullet, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 + j * 0.07 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        background: "var(--bg-section)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span style={{ fontSize: "14px", flexShrink: 0, lineHeight: 1.4 }}>
                        {getBulletIcon(bullet)}
                      </span>
                      <p style={{ fontSize: "12px", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
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
