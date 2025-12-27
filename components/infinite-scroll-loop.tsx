import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, useGSAP);

// Data mô phỏng với chiều cao khác nhau (thông qua lượng text hoặc class height)
const items = [
  {
    id: 1,
    title: "Short",
    desc: "Minimal content",
    heightClass: "h-[200px]",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Tall",
    desc: "This is a very tall card taking up more space to demonstrate variable heights.",
    heightClass: "h-[450px]",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Medium",
    desc: "Just a standard card.",
    heightClass: "h-[300px]",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Giant",
    desc: "A massive section that dominates the view.",
    heightClass: "h-[500px]",
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Tiny",
    desc: "Small.",
    heightClass: "h-[150px]",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    title: "Average",
    desc: "Balanced content here.",
    heightClass: "h-[300px]",
    color: "bg-pink-500",
  },
  // Clone thêm data để đảm bảo luôn đủ lấp đầy màn hình nếu cần
  {
    id: 7,
    title: "Short Clone",
    desc: "Repeat...",
    heightClass: "h-[200px]",
    color: "bg-orange-500",
  },
];

const GAP = 20; // Khoảng cách giữa các card (px)

const VariableHeightScroll = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]); // Lưu tham chiếu đến từng phần tử DOM
  const scrollY = useRef(0);
  const velocity = useRef(0);

  // State để đảm bảo render xong mới tính toán (optional, but good for safety)
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    setIsReady(true); // Trigger render xong để bắt đầu animation
  }, []);

  useGSAP(
    () => {
      if (!isReady) return;
      const boxes = itemsRef.current;
      let currentY = 0;
      const layouts = boxes.map((box) => {
        const height = box.offsetHeight;
        const layoutData = {
          y: currentY,
          height: height,
        };
        currentY += height + GAP; // Cộng dồn cho item tiếp theo
        return layoutData;
      });

      const totalHeight = currentY; // Tổng chiều cao vòng lặp

      const update = () => {
        velocity.current *= 0.92;
        scrollY.current += velocity.current;

        boxes.forEach((box, i) => {
          const layout = layouts[i];
          const rawY = layout.y + scrollY.current;
          let y = gsap.utils.wrap(0, totalHeight, rawY);
          const buffer = totalHeight / 2;
          y = gsap.utils.wrap(-buffer, totalHeight - buffer, rawY);

          gsap.set(box, { y: y });
        });
      };

      gsap.ticker.add(update);

      Observer.create({
        target: window,
        type: "wheel,pointer",
        onChange: (self) => {
          velocity.current -= self.deltaY * 0.5;
        },
      });

      return () => gsap.ticker.remove(update);
    },
    { scope: containerRef, dependencies: [isReady] },
  );

  return (
    <div className="h-screen w-full bg-[#0a0a0a] overflow-hidden relative flex justify-center font-sans">
      <div ref={containerRef} className="relative w-full max-w-xl h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            // Ref callback để lưu DOM element vào mảng itemsRef
            ref={(el) => (itemsRef.current[index] = el)}
            className={`absolute left-0 w-full rounded-2xl p-8 text-white shadow-2xl flex flex-col justify-between ${item.heightClass} ${item.color}`}
            style={
              {
                // Quan trọng: Không set top/bottom ở đây, để GSAP lo
                // Chỉ cần heightClass hoặc inline height
              }
            }
          >
            <div>
              <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="text-right font-mono opacity-50">
              Height: {item.heightClass}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-10 bg-black/50 px-4 py-2 rounded-full text-white text-sm backdrop-blur-md">
        Variable Height Scroll
      </div>
    </div>
  );
};

export default VariableHeightScroll;
