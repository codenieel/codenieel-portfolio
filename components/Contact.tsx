"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import { siteConfig } from "@/lib/data";

const socialLinks = [
  { label: "GitHub",   href: siteConfig.github,           icon: Github,   desc: "github.com/codenieel" },
  { label: "LinkedIn", href: siteConfig.linkedin,          icon: Linkedin, desc: "linkedin.com/in/codenieel" },
  { label: "Email",    href: `mailto:${siteConfig.email}`, icon: Mail,     desc: siteConfig.email },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Open to new projects and opportunities."
          align="center"
        />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "560px", margin: "0 auto" }}>
          {socialLinks.map(({ label, href, icon: Icon, desc }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <motion.a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px", borderRadius: "10px",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  minWidth: "170px", textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                className="group"
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--accent-subtle)", color: "var(--accent)" }}>
                  <Icon size={13} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", lineHeight: 1, marginBottom: "3px" }}>{label}</p>
                  <p style={{ fontSize: "10.5px", color: "var(--text-subtle)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{desc}</p>
                </div>
                <ArrowUpRight size={11} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.25, color: "var(--text)" }} />
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
