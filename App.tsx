
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Music, BookOpen, Calendar } from 'lucide-react';
import { fetchDailyQuote } from './services/gemini';
import { DailyQuote, QuoteType } from './types';

const QuoteCard = ({ data, loading, icon: Icon, title, delay }: { 
  data: DailyQuote | null, 
  loading: boolean, 
  icon: any, 
  title: string,
  delay: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
      id={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-100 rounded-xl mt-8"></div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 text-indigo-100" size={48} />
            <p className="text-2xl font-serif italic text-gray-700 leading-relaxed relative z-10">
              "{data.quote}"
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-indigo-300"></div>
            <p className="text-lg font-semibold text-indigo-600">— {data.author}</p>
          </div>

          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen size={14} /> Modern Meaning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {data.summary}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Failed to load inspiration.</p>
      )}
    </motion.div>
  );
};

export default function App() {
  const [quotes, setQuotes] = useState<Record<QuoteType, DailyQuote | null>>({
    [QuoteType.STOIC]: null,
    [QuoteType.INSPIRATIONAL]: null,
    [QuoteType.LYRIC]: null
  });
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [stoic, inspo, lyric] = await Promise.all([
          fetchDailyQuote(QuoteType.STOIC, today),
          fetchDailyQuote(QuoteType.INSPIRATIONAL, today),
          fetchDailyQuote(QuoteType.LYRIC, today)
        ]);
        setQuotes({
          [QuoteType.STOIC]: stoic,
          [QuoteType.INSPIRATIONAL]: inspo,
          [QuoteType.LYRIC]: lyric
        });
      } catch (error) {
        console.error("Error loading quotes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [today]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg shadow-indigo-200"
          >
            <Calendar size={16} />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6"
          >
            Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Inspiration</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            Start your day with wisdom from the ancients, visionaries, and poets. 
            Curated daily to fuel your modern journey.
          </motion.p>
        </header>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <QuoteCard 
            title="Daily Stoicism Quote" 
            data={quotes[QuoteType.STOIC]} 
            loading={loading} 
            icon={BookOpen} 
            delay={0.3}
          />
          <QuoteCard 
            title="Daily Inspiration" 
            data={quotes[QuoteType.INSPIRATIONAL]} 
            loading={loading} 
            icon={Sparkles} 
            delay={0.4}
          />
          <QuoteCard 
            title="Daily Lyric" 
            data={quotes[QuoteType.LYRIC]} 
            loading={loading} 
            icon={Music} 
            delay={0.5}
          />
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm"
        >
          <p>© {new Date().getFullYear()} Daily Inspiration. Powered by Wisdom & AI.</p>
        </motion.footer>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}

