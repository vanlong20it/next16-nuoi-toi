import MouseCustom from "@/components/mouse-custom";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Metadata } from "next";
import { Playfair_Display_SC, Playwrite_US_Modern } from "next/font/google";
import "./globals.css";

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
  title: "Nuôi Long",
  description: "Donate ngay để giúp Developer có tiền mua mì tôm trứng (không phải Hảo Hảo). Uy tín hơn người yêu cũ của bạn!",
  icons: {
    icon: '/images/favicon.ico'
  },
  openGraph: {
    title: "Nuôi Long",
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
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
