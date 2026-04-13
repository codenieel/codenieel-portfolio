"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState<string>("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const obs: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(`#${id}`); }, { rootMargin: "-40% 0px -55% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const handleLink = (href: string) => { setActive(href); setMobileOpen(false); };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.2s, border-color 0.2s, backdrop-filter 0.2s",
      }}
    >
      <nav
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleLink("#hero")}
          style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "var(--accent)", textDecoration: "none", letterSpacing: "-0.02em" }}
        >
          {"<codenieel />"}
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "24px", listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleLink(link.href)}
                style={{
                  position: "relative", display: "block", padding: "4px 0",
                  fontSize: "13px", fontWeight: 500, textDecoration: "none",
                  color: active === link.href ? "var(--accent)" : "var(--text-muted)",
                  transition: "color 0.15s",
                }}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{ position: "absolute", bottom: "-1px", left: 0, right: 0, height: "2px", borderRadius: "2px", background: "var(--accent)", display: "block" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ThemeToggle />
          <motion.button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.93 }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "7px", background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ background: "var(--nav-bg)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}
          >
            <ul className="section-container" style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: "2px", listStyle: "none" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLink(link.href)}
                    style={{
                      display: "block", padding: "8px 10px", borderRadius: "6px", textDecoration: "none",
                      fontSize: "13px", fontWeight: 500,
                      color: active === link.href ? "var(--accent)" : "var(--text-muted)",
                      background: active === link.href ? "var(--accent-subtle)" : "transparent",
                      transition: "background 0.12s, color 0.12s",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
