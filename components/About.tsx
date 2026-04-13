"use client";

import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { siteConfig, skills } from "@/lib/data";

const categoryOrder = ["language", "frontend", "mobile", "backend", "tools"] as const;
const categoryLabel: Record<string, string> = {
  language: "Languages",
  frontend: "Frontend",
  mobile: "Mobile",
  backend: "Backend & DB",
  tools: "Tools",
};

export default function About() {
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" className="section section-alt">
      <div className="section-container">
        <SectionHeading label="About" title="Background & Skills" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
          className="md-grid-2col"
        >
          {/* Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <ScrollReveal delay={0.04}>
              <p style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                {siteConfig.bio}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.09}>
              <p style={{ fontSize: "13px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                {siteConfig.bio2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p style={{ fontSize: "11px", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                Based in <span style={{ color: "var(--text-muted)" }}>{siteConfig.location}</span>
              </p>
            </ScrollReveal>
          </div>

          {/* Skills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {categoryOrder.filter((cat) => grouped[cat]).map((category, i) => (
              <ScrollReveal key={category} delay={0.05 + i * 0.05}>
                <div>
                  <p style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "7px" }}>
                    {categoryLabel[category]}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {grouped[category].map((skill) => (
                      <span key={skill.name} className="skill-chip">{skill.name}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
