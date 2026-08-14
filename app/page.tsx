import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Terminal = dynamic(() => import("@/components/Terminal"));
const Experience = dynamic(() => import("@/components/Experience"));
const Contact = dynamic(() => import("@/components/Contact"));
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ChatWidgetLoader from "@/components/ui/ChatWidgetLoader";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Terminal />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollProgress />
      <ChatWidgetLoader />
    </>
  );
}
