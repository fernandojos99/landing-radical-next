'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Zap, FlaskConical, TrendingUp, MessageSquare, Target } from 'lucide-react';

export function CriteriaSection() {
  const { t } = useLocale();

  const criteria = [
    { icon: Zap, name: t?.criteria?.c1 ?? '', desc: t?.criteria?.c1d ?? '' },
    { icon: FlaskConical, name: t?.criteria?.c2 ?? '', desc: t?.criteria?.c2d ?? '' },
    { icon: TrendingUp, name: t?.criteria?.c3 ?? '', desc: t?.criteria?.c3d ?? '' },
    { icon: MessageSquare, name: t?.criteria?.c4 ?? '', desc: t?.criteria?.c4d ?? '' },
    { icon: Target, name: t?.criteria?.c5 ?? '', desc: t?.criteria?.c5d ?? '' },
  ];

  return (
    <Section id="criteria">
      <Container size="lg">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.criteria?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
            {t?.criteria?.title ?? ''}{' '}
            <span className="gradient-text">{t?.criteria?.titleAccent ?? ''}</span>
          </h2>
          <p className="text-sm font-mono text-white mb-12 whitespace-pre-line">
            {t?.criteria?.formula ?? ''}
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {criteria?.map?.((c: any, i: number) => {
              const Icon = c?.icon;
              return (
                <StaggerItem key={i}>
                  <div className="group rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center transition-all duration-500 hover:scale-[1.02] glow-border-hover h-full">
                    {Icon && (
                      <div className="inline-flex rounded-xl bg-[#7bc860]/10 p-3 mb-4">
                        <Icon className="h-5 w-5 text-[#7bc860]" />
                      </div>
                    )}
                    <h3 className="font-display text-base font-bold tracking-tight mb-2 text-white">
                      {c?.name ?? ''}
                    </h3>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">
                      {c?.desc ?? ''}
                    </p>
                  </div>
                </StaggerItem>
              );
            }) ?? []}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
