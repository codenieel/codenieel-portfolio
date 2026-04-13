// ─────────────────────────────────────────────────────────────
//  Portfolio Data — edit this file to update all content
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "NieelDev",
  handle: "codenieel",
  role: "Full-Stack Developer",
  tagline: "I build performant web apps and mobile experiences.",
  bio: "I'm a Full-Stack Developer with a focus on building clean, scalable web applications and cross-platform mobile apps. I work across the entire stack — from database design and PHP/Node backends to React frontends and React Native mobile apps.",
  bio2: "Currently developing two React Native mobile apps while maintaining production web platforms. I care about clean code, great UX, and shipping things that actually work.",
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
  // Mobile
  { name: "React Native", category: "mobile" },
  { name: "Expo", category: "mobile" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // Tools
  { name: "Git", category: "tools" },
  { name: "Vercel", category: "tools" },
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
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, real-time cart, payment gateway integrations (PayPal, Stripe), and order tracking. Built for production scale.",
    tech: ["PHP", "MySQL", "jQuery", "AJAX", "PayPal API", "Stripe"],
    github: "#", // ← replace with real URL
    live: "#",
    featured: true,
  },
  {
    title: "Staycation Owner App",
    description:
      "A React Native mobile app for property owners to manage their staycation listings, track bookings, handle guest communications, and view earnings analytics.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    github: "#",
    featured: true,
  },
  {
    title: "Customer Booking App",
    description:
      "A cross-platform mobile app allowing customers to browse staycation properties, make bookings, track reservations, and communicate with property owners.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    github: "#",
    featured: true,
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
    company: "Freelance / Independent",
    period: "2022 – Present",
    bullets: [
      "Built and maintained production e-commerce web platforms with PHP, MySQL, and jQuery",
      "Developing two cross-platform mobile apps using React Native and Expo",
      "Integrated payment gateways (PayPal, Stripe), shipping APIs (UPS, DHL), and ERP systems (QuickBooks, ShipStation)",
      "Implemented CI/CD pipelines with GitLab for automated deployments",
    ],
  },
  {
    role: "Web Developer",
    company: "Project-Based",
    period: "2020 – 2022",
    bullets: [
      "Delivered custom web solutions for small and medium-sized businesses",
      "Built RESTful APIs consumed by web and mobile clients",
      "Focused on performance optimization and responsive design",
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
