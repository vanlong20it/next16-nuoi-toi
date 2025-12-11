import type { Metadata } from "next";
import { Be_Vietnam_Pro, Borel, Comfortaa, Geist, Geist_Mono, Playfair_Display, Playfair_Display_SC, Playwrite_US_Modern, Texturina } from "next/font/google";
import "./globals.css";
import MouseCustom from "@/components/mouse-custom";

const geistSans = Playwrite_US_Modern({
  variable: "--font-geist-sans",
  weight: ['100', '200', '300', '400']
});

const geistMono = Playfair_Display_SC({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "Nuôi Tôi - Donate Or I Will Cry 😭",
  description: "Donate ngay để giúp Developer có tiền mua mì tôm trứng (không phải Hảo Hảo). Uy tín hơn người yêu cũ của bạn!",
  openGraph: {
    title: "Nuôi Tôi Đi - Sứ Mệnh Giải Cứu Chiếc Bụng Đói",
    description: "Một click của bạn là một niềm hy vọng (cho ví tiền của tôi).",
    images: ['/images/img-donate.jpg'],
  }
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
