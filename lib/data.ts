// ─────────────────────────────────────────────────────────────
//  Portfolio Data — edit this file to update all content
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "NieelDev",
  handle: "codenieel",
  role: "Full-Stack Developer",
  tagline: "Full-Stack Developer specializing in PHP/React web platforms and cross-platform React Native apps — shipping real products used by real people.",
  bio: "I'm a Full-Stack Developer based in the Philippines, contributing to real-world client projects as a freelancer. I work across the full stack — PHP/CodeIgniter backends, MySQL databases, React frontends, and React Native mobile apps.",
  bio2: "I've shipped production platforms across e-commerce, real estate marketplaces, and mobile apps. I care about clean code, solid integrations, and delivering things that actually work in the hands of real users.",
  email: "nieeldan@email.com", // ← replace
  github: "https://github.com/codenieel", // ← replace
  linkedin: "https://linkedin.com/in/codenieel", // ← replace
  location: "Philippines",
};

export type Skill = {
  name: string;
  category: "language" | "frontend" | "mobile" | "backend" | "tools";
};

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "PHP", category: "language" },
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap", category: "frontend" },
  // Mobile
  { name: "React Native", category: "mobile" },
  { name: "Expo", category: "mobile" },
  { name: "Nativewind", category: "mobile" },
  // Backend
  { name: "CodeIgniter", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "AWS S3", category: "backend" },
  // Tools
  { name: "Git", category: "tools" },
  { name: "GitLab CI/CD", category: "tools" },
  { name: "Firebase", category: "tools" },
  { name: "Figma", category: "tools" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Clear Ballistics",
    description:
      "Production e-commerce platform for ballistic gel products. Features multi-gateway payments (PayPal, Stripe, Authorize.net), UPS/DHL shipping rates, loyalty points, QuickBooks sync, ShipStation fulfillment, and campaign management.",
    tech: ["PHP", "MySQL", "jQuery", "PayPal API", "Stripe", "UPS API", "ShipStation"],
    live: "https://clearballistics.com",
    featured: true,
  },
  {
    title: "Tokkatok Platform",
    description:
      "Full-stack real estate marketplace for the Philippines connecting property seekers with owners, agents, and developers. Includes subscription tiers, booking system, AWS S3 media, AsiaPay/Xendit payments, and an AdminLTE admin panel.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "AWS S3", "jQuery"],
    featured: true,
  },
  {
    title: "Tokkatok Customer App",
    description:
      "Cross-platform mobile app (iOS & Android) for customers to browse, save, and book properties on the Tokkatok marketplace. Real-time calendar availability, Firebase push notifications, and secure in-app messaging.",
    tech: ["React Native", "Expo", "TypeScript", "Nativewind", "Firebase", "Zustand"],
    featured: true,
  },
  {
    title: "Tokkatok Owner App",
    description:
      "Dedicated mobile app for staycation property owners to manage listings, track bookings, sync availability calendars, upload gallery images, and communicate with guests — all from their phone.",
    tech: ["React Native", "Expo", "TypeScript", "Nativewind", "Firebase", "React Query"],
    featured: true,
  },
  {
    title: "BBH Web Platform",
    description:
      "Multi-variant e-commerce web platform with product browsing, cart, checkout, blog, and user account management. Built with CodeIgniter and Bootstrap with multiple homepage design variations.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "jQuery"],
    featured: false,
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "2022 – Present",
    bullets: [
      "Contributed to Clear Ballistics — a production e-commerce platform with multi-gateway payments (PayPal, Stripe, Authorize.net), UPS/DHL shipping, and QuickBooks/ShipStation integrations",
      "Built Tokkatok — a real estate marketplace for the Philippines with role-based portals, subscription tiers, AWS S3 media management, and AsiaPay/Xendit payment gateways",
      "Developed two cross-platform React Native apps (Expo) for the Tokkatok platform — a customer booking app and a property owner management app",
      "Worked on BBH — a multi-variant e-commerce web platform built on CodeIgniter with full cart, checkout, blog, and account management",
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
