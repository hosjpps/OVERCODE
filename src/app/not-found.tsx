import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display font-bold text-[120px] md:text-[180px] leading-none gradient-text mb-4">404</h1>
      <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-md">
        Страница не найдена. Возможно, она была удалена или вы перешли по неверной ссылке.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-white text-base transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
        >
          На главную
        </Link>
        <a
          href="https://t.me/hosjpps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-text-secondary text-base border border-white/10 hover:border-white/20 hover:text-text-primary transition-all duration-300"
        >
          Написать нам
        </a>
      </div>
    </div>
  );
}
