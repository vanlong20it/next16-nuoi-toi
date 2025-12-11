"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, PartyPopper, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const packages = [
  {
    title: "Gói 'Sống Qua Ngày'",
    price: "20.000 VNĐ",
    period: "/ ngày",
    description: "Đủ tiền ly trà đá vỉa hè hoặc gói mì tôm không trứng. Cứu đói sinh viên nghèo vượt khó!",
    icon: <Coffee className="w-12 h-12 mb-4 text-orange-400" />,
    color: "hover:border-orange-400/50",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    title: "Gói 'Người Đỡ Đầu'",
    price: "500.000 VNĐ",
    period: "/ tháng",
    description: "Giúp tui được ăn cơm có thịt. Bạn chính là ân nhân cứu mạng của chiếc bụng đói này.",
    icon: <PartyPopper className="w-12 h-12 mb-4 text-purple-400" />,
    color: "border-purple-500 shadow-xl shadow-purple-900/20",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    title: "Gói 'Sugar Daddy/Mommy'",
    price: "10.000.000+ VNĐ",
    period: "/ năm",
    description: "Xin nguyện đi chụp ảnh cho bạn sống ảo tới khi sống thật thì thôi.",
    icon: <Crown className="w-12 h-12 mb-4 text-yellow-400" />,
    color: "hover:border-yellow-400/50",
    buttonVariant: "outline" as const,
    popular: false,
  },
];

export function PackagesSection() {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  return (
    <motion.div
      id="donate-packages"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl"
    >
      <h2 className="text-4xl font-bold text-center mb-16">Các Gói Tài Trợ</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Dialog open={isQRCodeOpen} onOpenChange={setIsQRCodeOpen}>
          <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Quét Mã Ủng Hộ</DialogTitle>
              <DialogDescription className="text-center text-gray-400">
                Mọi sự đóng góp đều là nguồn động lực to lớn!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4">
              <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <Image src="/images/img-donate.jpg" fill className="object-cover" alt="QR Code" />
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] z-20"
                />
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              Cảm ơn bạn đã nuôi tôi hôm nay! ❤️
            </div>
          </DialogContent>
        </Dialog>

        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`flex h-full ${pkg.popular ? 'md:scale-110 z-10' : ''}`}
          >
            <Card className={`relative w-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800 transition-colors duration-300 flex flex-col text-white ${pkg.color}`}>
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 z-20">
                  <Badge className="rounded-none rounded-bl-lg px-3 py-1 bg-purple-600 hover:bg-purple-600 text-white border-0">
                    Được chọn nhiều nhất
                  </Badge>
                </div>
              )}

              <CardHeader className="flex flex-col items-center text-center pb-2">
                <div className="mb-4">{pkg.icon}</div>
                <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex-grow text-center flex flex-col items-center">
                <div className="text-3xl font-extrabold mb-1 bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400">
                  {pkg.price}
                </div>
                <div className="text-sm text-gray-500 mb-6">{pkg.period}</div>
                <CardDescription className="text-gray-300 text-base">
                  {pkg.description}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full font-bold text-lg h-12 ${pkg.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                  variant={pkg.popular ? "default" : "secondary"}
                  onClick={() => setIsQRCodeOpen(true)}
                >
                  Chọn Gói Này
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
