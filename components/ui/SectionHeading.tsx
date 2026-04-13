"use client";

import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("section-head", align === "center" && "text-center flex flex-col items-center")}>
      <ScrollReveal delay={0}>
        <span className="label-tag">{label}</span>
      </ScrollReveal>
      <ScrollReveal delay={0.06}>
        <h2 className="section-title">{title}</h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p className="section-subtitle" style={{ marginTop: "6px" }}>{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  );
}
