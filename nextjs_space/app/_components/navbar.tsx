'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t, locale, toggleLocale } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavRegister, setShowNavRegister] = useState(true);
  const heroButtonIntersecting = useRef(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // On mobile, hide the navbar's "Registra tu proyecto" button until the
  // hero's own copy of that same button scrolls out of view. Desktop always
  // shows it (matches existing behavior). Never show it on /register itself
  // — you're already there.
  useEffect(() => {
    if (pathname === '/register') {
      setShowNavRegister(false);
      return;
    }

    const heroBtn = document.getElementById('hero-register-cta');
    if (!heroBtn) {
      setShowNavRegister(true);
      return;
    }

    function recompute() {
      if (window.innerWidth >= 1024) {
        setShowNavRegister(true);
      } else {
        setShowNavRegister(!heroButtonIntersecting.current);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      heroButtonIntersecting.current = entry.isIntersecting;
      recompute();
    }, { threshold: 0 });
    observer.observe(heroBtn);

    window.addEventListener('resize', recompute);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [pathname]);

  // Section anchors only exist on the landing page ("/"). From any other
  // route (e.g. /register), prefix with "/" so the browser navigates home
  // and then scrolls to the anchor, instead of appending the hash to the
  // current route (which doesn't have those sections).
  const isHome = pathname === '/';
  const navLinks = [
    { href: '#about', label: t?.nav?.about ?? 'Events' },
    { href: '#benefits', label: t?.nav?.incentives ?? 'Benefits' },
    { href: '#profiles', label: t?.nav?.profiles ?? 'Profiles' },
    { href: '#requirements', label: t?.nav?.requirements ?? 'Requirements' },
    { href: '#criteria', label: t?.nav?.criteria ?? 'Criteria' },
    { href: '#dates', label: t?.nav?.dates ?? 'Dates' },
  ]?.map?.((link) => ({ ...link, href: isHome ? link.href : `/${link.href}` })) ?? [];

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side: Desktop Nav links, or (on mobile) the Register button
                so its left edge lines up with the rest of the page content. */}
            <div className="flex items-center gap-1">
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

              {showNavRegister && (
                <Link href="/register" className="lg:hidden">
                  <Button size="sm" className="font-semibold">
                    {t?.nav?.register ?? 'Apply'}
                  </Button>
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {showNavRegister && (
                <Link href="/register" className="hidden lg:block">
                  <Button size="sm" className="font-semibold">
                    {t?.nav?.register ?? 'Apply'}
                  </Button>
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-[#7bc860]" />
              </button>

              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-border/50 bg-accent/30 hover:bg-accent/60 transition-all text-muted-foreground hover:text-foreground"
                aria-label="Toggle language"
              >
                <Globe className="h-3.5 w-3.5 text-[#7bc860]" />
                {locale === 'es' ? 'EN' : 'ES'}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
