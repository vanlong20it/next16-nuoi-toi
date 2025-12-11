"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Tại sao tôi nên donate cho bạn?",
    answer: "Vì tôi dễ thương. Và vì bạn giàu. Quy luật bù trừ của vũ trụ."
  },
  {
    question: "Tiền donate sẽ được dùng vào việc gì?",
    answer: "Chủ yếu là đầu tư vào các dự án start-up tiềm năng (vé số) và nghiên cứu khoa học (thử nghiệm các loại mì gói mới)."
  },
  {
    question: "Bao giờ bạn lấy vợ/chồng?",
    answer: "Khi nào số dư tài khoản nhiều hơn số dòng code tôi phải fix mỗi ngày. Tức là... còn lâu."
  },
  {
    question: "Web này có lừa đảo không?",
    answer: "Không hề. Bạn đừng đánh giá tôi cao vậy chứ (vì làm gì có ai cho mà lừa)."
  }
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl"
    >
      <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
        <HelpCircle className="w-8 h-8 text-yellow-500" />
        Những Câu Hỏi Thường Lảng Tránh
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-800 rounded-xl bg-gray-900/30 overflow-hidden">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className={`text-lg font-medium transition-colors ${activeIndex === index ? 'text-pink-400' : 'text-white'}`}>
                {faq.question}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 py-4 text-gray-400 text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
