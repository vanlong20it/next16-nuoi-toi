"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Tích ngay 1000 điểm công đức vô lượng.",
  "Giúp một lập trình viên không phải chuyển sang làm TikToker lắc hông.",
  "Tránh việc server bị sập vào lúc 5 giờ chiều thứ 6.",
  "Được vinh danh trong file README.md (nếu tôi nhớ).",
  "Cứu vớt một tâm hồn đang héo hon vì deadline và mì gói."
];

export function BenefitsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl bg-linear-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-purple-300">
        Những Lợi Ích Vô Hình (Và Hữu Hình)
      </h2>

      <div className="grid gap-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 text-lg md:text-xl text-indigo-100"
          >
            <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
            <span>{reason}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
