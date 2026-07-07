'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { CalendarDays, Bell, GraduationCap, Rocket } from 'lucide-react';

export function DatesSection() {
  const { t } = useLocale();

  const dates = [
    {
      icon: CalendarDays,
      title: t?.dates?.d1Title ?? '',
      date: t?.dates?.d1Date ?? '',
      desc: t?.dates?.d1Desc ?? '',
      active: true,
    },
    {
      icon: Bell,
      title: t?.dates?.d2Title ?? '',
      date: t?.dates?.d2Date ?? '',
      desc: t?.dates?.d2Desc ?? '',
      active: false,
    },
    {
      icon: GraduationCap,
      title: t?.dates?.d3Title ?? '',
      date: t?.dates?.d3Date ?? '',
      desc: t?.dates?.d3Desc ?? '',
      active: false,
    },
    {
      icon: Rocket,
      title: t?.dates?.d4Title ?? '',
      date: t?.dates?.d4Date ?? '',
      desc: t?.dates?.d4Desc ?? '',
      active: false,
    },
  ];

  return (
    <Section id="dates" className="relative">
      <div className="absolute inset-0 bg-card/30" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.dates?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-16">
            {t?.dates?.title ?? ''}{' '}
            <span className="gradient-text">{t?.dates?.titleAccent ?? ''}</span>
          </h2>
        </FadeIn>

        <Stagger staggerDelay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dates?.map?.((d: any, i: number) => {
              const Icon = d?.icon;
              return (
                <StaggerItem key={i}>
                  <div
                    className={`relative group rounded-2xl border p-6 transition-all duration-300 h-full ${
                      d?.active
                        ? 'border-primary/40 bg-primary/5 glow-border'
                        : 'border-border/50 bg-card/30 glow-border-hover'
                    } hover:scale-[1.02]`}
                  >
                    {d?.active && (
                      <div className="absolute -top-2.5 left-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                          LIVE
                        </span>
                      </div>
                    )}
                    {Icon && (
                      <div className="rounded-xl bg-primary/10 p-3 inline-flex mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <h3 className="font-display text-lg font-bold tracking-tight text-primary mb-1">
                      {d?.title ?? ''}
                    </h3>
                    <p className="font-mono text-sm text-primary/80">{d?.date ?? ''}</p>
                    {d?.desc && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3">{d?.desc}</p>
                    )}
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
