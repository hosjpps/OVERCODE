import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/language';
import CookieBanner from '@/components/ui/CookieBanner';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OVERCODE — Digital Agency | Сайты, AI-боты, Автоматизация',
  description:
    'Разрабатываем сайты, AI-ботов, автоматизацию бизнеса и SaaS-решения. Первая консультация бесплатно.',
  keywords: [
    'веб-разработка',
    'digital agency',
    'AI-боты',
    'автоматизация',
    'SaaS',
    'лендинг',
    'интернет-магазин',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL('https://overcode.space'),
  openGraph: {
    title: 'OVERCODE — Digital Agency',
    description: 'Сайты, AI-боты, автоматизация — всё для роста вашего бизнеса. Первая консультация бесплатно.',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://overcode.space',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVERCODE — Digital Agency',
    description: 'Сайты, AI-боты, автоматизация — всё для роста вашего бизнеса.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-bg-primary text-text-primary antialiased`}
      >
        <div className="noise-overlay" />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
