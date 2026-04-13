"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, bottom: 0,
      width: "3px", zIndex: 100, pointerEvents: "none",
    }}>
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: `${progress * 100}%`,
          background: "var(--accent)",
          borderRadius: "0 0 2px 0",
        }}
        transition={{ ease: "linear", duration: 0.05 }}
      />
    </div>
  );
}
