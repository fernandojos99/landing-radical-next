'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/lib/locale-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
