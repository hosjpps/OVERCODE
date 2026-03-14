'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
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
          {isEn ? 'Privacy Policy' : 'Политика конфиденциальности'}
        </h1>
        <p className="text-text-tertiary text-sm mb-10">
          {isEn ? 'Last updated: February 19, 2026' : 'Последнее обновление: 19 февраля 2026 г.'}
        </p>

        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {isEn ? (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. General Provisions</h2>
                <p>This Privacy Policy governs the procedure for collecting, storing, processing, and using personal data of users (hereinafter — &quot;User&quot;) of the OVERCODE website (hereinafter — &quot;Site&quot;).</p>
                <p className="mt-2">By using the Site, you agree to the terms of this Policy. If you do not agree with the terms, please stop using the Site.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Data We Collect</h2>
                <p>We may collect the following data:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Name, email address, phone number — when you fill out a contact form</li>
                  <li>Messenger username (Telegram) — when you provide it voluntarily</li>
                  <li>Technical data: IP address, browser type, operating system, pages viewed, time spent on the Site</li>
                  <li>Cookies and similar technologies (see our <Link href="/cookies" className="text-accent-purple hover:underline">Cookie Policy</Link>)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Purpose of Data Processing</h2>
                <p>We use collected data for the following purposes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Responding to your inquiries and providing services</li>
                  <li>Improving the Site and user experience</li>
                  <li>Sending information about our services (only with your consent)</li>
                  <li>Fulfilling legal obligations</li>
                  <li>Analyzing traffic and Site usage statistics</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Data Protection</h2>
                <p>We take organizational and technical measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. This includes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Encrypted data transmission (SSL/TLS)</li>
                  <li>Restricted access to personal data</li>
                  <li>Secure data storage</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Third-Party Sharing</h2>
                <p>We do not sell or rent your personal data to third parties. We may share data with:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Service providers assisting in Site operation (hosting, analytics)</li>
                  <li>Government authorities when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Data Retention</h2>
                <p>We retain personal data only for as long as necessary to fulfill the purposes described in this Policy, or as required by law. You may request deletion of your data at any time.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent to data processing</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">8. Changes to the Policy</h2>
                <p>We may update this Privacy Policy from time to time. Changes take effect upon publication on the Site. We recommend periodically reviewing this page.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, contact us:</p>
                <p className="mt-2">Email: <a href="mailto:info@overcode.ru" className="text-accent-purple hover:underline">info@overcode.ru</a></p>
                <p>Telegram: <a href="https://t.me/hosjpps" className="text-accent-purple hover:underline">@hosjpps</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Общие положения</h2>
                <p>Настоящая Политика конфиденциальности определяет порядок сбора, хранения, обработки и использования персональных данных пользователей (далее — &laquo;Пользователь&raquo;) сайта OVERCODE (далее — &laquo;Сайт&raquo;).</p>
                <p className="mt-2">Используя Сайт, вы соглашаетесь с условиями данной Политики. Если вы не согласны с условиями, пожалуйста, прекратите использование Сайта.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Какие данные мы собираем</h2>
                <p>Мы можем собирать следующие данные:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Имя, адрес электронной почты, номер телефона — при заполнении формы обратной связи</li>
                  <li>Имя пользователя в мессенджере (Telegram) — при добровольном предоставлении</li>
                  <li>Технические данные: IP-адрес, тип браузера, операционная система, просмотренные страницы, время на сайте</li>
                  <li>Файлы cookie и аналогичные технологии (см. <Link href="/cookies" className="text-accent-purple hover:underline">Политику cookie</Link>)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Цели обработки данных</h2>
                <p>Мы используем собранные данные для следующих целей:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Ответ на ваши обращения и предоставление услуг</li>
                  <li>Улучшение работы Сайта и пользовательского опыта</li>
                  <li>Отправка информации о наших услугах (только с вашего согласия)</li>
                  <li>Выполнение требований законодательства</li>
                  <li>Анализ трафика и статистика использования Сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Защита данных</h2>
                <p>Мы принимаем организационные и технические меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Шифрование передачи данных (SSL/TLS)</li>
                  <li>Ограничение доступа к персональным данным</li>
                  <li>Безопасное хранение данных</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Передача данных третьим лицам</h2>
                <p>Мы не продаём и не сдаём в аренду ваши персональные данные третьим лицам. Мы можем передавать данные:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Поставщикам услуг, содействующим работе Сайта (хостинг, аналитика)</li>
                  <li>Государственным органам в случаях, предусмотренных законодательством</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Сроки хранения данных</h2>
                <p>Мы храним персональные данные только в течение срока, необходимого для достижения целей, описанных в настоящей Политике, или в соответствии с требованиями законодательства. Вы можете запросить удаление своих данных в любое время.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Ваши права</h2>
                <p>Вы имеете право:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Запросить доступ к вашим персональным данным</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Потребовать удаления ваших персональных данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Обратиться с жалобой в контролирующий орган</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">8. Изменения в Политике</h2>
                <p>Мы можем обновлять настоящую Политику конфиденциальности. Изменения вступают в силу с момента публикации на Сайте. Рекомендуем периодически просматривать эту страницу.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">9. Контакты</h2>
                <p>Если у вас есть вопросы по настоящей Политике конфиденциальности, свяжитесь с нами:</p>
                <p className="mt-2">Email: <a href="mailto:info@overcode.ru" className="text-accent-purple hover:underline">info@overcode.ru</a></p>
                <p>Telegram: <a href="https://t.me/hosjpps" className="text-accent-purple hover:underline">@hosjpps</a></p>
              </section>
            </>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
