'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const { t } = useLocale();
  const subtitle = t?.hero?.subtitle ?? '';
  const [subtitleLead, ...subtitleRest] = subtitle.split('\n\n');

  const sectionRef = useRef<HTMLElement>(null);
  const topLogoRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const [videoTop, setVideoTop] = useState<number | null>(null);
  const [logoGroupMarginTop, setLogoGroupMarginTop] = useState<number | null>(null);

  useEffect(() => {
    function updatePositions() {
      if (window.innerWidth >= 1024) {
        setVideoTop(null);
        setLogoGroupMarginTop(null);
        return;
      }
      const sectionEl = sectionRef.current;
      const topLogoEl = topLogoRef.current;
      const videoEl = videoContainerRef.current;
      const logoGroupEl = logoGroupRef.current;
      if (!sectionEl || !topLogoEl || !videoEl || !logoGroupEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const topLogoRect = topLogoEl.getBoundingClientRect();
      const logoGroupRect = logoGroupEl.getBoundingClientRect();

      // Align the video's top edge with the top logo's (Logosjuntos_2x.png) top edge.
      const newVideoTop = topLogoRect.top - sectionRect.top;
      setVideoTop(newVideoTop);

      // Push the overlapping logo group down so it sits exactly 10px below
      // the video's bottom edge, without moving the video. Everything below
      // it (the subtitle) is a normal in-flow sibling, so it shifts down by
      // the same amount automatically, keeping its existing gap intact.
      const videoBottom = newVideoTop + videoEl.offsetHeight;
      const currentLogoGroupTop = logoGroupRect.top - sectionRect.top;
      // Back out whatever margin-top is currently applied (CSS default the
      // first time this runs, or our own previous override on later runs,
      // e.g. window resizes) to get a stable zero-margin baseline.
      const currentAppliedMarginTop = parseFloat(getComputedStyle(logoGroupEl).marginTop) || 0;
      const naturalTopWithZeroMargin = currentLogoGroupTop - currentAppliedMarginTop;
      setLogoGroupMarginTop(videoBottom + 10 - naturalTopWithZeroMargin);
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background - right half */}
      <div
        ref={videoContainerRef}
        style={videoTop !== null ? { top: `${videoTop}px` } : undefined}
        className="absolute right-0 top-0 w-[150%] aspect-video h-auto overflow-hidden lg:inset-y-0 lg:top-auto lg:h-full lg:aspect-auto lg:w-1/2 lg:overflow-visible z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-contain translate-x-[20%] lg:translate-x-0 lg:object-cover"
        >
          <source src="/videos/VisualB_720p_blur.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/35 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-background via-background/15 to-transparent" />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-[30px] lg:pt-24 pb-16 text-left">
        {/* Logos */}
        <motion.div
          ref={topLogoRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-start gap-6 sm:gap-8 mb-8"
        >
          <div className="relative h-[4.5rem] sm:h-24 w-auto aspect-[4/1]">
            <Image
              src="/assets/Logosjuntos_2x.png"
              alt="Logos"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7bc860]/30 bg-[#7bc860]/5 mb-0"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#7bc860]" />
          <span className="text-xs sm:text-sm font-mono text-primary font-medium">
            {t?.hero?.date ?? '10 Sep 2026'}
          </span>
        </motion.div>

        {/* Title */}
        {/*
          Fixed size relationship between the two overlapping logos below
          (frame_111.png behind, RIS-blanco.png in front), pinned via CSS
          variables so they can never drift apart independently again.
          RIS-blanco's scale (--ris-scale) is the baseline; frame_111's
          mobile box height (--frame-h-mobile) and desktop scale
          (--frame-scale-desktop) are both derived to match RIS-blanco's
          rendered height at each breakpoint. To resize the pair together,
          scale all three variables by the same factor — never change one
          in isolation.
        */}
        <motion.div
          ref={logoGroupRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            ['--ris-scale' as any]: 1.125,
            ['--frame-h-mobile' as any]: '103px',
            ['--frame-scale-desktop' as any]: 1.05264,
            ...(logoGroupMarginTop !== null ? { marginTop: `${logoGroupMarginTop}px` } : {}),
          }}
          className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[517px] h-[200px] mb-[15px] mx-auto sm:mx-0 sm:ml-8 mt-[7.5px] sm:mt-[15px]"
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[var(--frame-h-mobile)] sm:inset-0 sm:h-full sm:top-0 sm:translate-y-0 z-0">
            <Image
              src="/assets/frame_111.png"
              alt="Radical Innovation Summit 2026"
              fill
              className="object-contain sm:scale-[var(--frame-scale-desktop)]"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10">
            <Image
              src="/assets/RIS-blanco.png"
              alt="RIS"
              fill
              className="object-contain scale-[var(--ris-scale)]"
              priority
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-0 text-base sm:text-lg md:text-xl text-white leading-relaxed mb-10 whitespace-pre-line"
        >
          <span className="font-bold text-lg sm:text-xl md:text-2xl">{subtitleLead}</span>
          {subtitleRest.length > 0 && '\n\n' + subtitleRest.join('\n\n')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start justify-start gap-4"
        >
          <Link href="/register">
            <Button size="lg" className="text-base font-semibold px-8 gap-2">
              {t?.hero?.cta ?? 'Apply now'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#about">
            <Button variant="outline" size="lg" className="text-base px-8">
              {t?.hero?.ctaSecondary ?? 'Learn more'}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
