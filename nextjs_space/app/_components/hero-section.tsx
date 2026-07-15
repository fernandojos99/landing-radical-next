'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  const { t } = useLocale();
  const subtitle = t?.hero?.subtitle ?? '';
  const [subtitleLead, ...subtitleRest] = subtitle.split('\n\n');

  const sectionRef = useRef<HTMLElement>(null);
  const topLogoRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const dateBadgeRef = useRef<HTMLDivElement>(null);
  const subtitleLeadRef = useRef<HTMLSpanElement>(null);
  const [videoTop, setVideoTop] = useState<number | null>(null);
  const [logoGroupMarginTop, setLogoGroupMarginTop] = useState<number | null>(null);
  const [desktopVideoBox, setDesktopVideoBox] = useState<{ top: number; left: number; height: number; width: number } | null>(null);

  useEffect(() => {
    function updatePositions() {
      if (window.innerWidth >= 1024) {
        setVideoTop(null);
        setLogoGroupMarginTop(null);

        // Desktop: top and left anchored to the overlapping logos
        // (frame_111.png / RIS-blanco.png) so their relationship never
        // drifts — the logo group is now rendered at lg:scale-110, so
        // reading its live rect (post-transform) keeps the video's size/
        // position matching automatically. Offset tuned to reproduce the
        // confirmed 125px gap on top of that block; height/width tuned to
        // reproduce the confirmed size, scaled 10% to match.
        const sectionEl = sectionRef.current;
        const logoGroupEl = logoGroupRef.current;
        if (!sectionEl || !logoGroupEl) return;

        const sectionRect = sectionEl.getBoundingClientRect();
        const logoGroupRect = logoGroupEl.getBoundingClientRect();

        const blockTop = logoGroupRect.top - sectionRect.top - 118 * 1.1;
        const blockHeight = 471.9 * 0.9 * 0.9 * 1.1;
        const left = logoGroupRect.right - sectionRect.left - 146.1; // confirmed gap at innerWidth 1366 (left:600)

        setDesktopVideoBox({
          top: blockTop,
          left,
          height: blockHeight,
          width: blockHeight * (16 / 9),
        });
        return;
      }
      setDesktopVideoBox(null);

      const sectionEl = sectionRef.current;
      const topLogoEl = topLogoRef.current;
      const videoEl = videoContainerRef.current;
      const logoGroupEl = logoGroupRef.current;
      if (!sectionEl || !topLogoEl || !videoEl || !logoGroupEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const topLogoRect = topLogoEl.getBoundingClientRect();
      const logoGroupRect = logoGroupEl.getBoundingClientRect();

      // Place the video's top edge exactly at the top logo's (Logosjuntos_2x.png)
      // bottom edge — element-to-element, ignoring the top logo's own margin —
      // so the logo stays fully above the video, touching, never overlapping it.
      const newVideoTop = topLogoRect.bottom - sectionRect.top;
      setVideoTop(newVideoTop);

      // Move the overlapping logo group down so its own top edge starts
      // exactly at the video's bottom edge — fully below it, not straddling
      // it — without moving the video. Everything below it (the subtitle)
      // is a normal in-flow sibling, so it shifts along automatically,
      // keeping its existing gap intact.
      const videoBottom = newVideoTop + videoEl.offsetHeight;
      const currentLogoGroupTop = logoGroupRect.top - sectionRect.top;
      // Back out whatever margin-top is currently applied (CSS default the
      // first time this runs, or our own previous override on later runs,
      // e.g. window resizes) to get a stable zero-margin baseline.
      const currentAppliedMarginTop = parseFloat(getComputedStyle(logoGroupEl).marginTop) || 0;
      const naturalTopWithZeroMargin = currentLogoGroupTop - currentAppliedMarginTop;
      const targetTop = videoBottom;
      setLogoGroupMarginTop(targetTop - naturalTopWithZeroMargin);
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-start overflow-hidden">
      {/* Video background - right half */}
      <div
        ref={videoContainerRef}
        style={
          videoTop !== null
            ? { top: `${videoTop}px` }
            : desktopVideoBox !== null
            ? {
                top: `${desktopVideoBox.top}px`,
                left: `${desktopVideoBox.left}px`,
                right: 'auto',
                height: `${desktopVideoBox.height}px`,
                width: `${desktopVideoBox.width}px`,
              }
            : undefined
        }
        className="absolute left-1/2 -translate-x-[calc(70%-16px)] top-0 w-[77%] aspect-video h-auto overflow-hidden lg:inset-y-0 lg:top-auto lg:h-full lg:aspect-auto lg:w-1/2 lg:overflow-visible lg:left-auto lg:translate-x-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-contain lg:translate-x-0 lg:object-cover"
        >
          <source src="/videos/VisualB_720p_blur.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/35 lg:hidden" />
      </div>

      {/* Background effects */}
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

      <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-[50px] lg:pt-[100px] pb-16 text-left lg:origin-top-left lg:scale-110 lg:h-[800px]">
        {/* Logos */}
        <motion.div
          ref={topLogoRef}
          id="hero-top-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-start gap-6 sm:gap-8 mb-0 lg:mb-8"
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
          className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[517px] h-[100px] lg:h-[200px] mb-[22px] mx-0 sm:ml-8 mt-0 sm:mt-[15px]"
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[var(--frame-h-mobile)] sm:inset-0 sm:h-full sm:top-0 sm:translate-y-0 z-0">
            <Image
              src="/assets/frame_111.png"
              alt="Radical Innovation Summit 2026"
              fill
              className="object-contain origin-left sm:origin-center sm:scale-[var(--frame-scale-desktop)]"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10">
            <Image
              src="/assets/RIS-blanco.png"
              alt="RIS"
              fill
              className="object-contain origin-left sm:origin-center scale-[var(--ris-scale)]"
              priority
            />
          </div>
        </motion.div>

        {/* Date badge — now sits directly above the subtitle lead line */}
        <motion.div
          ref={dateBadgeRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7bc860]/30 bg-[#7bc860]/5 mt-[35px] mb-[40px]"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#7bc860]" />
          <span className="text-xs sm:text-sm font-mono text-primary font-medium">
            {t?.hero?.date ?? '10 Sep 2026'}
          </span>
        </motion.div>

        {/* Subtitle */}
        <div className="-translate-y-[29px] sm:translate-y-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-0 text-base sm:text-lg md:text-xl text-white leading-relaxed mb-10 whitespace-pre-line"
          >
            <span ref={subtitleLeadRef} className="block font-bold text-lg sm:text-xl md:text-2xl" style={{ color: '#e5c900' }}>{subtitleLead}</span>
            {subtitleRest.length > 0 && '\n' + subtitleRest.join('\n\n')}
          </motion.p>
        </div>

        {/* CTAs */}
        <div id="hero-cta-wrapper" className="-translate-y-[29px] sm:translate-y-0 mt-[80px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4"
          >
            <Link href="/register" id="hero-register-cta">
              <Button size="lg" className="text-base px-8 w-[240px] justify-center">
                {t?.hero?.cta ?? 'Apply now'}
              </Button>
            </Link>
            <a href="#about">
              <Button variant="outline" size="lg" className="text-base px-8 w-[240px] justify-center">
                {t?.hero?.ctaSecondary ?? 'Learn more'}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
