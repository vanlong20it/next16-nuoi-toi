import type { Metadata } from "next";
import { Comfortaa, Geist, Geist_Mono, Playfair_Display, Playfair_Display_SC } from "next/font/google";
import "./globals.css";
import MouseCustom from "@/components/mouse-custom";

const geistSans = Comfortaa({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '300']
});

const geistMono = Playfair_Display_SC({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "Nuôi Tôi Đi - Web Xin Donate Vui Vẻ",
  description: "Trang web kêu gọi tài trợ nuôi thân với các gói ngày, tháng, năm. Vui là chính, donate là mười.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseCustom />
        {children}
      </body>
    </html>
  );
}
