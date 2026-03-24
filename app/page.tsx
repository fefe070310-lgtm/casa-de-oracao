'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar, Heart, PlayCircle, Users, Quote, Globe, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-black relative selection:bg-red-500/30 selection:text-red-200">
      
      <div className="relative z-10 font-sans">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Layer mit Bild - APENAS PARA HERO */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.2], [0.6, 0.4]),
                scale: shouldReduceMotion ? 1 : backgroundScale 
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/home-bg.jpg"
                alt="Background"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay suave apenas para garantir legibilidade, mas sem o gradiente pesado anterior */}
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
          >
            <div className="flex justify-center mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-widest uppercase"
              >
                <Sparkles className="w-3 h-3" /> São José dos Campos, SP
              </motion.span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter font-display leading-[0.9]">
              Transformando <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Vidas
              </span> através do <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Reino
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-zinc-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              A Casa de Oração e o Projeto Jump são movimentos que levam esperança, adoração e amor prático ao próximo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/casa-de-oracao"
                className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                Conheça a Casa <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jump"
                className="w-full sm:w-auto px-10 py-5 bg-black/40 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-black/50"
              >
                Conheça o Jump
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Quote Section */}
        <section className="py-20 flex justify-center bg-zinc-950 border-t border-white/5">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="max-w-3xl px-6 text-center"
           >
              <Quote className="w-12 h-12 text-zinc-800 mx-auto mb-8" />
              <h2 className="text-2xl md:text-4xl italic font-light text-zinc-300 leading-snug">
                "Nossa visão é expandir para um ambiente de adoração contínua, 24 horas por dia, 7 dias por semana."
              </h2>
           </motion.div>
        </section>

        {/* Casa de Oração & Jump Split Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Card: Casa de Oração */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[600px] flex flex-col justify-end p-8 md:p-12 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/50"
          >
            <Image
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200"
              alt="Casa de Oração"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Casa de Oração</h3>
              <p className="text-zinc-300 text-lg mb-8 max-w-md leading-relaxed">
                Um lugar de adoração, intercessão e ensino sobre o Reino de Deus. Buscando a presença de Deus sem limites.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                   <Calendar className="w-5 h-5 text-red-500" />
                   <span>Sábados: 10h às 22h</span>
                </div>
              </div>

              <Link
                href="/casa-de-oracao"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all"
              >
                Explorar Agenda <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card: Projeto Jump */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[600px] flex flex-col justify-end p-8 md:p-12 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/50"
          >
            <Image
              src="https://images.unsplash.com/photo-1593113565630-1de8eb06550a?q=80&w=1200"
              alt="Projeto Jump"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Mais que Social</h3>
              <p className="text-zinc-300 text-lg mb-8 max-w-md leading-relaxed">
                Há 14 anos, transformando realidades através do amor prático, educação e resgate da dignidade humana.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {['Resgate Social', 'Educação', 'Esporte'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/jump"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white font-medium hover:bg-red-600 hover:border-red-600 transition-all font-bold"
              >
                Ver Impacto Social <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-black overflow-hidden relative border-y border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.05),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { label: 'Anos de História', value: '14+' },
              { label: 'Vidas Alcançadas', value: '10k+' },
              { label: 'Voluntários', value: '200+' },
              { label: 'Projetos Ativos', value: '12' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black text-white mb-2 font-display">{stat.value}</div>
                <div className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banners */}
        <section className="py-32 px-4 bg-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CTA 1: Bazar */}
            <Link href="/bazar" className="group relative h-80 rounded-[2rem] overflow-hidden border border-white/5">
                <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800" alt="Bazar" fill className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h4 className="text-2xl font-bold text-white mb-2">Bazar Solidário</h4>
                   <p className="text-zinc-400 text-sm mb-4">Compre e ajude a manter nossos projetos sociais.</p>
                   <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">Explorar <ArrowRight className="w-4 h-4" /></span>
                </div>
            </Link>

            {/* CTA 2: Doações (Main) */}
            <Link href="/doacoes" className="group relative h-80 rounded-[2rem] overflow-hidden border border-red-500/20 bg-red-500/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent)]" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                   <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-xl shadow-red-600/50 group-hover:scale-110 transition-transform">
                      <Heart className="w-8 h-8 text-white fill-white" />
                   </div>
                   <h4 className="text-3xl font-bold text-white mb-4">Seja um Mantenedor</h4>
                   <p className="text-zinc-400 text-sm max-w-[200px]">Sua doação transforma vidas e sustenta o Reino.</p>
                </div>
            </Link>

            {/* CTA 3: Voluntariado */}
            <Link href="/voluntario" className="group relative h-80 rounded-[2rem] overflow-hidden border border-white/5">
                <Image src="https://images.unsplash.com/photo-1559027615-cd943b355227?q=80&w=800" alt="Voluntário" fill className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h4 className="text-2xl font-bold text-white mb-2">Seja Voluntário</h4>
                   <p className="text-zinc-400 text-sm mb-4">Use seus dons para servir à comunidade.</p>
                   <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">Participar <ArrowRight className="w-4 h-4" /></span>
                </div>
            </Link>
          </div>
        </section>

        {/* Footer info/map placeholder */}
        <section className="py-32 border-t border-white/5 bg-zinc-950">
           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display">Onde nos <br /> encontrar?</h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
                         <Globe className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-bold">Endereço</h5>
                        <p className="text-zinc-400 text-sm md:text-base">
                          av.Fusanobu Yokota, 271 - Jardim Terras do Sul<br />
                          São José dos Campos - SP, 12236-075
                        </p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
                         <PlayCircle className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h5 className="text-white font-bold">Plataforma Digital</h5>
                        <p className="text-zinc-400">Acesse nossas aulas e reuniões online<br />em nossa plataforma exclusiva.</p>
                      </div>
                   </div>
                </div>
              </div>
              <Link 
                href="https://www.google.com/maps/search/?api=1&query=av.Fusanobu+Yokota,+271+-+Jardim+Terras+do+Sul,+S%C3%A3o+Jos%C3%A9+dos+Campos+-+SP,+12236-075"
                target="_blank"
                className="relative h-96 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl group block"
              >
                 <Image src="/images/map-globe.png" alt="Localização - Global" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <span className="px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all">Abrir Google Maps</span>
                 </div>
              </Link>
           </div>
        </section>

      </div>
    </div>
  );
}
