'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Cpu, Network, Palette, FlaskConical, Flame } from 'lucide-react';

export function ProfilesSection() {
  const { t } = useLocale();

  const profiles = [
    {
      icon: Cpu,
      title: t?.profiles?.card1Title ?? '',
      subtitle: t?.profiles?.card1Subtitle ?? '',
      desc: t?.profiles?.card1Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-[#7bc860]',
    },
    {
      icon: Network,
      title: t?.profiles?.card2Title ?? '',
      subtitle: t?.profiles?.card2Subtitle ?? '',
      desc: t?.profiles?.card2Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-[#7bc860]',
    },
    {
      icon: Palette,
      title: t?.profiles?.card3Title ?? '',
      subtitle: t?.profiles?.card3Subtitle ?? '',
      desc: t?.profiles?.card3Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-[#7bc860]',
    },
    {
      icon: FlaskConical,
      title: t?.profiles?.card4Title ?? '',
      subtitle: t?.profiles?.card4Subtitle ?? '',
      desc: t?.profiles?.card4Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-[#7bc860]',
    },
    {
      icon: Flame,
      title: t?.profiles?.card5Title ?? '',
      subtitle: t?.profiles?.card5Subtitle ?? '',
      desc: t?.profiles?.card5Desc ?? '',
      gradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-[#7bc860]',
    },
  ];

  return (
    <Section id="profiles" className="relative">
      <div className="absolute inset-0 bg-card/30" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.profiles?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
            {t?.profiles?.title ?? ''}{' '}
            <span className="gradient-text">{t?.profiles?.titleAccent ?? ''}</span>
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mb-12">
            {t?.profiles?.description ?? ''}
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.15}>
          <div className="grid md:grid-cols-3 gap-6">
            {profiles?.map?.((p: any, i: number) => {
              const Icon = p?.icon;
              return (
                <StaggerItem key={i}>
                  <div
                    className={`group relative rounded-2xl border ${p?.borderColor ?? 'border-border'} bg-gradient-to-br ${p?.gradient ?? ''} p-8 transition-all duration-500 hover:scale-[1.02] glow-border-hover cursor-default h-full`}
                  >
                    <div className={`inline-flex items-center justify-center rounded-xl bg-background/50 p-3 mb-5 ${p?.iconColor ?? ''}`}>
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                      {p?.title ?? ''}
                    </h3>
                    <p className="text-sm sm:text-base text-white leading-relaxed mb-3">
                      {p?.subtitle ?? ''}
                    </p>
                    <p className="text-sm sm:text-base text-white leading-relaxed whitespace-pre-line">
                      {p?.desc ?? ''}
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
