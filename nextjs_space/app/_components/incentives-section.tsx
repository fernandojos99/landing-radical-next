'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Eye, Network, Handshake, MessageSquare } from 'lucide-react';

export function IncentivesSection() {
  const { t } = useLocale();

  const incentives = [
    {
      icon: Eye,
      title: t?.incentives?.i1Title ?? '',
      desc: t?.incentives?.i1Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      border: 'border-primary/20',
    },
    {
      icon: Network,
      title: t?.incentives?.i2Title ?? '',
      desc: t?.incentives?.i2Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      border: 'border-primary/20',
    },
    {
      icon: Handshake,
      title: t?.incentives?.i3Title ?? '',
      desc: t?.incentives?.i3Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      border: 'border-primary/20',
    },
    {
      icon: MessageSquare,
      title: t?.incentives?.i4Title ?? '',
      desc: t?.incentives?.i4Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      border: 'border-primary/20',
    },
  ];

  return (
    <Section id="incentives">
      <Container size="lg">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.incentives?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-12">
            {t?.incentives?.title ?? ''}{' '}
            <span className="gradient-text">{t?.incentives?.titleAccent ?? ''}</span>
          </h2>
        </FadeIn>

        <Stagger staggerDelay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {incentives?.map?.((inc: any, i: number) => {
              const Icon = inc?.icon;
              return (
                <StaggerItem key={i}>
                  <div
                    className={`rounded-2xl border ${inc?.border ?? 'border-border'} bg-gradient-to-br ${inc?.gradient ?? ''} p-8 transition-all duration-300 hover:scale-[1.02] glow-border-hover h-full`}
                  >
                    {Icon && (
                      <div className="rounded-xl bg-background/50 p-3 inline-flex mb-5">
                        <Icon className="h-6 w-6 text-[#7bc860]" />
                      </div>
                    )}
                    <h3 className="font-display text-lg font-bold tracking-tight text-white">
                      {inc?.title ?? ''}
                    </h3>
                    {inc?.desc && (
                      <p className="text-sm sm:text-base text-white leading-relaxed mt-3">
                        {inc?.desc}
                      </p>
                    )}
                  </div>
                </StaggerItem>
              );
            }) ?? []}
          </div>
        </Stagger>

        <FadeIn delay={0.3}>
          <p className="text-sm sm:text-base text-white leading-relaxed mt-8 max-w-2xl">
            {t?.incentives?.closing ?? ''}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
