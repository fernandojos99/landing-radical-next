'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Check, AlertTriangle } from 'lucide-react';

export function RequirementsSection() {
  const { t } = useLocale();

  const reqs = [
    t?.requirements?.req1 ?? '',
    t?.requirements?.req2 ?? '',
    t?.requirements?.req3 ?? '',
    t?.requirements?.req4 ?? '',
  ];

  return (
    <Section id="requirements">
      <Container size="lg">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.requirements?.sectionTag ?? ''}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
            {t?.requirements?.title ?? ''}{' '}
            <span className="gradient-text">{t?.requirements?.titleAccent ?? ''}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-4">
            {t?.requirements?.description ?? ''}
          </p>
          <p className="text-sm sm:text-base font-semibold text-foreground mb-12">
            {t?.requirements?.subtitle ?? ''}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {reqs?.map?.((req: any, i: number) => (
              <SlideIn key={i} from="left" delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/30 p-5 transition-all hover:bg-card/60 hover:border-primary/20">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{req ?? ''}</p>
                </div>
              </SlideIn>
            )) ?? []}
          </div>

          <SlideIn from="right" delay={0.2}>
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-8 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span className="font-display text-lg font-bold text-foreground tracking-tight">
                  {t?.requirements?.sectionTag ?? ''}
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t?.requirements?.note ?? ''}
              </p>
            </div>
          </SlideIn>
        </div>

        <FadeIn delay={0.3}>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-8 max-w-2xl">
            {t?.requirements?.closing ?? ''}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
