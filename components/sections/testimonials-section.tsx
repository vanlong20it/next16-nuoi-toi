"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Elon Musk",
    role: "CEO Tesla (Fictional)",
    content: "Nếu tôi biết đến trang web này sớm hơn, tôi đã không mua Twitter. Một khoản đầu tư vô cùng tiềm năng!",
    avatar: "EM"
  },
  {
    name: "Người Yêu Cũ",
    role: "Đã có người mới",
    content: "Chia tay anh là sai lầm lớn nhất đời em. Biết anh giàu tình cảm (và sắp giàu tiền) thế này thì...",
    avatar: "EX"
  },
  {
    name: "Chủ Trọ",
    role: "Đòi tiền hàng tháng",
    content: "Cháu nó ngoan lắm, chỉ tội hay khất tiền nhà. Mong mọi người giúp đỡ để tôi còn thu được nợ.",
    avatar: "CT"
  }
];

export function TestimonialsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl"
    >
      <h2 className="text-3xl font-bold text-center mb-12">Mọi người nói gì về tôi</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Card key={i} className="bg-gray-800/30 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`} />
                <AvatarFallback>{t.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{t.name}</CardTitle>
                <CardDescription className="text-xs mt-1">{t.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-gray-400 italic relative">
              <Quote className="w-4 h-4 text-gray-600 absolute top-0 left-0 -translate-x-1 -translate-y-1 opacity-50" />
              <span className="pl-4">{t.content}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
