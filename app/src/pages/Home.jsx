import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ThemesPreview from "@/components/home/ThemesPreview";
import HackathonPreview from "@/components/home/HackathonPreview";
import StatsCounter from "@/components/home/StatsCounter";
import CTABanner from "@/components/home/CTABanner";
import KeynoteSpeakersPreview from "@/components/home/KeynoteSpeakersPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <KeynoteSpeakersPreview />
      <ThemesPreview />
      <StatsCounter />
      <HackathonPreview />
      <CTABanner />
    </>
  );
}
