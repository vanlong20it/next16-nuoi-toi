"use client";

import { motion, Variants } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export function HeroSection() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center max-w-3xl flex flex-col items-center"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <Badge variant="secondary" className="px-4 py-2 text-sm bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 border-pink-500/50 gap-2">
          <Heart className="w-4 h-4 fill-current" /> Cần tìm nhà tài trợ
        </Badge>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x p-2 pb-4"
      >
        Nuôi Long Đi <br />
        <span className="text-4xl md:text-6xl text-gray-400 block mt-4">Ví tui đói lắm rồi!</span>
      </motion.h1>

      <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
        Chào các mạnh thường quân! <br />
        Đây là chiến dịch giải cứu một tâm hồn (và cái bụng) đang gào thét vì đói.
        Mọi sự đóng góp đều được quy đổi thành năng lượng tích cực (và đồ ăn).
      </motion.p>

      <motion.div variants={itemVariants}>
        <Button
          size="lg"
          className="text-xl px-8 py-8 rounded-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
          onClick={() => {
            const element = document.getElementById('donate-packages');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Bơm Máu Ngay 💸
        </Button>
      </motion.div>

      {/* QR Code Placeholder */}
      <motion.div
        variants={itemVariants}
        className="mt-12 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-4 max-w-xs mx-auto transform transition-all hover:scale-105 hover:bg-white/10"
      >
        <div className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Quét Mã Momo/Bank</div>
        <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center relative overflow-hidden group">
          {/* Placeholder Pattern */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-10">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="bg-black" />
            ))}
          </div>
          <div className="z-10 text-gray-400 text-xs text-center p-2">
            <Image src="/images/img-donate.jpg" width={500} height={500} loading="lazy" alt="qr code" />
          </div>

          {/* Scan Line Animation */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] z-20"
          />
        </div>
        <p className="text-xs text-gray-500 font-mono">Uy tín luôn (96,69%)</p>
      </motion.div>
    </motion.div>
  );
}
