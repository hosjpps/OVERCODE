import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Обработка персональных данных — OVERCODE',
  description: 'Политика обработки персональных данных OVERCODE в соответствии с 152-ФЗ. Порядок сбора, хранения и защиты персональных данных.',
};

export default function PersonalDataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
