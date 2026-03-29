'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useLanguage } from '@/lib/language';

const row1 = [
  {
    name: 'Алексей', nameEn: 'Alexey',
    role: 'Владелец пивоварни', roleEn: 'Brewery owner',
    quote: 'Сделали сайт за неделю — с каталогом, фильтрацией, формой заказа. Всё работает быстро, клиенты пишут что удобно. Рекомендую.',
    quoteEn: 'Built the site in a week — catalog, filtering, order form. Everything works fast, clients say it\'s convenient. Recommended.',
    initial: 'А',
  },
  {
    name: 'Юрий', nameEn: 'Yuri',
    role: 'Врач-гинеколог', roleEn: 'Gynecologist',
    quote: 'У меня не было сайта вообще. Ребята сделали всё под ключ — запись, информация об услугах, отзывы пациентов. Пациенты стали находить меня в поиске.',
    quoteEn: 'I had no website at all. The team did everything turnkey — booking, service info, patient reviews. Patients started finding me online.',
    initial: 'Ю',
  },
  {
    name: 'Дмитрий', nameEn: 'Dmitry',
    role: 'Маркетинговое агентство', roleEn: 'Marketing agency',
    quote: 'Лендинг за 3 дня, как и обещали. Подключили аналитику, SEO, всё адаптивное. Запустили рекламу — заявки пошли сразу.',
    quoteEn: 'Landing page in 3 days, as promised. Set up analytics, SEO, fully responsive. Launched ads — leads came in right away.',
    initial: 'Д',
  },
  {
    name: 'Екатерина', nameEn: 'Ekaterina',
    role: 'Владелица цветочного магазина', roleEn: 'Flower shop owner',
    quote: 'Очень довольна результатом. Красивый лендинг, быстро загружается, удобная форма заказа. Клиенты хвалят.',
    quoteEn: 'Very happy with the result. Beautiful landing page, fast loading, convenient order form. Clients love it.',
    initial: 'Е',
  },
];

const row2 = [
  {
    name: 'Сергей', nameEn: 'Sergey',
    role: 'Логистическая компания', roleEn: 'Logistics company',
    quote: 'Нужен был простой лендинг с формой заявки. Сделали быстро, подключили CRM — теперь заявки сразу падают менеджерам. Удобно.',
    quoteEn: 'Needed a simple landing with a lead form. Done fast, CRM connected — leads go straight to managers now. Convenient.',
    initial: 'С',
  },
  {
    name: 'Анна', nameEn: 'Anna',
    role: 'Франшиза Pho Bo', roleEn: 'Pho Bo Franchise',
    quote: 'Ребята погрузились в специфику общепита, сделали сайт для продажи франшизы. Интегрировали Метрику и CRM. Всё чётко.',
    quoteEn: 'The team understood the restaurant business specifics, built a franchise sales site. Integrated analytics and CRM. Everything on point.',
    initial: 'А',
  },
  {
    name: 'Максим', nameEn: 'Maxim',
    role: 'Руководитель салона красоты', roleEn: 'Beauty salon manager',
    quote: 'Заказали бота для записи клиентов в Telegram. Работает 24/7, напоминает о визитах. Администратор теперь не тратит время на звонки.',
    quoteEn: 'Ordered a Telegram booking bot. Works 24/7, sends visit reminders. Admin no longer wastes time on calls.',
    initial: 'М',
  },
  {
    name: 'Олег', nameEn: 'Oleg',
    role: 'E-commerce предприниматель', roleEn: 'E-commerce entrepreneur',
    quote: 'Собрали интернет-магазин с каталогом и оплатой. Адаптив идеальный, грузится моментально. Конверсия выросла.',
    quoteEn: 'Built an online store with catalog and payments. Perfect responsive design, loads instantly. Conversion rate went up.',
    initial: 'О',
  },
];

function ReviewCard({ item, lang }: { item: typeof row1[number]; lang: 'ru' | 'en' }) {
  return (
    <div className="glass rounded-2xl p-6 w-[340px] md:w-[400px] flex-shrink-0 mx-3">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-accent-purple text-sm">&#9733;</span>
          ))}
        </div>
        <Quote className="w-5 h-5 text-accent-purple/20" />
      </div>
      <p className="text-text-primary text-[15px] leading-relaxed mb-5">
        &laquo;{lang === 'ru' ? item.quote : item.quoteEn}&raquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple font-semibold text-sm">
          {item.initial}
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm">{lang === 'ru' ? item.name : item.nameEn}</p>
          <p className="text-text-tertiary text-xs">{lang === 'ru' ? item.role : item.roleEn}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block font-mono text-accent-purple text-sm mb-4 tracking-wider">
            {'// reviews'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-[32px] md:text-[48px] text-text-primary mb-4">
            {lang === 'ru' ? 'Что говорят клиенты' : 'What clients say'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            {lang === 'ru' ? 'Реальные отзывы из Telegram — без редактуры и приукрашиваний.' : 'Real reviews from Telegram — unedited and unembellished.'}
          </motion.p>
        </motion.div>
      </div>

      {/* Mobile — horizontal scroll */}
      <div className="md:hidden px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {[...row1, ...row2].map((item, i) => (
            <div key={`m-${i}`} className="snap-start">
              <ReviewCard item={item} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — marquee */}
      <div className="hidden md:block">
        <div className="relative mb-6">
          <div className="flex animate-marquee-right-slow whitespace-normal">
            {[...row1, ...row1, ...row1].map((item, i) => (
              <ReviewCard key={`r1-${i}`} item={item} lang={lang} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-marquee-left-slow whitespace-normal">
            {[...row2, ...row2, ...row2].map((item, i) => (
              <ReviewCard key={`r2-${i}`} item={item} lang={lang} />
            ))}
          </div>
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />
      </div>
    </section>
  );
}
