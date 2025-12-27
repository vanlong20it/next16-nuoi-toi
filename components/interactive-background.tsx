"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Existing static blobs can remain or be replaced. Let's keep a dark base and add the moving light. */}

      {/* Moving Gradient Blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px] mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Secondary Moving Blob (optional, maybe lags slightly behind or different color for depth) */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[80px] mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          translateX: "-30%", // Slight offset
          translateY: "-30%",
        }}
      />
    </div>
  );
};
