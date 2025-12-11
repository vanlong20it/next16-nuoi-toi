"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="w-full border-t border-gray-800 pt-12 pb-8 text-center text-muted-foreground mt-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800">
          <AlertCircle className="w-4 h-4" />
          <p>Đây chỉ là trang web với mục đích giải trí, không có công kích tới bất kì tổ chức hay cá nhân nào</p>
        </div>
        <p>© {new Date().getFullYear()} Nuôi Tôi Đi. All content is for fun.</p>
      </motion.div>
    </footer>
  );
}
