"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StorySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl text-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center justify-center gap-4">
        <Terminal className="text-green-500 w-8 h-8 md:w-12 md:h-12" />
        <span>Hồ Sơ "Bệnh Án"</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl text-green-400">Tình Trạng Hiện Tại</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-2 text-gray-300">
            <p>• <strong>Cân nặng:</strong> Giảm dần đều theo task.</p>
            <p>• <strong>Tài khoản:</strong> Số dư phong thủy (về 0).</p>
            <p>• <strong>Sở thích:</strong> Code bug và fix bug (trong mơ).</p>
            <p>• <strong>Kỹ năng đặc biệt:</strong> Biến cafe thành lo âu.</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl text-red-400">Tại Sao Lại Ra Nông Nỗi Này?</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-2 text-gray-300">
            <p>Vì đam mê công nghệ mà quên mất mình cần ăn.</p>
            <p>Vì tin lời sếp "làm xong project này thưởng lớn".</p>
            <p>Vì lỡ tay pre-order MacBook Pro M3 Max (trả góp 48 tháng).</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
