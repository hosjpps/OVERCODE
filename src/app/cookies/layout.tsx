import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика cookie — OVERCODE',
  description: 'Политика использования файлов cookie на сайте OVERCODE. Узнайте, какие cookie мы используем и как ими управлять.',
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
