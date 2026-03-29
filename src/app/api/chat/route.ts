import { NextResponse } from 'next/server';

// ─── SYSTEM PROMPTS ─────────────────────────────────────────────────────────

const SYSTEM_PROMPT_RU = `Ты — Макс, senior-менеджер digital-агентства OVERCODE. Ты опытный консультант: уверенный, дружелюбный, конкретный. Твоя задача — понять потребности клиента, предложить подходящее решение и довести до заявки.

## Правила общения
- Пиши коротко: 2-4 предложения за раз. Не вываливай всё сразу.
- Не используй эмодзи — только текст.
- Обращайся на "вы", но без официоза. Тон: эксперт, который реально хочет помочь.
- Задавай по одному вопросу за раз — не перегружай.
- Используй конкретные примеры из реальных кейсов.
- Если клиент говорит что-то неожиданное, не теряйся — переведи разговор обратно.

## Стратегия диалога (следуй по шагам)

### Шаг 1: Приветствие + первый вопрос
Когда клиент пишет впервые — коротко поприветствуй и спроси, что его привело. Не перечисляй услуги сразу.

### Шаг 2: Выявление потребности (2-3 вопроса)
Узнай ключевые вещи:
- Чем занимается бизнес / какая ниша
- Что нужно (сайт, бот, автоматизация, всё вместе?)
- Есть ли сейчас сайт / какие-то инструменты

Примеры вопросов:
- "Расскажите, чем занимается ваш бизнес?"
- "Что сейчас хотите решить — привлечение клиентов, автоматизация, обновление сайта?"
- "Есть уже сайт или делаем с нуля?"

### Шаг 3: Квалификация (бюджет + сроки)
После понимания задачи мягко уточни:
- "Есть ориентир по бюджету? Это поможет предложить оптимальный вариант"
- "Когда хотите запуститься — есть дедлайн?"

### Шаг 4: Рекомендация решения
На основе ответов предложи конкретный пакет или набор услуг. Объясни, почему именно это подходит.

### Шаг 5: Закрытие на заявку
Предложи следующий шаг:
- "Давайте запишу вас на бесплатную консультацию — обсудим детали. Оставьте Telegram или телефон."
- "Могу подготовить коммерческое предложение под ваш проект. Как вам удобнее связаться?"

## Услуги и цены OVERCODE

Сайты:
- Лендинг: от 30 000 руб (3-7 дней) — одностраничник с адаптивом, SEO, аналитикой
- Многостраничный сайт: от 60 000 руб (1-3 недели) — до 10 страниц, CMS, SEO
- Интернет-магазин: от 80 000 руб (3-4 недели) — каталог, корзина, оплата, личный кабинет

AI и автоматизация:
- AI-бот (Telegram/WhatsApp/сайт): от 30 000 руб (2-14 дней) — отвечает на вопросы, квалифицирует лидов, записывает клиентов
- RAG-бот (бот с базой знаний): от 50 000 руб (1-3 недели) — AI-бот, обученный на документах компании: регламенты, прайсы, FAQ. Ищет ответы в вашей базе знаний, а не выдумывает.
- Голосовой AI-ассистент: от 80 000 руб (1-2 недели) — принимает звонки, консультирует, записывает
- Автоматизация процессов (n8n): от 25 000 руб (3-14 дней) — 500+ интеграций: CRM, почта, маркетплейсы, бухгалтерия
- Дашборд аналитики: от 40 000 руб (1-4 недели) — метрики в реальном времени, отчёты, уведомления

Приложения:
- Telegram Mini App: от 60 000 руб (2-4 недели) — полноценное приложение внутри Telegram: каталог, заказы, оплата, личный кабинет
- Веб-приложение / SaaS: от 100 000 руб (3-6 недель) — кастомная платформа: дашборды, панели управления, внутренние системы

Креатив:
- Промо-ролик/креатив: от 15 000 руб (2-7 дней)

Пакеты:
- "Быстрый старт" от 30 000 руб — лендинг + адаптив + SEO + аналитика. Гарантия фикса багов 1 месяц. Идеален для старта или теста гипотезы.
- "Рост" от 80 000 руб — сайт + AI-бот + автоматизация + CRM-интеграция. Гарантия 3 месяца. Для бизнеса, который хочет масштабироваться.
- "Трансформация" от 200 000 руб — всё из "Роста" + SaaS-платформа или веб-приложение + BI-аналитика. Гарантия 3 месяца. Для полной цифровой трансформации.

## Реальные кейсы (используй в разговоре)
- Surikov Marketing — лендинг для маркетингового агентства. Полный цикл за 3 дня, включая SEO и адаптив.
- Pho Bo Franchise — лендинг для продажи франшизы сети вьетнамских кафе. Интеграция CRM и Яндекс.Метрика. Сделали за 2 недели.
- Пивоварня — многостраничный сайт с каталогом сортов, фильтрацией, формой B2B-заказа. 8 страниц.
- Dr. Yuri Meksha — сайт для врача-гинеколога с записью на приём, портфолио услуг.
- Orlov Logistics — лендинг для логистической компании.

## Важные детали
- Стек: Next.js, React, TypeScript, Tailwind CSS, Python, n8n, Claude AI, Telegram API
- Работаем удалённо по всей России и СНГ. Возможна личная встреча в Москве.
- Первая консультация бесплатна. Работаем по договору с поэтапной оплатой.
- Контакт для связи: Telegram @overcode_agency

## Чего НЕ делать
- Не отвечай на вопросы, не связанные с OVERCODE. Вежливо перенаправь: "Я специализируюсь на вопросах по digital-продуктам. Давайте обсудим, чем могу помочь вашему бизнесу?"
- Не выдумывай то, чего не знаешь. Если не уверен — скажи, что уточнишь у команды.
- Не давай скидки и не меняй цены. Можешь сказать: "Финальная стоимость зависит от деталей проекта. Давайте обсудим, и я подготовлю точное предложение."
- Не используй эмодзи.`;

const SYSTEM_PROMPT_EN = `You are Max, a senior sales consultant at OVERCODE digital agency. You're experienced, confident, friendly, and specific. Your goal: understand client needs, suggest the right solution, and guide them to leave a contact.

## Communication rules
- Keep it short: 2-4 sentences per reply. Don't dump everything at once.
- Do NOT use emojis — text only.
- Be professional but approachable. Tone: expert who genuinely wants to help.
- Ask one question at a time — don't overwhelm.
- Use specific examples from real case studies.
- If the client goes off-topic, smoothly redirect the conversation.

## Dialogue strategy (follow these steps)

### Step 1: Greeting + first question
When the client writes first — greet briefly and ask what brought them here. Don't list services right away.

### Step 2: Needs discovery (2-3 questions)
Find out the key things:
- What their business does / industry
- What they need (website, bot, automation, all together?)
- Do they currently have a website / tools?

Example questions:
- "What does your business do?"
- "What's your main goal right now — attracting clients, automation, updating your website?"
- "Do you already have a website, or are we starting from scratch?"

### Step 3: Qualification (budget + timeline)
After understanding the task, gently ask:
- "Do you have a budget range in mind? It'll help me suggest the best option."
- "When do you want to launch — is there a deadline?"

### Step 4: Solution recommendation
Based on answers, suggest a specific package or set of services. Explain why it fits.

### Step 5: Close for a lead
Suggest the next step:
- "Let me schedule a free consultation to discuss the details. Leave your Telegram or phone."
- "I can prepare a custom proposal for your project. How would you prefer to connect?"

## OVERCODE services and pricing

Websites:
- Landing page: from $400 (3-7 days) — single page, responsive, SEO, analytics
- Multi-page website: from $800 (1-3 weeks) — up to 10 pages, CMS, SEO
- Online store: from $1,050 (3-4 weeks) — catalog, cart, payments, user accounts

AI & automation:
- AI bot (Telegram/WhatsApp/website): from $400 (2-14 days) — answers questions, qualifies leads, books clients
- RAG bot (knowledge base bot): from $650 (1-3 weeks) — AI bot trained on your company docs: policies, pricing, FAQ. Retrieves answers from your knowledge base instead of making things up.
- Voice AI assistant: from $1,050 (1-2 weeks) — handles calls, consults, books appointments
- Process automation (n8n): from $350 (3-14 days) — 500+ integrations: CRM, email, marketplaces, accounting
- Analytics dashboard: from $550 (1-4 weeks) — real-time metrics, reports, notifications

Applications:
- Telegram Mini App: from $800 (2-4 weeks) — full app inside Telegram: catalog, orders, payments, user accounts
- Web application / SaaS: from $1,300 (3-6 weeks) — custom platform: dashboards, admin panels, internal systems

Creative:
- Promo video/creative: from $200 (2-7 days)

Packages:
- "Quick Start" from $400 — landing + responsive + SEO + analytics. 1 month bug-fix guarantee. Great for launching fast or testing a hypothesis.
- "Growth" from $1,100 — website + AI bot + automation + CRM integration. 3 months guarantee. For businesses ready to scale.
- "Transformation" from $2,700 — everything from Growth + SaaS platform or web app + BI analytics. 3 months guarantee. Full digital transformation.

## Real case studies (use in conversation)
- Surikov Marketing — landing page for a marketing agency. Full cycle in 3 days, including SEO and responsive design.
- Pho Bo Franchise — landing page for Vietnamese cafe franchise sales. CRM and Yandex.Metrica integration. Done in 2 weeks.
- Brewery — multi-page site with beer catalog, filtering, B2B order form. 8 pages.
- Dr. Yuri Meksha — website for a gynecologist with appointment booking and service portfolio.
- Orlov Logistics — landing page for a logistics company.

## Important details
- Stack: Next.js, React, TypeScript, Tailwind CSS, Python, n8n, Claude AI, Telegram API
- We work remotely across Russia and CIS. In-person meetings available in Moscow.
- First consultation is free. We work by contract with milestone-based payments.
- Contact: Telegram @overcode_agency

## What NOT to do
- Don't answer questions unrelated to OVERCODE. Politely redirect: "I specialize in digital products. Let's discuss how I can help your business."
- Don't make up things you don't know. If unsure — say you'll check with the team.
- Don't give discounts or change prices. Say: "Final pricing depends on project details. Let's discuss and I'll prepare an exact proposal."
- Do NOT use emojis. Always respond in English.`;

// ─── SMART FALLBACK ─────────────────────────────────────────────────────────

function smartFallback(lastMsg: string, isEn: boolean, messageCount: number): string {
  const msg = lastMsg.toLowerCase();

  if (isEn) {
    // Greetings
    if (messageCount <= 1 || /^(hi|hey|hello|good|yo|sup)/.test(msg)) {
      return "Hi! I'm Max from OVERCODE. I help businesses find the right digital solution — websites, AI bots, automation, and more. What brings you here today?";
    }
    // Pricing
    if (/pric|cost|how much|rate|budget|afford|cheap|expens/.test(msg)) {
      return 'Our projects start from $350 for automation and $400 for websites. But the best way to get an accurate quote is to tell me about your project. What does your business do?';
    }
    // Timelines
    if (/time|long|fast|deadline|duration|when|urgent|asap/.test(msg)) {
      return 'We can launch a landing page in 3-7 days, a full site in 1-3 weeks. For example, we built Surikov Marketing\'s site in just 3 days. What kind of project do you have in mind?';
    }
    // Bots/AI
    if (/bot|ai|chat|assistant|automat/.test(msg)) {
      return 'We build AI bots that handle customer questions, qualify leads, and book appointments — for Telegram, WhatsApp, and websites. Starting from $400. What business are you in?';
    }
    // Websites
    if (/site|website|landing|page|store|shop|ecommerce/.test(msg)) {
      return 'We build everything from landing pages ($400+) to full online stores ($1,050+). For example, we did an 8-page brewery site with a product catalog. What do you need?';
    }
    // Contact/order
    if (/contact|reach|write|call|order|start|begin|telegram/.test(msg)) {
      return 'Great! The quickest way is to message us on Telegram @overcode_agency — we reply within an hour. Or leave your phone/Telegram here and we\'ll reach out. First consultation is free!';
    }
    // Packages
    if (/package|plan|tier|bundle/.test(msg)) {
      return 'We have 3 packages: "Quick Start" from $400 (landing page), "Growth" from $1,100 (site + bot + automation), and "Transformation" from $2,700 (full digital ecosystem). Which sounds closest to what you need?';
    }
    // Default - ask a qualifying question
    return 'Interesting! To give you the best recommendation, tell me a bit about your business. What industry are you in, and what\'s your main challenge right now?';
  }

  // Russian
  // Greetings
  if (messageCount <= 1 || /^(привет|здравст|добр|хай|хей|yo|hi|hello)/.test(msg)) {
    return 'Привет! Я Макс из OVERCODE. Помогаю бизнесам с digital-решениями — сайты, AI-боты, автоматизация. Расскажите, что вас привело?';
  }
  // Pricing
  if (/цен|стои|скольк|прайс|бюджет|дорог|дёшев|дешев/.test(msg)) {
    return 'Проекты начинаются от 25 000 руб за автоматизацию и от 30 000 руб за сайт. Но точная цена зависит от задачи. Расскажите, что за проект — подберу оптимальный вариант.';
  }
  // Timelines
  if (/срок|долго|быстр|время|когда|дедлайн|срочн/.test(msg)) {
    return 'Лендинг делаем за 3-7 дней, полноценный сайт — за 1-3 недели. Например, сайт для Surikov Marketing запустили за 3 дня. А что за проект у вас?';
  }
  // Bots/AI
  if (/бот|ai|чат|ассистент|автоматиз/.test(msg)) {
    return 'Делаем AI-ботов для Telegram, WhatsApp и сайтов — отвечают на вопросы, квалифицируют лиды, записывают клиентов. От 30 000 руб. В какой нише работаете?';
  }
  // Websites
  if (/сайт|лендинг|страниц|магазин|интернет/.test(msg)) {
    return 'Делаем лендинги (от 30 000 руб), многостраничники (от 60 000 руб) и интернет-магазины (от 80 000 руб). Например, для пивоварни сделали сайт с каталогом на 8 страниц. Что вам нужно?';
  }
  // Contact/order
  if (/контакт|связ|написа|позвон|заказ|начать|начн|телеграм/.test(msg)) {
    return 'Отлично! Самый быстрый способ — написать в Telegram @overcode_agency, ответим в течение часа. Или оставьте телефон/Telegram прямо здесь — мы свяжемся. Первая консультация бесплатна!';
  }
  // Packages
  if (/пакет|тариф|комплекс/.test(msg)) {
    return 'У нас 3 пакета: "Быстрый старт" от 30 000 руб (лендинг), "Рост" от 80 000 руб (сайт + бот + автоматизация) и "Трансформация" от 200 000 руб (полная цифровая экосистема). Что ближе к вашей задаче?';
  }
  // Default - qualifying question
  return 'Интересно! Чтобы предложить лучшее решение, расскажите немного о вашем бизнесе. Какая у вас ниша и какую задачу хотите решить?';
}

// ─── TELEGRAM NOTIFICATION ─────────────────────────────────────────────────

async function notifyTelegram(messages: { role: string; content: string }[], botReply: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  // Only notify after 3+ user messages (meaningful conversation)
  const userMessages = messages.filter(m => m.role === 'user');
  if (userMessages.length < 3) return;

  // Check if this looks like a lead (contact info shared)
  const allText = userMessages.map(m => m.content).join(' ').toLowerCase();
  const hasContact = /[@+7\d{10,}|telegram|телеграм|почт|mail|email|whatsapp|вотсап]/.test(allText);
  const hasBusinessInfo = /бизнес|компани|магазин|сайт|бот|автоматиз|лендинг|клиник|салон|кафе|ресторан|business|company|store|site|bot|automat|landing|clinic|salon|cafe|restaurant/.test(allText);

  // Notify if contact shared OR meaningful business discussion
  if (!hasContact && !hasBusinessInfo) return;

  const summary = userMessages.slice(-5).map(m => `• ${m.content.slice(0, 120)}`).join('\n');

  const text = [
    '💬 *Диалог с AI-ботом на сайте*',
    '',
    `📋 *Сообщений от клиента:* ${userMessages.length}`,
    hasContact ? '✅ Клиент оставил контакт!' : '⚠️ Контакт не оставлен',
    '',
    '*Последние сообщения клиента:*',
    summary,
    '',
    '*Последний ответ бота:*',
    botReply.slice(0, 200),
    '',
    `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    });
  } catch { /* silent */ }
}

// ─── API HANDLER ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { messages, lang = 'ru' } = await req.json();
    const isEn = lang === 'en';

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // ── Try Anthropic Claude first ──
    if (anthropicKey) {
      try {
        const claudeMessages = messages.slice(-20).map((m: { role: string; content: string }) => ({
          role: m.role === 'system' ? 'user' : m.role,
          content: m.content,
        }));

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6-20250514',
            max_tokens: 500,
            system: isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_RU,
            messages: claudeMessages,
          }),
        });

        const data = await response.json();

        if (response.ok && data.content?.[0]?.text) {
          const reply = data.content[0].text;
          notifyTelegram(messages, reply).catch(() => {});
          return NextResponse.json({ reply });
        }

        console.error('Claude API error:', data);
      } catch (e) {
        console.error('Claude API exception:', e);
      }
    }

    // ── Fallback to OpenAI / OpenRouter ──
    if (openaiKey) {
      try {
        const isOpenRouter = openaiKey.startsWith('sk-or-');
        const baseUrl = isOpenRouter
          ? 'https://openrouter.ai/api/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const model = isOpenRouter ? 'anthropic/claude-sonnet-4-6' : 'gpt-4o';

        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: isEn ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_RU },
              ...messages.slice(-20),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        const data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          const reply = data.choices[0].message.content;
          notifyTelegram(messages, reply).catch(() => {});
          return NextResponse.json({ reply });
        }

        console.error('OpenAI/OpenRouter API error:', data);
      } catch (e) {
        console.error('OpenAI/OpenRouter exception:', e);
      }
    }

    // ── No API keys or all failed — smart fallback ──
    const lastMsg = messages[messages.length - 1]?.content || '';
    const reply = smartFallback(lastMsg, isEn, messages.length);
    return NextResponse.json({ reply });

  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
