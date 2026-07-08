import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { BackgroundSpirals } from './_components/background-spirals';

export const dynamic = 'force-dynamic';

const helveticaNeue = localFont({
  variable: '--font-sans',
  src: [
    { path: './fonts/helvetica-neue/HelveticaNeueThin.otf', weight: '100', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueThinItalic.otf', weight: '100', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueUltraLight.otf', weight: '200', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueUltraLightItalic.otf', weight: '200', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueLight.otf', weight: '300', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueLightItalic.otf', weight: '300', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueRoman.otf', weight: '400', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueItalic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueMedium.otf', weight: '500', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueMediumItalic.otf', weight: '500', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueBold.otf', weight: '700', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueBoldItalic.otf', weight: '700', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueHeavy.otf', weight: '800', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueHeavyItalic.otf', weight: '800', style: 'italic' },
    { path: './fonts/helvetica-neue/HelveticaNeueBlack.otf', weight: '900', style: 'normal' },
    { path: './fonts/helvetica-neue/HelveticaNeueBlackItalic.otf', weight: '900', style: 'italic' },
  ],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Radical Innovation 2026',
  description: 'Convocamos a quienes están construyendo el futuro, no iterando el presente. Grupo Salinas × Universidad de la Libertad × IRIS StartUp Lab.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Radical Innovation 2026',
    description: 'A call to those building the future, not iterating the present.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>

        {/* Microsoft Clarity */}
        <Script id="clarity-analytics" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xjbbcabpbh");
          `}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWGCL77HD2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RWGCL77HD2');
          `}
        </Script>
      </head>
      <body
        className={`${helveticaNeue.variable} font-sans`}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
        />
        <Providers>
          <BackgroundSpirals />
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
        </Providers>
      </body>
    </html>
  );
}
