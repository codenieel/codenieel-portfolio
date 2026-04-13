"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/data";

const ROLES = ["Full-Stack Developer", "React Native Developer", "Web Engineer"];

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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        style={{ display: "block", fontSize: "16px", fontWeight: 500, color: "var(--text-muted)" }}
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
        padding: "52px 20px 0",
        overflow: "hidden",
      }}
    >
      {/* Orb */}
      <div className="hero-orb" style={{
        width: "500px", height: "500px", opacity: 0.18,
        background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        top: "5%", left: "50%", transform: "translateX(-50%)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "580px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
        {/* Handle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}
        >
          @{siteConfig.handle}
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text)", margin: 0 }}
        >
          {siteConfig.name}
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          style={{ height: "24px", display: "flex", alignItems: "center" }}
        >
          <AnimatedRole roles={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "380px", lineHeight: 1.65, margin: 0 }}
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "4px" }}
        >
          <motion.a
            href="#projects"
            style={{ display: "inline-flex", alignItems: "center", padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#fff", background: "var(--accent)", textDecoration: "none" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.a>
          {[
            { href: siteConfig.github, label: "GitHub", icon: <Github size={14} /> },
            { href: siteConfig.linkedin, label: "LinkedIn", icon: <Linkedin size={14} /> },
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "9px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", textDecoration: "none" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {icon} {label}
            </motion.a>
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
        style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", color: "var(--text-subtle)" }}
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "block" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
