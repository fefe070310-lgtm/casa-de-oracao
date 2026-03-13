'use client';

import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const eventos = [
  {
    id: 1,
    title: 'Turno de Adoração',
    date: 'Todos os Sábados',
    time: '10:00 - 22:00',
    location: 'Casa de Oração - São José dos Campos',
    type: 'Adoração',
    description: '12 horas ininterruptas de adoração, intercessão e busca pela presença de Deus.',
  },
  {
    id: 2,
    title: 'Culto Dominical',
    date: 'Todos os Domingos',
    time: '10:00',
    location: 'Casa de Oração - São José dos Campos',
    type: 'Culto',
    description: 'Reunião da família para celebração, comunhão e ensino da Palavra.',
  },
  {
    id: 3,
    title: 'Ação Social: Entrega de Agasalhos',
    date: '15 de Julho, 2026',
    time: '19:00',
    location: 'Centro de São José dos Campos',
    type: 'Jump',
    description: 'Ação do Jump para entrega de agasalhos e sopa para pessoas em situação de rua.',
  },
  {
    id: 4,
    title: 'Palestra: Propósito e Vida',
    date: '22 de Julho, 2026',
    time: '09:00',
    location: 'Escola Estadual Central',
    type: 'Jump',
    description: 'Palestra sobre ética, valores e propósito de vida para jovens do ensino médio.',
  },
];

export default function Agenda() {
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
      <section className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-black p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-colors group flex flex-col md:flex-row gap-8 items-start md:items-center">
                
                {/* Data/Hora */}
                <div className="w-full md:w-48 flex-shrink-0 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                  <p className="text-emerald-500 font-bold mb-2">{evento.date}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm">
                    <Clock className="w-4 h-4" /> {evento.time}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      evento.type === 'Adoração' ? 'bg-purple-500/10 text-purple-400' :
                      evento.type === 'Culto' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-orange-500/10 text-orange-400'
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
                  <button className="w-full md:w-auto px-6 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 border border-white/10">
                    Participar <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
