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
          <div className="relative h-12 w-12 sm:h-16 sm:w-16">
            <Image
              src="/assets/iris-logo.png"
              alt="IRIS StartUp Lab"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="relative h-12 w-28 sm:h-16 sm:w-36">
            <Image
              src="/assets/ul-logo.png"
              alt="Universidad de la Libertad"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="relative h-[41px] w-[109px] sm:h-[54px] sm:w-[150px]">
            <Image
              src="/assets/logo-centro-rbsp.png"
              alt="Centro RBSP"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground uppercase"
        >
          {t?.hero?.tagline ?? ''}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6"
        >
          {t?.hero?.location ?? ''}
        </motion.p>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-[450px] aspect-[1830/1279] mb-6 ml-6"
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

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs sm:text-sm font-mono text-primary font-medium">
            {t?.hero?.date ?? '10 Sep 2026'}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-0 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 whitespace-pre-line"
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
