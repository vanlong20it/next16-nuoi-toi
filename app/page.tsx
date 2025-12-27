"use client";

import { InteractiveBackground } from "@/components/interactive-background";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PackagesSection } from "@/components/sections/packages-section";
import { StorySection } from "@/components/sections/story-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 overflow-hidden font-[family-name:var(--font-geist-sans)] selection:bg-pink-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>
      <InteractiveBackground />
      <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center gap-32">
        <HeroSection />
        <Separator className="bg-gray-800 max-w-4xl" />
        <StorySection />
        <TimelineSection />
        <BenefitsSection />
        <PackagesSection />
        <FAQSection />
        <TestimonialsSection />
        <FooterSection />
      </main>
      {/* <MouseCustom /> */}
      <SmoothScroll />
    </div>
  );
}
