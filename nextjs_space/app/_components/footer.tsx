'use client';

import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { Container } from '@/components/layouts/container';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/30 py-10">
      <Container size="md" className="text-center">
        <p className="text-xs text-white mb-8">{t?.footer?.organized ?? 'Organized by'}</p>

        <div className="flex justify-center gap-20 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-10 w-[68px]">
              <Image src="/assets/iris-logo-white.png" alt="IRIS StartUp Lab" fill className="object-contain" />
            </div>
            <a
              href="https://www.linkedin.com/company/iris-startup-lab/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de IRIS StartUp Lab"
              className="relative h-6 w-6 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image src="/assets/social/linkedin-white.png" alt="LinkedIn" fill className="object-contain" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative h-10 w-[101px]">
              <Image src="/assets/udela-logo-white.png" alt="Universidad de la Libertad" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/school/udelalibertad/?originalSubdomain=mx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Universidad de la Libertad"
                className="relative h-6 w-6 opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image src="/assets/social/linkedin-white.png" alt="LinkedIn" fill className="object-contain" />
              </a>
              <a
                href="https://www.instagram.com/udelalibertad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Universidad de la Libertad"
                className="relative h-6 w-6 opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image src="/assets/social/instagram-white.png" alt="Instagram" fill className="object-contain" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-[40px]">
          <p className="text-xs text-white">{t?.footer?.rights ?? ''}</p>
        </div>
      </Container>
    </footer>
  );
}
