"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ui/ThemeToggle";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState<string>("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 20); ticking = false; });
        ticking = true;
      }
    };
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
    let ticking2 = false;
    const handleScrollBottom = () => {
      if (!ticking2) {
        requestAnimationFrame(() => {
          const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
          if (nearBottom) setActive(navLinks[navLinks.length - 1].href);
          ticking2 = false;
        });
        ticking2 = true;
      }
    };
    window.addEventListener("scroll", handleScrollBottom, { passive: true });
    return () => { obs.forEach((o) => o.disconnect()); window.removeEventListener("scroll", handleScrollBottom); };
  }, []);

  const handleLink = (href: string) => { setActive(href); setMobileOpen(false); };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "var(--nav-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "background 0.25s, border-color 0.25s",
    }}>
      <nav
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => handleLink("#hero")}
          style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}
        >
          <Image
            src="/logo.svg" alt="codenieel logo" width={28} height={28}
            style={{ display: "block", borderRadius: "8px" }}
          />
          <span style={{
            fontFamily: "monospace", fontSize: "13px", fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.02em",
          }}>
            {"<codenieel />"}
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0 }} className="nav-desktop">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleLink(link.href)}
                style={{
                  position: "relative", display: "block",
                  padding: "6px 14px", borderRadius: "7px",
                  fontSize: "13px", fontWeight: 500, textDecoration: "none",
                  color: active === link.href ? "var(--text)" : "var(--text-muted)",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (active !== link.href) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (active !== link.href) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: "absolute", inset: 0, borderRadius: "7px",
                      background: "var(--bg-card-hover)",
                      border: "1px solid var(--border)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ThemeToggle />
          <motion.button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              width: "34px", height: "34px", display: "flex",
              alignItems: "center", justifyContent: "center",
              borderRadius: "8px", background: "var(--bg-card)",
              border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer",
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
            transition={{ duration: 0.22 }}
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <ul className="section-container" style={{ padding: "8px 24px 12px", display: "flex", flexDirection: "column", gap: "2px", listStyle: "none" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLink(link.href)}
                    style={{
                      display: "block", padding: "9px 12px", borderRadius: "7px", textDecoration: "none",
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
