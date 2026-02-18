import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — OVERCODE',
  description: 'Политика конфиденциальности digital-агентства OVERCODE. Узнайте, как мы собираем, храним и защищаем ваши персональные данные.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
