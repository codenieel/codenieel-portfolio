"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-container">
        <SectionHeading label="Career" title="Experience" />

        <div style={{ position: "relative", maxWidth: "680px", display: "flex", flexDirection: "column" }}>
          <TimelineLine count={experiences.length} />

          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div style={{ position: "relative", paddingLeft: "24px", paddingBottom: i < experiences.length - 1 ? "16px" : 0 }}>
                {/* Dot */}
                <span style={{
                  position: "absolute", left: 0, top: "6px",
                  width: "10px", height: "10px", borderRadius: "50%", zIndex: 10,
                  background: "var(--accent)",
                  boxShadow: "0 0 0 3px var(--bg-section)",
                }} />

                {/* Card */}
                <div style={{ borderRadius: "8px", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  {/* Header */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "10px" }}>
                    <div>
                      <h3 style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{exp.role}</h3>
                      <p style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--accent)", marginTop: "2px" }}>{exp.company}</p>
                    </div>
                    <span style={{
                      fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px",
                      background: "var(--accent-subtle)", border: "1px solid var(--accent-subtle-border)", color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} style={{ display: "flex", gap: "8px", fontSize: "12px", lineHeight: 1.55, color: "var(--text-muted)" }}>
                        <span style={{ flexShrink: 0, marginTop: "6px", width: "3px", height: "3px", borderRadius: "50%", background: "var(--text-subtle)", display: "block" }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineLine({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ position: "absolute", left: "4px", top: "8px", width: "1px", height: "calc(100% - 24px)", background: "var(--border)", overflow: "hidden" }}>
      <motion.div
        style={{ background: "var(--accent)", width: "100%", height: "100%", transformOrigin: "top" }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5 * count, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}
