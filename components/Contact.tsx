"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, MessageSquare, MapPin } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { siteConfig } from "@/lib/data";

const email = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;

const socialLinks = [
  { label: "GitLab",   href: siteConfig.gitlab,            icon: Github,   desc: siteConfig.gitlab.replace("https://", ""),  color: "#fc6d26" },
  { label: "LinkedIn", href: siteConfig.linkedin,           icon: Linkedin, desc: "linkedin.com/in/codenieel",                color: "#0a66c2" },
  { label: "Email",    href: `mailto:${email}`,             icon: Mail,     desc: email,                                      color: "#7c7fff" },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-container">

        {/* Main CTA card */}
        <ScrollReveal delay={0}>
          <div style={{
            borderRadius: "16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: "16px",
            position: "relative",
          }}>
            {/* Top gradient strip */}
            <div style={{
              height: "4px",
              background: "linear-gradient(90deg, var(--accent) 0%, #a78bfa 50%, #38bdf8 100%)",
            }} />

            {/* Background orb */}
            <div style={{
              position: "absolute", top: "-60px", right: "-60px",
              width: "220px", height: "220px", borderRadius: "50%",
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              opacity: 0.06, pointerEvents: "none",
            }} />

            <div style={{ padding: "32px 32px 28px", position: "relative", zIndex: 1 }}>
              {/* Label */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                <MessageSquare size={12} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Get in Touch
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.15, margin: "0 0 10px", maxWidth: "480px" }}>
                Let&apos;s build something great together
              </h2>

              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "420px", margin: "0 0 24px" }}>
                I&apos;m open to freelance projects, full-time roles, and interesting collaborations. Whether you have a project in mind or just want to connect — my inbox is always open.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <motion.a
                  href={`mailto:${email}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "10px 20px", borderRadius: "8px",
                    fontSize: "13px", fontWeight: 600, color: "#fff",
                    background: "var(--accent)", textDecoration: "none",
                    boxShadow: "0 2px 12px -2px rgba(92,94,245,0.4)",
                  }}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 20px -2px rgba(92,94,245,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={13} /> Send a Message
                </motion.a>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-subtle)" }}>
                  <MapPin size={11} />
                  {siteConfig.location} · Remote-friendly
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Social link cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          {socialLinks.map(({ label, href, icon: Icon, desc, color }, i) => (
            <ScrollReveal key={label} delay={0.06 + i * 0.07}>
              <motion.a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "10px",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  position: "relative", overflow: "hidden",
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = color + "60";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px -4px ${color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "30px", height: "30px", borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, background: color + "18", color: color,
                }}>
                  <Icon size={14} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", lineHeight: 1, marginBottom: "3px" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "10.5px", color: "var(--text-subtle)", wordBreak: "break-all", margin: 0, lineHeight: 1.4 }}>
                    {desc}
                  </p>
                </div>
                <ArrowUpRight size={11} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.2, color: "var(--text)" }} />
              </motion.a>
            </ScrollReveal>
          ))}
        </div>


      </div>
    </section>
  );
}
