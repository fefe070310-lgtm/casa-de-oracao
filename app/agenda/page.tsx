'use client';

import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
};

export default function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-8 border border-zinc-200">
              <CalendarIcon className="w-8 h-8 text-zinc-900" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 font-display tracking-tight">
              Nossa Agenda
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed font-light mb-10">
              Acompanhe os horários da Casa de Oração, cultos e as próximas ações sociais do projeto Jump.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de Eventos */}
      <section className="py-24 bg-white min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
                <p className="text-zinc-500 font-medium">Carregando eventos...</p>
             </div>
          ) : events.length === 0 ? (
              <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-100">
                <p className="text-zinc-500">Nenhum evento programado para o momento.</p>
              </div>
          ) : (
            <div className="space-y-6">
              {events.map((evento) => (
                <div key={evento.id} className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 hover:border-emerald-500/30 transition-all group flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden shadow-sm hover:shadow-xl shadow-zinc-200/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none" />
                  
                  {/* Data/Hora */}
                  <div className="w-full md:w-48 flex-shrink-0 text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-100 pb-6 md:pb-0 md:pr-6">
                    <p className="text-emerald-600 font-bold mb-2 uppercase tracking-wide">{evento.date}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 text-sm">
                      <Clock className="w-4 h-4" /> {evento.time}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        evento.type === 'Adoração' ? 'bg-amber-500/5 text-amber-600 border border-amber-500/10' :
                        evento.type === 'Culto' ? 'bg-emerald-500/5 text-emerald-600 border border-emerald-500/10' :
                        'bg-blue-500/5 text-blue-600 border border-blue-500/10'
                      }`}>
                        {evento.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 font-display">{evento.title}</h3>
                    <p className="text-zinc-600 leading-relaxed mb-4 text-sm md:text-base">
                      {evento.description}
                    </p>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <MapPin className="w-4 h-4" /> {evento.location}
                    </div>
                  </div>

                  {/* Ação */}
                  <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                    <button className="w-full md:w-auto px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                      Participar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
