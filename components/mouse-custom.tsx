"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Zap, Code, Hash, Terminal, Cpu, Globe, Activity, Aperture } from 'lucide-react';

const MouseCustom = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 100, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [binaryGrid, setBinaryGrid] = useState<{ content: React.ReactNode; visible: boolean }[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const items: (string | React.ReactElement)[] = [
        '🥲', '😍', '🥰', '😘', '💖', '💕', '😀', '😁', '😂',
      ];

      const newGrid = Array.from({ length: 16 }, (_, index) => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        // If it's a react element, clone it with a unique key to satisfy React key requirements in arrays if needed,
        // though here we are putting it in an object `content`.
        // Actually, just passing the element is fine, but keys might be an issue if we were rendering an array of elements directly.
        // Here we render inside a map: {item.content}

        return {
          content: randomItem,
          visible: Math.random() > 0.5
        };
      });

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
      className="fixed hidden lg:flex top-0 left-0 pointer-events-none z-50 mix-blend-normal items-center justify-center"
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
              className={`text-xl leading-none bg-white font-mono font-bold size-10 flex items-center justify-center text-white transition-opacity duration-75 ${item.visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {item.content}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MouseCustom;