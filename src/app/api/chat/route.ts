import { NextResponse } from 'next/server';

const SYSTEM_PROMPT_RU = `Ты — AI-ассистент digital-агентства OVERCODE. Отвечай коротко, дружелюбно и по делу. НЕ используй эмодзи — только текст.

О компании:
- OVERCODE — агентство полного цикла: сайты, AI-боты, автоматизация, аналитика, креатив
- Стек: Next.js, React, TypeScript, Python, n8n, Claude AI, Vercel AI SDK, Telegram API
- Работаем удалённо по всей России и СНГ

Услуги и цены:
- Лендинг: от 30 000 руб (3-7 дней)
- Многостраничный сайт: от 80 000 руб (2-3 недели)
- Интернет-магазин: от 120 000 руб (3-4 недели)
- AI-бот (Telegram/WhatsApp/сайт): от 40 000 руб (5-14 дней)
- Голосовой AI-ассистент: от 60 000 руб (1-2 недели)
- Автоматизация процессов (n8n): от 25 000 руб (3-14 дней)
- Дашборд/аналитика: от 40 000 руб (1-4 недели)
- Промо-ролик/креатив: от 15 000 руб (2-7 дней)

Пакеты:
- "Быстрый старт" от 30 000 руб — лендинг + адаптив + SEO + аналитика
- "Рост" от 80 000 руб — сайт + AI-бот + автоматизация + CRM + 1 мес поддержки
- "Трансформация" от 200 000 руб — всё из "Роста" + SaaS/веб-приложение + BI-аналитика + 3 мес поддержки

Процесс: брифинг - прототип - разработка - тестирование - запуск - поддержка
Первая консультация бесплатна. Работаем по договору с поэтапной оплатой.

Если пользователь хочет оставить заявку или обсудить проект — предложи оставить контакт (Telegram/телефон) или написать в @hosjpps.

Не выдумывай то, чего не знаешь. Если вопрос не про OVERCODE — вежливо перенаправь к теме.
ВАЖНО: Не используй эмодзи в ответах. Только текст.`;

const SYSTEM_PROMPT_EN = `You are an AI assistant for OVERCODE digital agency. Keep your answers short, friendly, and to the point. Do NOT use emojis — text only.

About the company:
- OVERCODE is a full-cycle agency: websites, AI bots, automation, analytics, creative
- Stack: Next.js, React, TypeScript, Python, n8n, Claude AI, Vercel AI SDK, Telegram API
- We work remotely across Russia and CIS

Services and pricing:
- Landing page: from $400 (3-7 days)
- Multi-page website: from $1,100 (2-3 weeks)
- Online store: from $1,600 (3-4 weeks)
- AI bot (Telegram/WhatsApp/website): from $550 (5-14 days)
- Voice AI assistant: from $800 (1-2 weeks)
- Process automation (n8n): from $350 (3-14 days)
- Dashboard/analytics: from $550 (1-4 weeks)
- Promo video/creative: from $200 (2-7 days)

Packages:
- "Quick Start" from $400 — landing + responsive + SEO + analytics
- "Growth" from $1,100 — website + AI bot + automation + CRM + 1 month support
- "Transformation" from $2,700 — everything from "Growth" + SaaS/web app + BI analytics + 3 months support

Process: briefing - prototype - development - testing - launch - support
First consultation is free. We work by contract with milestone-based payments.

If the user wants to leave a request or discuss a project — offer to leave a contact (Telegram/phone) or write to @hosjpps.

Do not make up things you don't know. If a question is not about OVERCODE — politely redirect to the topic.
IMPORTANT: Do not use emojis in your answers. Text only. Always respond in English.`;

export async function POST(req: Request) {
  try {
    const { messages, lang = 'ru' } = await req.json();
    const isEn = lang === 'en';

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = isEn
        ? 'Hi! I am OVERCODE AI assistant. I can tell you about our services, pricing, and timelines. Ask away!'
        : 'Привет! Я AI-ассистент OVERCODE. Расскажу об услугах, ценах и сроках. Спрашивайте!';

      if (isEn) {
        if (lastMsg.includes('pric') || lastMsg.includes('cost') || lastMsg.includes('how much') || lastMsg.includes('rate')) {
          reply = 'Landing page — from $400, AI bot — from $550, automation — from $350. The final price depends on complexity. Want to discuss your project in detail?';
        } else if (lastMsg.includes('time') || lastMsg.includes('long') || lastMsg.includes('fast') || lastMsg.includes('deadline') || lastMsg.includes('duration')) {
          reply = 'MVP (landing or bot) takes 3-7 days. A complex project — 2-4 weeks. We work in sprints with weekly demos so you can see progress.';
        } else if (lastMsg.includes('bot') || lastMsg.includes('ai') || lastMsg.includes('chat')) {
          reply = 'We build AI bots for Telegram, WhatsApp, and websites. Bots can answer questions, qualify leads, and book clients. From $550, ready in 5-14 days.';
        } else if (lastMsg.includes('site') || lastMsg.includes('website') || lastMsg.includes('landing') || lastMsg.includes('store') || lastMsg.includes('shop')) {
          reply = 'We build landing pages (from $400), multi-page sites (from $1,100), and online stores (from $1,600). Stack: Next.js, React, TypeScript. Fully responsive and fast.';
        } else if (lastMsg.includes('automat') || lastMsg.includes('n8n') || lastMsg.includes('integrat')) {
          reply = 'We automate processes with n8n — 500+ integrations. CRM, email, marketplaces, accounting. From $350, done in 3-14 days.';
        } else if (lastMsg.includes('contact') || lastMsg.includes('reach') || lastMsg.includes('write') || lastMsg.includes('call')) {
          reply = 'Message us on Telegram — we reply within an hour! Or leave your contact right here and we will get back to you. First consultation is free.';
        } else if (lastMsg.includes('hello') || lastMsg.includes('hi') || lastMsg.includes('hey') || lastMsg.includes('good')) {
          reply = 'Hi! I am OVERCODE AI assistant. I can tell you about our services, pricing, timelines, or help you find the right solution for your business. What are you interested in?';
        } else if (lastMsg.includes('package') || lastMsg.includes('plan') || lastMsg.includes('tier')) {
          reply = 'We have 3 packages: "Quick Start" from $400 (landing), "Growth" from $1,100 (site + bot + automation), and "Transformation" from $2,700 (full digital ecosystem). Which one fits best?';
        } else if (lastMsg.includes('stack') || lastMsg.includes('tech') || lastMsg.includes('tool')) {
          reply = 'We use a modern stack: Next.js, React, TypeScript, Tailwind CSS, Python, n8n, Claude AI, Vercel AI SDK, Telegram Bot API. Deployed on Vercel.';
        } else if (lastMsg.length > 3) {
          reply = 'Great question! To give you an accurate answer, let us discuss the details. Leave your Telegram or phone number — we will get in touch within an hour. Or write to @hosjpps.';
        }
      } else {
        if (lastMsg.includes('цен') || lastMsg.includes('стои') || lastMsg.includes('скольк') || lastMsg.includes('прайс')) {
          reply = 'Лендинг — от 30 000 руб, AI-бот — от 40 000 руб, автоматизация — от 25 000 руб. Финальная цена зависит от сложности. Хотите обсудить ваш проект подробнее?';
        } else if (lastMsg.includes('срок') || lastMsg.includes('долго') || lastMsg.includes('быстр') || lastMsg.includes('время')) {
          reply = 'MVP (лендинг или бот) делаем за 3-7 дней. Комплексный проект — 2-4 недели. Работаем спринтами с еженедельными демо, чтобы вы видели прогресс.';
        } else if (lastMsg.includes('бот') || lastMsg.includes('ai') || lastMsg.includes('чат')) {
          reply = 'Делаем AI-ботов для Telegram, WhatsApp и сайтов. Бот умеет отвечать на вопросы, квалифицировать лиды, записывать клиентов. От 40 000 руб, готов за 5-14 дней.';
        } else if (lastMsg.includes('сайт') || lastMsg.includes('лендинг') || lastMsg.includes('магазин')) {
          reply = 'Делаем лендинги (от 30 000 руб), многостраничники (от 80 000 руб) и интернет-магазины (от 120 000 руб). Стек: Next.js, React, TypeScript. Все адаптивное и быстрое.';
        } else if (lastMsg.includes('автоматиз') || lastMsg.includes('n8n') || lastMsg.includes('интеграц')) {
          reply = 'Автоматизируем процессы через n8n — 500+ интеграций. CRM, почта, маркетплейсы, бухгалтерия. От 25 000 руб, делаем за 3-14 дней.';
        } else if (lastMsg.includes('контакт') || lastMsg.includes('связ') || lastMsg.includes('написа') || lastMsg.includes('позвон')) {
          reply = 'Напишите нам в Telegram — ответим в течение часа! Или оставьте ваш контакт прямо здесь, и мы свяжемся. Первая консультация бесплатна.';
        } else if (lastMsg.includes('привет') || lastMsg.includes('здравств') || lastMsg.includes('добр') || lastMsg.includes('hello') || lastMsg.includes('hi')) {
          reply = 'Привет! Я AI-ассистент OVERCODE. Могу рассказать об услугах, ценах, сроках или помочь подобрать решение для вашего бизнеса. Что вас интересует?';
        } else if (lastMsg.includes('пакет') || lastMsg.includes('тариф')) {
          reply = 'У нас 3 пакета: "Быстрый старт" от 30 000 руб (лендинг), "Рост" от 80 000 руб (сайт + бот + автоматизация) и "Трансформация" от 200 000 руб (полная цифровая экосистема). Какой ближе?';
        } else if (lastMsg.includes('стек') || lastMsg.includes('технолог') || lastMsg.includes('чем работ')) {
          reply = 'Работаем на современном стеке: Next.js, React, TypeScript, Tailwind CSS, Python, n8n, Claude AI, Vercel AI SDK, Telegram Bot API. Деплоим на Vercel.';
        } else if (lastMsg.length > 3) {
          reply = 'Интересный вопрос! Чтобы дать точный ответ, предлагаю обсудить детали. Оставьте ваш Telegram или телефон — свяжемся в течение часа. Или напишите в @hosjpps.';
        }
      }

      return NextResponse.json({ reply });
    }

    // Detect OpenRouter vs OpenAI by key prefix
    const isOpenRouter = apiKey.startsWith('sk-or-');
    const baseUrl = isOpenRouter
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    const model = isOpenRouter ? 'openai/gpt-4o-mini' : 'gpt-4o-mini';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_RU },
          ...messages.slice(-10),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Chat API error:', data);
      return NextResponse.json({ reply: isEn
        ? 'Sorry, the service is temporarily unavailable. Please try again later or message us on Telegram.'
        : 'Извините, сервис временно недоступен. Попробуйте позже или напишите нам в Telegram.'
      });
    }

    const reply = data.choices?.[0]?.message?.content || (isEn
      ? 'Sorry, could not process the request. Please try again.'
      : 'Извините, не смог обработать запрос. Попробуйте ещё раз.');

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
