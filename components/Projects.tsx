"use client";

import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <SectionHeading
          label="Work"
          title="Selected Projects"
          subtitle="Things I've built. Update lib/data.ts to add your own."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
