import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codenieel-portfolio.vercel.app"),
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  title: "codenieel | Full-Stack Developer",
  description:
    "Portfolio of Daniel Lusares Dalde (codenieel) — Full-Stack Developer building performant web applications and cross-platform mobile apps with React, React Native, PHP, and more.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "React Native",
    "Next.js",
    "PHP",
    "TypeScript",
    "Mobile Developer",
    "Web Developer",
    "codenieel",
  ],
  authors: [{ name: "Daniel Lusares Dalde" }],
  creator: "codenieel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codenieel-portfolio.vercel.app",
    title: "codenieel | Full-Stack Developer",
    description:
      "Portfolio of Daniel Lusares Dalde (codenieel) — Full-Stack Developer building performant web applications and cross-platform mobile apps.",
    siteName: "codenieel",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "codenieel — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "codenieel | Full-Stack Developer",
    description: "Full-Stack Developer — Web & Mobile.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
