"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import { siteConfig } from "@/lib/data";

const LINES = [
  { prompt: "$", cmd: "whoami",              delay: 0 },
  { prompt: ">", cmd: `${siteConfig.name} — Full-Stack Developer`,  delay: 600,  output: true },
  { prompt: "$", cmd: "pwd",                 delay: 1300 },
  { prompt: ">", cmd: `/${siteConfig.location.toLowerCase().replace(/ /g, "-")}/remote-ready`, delay: 1900, output: true },
  { prompt: "$", cmd: "cat skills.txt",      delay: 2600 },
  { prompt: ">", cmd: "PHP · React · React Native · TypeScript · MySQL", delay: 3200, output: true },
  { prompt: "$", cmd: "ls projects/",        delay: 4000 },
  { prompt: ">", cmd: "clear-ballistics/  humimic/  tokkatok/  tokkatok-apps/  bbh/", delay: 4600, output: true },
  { prompt: "$", cmd: "echo $STATUS",        delay: 5400 },
  { prompt: ">", cmd: "✅ Available for new projects", delay: 6000, output: true },
  { prompt: "$", cmd: "_",                   delay: 6800, cursor: true },
];

function TypewriterLine({ text, speed = 28 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <>{displayed}</>;
}

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    LINES.forEach((line, i) => {
      setTimeout(() => setVisibleCount(i + 1), line.delay);
    });
  }, [started]);

  return (
    <section style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="section-container" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <ScrollReveal>
          <div ref={ref} style={{
            borderRadius: "12px",
            overflow: "hidden",
            background: "#0d0d14",
            border: "1px solid var(--border)",
            maxWidth: "640px",
            margin: "0 auto",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
          }}>
            {/* Title bar */}
            <div style={{
              padding: "10px 14px",
              background: "#1a1a26",
              borderBottom: "1px solid #1e1e2c",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ marginLeft: "8px", fontSize: "11px", color: "#44445a", fontFamily: "monospace" }}>
                codenieel — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: "12.5px", lineHeight: 1.8, minHeight: "220px" }}>
              {LINES.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex", gap: "8px" }}
                >
                  <span style={{ color: line.output ? "#44445a" : "#7c7fff", flexShrink: 0 }}>
                    {line.prompt}
                  </span>
                  <span style={{ color: line.output ? "#8080a0" : "#eeeef8" }}>
                    {line.cursor ? (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        style={{ display: "inline-block", width: "8px", height: "14px", background: "#7c7fff", verticalAlign: "middle" }}
                      />
                    ) : i === visibleCount - 1 && !line.output ? (
                      <TypewriterLine text={line.cmd} />
                    ) : (
                      line.cmd
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
