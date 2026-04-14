"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";
import { projects } from "@/lib/data";

const FILTERS = ["All", "Web", "Mobile"] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: (typeof projects)[0], filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Mobile") return project.tech.some((t) => /react native|expo|nativewind/i.test(t));
  if (filter === "Web") return !project.tech.some((t) => /react native|expo|nativewind/i.test(t));
  return true;
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = projects.filter((p) => matchesFilter(p, filter));

  return (
    <section id="projects" className="section">
      <div className="section-container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
          <SectionHeading
            label="Work"
            title="Selected Projects"
            subtitle="Production platforms I've built and maintained — web, mobile, and everything in between."
          />

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              display: "flex", gap: "4px",
              padding: "3px", borderRadius: "8px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              flexShrink: 0, alignSelf: "flex-start",
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "5px 12px", borderRadius: "6px", border: "none",
                  fontSize: "11px", fontWeight: 600, cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                  background: filter === f ? "var(--accent)" : "transparent",
                  color: filter === f ? "#fff" : "var(--text-muted)",
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
              >
                <ProjectCard project={project} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-subtle)", fontSize: "13px" }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
