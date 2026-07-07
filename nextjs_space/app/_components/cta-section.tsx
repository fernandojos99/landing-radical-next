'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { FadeIn } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  const { t } = useLocale();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Container size="md" className="relative z-10 text-center">
        <FadeIn>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-primary mb-6"
          >
            {t?.cta?.title ?? ''}{' '}
            <span className="gradient-text">{t?.cta?.titleAccent ?? ''}</span>
          </motion.h2>
          <p className="text-base sm:text-lg text-white max-w-xl mx-auto mb-10 whitespace-pre-line">
            {t?.cta?.subtitle ?? ''}
          </p>
          <Link href="/register">
            <Button size="lg" className="text-base font-semibold px-10 gap-2">
              {t?.cta?.button ?? 'Register'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
