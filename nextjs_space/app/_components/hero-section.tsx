'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background - right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
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

      <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-left">
        {/* Logos */}
        <motion.div
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7bc860]/30 bg-[#7bc860]/5 mb-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#7bc860]" />
          <span className="text-xs sm:text-sm font-mono text-primary font-medium">
            {t?.hero?.date ?? '10 Sep 2026'}
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[517px] aspect-[1830/1279] mb-6 ml-4 sm:ml-8 -mt-2"
        >
          <Image
            src="/assets/frame_111.png"
            alt="Radical Innovation Summit 2026"
            fill
            className="object-contain z-0 scale-[0.6]"
            priority
          />
          <Image
            src="/assets/RIS-blanco.png"
            alt="RIS"
            fill
            className="object-contain z-10 scale-[1.125]"
            priority
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-0 text-base sm:text-lg md:text-xl text-white leading-relaxed mb-10 whitespace-pre-line first-line:font-bold first-line:text-lg sm:first-line:text-xl md:first-line:text-2xl"
        >
          {t?.hero?.subtitle ?? ''}
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
