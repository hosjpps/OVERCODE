'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle, Send, Mail } from 'lucide-react';
import Link from 'next/link';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/lib/language';
import ChatWidget from '@/components/ui/ChatWidget';

type FormData = { name: string; contact: string; task: string; agree: boolean };

export default function CTA() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
    } catch {
      // Still show success to user
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(124,58,237,0.12),transparent_50%),radial-gradient(ellipse_at_70%_70%,rgba(236,72,153,0.08),transparent_50%),radial-gradient(ellipse_at_50%_50%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20 lg:py-[120px] relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16">
          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-purple mb-4">{"// let's talk"}</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.1] text-text-primary mb-4">
            {lang === 'ru' ? 'Готовы начать?' : 'Ready to start?'}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg md:text-xl max-w-[600px] mx-auto">
            {lang === 'ru'
              ? 'Задайте вопрос нашему AI-ассистенту прямо сейчас или свяжитесь напрямую. Первая консультация — бесплатно.'
              : 'Ask our AI assistant a question right now or contact us directly. First consultation is free.'}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch lg:[grid-auto-rows:520px]">
          {/* AI Chat */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass rounded-2xl overflow-hidden h-[400px] lg:h-auto">
            <ChatWidget showHeader={true} className="h-full" />
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 md:p-10 overflow-y-auto">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-xl font-semibold text-text-primary text-center">
                  {lang === 'ru' ? 'Спасибо! Свяжемся в течение часа.' : 'Thank you! We will reach out within an hour.'}
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-bold text-2xl text-text-primary mb-2">
                  {lang === 'ru' ? 'Или оставьте заявку' : 'Or leave a request'}
                </h3>
                <p className="text-text-secondary text-[15px] mb-8">
                  {lang === 'ru' ? 'Свяжемся в течение часа' : 'We will get back to you within an hour'}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {lang === 'ru' ? 'Имя' : 'Name'}
                    </label>
                    <input {...register('name', { required: true, minLength: 2 })} placeholder={lang === 'ru' ? 'Как вас зовут?' : 'What is your name?'} className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{lang === 'ru' ? 'Обязательное поле' : 'Required field'}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {lang === 'ru' ? 'Telegram или телефон' : 'Telegram or phone'}
                    </label>
                    <input {...register('contact', { required: true, minLength: 3 })} placeholder={lang === 'ru' ? '@username или +7...' : '@username or phone number'} className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] ${errors.contact ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'}`} />
                    {errors.contact && <p className="text-red-500 text-xs mt-1">{lang === 'ru' ? 'Обязательное поле' : 'Required field'}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {lang === 'ru' ? 'Кратко опишите задачу' : 'Briefly describe your task'}
                    </label>
                    <textarea {...register('task')} rows={3} placeholder={lang === 'ru' ? 'Нужен лендинг для кофейни...' : 'I need a landing page for...'} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:border-accent-purple focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] resize-none" />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" {...register('agree', { required: true })} className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.05] accent-accent-purple cursor-pointer" />
                    <span className={`text-xs leading-relaxed ${errors.agree ? 'text-red-400' : 'text-text-tertiary group-hover:text-text-secondary'} transition-colors`}>
                      {lang === 'ru' ? (
                        <>Нажимая кнопку, вы соглашаетесь с <Link href="/privacy" className="text-accent-purple hover:underline">Политикой конфиденциальности</Link> и даёте согласие на <Link href="/personal-data" className="text-accent-purple hover:underline">обработку персональных данных</Link></>
                      ) : (
                        <>By clicking the button, you agree to the <Link href="/privacy" className="text-accent-purple hover:underline">Privacy Policy</Link> and consent to <Link href="/personal-data" className="text-accent-purple hover:underline">Personal Data Processing</Link></>
                      )}
                    </span>
                  </label>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer">
                    {isSubmitting
                      ? (lang === 'ru' ? 'Отправляем...' : 'Sending...')
                      : (lang === 'ru' ? 'Отправить' : 'Send')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Contacts */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-8">
            <a href="https://t.me/hosjpps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <Send className="w-5 h-5" />
              <span className="font-medium">Telegram</span>
            </a>
            <a href="mailto:abec_senjuro@mail.ru" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email</span>
            </a>
          </div>
          <p className="text-text-tertiary text-xs mt-4">
            {lang === 'ru' ? 'Обычно отвечаем в течение часа в рабочее время' : 'We usually reply within an hour during business hours'}
          </p>
        </div>
      </div>
    </section>
  );
}
