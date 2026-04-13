import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codenieel.dev"),
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  title: "codenieel | Full-Stack Developer",
  description:
    "Portfolio of NieelDev — Full-Stack Developer building performant web applications and cross-platform mobile apps with React, React Native, PHP, and more.",
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
  authors: [{ name: "NieelDev" }],
  creator: "codenieel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codenieel.dev",
    title: "codenieel | Full-Stack Developer",
    description:
      "Portfolio of NieelDev — Full-Stack Developer building performant web applications and cross-platform mobile apps.",
    siteName: "codenieel",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
