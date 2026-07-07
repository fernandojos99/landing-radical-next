'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Filter, BarChart3, ListChecks, Gem, Trophy } from 'lucide-react';

export function ProcessSection() {
  const { t } = useLocale();

  const steps = [
    { icon: Filter, title: t?.process?.step1Title ?? '', desc: t?.process?.step1Desc ?? '', num: '01' },
    { icon: BarChart3, title: t?.process?.step2Title ?? '', desc: t?.process?.step2Desc ?? '', num: '02' },
    { icon: ListChecks, title: t?.process?.step3Title ?? '', desc: t?.process?.step3Desc ?? '', num: '03' },
    { icon: Gem, title: t?.process?.step4Title ?? '', desc: t?.process?.step4Desc ?? '', num: '04' },
    { icon: Trophy, title: t?.process?.step5Title ?? '', desc: t?.process?.step5Desc ?? '', num: '05' },
  ];

  return (
    <Section id="process" className="relative">
      <div className="absolute inset-0 bg-card/30" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.process?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-16">
            {t?.process?.title ?? ''}{' '}
            <span className="gradient-text">{t?.process?.titleAccent ?? ''}</span>
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {steps?.map?.((step: any, i: number) => {
              const Icon = step?.icon;
              const isLeft = i % 2 === 0;
              return (
                <SlideIn key={i} from={isLeft ? 'left' : 'right'} delay={i * 0.1}>
                  <div className={`flex items-start gap-6 sm:gap-0 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className={`hidden sm:flex sm:w-1/2 ${isLeft ? 'sm:justify-end sm:pr-12' : 'sm:justify-start sm:pl-12'}`}>
                      <div className="group rounded-2xl border border-border/50 bg-card/50 p-6 max-w-md w-full transition-all duration-300 hover:bg-card hover:border-primary/20 glow-border-hover">
                        <div className="flex items-center gap-3 mb-3">
                          {Icon && (
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                            {step?.title ?? ''}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step?.desc ?? ''}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <div className="h-12 w-12 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center">
                        <span className="font-mono text-xs font-bold text-primary">{step?.num ?? ''}</span>
                      </div>
                    </div>

                    {/* Mobile card */}
                    <div className="sm:hidden flex-1">
                      <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          {Icon && <Icon className="h-4 w-4 text-primary" />}
                          <h3 className="font-display text-base font-bold tracking-tight">{step?.title ?? ''}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step?.desc ?? ''}</p>
                      </div>
                    </div>

                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                </SlideIn>
              );
            }) ?? []}
          </div>
        </div>
      </Container>
    </Section>
  );
}
