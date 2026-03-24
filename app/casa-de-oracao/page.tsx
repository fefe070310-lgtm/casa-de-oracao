'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Users, PlayCircle, ArrowRight, Shield, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CasaDeOracao() {
  return (
    <div className="min-h-screen bg-black selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1920"
            alt="Worship Background"
            fill
            className="object-cover opacity-30 scale-110 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
              Nossa Essência
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 font-display tracking-tight leading-none">
              A Casa de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Oração</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
              Um altar levantado em São José dos Campos focado na adoração, intercessão e ensino do Reino de Deus.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Clock className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-display">Adoração Sábados</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">Das 10h às 22h. Doze horas de busca contínua onde o fogo não se apaga.</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Horário</span>
                  <span className="text-sm font-bold text-white">10:00 - 22:00</span>
                </div>
              </div>
            </motion.div>

            <Link href="/aulas" className="group relative p-10 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <PlayCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-display">Aulas Online</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">Mergulho profundo na Palavra através de nossa plataforma de ensino digital.</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Acesso</span>
                  <span className="text-sm font-bold text-white flex items-center gap-2">Disponível 24/7 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Visão 24/7 */}
      <section className="py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display leading-[0.9]">
                Visão 24/7
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl mb-8 leading-relaxed font-light">
                Acreditamos que a adoração contínua muda a atmosfera de uma cidade. O nosso maior sonho é estabelecer um altar de adoração ininterrupta em São José dos Campos.
              </p>
              
              <div className="space-y-6 mb-12">
                 {[
                   { icon: Shield, text: 'Vigília espiritual sobre a cidade' },
                   { icon: Heart, text: 'Sustento para as ações sociais do Jump' },
                   { icon: Zap, text: 'Lugar de descanso e renovo espiritual' }
                 ].map((li, i) => (
                   <div key={i} className="flex items-center gap-4 text-zinc-300">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                         <li.icon className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-base">{li.text}</span>
                   </div>
                 ))}
              </div>

              <Link
                href="/voluntario"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                Seja um Intercessor <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1475869430886-fb14585f7443?q=80&w=1200"
                  alt="Fogo Contínuo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aulas CTA */}
      <section className="py-32 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[3.5rem] bg-zinc-950 border border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[80px]" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-black border border-emerald-500/20 flex items-center justify-center mx-auto mb-10 shadow-lg shadow-emerald-500/10">
               <PlayCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display">Ensino do Reino</h2>
            <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Acesse nossa plataforma de cursos e mergulhe em módulos preparados para o seu crescimento espiritual e maturidade no Evangelho.
            </p>
            <Link
               href="/aulas"
               className="inline-flex items-center gap-3 px-12 py-5 bg-zinc-900 text-white font-bold rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all"
            >
              Acessar Aulas <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
