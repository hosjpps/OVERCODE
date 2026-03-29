'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import Footer from '@/components/layout/Footer';

export default function PersonalDataPage() {
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
          <button onClick={toggleLang} aria-label="Toggle language" className="flex items-center bg-white/[0.06] rounded-full border border-white/10 p-0.5 cursor-pointer">
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'ru' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>RU</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${lang === 'en' ? 'bg-white/[0.15] text-text-primary' : 'text-text-tertiary'}`}>EN</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[800px] mx-auto px-5 md:px-10 py-12 md:py-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          {isEn ? 'Personal Data Processing Policy' : 'Политика обработки персональных данных'}
        </h1>
        <p className="text-text-tertiary text-sm mb-10">
          {isEn ? 'Last updated: February 19, 2026' : 'Последнее обновление: 19 февраля 2026 г.'}
        </p>

        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {isEn ? (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. General Provisions</h2>
                <p>This Personal Data Processing Policy (hereinafter — &quot;Policy&quot;) has been developed in accordance with the Federal Law of the Russian Federation No. 152-FZ &quot;On Personal Data&quot; dated July 27, 2006, and defines the procedure for processing personal data and measures to ensure their security.</p>
                <p className="mt-2">The operator of personal data is OVERCODE (hereinafter — &quot;Operator&quot;).</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Basic Concepts</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal data</strong> — any information relating directly or indirectly to a specific or identifiable individual (personal data subject)</li>
                  <li><strong>Processing of personal data</strong> — any action (operation) or set of actions performed with personal data, including collection, recording, systematization, accumulation, storage, clarification, extraction, use, transfer, depersonalization, blocking, deletion, destruction</li>
                  <li><strong>Personal data subject</strong> — an individual whose personal data is processed by the Operator</li>
                  <li><strong>Operator</strong> — an individual or legal entity that organizes and/or carries out the processing of personal data</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Composition of Processed Personal Data</h2>
                <p>The Operator may process the following personal data of the Subject:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Last name, first name, patronymic</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Messenger username (Telegram, WhatsApp)</li>
                  <li>Company name and position (if provided voluntarily)</li>
                  <li>Data collected automatically: IP address, cookies, browser type, operating system, visit time, pages viewed</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Purposes of Personal Data Processing</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Establishing communication with the Subject for inquiries, applications, orders processing</li>
                  <li>Providing services and fulfilling contractual obligations</li>
                  <li>Sending informational and promotional materials (with the Subject&apos;s consent)</li>
                  <li>Improving website quality and developing new products</li>
                  <li>Conducting statistical research and analytics</li>
                  <li>Complying with legal requirements of the Russian Federation</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Legal Basis for Processing</h2>
                <p>Personal data processing is carried out on the following legal bases:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Consent of the personal data subject</li>
                  <li>Necessity of processing for the performance of a contract</li>
                  <li>Necessity of processing to comply with legal obligations of the Operator</li>
                  <li>Necessity of processing to protect the legitimate interests of the Operator</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Procedure and Conditions for Processing</h2>
                <p>Processing of personal data is carried out using automation tools and/or without such tools. The Operator ensures the confidentiality of personal data and takes all necessary organizational and technical measures to protect them.</p>
                <p className="mt-2">When processing personal data, the Operator ensures:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Lawfulness of purposes and methods of processing</li>
                  <li>Compliance of purposes with those stated at the time of collection</li>
                  <li>Compliance of volume and nature of data with stated purposes</li>
                  <li>Accuracy of data and their relevance to processing purposes</li>
                  <li>Impossibility of combining databases created for incompatible purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Rights of Personal Data Subjects</h2>
                <p>The personal data subject has the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Obtain information regarding the processing of their personal data</li>
                  <li>Demand clarification, blocking, or destruction of personal data if it is incomplete, outdated, inaccurate, or unlawfully obtained</li>
                  <li>Withdraw consent to personal data processing</li>
                  <li>File complaints about the Operator&apos;s actions with the authorized body for the protection of personal data subjects&apos; rights (Roskomnadzor)</li>
                  <li>Protect their rights and legitimate interests, including compensation for damages and/or moral harm, through the courts</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">8. Transfer of Personal Data</h2>
                <p>The Operator may transfer personal data to third parties only in the following cases:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The Subject has given consent to such transfer</li>
                  <li>Transfer is required by Russian Federation legislation</li>
                  <li>Transfer is necessary for the performance of a contract with the Subject</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">9. Security of Personal Data</h2>
                <p>The Operator takes the following measures to ensure security:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Designation of persons responsible for organizing personal data processing</li>
                  <li>Adoption of local regulatory acts on personal data processing</li>
                  <li>Application of organizational and technical measures to protect personal data</li>
                  <li>Internal audits of compliance with personal data processing requirements</li>
                  <li>Assessment of harm that may be caused to personal data subjects</li>
                  <li>Training of employees involved in personal data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">10. Destruction of Personal Data</h2>
                <p>Personal data is destroyed when:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Processing purposes have been achieved or there is no longer a need to achieve them</li>
                  <li>The Subject withdraws consent and there is no other legal basis for processing</li>
                  <li>Unlawful processing of data is detected</li>
                  <li>The Operator is obligated to destroy data by law</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">11. Contact Information</h2>
                <p>For questions regarding personal data processing:</p>
                <p className="mt-2">Email: <a href="mailto:info@overcode.space" className="text-accent-purple hover:underline">info@overcode.space</a></p>
                <p>Telegram: <a href="https://t.me/overcode_agency" className="text-accent-purple hover:underline">@overcode_agency</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Общие положения</h2>
                <p>Настоящая Политика обработки персональных данных (далее — &laquo;Политика&raquo;) разработана в соответствии с Федеральным законом Российской Федерации от 27.07.2006 № 152-ФЗ &laquo;О персональных данных&raquo; и определяет порядок обработки персональных данных и меры по обеспечению их безопасности.</p>
                <p className="mt-2">Оператором персональных данных является OVERCODE (далее — &laquo;Оператор&raquo;).</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Основные понятия</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Персональные данные</strong> — любая информация, относящаяся прямо или косвенно к определённому или определяемому физическому лицу (субъекту персональных данных)</li>
                  <li><strong>Обработка персональных данных</strong> — любое действие (операция) или совокупность действий, совершаемых с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление, уничтожение</li>
                  <li><strong>Субъект персональных данных</strong> — физическое лицо, чьи персональные данные обрабатываются Оператором</li>
                  <li><strong>Оператор</strong> — физическое или юридическое лицо, организующее и/или осуществляющее обработку персональных данных</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Состав обрабатываемых персональных данных</h2>
                <p>Оператор может обрабатывать следующие персональные данные Субъекта:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Фамилия, имя, отчество</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона</li>
                  <li>Имя пользователя в мессенджере (Telegram, WhatsApp)</li>
                  <li>Название компании и должность (при добровольном предоставлении)</li>
                  <li>Данные, собираемые автоматически: IP-адрес, cookie, тип браузера, операционная система, время визита, просмотренные страницы</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Цели обработки персональных данных</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Установление связи с Субъектом для обработки обращений, заявок, заказов</li>
                  <li>Оказание услуг и исполнение договорных обязательств</li>
                  <li>Направление информационных и рекламных материалов (с согласия Субъекта)</li>
                  <li>Улучшение качества сайта и разработка новых продуктов</li>
                  <li>Проведение статистических исследований и аналитики</li>
                  <li>Выполнение требований законодательства Российской Федерации</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Правовые основания обработки</h2>
                <p>Обработка персональных данных осуществляется на следующих правовых основаниях:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Согласие субъекта персональных данных</li>
                  <li>Необходимость обработки для исполнения договора</li>
                  <li>Необходимость обработки для выполнения обязанностей Оператора, предусмотренных законодательством</li>
                  <li>Необходимость обработки для защиты законных интересов Оператора</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Порядок и условия обработки</h2>
                <p>Обработка персональных данных осуществляется с использованием средств автоматизации и/или без использования таких средств. Оператор обеспечивает конфиденциальность персональных данных и принимает все необходимые организационные и технические меры для их защиты.</p>
                <p className="mt-2">При обработке персональных данных Оператор обеспечивает:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Законность целей и способов обработки</li>
                  <li>Соответствие целей обработки заявленным при сборе данных</li>
                  <li>Соответствие объёма и характера данных заявленным целям</li>
                  <li>Точность данных и их актуальность для целей обработки</li>
                  <li>Невозможность объединения баз данных, созданных для несовместимых целей</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Права субъектов персональных данных</h2>
                <p>Субъект персональных данных имеет право:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Получать информацию об обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения персональных данных, если они являются неполными, устаревшими, неточными или незаконно полученными</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор)</li>
                  <li>Защищать свои права и законные интересы, в том числе требовать возмещения убытков и/или компенсации морального вреда в судебном порядке</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">8. Передача персональных данных</h2>
                <p>Оператор может передавать персональные данные третьим лицам только в следующих случаях:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Субъект дал согласие на такую передачу</li>
                  <li>Передача предусмотрена законодательством Российской Федерации</li>
                  <li>Передача необходима для исполнения договора с Субъектом</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">9. Безопасность персональных данных</h2>
                <p>Оператор принимает следующие меры по обеспечению безопасности:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Назначение ответственных за организацию обработки персональных данных</li>
                  <li>Принятие локальных нормативных актов по вопросам обработки персональных данных</li>
                  <li>Применение организационных и технических мер по защите персональных данных</li>
                  <li>Проведение внутренних проверок соответствия обработки требованиям законодательства</li>
                  <li>Оценка вреда, который может быть причинён субъектам персональных данных</li>
                  <li>Обучение сотрудников, участвующих в обработке персональных данных</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">10. Уничтожение персональных данных</h2>
                <p>Персональные данные подлежат уничтожению, если:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Достигнуты цели обработки или отпала необходимость в их достижении</li>
                  <li>Субъект отозвал согласие и иные правовые основания для обработки отсутствуют</li>
                  <li>Выявлена неправомерная обработка данных</li>
                  <li>Оператор обязан уничтожить данные в соответствии с законодательством</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-3">11. Контактная информация</h2>
                <p>По вопросам обработки персональных данных:</p>
                <p className="mt-2">Email: <a href="mailto:info@overcode.space" className="text-accent-purple hover:underline">info@overcode.space</a></p>
                <p>Telegram: <a href="https://t.me/overcode_agency" className="text-accent-purple hover:underline">@overcode_agency</a></p>
              </section>
            </>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
