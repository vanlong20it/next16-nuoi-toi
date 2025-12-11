"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, ShoppingBag, Wallet } from "lucide-react";

const timelineEvents = [
  {
    time: "09:00 AM",
    title: "Ting Ting! Lương Về",
    description: "Khoảnh khắc huy hoàng nhất trong tháng. Cảm thấy mình là tỷ phú.",
    icon: <DollarSign className="w-5 h-5 text-green-500" />,
    color: "bg-green-500/10 border-green-500/50"
  },
  {
    time: "09:05 AM",
    title: "Trả Nợ & Hóa Đơn",
    description: "Tiền điện, tiền nước, tiền nhà, tiền 'mượn tạm' bạn hồi sinh viên.",
    icon: <Wallet className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-500/10 border-blue-500/50"
  },
  {
    time: "09:15 AM",
    title: "Chốt Đơn Shopee",
    description: "Những món đồ 'cần thiết' đã nằm trong giỏ hàng từ 3 tuần trước.",
    icon: <ShoppingBag className="w-5 h-5 text-purple-500" />,
    color: "bg-purple-500/10 border-purple-500/50"
  },
  {
    time: "09:30 AM",
    title: "Trở Về Cái Máng Lợn",
    description: "Tài khoản còn 50k. Bắt đầu chuỗi ngày mì tôm trường kỳ.",
    icon: <Clock className="w-5 h-5 text-red-500" />,
    color: "bg-red-500/10 border-red-500/50"
  }
];

export function TimelineSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl"
    >
      <h2 className="text-3xl font-bold text-center mb-12">Lịch Trình Tiêu Tiền (Thực Tế)</h2>

      <div className="relative border-l-2 border-gray-800 ml-4 md:ml-0 md:pl-8 space-y-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8 md:pl-0"
          >
            {/* Dot on line */}
            <div className="absolute top-0 left-[-5px] md:left-[-9px] w-4 h-4 rounded-full bg-gray-950 border-2 border-pink-500 z-10" />

            <div className={`p-6 rounded-2xl border backdrop-blur-sm ${event.color} transition-transform hover:scale-[1.02]`}>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-gray-900 rounded-lg border border-gray-700">
                  {event.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 block">{event.time}</span>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              <p className="text-gray-300 ml-14">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
