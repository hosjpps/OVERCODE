'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import Footer from '@/components/layout/Footer';

export default function CookiesPage() {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-bg-secondary/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="font-display font-bold text-lg tracking-[3px] uppercase text-text-primary hover:opacity-80 transition-opacity">
              OVERCODE
            </Link>
          </div>
          <button onClick={toggleLang} className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'ru' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>RU</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'en' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>EN</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[800px] mx-auto px-5 md:px-10 py-12 md:py-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          {isEn ? 'Cookie Policy' : 'Политика использования файлов cookie'}
        </h1>
        <p className="text-text-tertiary text-sm mb-10">
          {isEn ? 'Last updated: February 19, 2026' : 'Последнее обновление: 19 февраля 2026 г.'}
        </p>

        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {isEn ? (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. What Are Cookies</h2>
                <p>Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit our website. They help the Site work correctly, make it more efficient, and provide us with analytical information.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Types of Cookies We Use</h2>

                <div className="mt-4 space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Strictly Necessary Cookies</h3>
                    <p className="text-sm">Required for the Site to function. They enable basic features such as page navigation and access to secure areas. The Site cannot function properly without these cookies.</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Analytical Cookies</h3>
                    <p className="text-sm">Help us understand how visitors interact with the Site by collecting information about pages visited, time spent, and errors encountered. All data is aggregated and anonymous.</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Functional Cookies</h3>
                    <p className="text-sm">Allow the Site to remember your choices (such as language preference) and provide enhanced functionality and personalization.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Third-Party Cookies</h2>
                <p>We may use third-party services that set their own cookies:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Vercel Analytics</strong> — for website performance monitoring</li>
                  <li><strong>Yandex.Metrica / Google Analytics</strong> — for traffic analysis and user behavior study</li>
                </ul>
                <p className="mt-2">These services may collect data about your visit in accordance with their own privacy policies.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Cookie Retention Period</h2>
                <p>Cookies may be stored on your device for varying periods:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Session cookies</strong> — deleted when you close your browser</li>
                  <li><strong>Persistent cookies</strong> — stored for a set period (from several days to 1 year) or until you manually delete them</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Managing Cookies</h2>
                <p>You can manage or delete cookies through your browser settings. Please note that disabling cookies may affect the functionality of the Site.</p>
                <p className="mt-2">To manage cookies, refer to your browser&apos;s help documentation:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Google Chrome — Settings &rarr; Privacy and Security &rarr; Cookies</li>
                  <li>Firefox — Settings &rarr; Privacy &amp; Security &rarr; Cookies</li>
                  <li>Safari — Preferences &rarr; Privacy &rarr; Cookies</li>
                  <li>Edge — Settings &rarr; Privacy &rarr; Cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Consent</h2>
                <p>By continuing to use the Site, you consent to the use of cookies in accordance with this Policy. You can withdraw your consent at any time by deleting cookies through your browser settings.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Contact Us</h2>
                <p>If you have questions about our Cookie Policy:</p>
                <p className="mt-2">Email: <a href="mailto:hello@overcode.ru" className="text-accent-purple hover:underline">hello@overcode.ru</a></p>
                <p>Telegram: <a href="https://t.me/overcode" className="text-accent-purple hover:underline">@overcode</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Что такое файлы cookie</h2>
                <p>Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете, смартфоне) при посещении нашего сайта. Они помогают Сайту корректно работать, повышают его эффективность и предоставляют нам аналитическую информацию.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Типы используемых cookie</h2>

                <div className="mt-4 space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Строго необходимые cookie</h3>
                    <p className="text-sm">Необходимы для работы Сайта. Обеспечивают базовые функции: навигацию по страницам и доступ к защищённым разделам. Без этих cookie Сайт не может функционировать корректно.</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Аналитические cookie</h3>
                    <p className="text-sm">Помогают нам понять, как посетители взаимодействуют с Сайтом, собирая информацию о посещённых страницах, времени на сайте и возникших ошибках. Все данные агрегированы и анонимны.</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-1">Функциональные cookie</h3>
                    <p className="text-sm">Позволяют Сайту запоминать ваши предпочтения (например, выбор языка) и предоставлять расширенную функциональность и персонализацию.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Cookie третьих сторон</h2>
                <p>Мы можем использовать сторонние сервисы, которые устанавливают собственные cookie:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Vercel Analytics</strong> — для мониторинга производительности сайта</li>
                  <li><strong>Яндекс.Метрика / Google Analytics</strong> — для анализа трафика и изучения поведения пользователей</li>
                </ul>
                <p className="mt-2">Эти сервисы могут собирать данные о вашем визите в соответствии со своими политиками конфиденциальности.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Срок хранения cookie</h2>
                <p>Cookie могут храниться на вашем устройстве различное время:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Сессионные cookie</strong> — удаляются при закрытии браузера</li>
                  <li><strong>Постоянные cookie</strong> — хранятся определённый период (от нескольких дней до 1 года) или до момента ручного удаления</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Управление cookie</h2>
                <p>Вы можете управлять файлами cookie или удалить их через настройки браузера. Обратите внимание, что отключение cookie может повлиять на функциональность Сайта.</p>
                <p className="mt-2">Для управления cookie обратитесь к справке вашего браузера:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Google Chrome — Настройки &rarr; Конфиденциальность и безопасность &rarr; Cookie</li>
                  <li>Firefox — Настройки &rarr; Приватность и защита &rarr; Cookie</li>
                  <li>Safari — Настройки &rarr; Конфиденциальность &rarr; Cookie</li>
                  <li>Edge — Настройки &rarr; Конфиденциальность &rarr; Cookie</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Согласие</h2>
                <p>Продолжая использование Сайта, вы соглашаетесь на использование cookie в соответствии с данной Политикой. Вы можете отозвать согласие в любое время, удалив cookie через настройки браузера.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Контакты</h2>
                <p>Если у вас есть вопросы по нашей Политике cookie:</p>
                <p className="mt-2">Email: <a href="mailto:hello@overcode.ru" className="text-accent-purple hover:underline">hello@overcode.ru</a></p>
                <p>Telegram: <a href="https://t.me/overcode" className="text-accent-purple hover:underline">@overcode</a></p>
              </section>
            </>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
