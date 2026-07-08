'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/locale-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t, locale, toggleLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '#about', label: t?.nav?.about ?? 'About' },
    { href: '#profiles', label: t?.nav?.profiles ?? 'Profiles' },
    { href: '#requirements', label: t?.nav?.requirements ?? 'Requirements' },
    { href: '#process', label: t?.nav?.process ?? 'Process' },
    { href: '#criteria', label: t?.nav?.criteria ?? 'Criteria' },
    { href: '#dates', label: t?.nav?.dates ?? 'Dates' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-end lg:justify-between">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks?.map?.((link: any) => (
                <a
                  key={link?.href}
                  href={link?.href}
                  className="px-3 py-2 text-sm text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-accent/50"
                >
                  {link?.label}
                </a>
              )) ?? []}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border/50 bg-accent/30 hover:bg-accent/60 transition-all text-muted-foreground hover:text-foreground"
                aria-label="Toggle language"
              >
                <Globe className="h-3.5 w-3.5 text-[#7bc860]" />
                {locale === 'es' ? 'EN' : 'ES'}
              </button>

              <Link href="/register" className="hidden sm:block">
                <Button size="sm" className="font-semibold">
                  {t?.nav?.register ?? 'Apply'}
                </Button>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-[#7bc860]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-[#7bc860]" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 pt-10">
              {navLinks?.map?.((link: any, i: number) => (
                <motion.a
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-xl font-display tracking-tight text-foreground hover:text-primary transition-colors"
                >
                  {link?.label}
                </motion.a>
              )) ?? []}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="font-semibold mt-4">
                    {t?.nav?.register ?? 'Apply'}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
