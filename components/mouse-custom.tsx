"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseCustom = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 100, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [binaryGrid, setBinaryGrid] = useState<{ val: string; visible: boolean }[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const newGrid = Array.from({ length: 16 }, () => ({
        val: Math.floor((Math.random() * 10)).toString(), // Numbers 0-9
        visible: Math.random() > 0.5
      }));

      // Enforce constraint: at least 50% (8 items) must be visible
      const visibleCount = newGrid.filter(item => item.visible).length;
      if (visibleCount < 8) {
        let needed = 8 - visibleCount;
        newGrid.forEach(item => {
          if (needed > 0 && !item.visible) {
            item.visible = true;
            needed--;
          }
        });
      }

      setBinaryGrid(newGrid);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-normal flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Rotated Rectangle Container */}
      <div className="relative size-[200px] bg-transparent flex flex-wrap items-center justify-center content-center overflow-hidden">

        {/* Inner Grid - No counter-rotation, text flows with the box */}
        <div className="flex flex-wrap w-full h-full items-center justify-center content-center p-1">
          {binaryGrid.map((item, i) => (
            <span
              key={i}
              className={`text-xl leading-none bg-black font-mono font-bold size-10 text-center block text-white transition-opacity duration-75 ${item.visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {item.val}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MouseCustom;