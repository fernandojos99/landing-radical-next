'use client';

import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Handshake } from 'lucide-react';
import Image from 'next/image';

export function AlliesSection() {
  const { t } = useLocale();

  const communityPartners = [
    { label: t?.allies?.card1 ?? '', image: '/assets/ally-community-partner-1.png' },
    { label: t?.allies?.card2 ?? '', image: null },
    { label: t?.allies?.card3 ?? '', image: null },
  ];

  const supportingOrganizations = [
    { label: 'Ludlow', image: '/assets/ally-ludlow.png' },
    { label: 'Frisson', image: '/assets/ally-frisson.png' },
    { label: 'Dalus', image: '/assets/ally-dalus.png' },
    { label: 'Atlas Network', image: '/assets/ally-atlas-network.png' },
    { label: 'As', image: '/assets/As.png' },
  ];

  return (
    <Section id="aliados" className="relative">
      <Container size="lg">
        <FadeIn>
          <span className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4">
            {t?.allies?.sectionTag ?? 'ALIADOS'}
          </span>
        </FadeIn>

        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
              {t?.allies?.title ?? 'Organizaciones y aliados estratégicos'}
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <span className="inline-block text-[14.4px] font-mono tracking-widest mb-4 text-white">
            {t?.allies?.communityPartnersTag ?? 'Community Partners'}
          </span>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch mb-10">
          {communityPartners?.map?.((card, i: number) => (
            <SlideIn key={i} from="bottom" delay={0.1 + i * 0.1} className="h-full">
              <div className="h-full min-h-[120px] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center transition-all duration-500 hover:scale-[1.02] flex flex-col items-center justify-center">
                {card.image ? (
                  <div className="relative h-[86px] w-full">
                    <Image src={card.image} alt={card.label || 'Community partner'} fill className="object-contain" />
                  </div>
                ) : (
                  <>
                    <Handshake className="h-5 w-5 text-[#7bc860] mx-auto mb-3" />
                    <p className="text-xs sm:text-sm text-white">{card.label}</p>
                  </>
                )}
              </div>
            </SlideIn>
          )) ?? []}
        </div>

        <FadeIn delay={0.2}>
          <span className="inline-block text-[14.4px] font-mono tracking-widest mb-4 text-white">
            {t?.allies?.supportingOrganizationsTag ?? 'Supporting Organizations'}
          </span>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-stretch">
          {supportingOrganizations?.map?.((card, i: number) => (
            <SlideIn key={i} from="bottom" delay={0.1 + i * 0.1} className="h-full">
              <div className="h-full min-h-[120px] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center transition-all duration-500 hover:scale-[1.02] flex flex-col items-center justify-center">
                <div className="relative h-[65px] w-full">
                  <Image src={card.image} alt={card.label} fill className="object-contain" />
                </div>
              </div>
            </SlideIn>
          )) ?? []}
        </div>
      </Container>
    </Section>
  );
}
