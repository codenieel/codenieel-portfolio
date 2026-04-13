"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  ArrowDown,
  Code2,
  Smartphone,
  Globe,
} from "lucide-react";
import { siteConfig, getStats } from "@/lib/data";

const ROLES = [
  "Full-Stack Developer",
  "React Native Developer",
  "Web Developer",
];

const { years, productionProjects, mobileApps } = getStats();

const STATS = [
  { icon: Globe,      target: years,             suffix: "+", label: "Years Experience" },
  { icon: Code2,      target: productionProjects, suffix: "+", label: "Production Projects" },
  { icon: Smartphone, target: mobileApps,         suffix: "",  label: "Mobile Apps Shipped" },
];

function CountUp({ target, suffix = "", duration = 1.2 }: { target: number; suffix?: string; duration?: number }) {
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
      // ease out cubic
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
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={roles[index]}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28 }}
        style={{ display: "inline-block" }}
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
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
        padding: "80px 20px 60px",
        overflow: "hidden",
      }}
    >
      {/* Dot grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.45,
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Background orbs */}
      <div
        className="hero-orb"
        style={{
          width: "600px",
          height: "600px",
          opacity: 0.13,
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: "300px",
          height: "300px",
          opacity: 0.07,
          background: "radial-gradient(circle, #5b5ef5 0%, transparent 70%)",
          bottom: "10%",
          right: "10%",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "640px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ marginBottom: "20px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "999px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-muted)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            Available for new projects
          </span>
        </motion.div>

        {/* Handle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "10px",
          }}
        >
          @{siteConfig.handle}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            style={{ marginLeft: "2px", fontWeight: 300 }}
          >|</motion.span>
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            fontSize: "clamp(40px, 7vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            margin: "0 0 16px",
            background: "linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)",
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
          transition={{ duration: 0.4, delay: 0.32 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 14px",
            borderRadius: "999px",
            background: "var(--accent-subtle)",
            border: "1px solid var(--accent-subtle-border)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: "18px",
            minHeight: "30px",
          }}
        >
          <AnimatedRole roles={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.42 }}
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            maxWidth: "440px",
            lineHeight: 1.7,
            margin: "0 0 28px",
          }}
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <motion.a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              background: "var(--accent)",
              textDecoration: "none",
              boxShadow: "0 2px 12px -2px rgba(92, 94, 245, 0.4)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 4px 20px -2px rgba(92, 94, 245, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.a>
          {[
            {
              href: siteConfig.github,
              label: "GitHub",
              icon: <Github size={13} />,
            },
            {
              href: siteConfig.linkedin,
              label: "LinkedIn",
              icon: <Linkedin size={13} />,
            },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-muted)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {icon} {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.64 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            flexWrap: "wrap",
            borderRadius: "12px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          {STATS.map(({ icon: Icon, target, suffix, label }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "14px 28px",
                  gap: "3px",
                }}
              >
                <Icon
                  size={13}
                  style={{ color: "var(--accent)", marginBottom: "4px" }}
                  strokeWidth={2}
                />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={target} suffix={suffix} />
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "var(--text-subtle)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "var(--border)",
                    flexShrink: 0,
                  }}
                />
              )}
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
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "var(--text-subtle)",
          textDecoration: "none",
        }}
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "block" }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  );
}
