'use client';

import { useEffect } from 'react';
import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Rocket, DollarSign, Handshake, Target, Trophy, Building2, FileText } from 'lucide-react';
import { CountUp } from './count-up';

export function AboutSection() {
  const { t } = useLocale();
  const summitIntro = t?.about?.summitIntro ?? '';
  const [summitIntroBefore, summitIntroAfter] = summitIntro?.split?.('{{builders}}') ?? [summitIntro, ''];

  // If the hero's CTA button wrapper ends up lower than expected (buttons
  // wrapping to two lines, browser zoom, fonts loading, etc. — mobile and
  // desktop) and overlaps this section's start, push this section down by
  // exactly that overlap so it never gets covered/hidden behind the hero.
  useEffect(() => {
    function adjust() {
      const aboutEl = document.getElementById('about');
      const ctaEl = document.getElementById('hero-cta-wrapper');
      if (!aboutEl || !ctaEl) return;

      aboutEl.style.marginTop = '0px';
      const overlap = ctaEl.getBoundingClientRect().bottom - aboutEl.getBoundingClientRect().top;
      aboutEl.style.marginTop = overlap > 0 ? `${overlap}px` : '0px';
    }

    adjust();
    window.addEventListener('resize', adjust);
    window.addEventListener('load', adjust);

    // Also react to the hero's own size changing for reasons that don't
    // fire a window resize (fonts swapping in, the deferred video mounting,
    // images finishing loading) — this is what was causing the overlap to
    // only get fixed a few seconds late, or not at all.
    let resizeObserver: ResizeObserver | undefined;
    const heroSectionEl = document.getElementById('hero-cta-wrapper')?.closest('section');
    if (heroSectionEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(adjust);
      resizeObserver.observe(heroSectionEl);
    }

    return () => {
      window.removeEventListener('resize', adjust);
      window.removeEventListener('load', adjust);
      resizeObserver?.disconnect();
    };
  }, []);

  const semifinalistStats = [
    { icon: Rocket, label: t?.about?.stat1Label ?? '', value: t?.about?.stat1Value ?? '' },
    { icon: Target, label: t?.about?.stat4Label ?? '', value: t?.about?.stat4Value ?? '' },
    { icon: Building2, label: t?.about?.stat6Label ?? '', value: t?.about?.stat6Value ?? '' },
  ];

  const finalistStats = [
    { icon: Trophy, label: t?.about?.stat5Label ?? '', value: t?.about?.stat5Value ?? '', breakdown: t?.about?.stat5Breakdown ?? '' },
    { icon: Handshake, label: t?.about?.stat3Label ?? '', value: t?.about?.stat3Value ?? '' },
    { icon: DollarSign, label: t?.about?.stat2Label ?? '', value: t?.about?.stat2Value ?? '' },
  ];

  return (
    <Section id="about" className="relative">
      <Container size="lg">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.about?.sectionTag ?? ''}
          </span>
        </FadeIn>

        <div className="max-w-3xl mb-12">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
              {t?.about?.title ?? ''}{' '}
              <span className="gradient-text">{t?.about?.titleAccent ?? ''}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-white text-base sm:text-lg leading-relaxed whitespace-pre-line mb-8">
              {summitIntroBefore}
              {summitIntroAfter && (
                <>
                  <em className="italic">builders</em>, {summitIntroAfter}
                </>
              )}
            </p>
          </FadeIn>
        </div>

        <div id="benefits" className="max-w-3xl scroll-mt-28">
          <FadeIn delay={0.2}>
            <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4 mt-8">
              {t?.about?.benefitsTag ?? 'BENEFITS'}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
              {t?.about?.description ?? ''}
            </h3>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <span className="inline-block text-[14.4px] font-mono tracking-widest mb-4 text-white">
            {t?.about?.semifinalistsTag ?? 'Semifinalists'}
          </span>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch mb-10">
          {semifinalistStats?.map?.((stat: any, i: number) => {
            const Icon = stat?.icon;
            return (
              <SlideIn key={i} from="bottom" delay={0.1 + i * 0.1} className="h-full">
                <div className="h-full rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center glow-border-hover transition-all duration-500 hover:scale-[1.02] flex flex-col items-center justify-center">
                  {Icon && <Icon className="h-5 w-5 text-[#7bc860] mx-auto mb-3" />}
                  <div className="font-display text-xs sm:text-sm font-bold tracking-tight text-white mb-1">
                    <CountUp value={stat?.value ?? ''} />
                  </div>
                  <p className="text-xs sm:text-sm text-white">{stat?.label ?? ''}</p>
                </div>
              </SlideIn>
            );
          }) ?? []}
        </div>

        <FadeIn delay={0.2}>
          <span className="inline-block text-[14.4px] font-mono tracking-widest mb-4 text-white">
            {t?.about?.finalistsTag ?? 'Finalists'}
          </span>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch">
          {finalistStats?.map?.((stat: any, i: number) => {
            const Icon = stat?.icon;
            return (
              <SlideIn key={i} from="bottom" delay={0.1 + i * 0.1} className="h-full">
                <div className="h-full rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center glow-border-hover transition-all duration-500 hover:scale-[1.02] flex flex-col items-center justify-center">
                  {Icon && <Icon className="h-5 w-5 text-[#7bc860] mx-auto mb-3" />}
                  <div className="font-display text-xs sm:text-sm font-bold tracking-tight text-white mb-1">
                    <CountUp value={stat?.value ?? ''} />
                  </div>
                  <p className="text-xs sm:text-sm text-white">{stat?.label ?? ''}</p>
                  {stat?.breakdown && (
                    <p className="text-[10px] text-white/70 mt-1">{stat.breakdown}</p>
                  )}
                </div>
              </SlideIn>
            );
          }) ?? []}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-8">
            <a href="/documents/Bases_RIS_2026.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base font-semibold px-8 gap-2">
                {t?.about?.viewBases ?? 'View contest rules'}
                <FileText className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
