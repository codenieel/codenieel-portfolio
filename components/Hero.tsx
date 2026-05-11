"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowDown, Code2, Smartphone, Globe } from "lucide-react";
import { siteConfig, getStats } from "@/lib/data";

const ROLES = ["Full-Stack Developer", "React Native Developer", "Web Developer"];
const { years, productionProjects, mobileApps } = getStats();
const STATS = [
  { icon: Globe,      target: years,              suffix: "+", label: "Years Experience" },
  { icon: Code2,      target: productionProjects,  suffix: "+", label: "Projects Shipped" },
  { icon: Smartphone, target: mobileApps,           suffix: "",  label: "Mobile Apps" },
];

function CountUp({ target, suffix = "", duration = 1.4 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
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

  return <span ref={ref}>{count}{suffix}</span>;
}

function AnimatedRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", minWidth: 0 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        textAlign: "center",
        padding: "100px 24px 80px",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.4,
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Primary orb — center top */}
      <div className="hero-orb" style={{
        width: "700px", height: "700px",
        background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        opacity: 0.12,
        top: "-20%", left: "50%",
        transform: "translateX(-50%)",
      }} />
      {/* Secondary orb — bottom left */}
      <div className="hero-orb" style={{
        width: "400px", height: "400px",
        background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        opacity: 0.07,
        bottom: "5%", left: "-5%",
      }} />
      {/* Tertiary orb — top right */}
      <div className="hero-orb" style={{
        width: "300px", height: "300px",
        background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        opacity: 0.06,
        top: "10%", right: "5%",
      }} />

      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: "680px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 0,
      }}>
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          style={{ marginBottom: "24px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "6px 14px", borderRadius: "999px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            fontSize: "11.5px", fontWeight: 600, color: "var(--text-muted)",
            boxShadow: "0 2px 16px -4px rgba(0,0,0,0.15)",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 0 3px rgba(34,197,94,0.2), 0 0 8px rgba(34,197,94,0.4)",
              flexShrink: 0, display: "inline-block",
            }} />
            Available for new projects
          </span>
        </motion.div>

        {/* Handle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            fontFamily: "monospace", fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "lowercase",
            color: "var(--accent)", marginBottom: "12px",
            opacity: 0.85,
          }}
        >
          @{siteConfig.handle}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            style={{ marginLeft: "2px", fontWeight: 300 }}
          >|</motion.span>
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "clamp(42px, 8vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
            margin: "0 0 18px",
            background: "linear-gradient(160deg, var(--text) 30%, var(--accent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {siteConfig.name}
        </motion.h1>

        {/* Animated role pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            display: "inline-flex", alignItems: "center",
            padding: "6px 18px", borderRadius: "999px",
            background: "var(--accent-subtle)",
            border: "1px solid var(--accent-subtle-border)",
            fontSize: "13px", fontWeight: 600, color: "var(--accent)",
            marginBottom: "20px",
            boxShadow: "0 0 24px -8px var(--accent-glow)",
          }}
        >
          <AnimatedRole roles={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          style={{
            fontSize: "15px", color: "var(--text-muted)",
            maxWidth: "460px", lineHeight: 1.75,
            margin: "0 0 32px",
          }}
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            flexWrap: "wrap", justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          <motion.a
            href="#projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "11px 24px", borderRadius: "9px",
              fontSize: "13px", fontWeight: 700, color: "#fff",
              background: "var(--accent)",
              textDecoration: "none",
              boxShadow: "0 4px 20px -4px var(--accent-glow), 0 0 0 1px rgba(255,255,255,0.08) inset",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 6px 28px -4px var(--accent-glow)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.a>

          {siteConfig.resume && (
            <motion.a
              href={siteConfig.resume}
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "11px 18px", borderRadius: "9px",
                fontSize: "13px", fontWeight: 600,
                color: "var(--accent)",
                background: "var(--accent-subtle)",
                border: "1px solid var(--accent-subtle-border)",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </motion.a>
          )}

          {[
            { href: siteConfig.gitlab,   label: "GitLab",   icon: <Github size={13} /> },
            { href: siteConfig.linkedin, label: "LinkedIn", icon: <Linkedin size={13} /> },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank" rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "11px 16px", borderRadius: "9px",
                fontSize: "13px", fontWeight: 500,
                color: "var(--text-muted)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.04, borderColor: "var(--border-strong)" }}
              whileTap={{ scale: 0.97 }}
            >
              {icon} {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.68 }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderRadius: "14px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            width: "100%",
            boxShadow: "0 4px 32px -8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03) inset",
          }}
        >
          {STATS.map(({ icon: Icon, target, suffix, label }, i) => (
            <div key={label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "18px 12px", gap: "4px",
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-subtle) 0%, transparent 100%)",
                opacity: 0.5,
                pointerEvents: "none",
              }} />
              <Icon size={14} style={{ color: "var(--accent)", marginBottom: "2px", position: "relative" }} strokeWidth={2} />
              <span style={{
                fontSize: "22px", fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)", lineHeight: 1,
                position: "relative",
              }}>
                <CountUp target={target} suffix={suffix} />
              </span>
              <span style={{
                fontSize: "10px", fontWeight: 500,
                color: "var(--text-subtle)",
                textAlign: "center", lineHeight: 1.3,
                position: "relative",
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)",
          color: "var(--text-subtle)", textDecoration: "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "block" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
