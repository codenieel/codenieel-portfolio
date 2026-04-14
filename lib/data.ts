// ─────────────────────────────────────────────────────────────
//  Portfolio Data — edit this file to update all content
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Daniel Lusares Dalde",
  handle: "<codenieel />",
  role: "Full-Stack Developer",
  tagline:
    "Full-Stack Developer specializing in PHP/React web platforms and cross-platform React Native apps — shipping real products used by real people.",
  bio: "I'm a Full-Stack Developer based in the Philippines, contributing to real-world client projects as a freelancer. I work across the full stack — PHP/CodeIgniter backends, MySQL databases, React frontends, and React Native mobile apps.",
  bio2: "I've shipped production platforms across e-commerce, real estate marketplaces, and mobile apps. I care about clean code, solid integrations, and delivering things that actually work in the hands of real users.",
  // Email is split to prevent bot scraping — joined at runtime in components
  emailUser: "daldedaniellus",
  emailDomain: "gmail.com",
  gitlab: "https://gitlab.com/codenieel", // ← update to your actual GitLab username
  github: "https://github.com/codenieel",
  linkedin: "https://linkedin.com/in/codenieel",
  location: "Philippines",
  // Drop your photo in /public/avatar.jpg and set this to "/avatar.jpg"
  // Leave as "" to hide the avatar
  avatar: "/avatar.jpg",
  // Drop your resume PDF in /public/ and set this to "/resume.pdf"
  // Leave as "" to hide the resume button
  resume: "/CV-DALDE.pdf",
  // Used to auto-calculate years of experience — update if career start changes
  careerStartDate: "2022-12-01",
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
    tech: [
      "PHP",
      "MySQL",
      "jQuery",
      "PayPal API",
      "Stripe",
      "UPS API",
      "DHL API",
      "ShipStation",
    ],
    featured: true,
  },
  {
    title: "Tokkatok",
    description:
      "Full-stack real estate marketplace for the Philippines connecting property seekers with owners, agents, and developers. Includes subscription tiers, booking system, AWS S3 media, AsiaPay/Xendit payments, and an AdminLTE admin panel.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "AWS S3", "jQuery"],
    featured: true,
  },
  {
    title: "Tokkatok Customer App",
    description:
      "Cross-platform mobile app (iOS & Android) for customers to browse, save, and book properties on the Tokkatok marketplace. Real-time calendar availability, Firebase push notifications, and secure in-app messaging.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Nativewind",
      "Firebase",
      "Zustand",
    ],
    featured: true,
  },
  {
    title: "Tokkatok Owner App",
    description:
      "Dedicated mobile app for staycation property owners to manage listings, track bookings, sync availability calendars, upload gallery images, and communicate with guests — all from their phone.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Nativewind",
      "Firebase",
      "React Query",
    ],
    featured: true,
  },
  {
    title: "Beauty Buffet Holistica (BBH)",
    description:
      "Multi-variant e-commerce web platform with product browsing, cart, checkout, blog, and user account management. Built with CodeIgniter and Bootstrap with multiple homepage design variations.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "jQuery"],
    featured: false,
  },
];

export type ExperienceBullet = {
  text: string;
  platform?: "web" | "mobile" | "both";
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  parallel?: boolean;
  bullets: (string | ExperienceBullet)[];
};

export const experiences: Experience[] = [
  {
    role: "Web Developer",
    company: "Humimic Medical / Clear Ballistics",
    location: "Greenville, SC (Remote)",
    period: "Apr 2025 – Present",
    current: true,
    bullets: [
      "Maintain and enhance Clear Ballistics — a custom PHP e-commerce platform with multi-gateway payments, UPS/DHL shipping, and QuickBooks/ShipStation integrations",
      "Manage Humimic Medical WordPress site — theme customization, plugin management, and content updates",
      "Implement front-end improvements using HTML, CSS, JavaScript, and responsive design best practices",
      "Optimize website performance, SEO, and page loading speed across both platforms",
      "Collaborate with marketing and operations teams on landing pages, product updates, and campaigns",
      "Manage version control and repository updates using Git",
    ],
  },
  {
    role: "IT System Engineer",
    company: "Metrologyx Training and Assessment Center Inc.",
    location: "Mandaue City, Cebu",
    period: "Jul 2024 – May 2025",
    bullets: [
      "Developed and maintained automation systems using the Ignition SCADA platform",
      "Designed and troubleshot SCADA/HMI systems for industrial operations",
      "Created and managed company websites ensuring usability, performance, and uptime",
      "Collaborated with teams to integrate Ignition solutions with IT/OT infrastructure",
      "Updated and optimized website content, functionality, and security",
    ],
  },
  {
    role: "Graphic Artist",
    company: "Metrologyx Training and Assessment Center Inc.",
    location: "Mandaue City, Cebu",
    period: "Aug 2023 – May 2025",
    bullets: [
      "Developed creative content for advertisements, brochures, tarps, and online campaigns",
      "Managed printed deliverables, signage, and website pages",
      "Created and maintained marketing collateral and brand materials",
      "Developed and managed social media marketing programs",
    ],
  },
  {
    role: "WordPress Developer",
    company: "Metrologyx Institute of Technology",
    location: "Minglanilla, Cebu",
    period: "Jan 2023 – May 2023",
    bullets: [
      "Developed and designed a WordPress website to showcase courses, competencies, and institutional info",
      "Optimized for responsiveness, navigation, and user engagement",
      "Implemented SEO best practices to enhance online visibility for prospective students",
      "Provided training and documentation to staff for content management",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Contact Center Solution PH",
    location: "Mandaue City, Cebu",
    period: "Dec 2022 – Jul 2023",
    bullets: [
      "Designed visual content for social media graphics, brochures, banners, and advertisements",
      "Developed branding assets and maintained consistency across all company materials",
      "Collaborated with marketing team to conceptualize and execute creative campaigns",
      "Edited and enhanced images and videos aligned with brand aesthetics",
    ],
  },
];

export const freelanceProjects: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "Tokkatok",
    location: "Remote · Philippines",
    period: "Jan 2026 – Present",
    current: true,
    bullets: [
      {
        text: "Built the Tokkatok web marketplace — a full-stack real estate platform for the Philippines with role-based portals (admin, agent, owner, customer), subscription tiers, and an AdminLTE admin panel",
        platform: "web",
      },
      {
        text: "Integrated AsiaPay and Xendit payment gateways, AWS S3 for media management, and a booking system with availability calendars",
        platform: "web",
      },
      {
        text: "Developed Tokkatok Customer App — a cross-platform React Native (Expo) app for browsing, saving, and booking properties with Firebase push notifications and real-time availability",
        platform: "mobile",
      },
      {
        text: "Developed Tokkatok Owner App — a React Native app for staycation owners to manage listings, track bookings, sync calendars, upload gallery images, and message guests",
        platform: "mobile",
      },
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Beauty Buffet Holistica (BBH)",
    location: "Remote · Philippines",
    period: "Dec 2025 – Apr 2026",
    bullets: [
      {
        text: "Built the BBH storefront — a multi-variant e-commerce web platform with product browsing, cart, and checkout",
        platform: "web",
      },
      {
        text: "Developed a custom admin panel for product, order, and content management with multiple homepage design variations",
        platform: "web",
      },
      {
        text: "Built on CodeIgniter and Bootstrap with jQuery-driven AJAX interactions throughout",
        platform: "web",
      },
    ],
  },
];

// Auto-calculated stats derived from actual data
export function getStats() {
  // Years of experience — from careerStartDate to today
  const start = new Date(siteConfig.careerStartDate);
  const now = new Date();
  const yearsExact =
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const years = Math.floor(yearsExact);

  // Production projects — count all projects
  const productionProjects = projects.length;

  // Mobile apps — count projects using React Native / Expo
  const mobileApps = projects.filter((p) =>
    p.tech.some((t) => /react native|expo/i.test(t)),
  ).length;

  return { years, productionProjects, mobileApps };
}

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
