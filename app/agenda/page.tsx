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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8 border border-white/20">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Nossa Agenda
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Acompanhe os horários da Casa de Oração, cultos e as próximas ações sociais do projeto Jump.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de Eventos */}
      <section className="py-24 bg-zinc-950 min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
                <p className="text-zinc-500 font-medium">Carregando eventos...</p>
             </div>
          ) : events.length === 0 ? (
             <div className="text-center py-20 bg-black/50 rounded-3xl border border-white/5">
                <p className="text-zinc-500">Nenhum evento programado para o momento.</p>
             </div>
          ) : (
            <div className="space-y-6">
              {events.map((evento) => (
                <div key={evento.id} className="bg-black p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-colors group flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none" />
                  
                  {/* Data/Hora */}
                  <div className="w-full md:w-48 flex-shrink-0 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                    <p className="text-emerald-500 font-bold mb-2 uppercase tracking-wide">{evento.date}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm">
                      <Clock className="w-4 h-4" /> {evento.time}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        evento.type === 'Adoração' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        evento.type === 'Culto' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {evento.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{evento.title}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-4 text-sm md:text-base">
                      {evento.description}
                    </p>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <MapPin className="w-4 h-4" /> {evento.location}
                    </div>
                  </div>

                  {/* Ação */}
                  <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                    <button className="w-full md:w-auto px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
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
