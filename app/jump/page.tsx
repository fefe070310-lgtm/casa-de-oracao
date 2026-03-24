'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartHandshake, Shield, GraduationCap, ArrowRight, Star, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Jump() {
  return (
    <div className="min-h-screen bg-black selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:min-h-[60vh] flex items-center overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920"
            alt="Jump Background"
            fill
            className="object-cover opacity-20 scale-110 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Impacto Real há 14 anos
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 font-display tracking-tight leading-none">
              Projeto <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Jump</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl px-2">
              Uma ONG dedicada a restaurar dignidade e propósito para vidas em contextos de vulnerabilidade através do amor prático.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-display">Nossas Frentes</h2>
            <p className="text-zinc-400 text-base md:text-xl font-light">
              Levamos o Reino onde a necessidade é maior, transformando dor em propósito e exclusão em pertencimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: HeartHandshake, 
                title: 'Resgate e Apoio', 
                desc: 'Apoio a mulheres em situação de prostituição. Mais de 15 vidas retiradas das ruas e restauradas.',
                color: 'emerald'
              },
              { 
                icon: GraduationCap, 
                title: 'Educação e Valores', 
                desc: 'Palestras de conscientização para jovens sobre ética, propósito e valores imutáveis.',
                color: 'cyan'
              },
              { 
                icon: Shield, 
                title: 'Transformação via Esporte', 
                desc: 'Aulas de luta como ferramenta de disciplina, saúde mental e resgate da auto-estima.',
                color: 'amber'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/5 hover:border-emerald-500/20 transition-all duration-500"
              >
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-black border border-white/10 flex items-center justify-center mx-auto mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <item.icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 md:mb-6 font-display">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto / Story Section */}
      <section className="py-16 md:py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <div className="relative group order-last lg:order-first">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-[450px] md:h-[650px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200"
                  alt="Impacto Social"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Impact Overlay Card */}
                <div className="absolute bottom-10 left-10 right-10 bg-black/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                     <Star className="w-8 h-8 text-emerald-500 fill-emerald-500" />
                     <div className="text-4xl font-black text-white font-display">+15</div>
                  </div>
                  <div className="text-zinc-300 text-lg">Vidas de mulheres totalmente restauradas e reintegradas à sociedade.</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 font-display leading-[0.9]">
                O Amor <br className="hidden sm:block" /> na Prática
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl mb-8 leading-relaxed font-light">
                O Jump é a extensão prática da Casa de Oração. Não levamos apenas palavras; levamos o Reino em forma de socorro, pão, instrução e abraço.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                 {[
                   { icon: Target, title: 'Prisão', text: 'Presença onde poucos ousam ir.' },
                   { icon: Zap, title: 'Resgate', text: 'Liberdade para os cativos sociais.' }
                 ].map((box, i) => (
                   <div key={i} className="space-y-3">
                      <box.icon className="w-8 h-8 text-emerald-500" />
                      <h5 className="text-white font-bold">{box.title}</h5>
                      <p className="text-zinc-500 text-sm">{box.text}</p>
                   </div>
                 ))}
              </div>

              <Link
                href="/voluntario"
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-black font-bold rounded-2xl transition-all hover:bg-emerald-400 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                Quero ser Voluntário <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-20 md:py-32 px-4 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto text-center">
           <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 font-display">Toda ajuda importa</h3>
           <p className="text-zinc-400 text-base md:text-xl mb-10 md:mb-12 font-light">
             Seja como voluntário ou através de doações para o bazar, você é parte crucial dessa engrenagem de transformação social.
           </p>
           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6">
              <Link href="/doacoes" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3">
                 Fazer uma Doação <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/bazar" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-center">
                 Conhecer o Bazar
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
