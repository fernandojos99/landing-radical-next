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
            <p className="text-xs text-white">{t?.footer?.organized ?? ''}</p>
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

          <div className="flex items-center gap-4">
            <a
              href="https://mx.linkedin.com/company/iris-startup-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de IRIS StartUp Lab"
              className="relative h-5 w-5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image src="/assets/social/linkedin.png" alt="LinkedIn" fill className="object-contain brightness-0 invert" />
            </a>
            <a
              href="https://www.instagram.com/udelalibertad/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Universidad de la Libertad"
              className="relative h-5 w-5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image src="/assets/social/instagram.png" alt="Instagram" fill className="object-contain brightness-0 invert" />
            </a>
            <a
              href="https://mx.linkedin.com/school/udelalibertad/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Universidad de la Libertad"
              className="relative h-5 w-5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image src="/assets/social/linkedin.png" alt="LinkedIn" fill className="object-contain brightness-0 invert" />
            </a>
          </div>

          <p className="text-xs text-white">
            {t?.footer?.rights ?? ''}
          </p>
        </div>
      </Container>
    </footer>
  );
}
