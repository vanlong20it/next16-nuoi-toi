"use client";

import { motion, Variants } from "framer-motion";
import { Coffee, PartyPopper, Crown, Heart, AlertCircle, Terminal, Quote, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

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

export default function Home() {
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
      description: "Dành cho các đại gia chân chính. Tui xin nguyện làm 'con sen' trung thành trọn đời!",
      icon: <Crown className="w-12 h-12 mb-4 text-yellow-400" />,
      color: "hover:border-yellow-400/50",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

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

  const reasons = [
    "Tích ngay 1000 điểm công đức vô lượng.",
    "Giúp một lập trình viên không phải chuyển sang làm TikToker lắc hông.",
    "Tránh việc server bị sập vào lúc 5 giờ chiều thứ 6.",
    "Được vinh danh trong file README.md (nếu tôi nhớ).",
    "Cứu vớt một tâm hồn đang héo hon vì deadline và mì gói."
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 overflow-hidden font-[family-name:var(--font-geist-sans)] selection:bg-pink-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center gap-32">
        {/* Hero Section */}
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
            Nuôi Tôi Đi <br />
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
                {/* [Chỗ để QR Code của bạn]<br />(1024x1024) */}
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

        <Separator className="bg-gray-800 max-w-4xl" />

        {/* Section: Hoàn Cảnh (Story) */}
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

        {/* Section: Benefits / Manipulation */}
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

        {/* Packages Section */}
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
                    >
                      Chọn Gói Này
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Những Lời Có Cánh (Từ Người Ảo)</h2>
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
                    <CardDescription className="text-xs">{t.role}</CardDescription>
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

        {/* Footer */}
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
      </main>
    </div>
  );
}
