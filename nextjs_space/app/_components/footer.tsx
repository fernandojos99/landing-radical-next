'use client';

import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/30 py-10">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">{t?.footer?.organized ?? ''}</p>
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-8">
                <Image
                  src="/assets/iris-logo.png"
                  alt="IRIS StartUp Lab"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-20">
                <Image
                  src="/assets/ul-logo.png"
                  alt="Universidad de la Libertad"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t?.footer?.rights ?? ''}
          </p>
        </div>
      </Container>
    </footer>
  );
}
