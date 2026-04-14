"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Smartphone, Database, Wrench } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { siteConfig, skills, getStats } from "@/lib/data";
import type { ReactNode } from "react";

function CountUp({
  target,
  suffix = "",
  duration = 1.2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const categoryOrder = [
  "language",
  "frontend",
  "mobile",
  "backend",
  "tools",
] as const;
const categoryLabel: Record<string, string> = {
  language: "Languages",
  frontend: "Frontend",
  mobile: "Mobile",
  backend: "Backend & DB",
  tools: "Tools",
};
const categoryIcon: Record<string, ReactNode> = {
  language: <Code2 size={11} strokeWidth={2.5} />,
  frontend: <Layout size={11} strokeWidth={2.5} />,
  mobile: <Smartphone size={11} strokeWidth={2.5} />,
  backend: <Database size={11} strokeWidth={2.5} />,
  tools: <Wrench size={11} strokeWidth={2.5} />,
};

const { years } = getStats();

const highlights = [
  {
    value: `${years}+`,
    label: "Years in Industry",
    target: years,
    suffix: "+",
  },
  { value: "PHP", label: "Primary Backend Lang", target: null, suffix: "" },
  { value: "RN", label: "React Native Expert", target: null, suffix: "" },
  { value: "PH", label: "Based in Philippines", target: null, suffix: "" },
];

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

        {/* Highlight bar */}
        <ScrollReveal delay={0.04}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              marginBottom: "28px",
            }}
          >
            {highlights.map(({ value, label, target, suffix }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "14px 10px",
                  gap: "3px",
                  background: "var(--bg-card)",
                  borderRight:
                    i < highlights.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  {target !== null ? (
                    <CountUp target={target} suffix={suffix ?? ""} />
                  ) : (
                    value
                  )}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--text-subtle)",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Bio card */}
          <ScrollReveal delay={0.08}>
            <div
              style={{
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-card-hover)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                  }}
                >
                  whoami
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "var(--accent)",
                  }}
                >
                  ~/about
                </span>
              </div>
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Photo + bio row */}
                <div className="about-bio-row">
                  {siteConfig.avatar && (
                    <img
                      src={siteConfig.avatar}
                      alt={siteConfig.name}
                      width={160}
                      height={160}
                      className="about-bio-img"
                    />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.75,
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      {siteConfig.bio}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.75,
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      {siteConfig.bio2}
                    </p>
                  </div>
                </div>
                {/* Location row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "7px",
                    background: "var(--bg-section)",
                    border: "1px solid var(--border)",
                    marginTop: "2px",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>📍</span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {siteConfig.location}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 0 2px rgba(34,197,94,0.18)",
                        display: "inline-block",
                      }}
                    />
                    Open to remote
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Skills card */}
          <ScrollReveal delay={0.12}>
            <div
              style={{
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-card-hover)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                  }}
                >
                  Tech Stack
                </span>
              </div>
              <div
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {categoryOrder
                  .filter((cat) => grouped[cat])
                  .map((category, i) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.06 + i * 0.05 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {categoryIcon[category]}
                        </span>
                        <span
                          style={{
                            fontSize: "9.5px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--text-subtle)",
                          }}
                        >
                          {categoryLabel[category]}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {grouped[category].map((skill, si) => (
                          <motion.span
                            key={skill.name}
                            className="skill-chip"
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.18,
                              delay: 0.04 + si * 0.04,
                            }}
                            whileHover={{
                              scale: 1.08,
                              boxShadow:
                                "0 0 0 2px var(--accent-subtle-border), 0 0 8px -2px var(--accent)",
                              color: "var(--accent)",
                              borderColor: "var(--accent-subtle-border)",
                            }}
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
