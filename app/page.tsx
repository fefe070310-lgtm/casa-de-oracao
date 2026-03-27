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
    <div ref={containerRef} className="flex flex-col w-full bg-[#fcfcfc] relative selection:bg-red-500/30 selection:text-red-900">
      
      <div className="relative z-10 font-sans">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex items-center justify-center py-16 md:py-20 overflow-hidden bg-white">
          {/* Background Layer with Whiteboard Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.2]),
                scale: shouldReduceMotion ? 1 : backgroundScale 
              }}
              className="relative w-full h-full"
            >
              {/* Base Branca para o Blend Mode funcionar corretamente */}
              <div className="absolute inset-0 bg-white" />
              
              {/* Imagem com Blend Multiply e Opacidade Reduzida */}
              <Image
                src="/quadro-oracoes.jpg"
                alt="Pedidos de Oração"
                fill
                className="object-cover object-left md:object-center opacity-[0.4] md:opacity-[0.6] mix-blend-multiply contrast-125 saturate-150"
                priority
              />

              {/* Gradient Radial para proteger a área central onde entra o H1 */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_60%,rgba(255,255,255,0)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-4 text-center relative z-10 w-full"
          >
            <div className="flex justify-center mb-6 md:mb-8 mt-12 md:mt-0">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] md:text-sm font-bold tracking-widest uppercase backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> São José dos Campos, SP
              </motion.span>
            </div>
            
            <h1 className="text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-[6rem] lg:leading-[1] font-black text-zinc-900 mb-6 md:mb-8 tracking-tighter font-display drop-shadow-sm">
              Transformando{' '}
              <span className="text-zinc-800 bg-clip-text">
                Vidas
              </span>
              <br className="hidden sm:block" />{' '}
              <span className="block sm:inline mt-1 sm:mt-0 text-[1.85rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] text-zinc-700 font-bold">
                através do
              </span>{' '}
              <span className="block sm:inline mt-1 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                Reino
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-zinc-800 mb-10 md:mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm px-2 sm:px-4">
              A Casa de Oração e o Projeto Jump são movimentos combinados que levam adoração contínua, esperança e amor prático ao próximo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[280px] sm:max-w-none mx-auto">
              <Link
                href="/casa-de-oracao"
                className="group relative w-full sm:w-[240px] px-8 py-4 md:py-5 bg-white text-zinc-950 font-bold rounded-2xl md:rounded-[1.25rem] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-zinc-200/50 text-sm md:text-base border border-zinc-300"
              >
                Conheça a Casa <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jump"
                className="group w-full sm:w-[240px] px-8 py-4 md:py-5 bg-red-600 text-white font-bold rounded-2xl md:rounded-[1.25rem] border border-red-500 hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_40px_rgba(239,68,68,0.2)] text-sm md:text-base"
              >
                Conheça o Jump <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Quote Section */}
        <section className="py-16 md:py-20 flex justify-center bg-white border-t border-zinc-100">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="max-w-3xl px-6 text-center"
           >
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-zinc-100 mx-auto mb-6 md:mb-8" />
              <h2 className="text-xl sm:text-2xl md:text-4xl italic font-light text-zinc-800 leading-snug">
                "Nossa visão é expandir para um ambiente de adoração contínua, 24 horas por dia, 7 dias por semana."
              </h2>
           </motion.div>
        </section>

        {/* Casa de Oração & Jump Split Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card: Casa de Oração */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-square lg:aspect-[4/5] max-h-[550px] flex flex-col justify-end p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50"
          >
            <Image
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200"
              alt="Casa de Oração"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 font-display">Casa de Oração</h3>
              <p className="text-zinc-300 text-sm lg:text-base mb-6 max-w-md leading-relaxed hidden sm:block">
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
            className="group relative aspect-square lg:aspect-[4/5] max-h-[550px] flex flex-col justify-end p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50 bg-zinc-950"
          >
            {/* Logo com Blend Mode Ampliado e Vermelho */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full opacity-25 group-hover:opacity-40 transition-all duration-700 mix-blend-screen">
                <Image
                  src="/images/jump-logo-crown.png"
                  alt="Projeto Jump Logo"
                  fill
                  className="object-cover object-center grayscale invert brightness-[0.8] scale-110 group-hover:scale-125 transition-transform duration-1000"
                />
                {/* Camada de cor vermelha para a coroa */}
                <div className="absolute inset-0 bg-red-600 mix-blend-multiply" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display">Mais que Social</h3>
              <p className="text-zinc-300 text-sm md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed hidden sm:block">
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
        <section className="py-20 md:py-32 bg-zinc-50 overflow-hidden relative border-y border-zinc-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.03),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
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
                <div className="text-4xl md:text-6xl font-black text-zinc-900 mb-2 font-display">{stat.value}</div>
                <div className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banners */}
        <section className="py-20 md:py-32 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CTA 1: Bazar */}
            <Link href="/bazar" className="group relative h-80 rounded-[2rem] overflow-hidden border border-zinc-100 shadow-lg bg-white">
                <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800" alt="Bazar" fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h4 className="text-2xl font-bold text-zinc-900 mb-2">Bazar Solidário</h4>
                   <p className="text-zinc-600 text-sm mb-4">Compre e ajude a manter nossos projetos sociais.</p>
                   <span className="text-zinc-900 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Explorar <ArrowRight className="w-4 h-4 text-emerald-600" /></span>
                </div>
            </Link>

            {/* CTA 2: Doações (Main) */}
            <Link href="/doacoes" className="group relative h-80 rounded-[2rem] overflow-hidden border border-rose-100 bg-white shadow-xl shadow-rose-100/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.05),transparent)]" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                   <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center mb-6 shadow-xl shadow-rose-600/30 group-hover:scale-110 transition-transform">
                      <Heart className="w-8 h-8 text-white fill-white" />
                   </div>
                   <h4 className="text-3xl font-bold text-zinc-900 mb-4">Seja um Mantenedor</h4>
                   <p className="text-zinc-600 text-sm max-w-[200px]">Sua doação transforma vidas e sustenta o Reino.</p>
                </div>
            </Link>

            {/* CTA 3: Voluntariado */}
            <Link href="/voluntario" className="group relative h-80 rounded-[2rem] overflow-hidden border border-zinc-100 shadow-lg bg-white">
                <Image src="/images/voluntarios.jpg" alt="Voluntários da Casa de Oração" fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h4 className="text-2xl font-bold text-zinc-900 mb-2">Seja Voluntário</h4>
                   <p className="text-zinc-600 text-sm mb-4">Use seus dons para servir à comunidade.</p>
                   <span className="text-zinc-900 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Participar <ArrowRight className="w-4 h-4 text-amber-600" /></span>
                </div>
            </Link>
          </div>
        </section>

        {/* Footer info/map placeholder */}
        <section className="py-20 md:py-32 border-t border-zinc-100 bg-white">
           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-6xl font-bold text-zinc-900 mb-8 font-display">Onde nos <br className="hidden sm:block" /> encontrar?</h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
                         <Globe className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h5 className="text-zinc-900 font-bold">Endereço</h5>
                        <p className="text-zinc-600 text-sm md:text-base">
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
                        <h5 className="text-zinc-900 font-bold">Plataforma Digital</h5>
                        <p className="text-zinc-600">Acesse nossas aulas e reuniões online<br />em nossa plataforma exclusiva.</p>
                      </div>
                   </div>
                </div>
              </div>
              <Link 
                href="https://www.google.com/maps/search/?api=1&query=av.Fusanobu+Yokota,+271+-+Jardim+Terras+do+Sul,+S%C3%A3o+Jos%C3%A9+dos+Campos+-+SP,+12236-075"
                target="_blank"
                className="relative h-96 rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl group block"
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
