'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Clock, BookOpen, Users, PlayCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CasaDeOracao() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1920&auto=format&fit=crop"
            alt="Worship Background"
            fill
            className="object-cover opacity-20"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              A Casa de Oração
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              Um lugar dedicado à adoração, intercessão e ensino do Reino de Deus. Nossa visão é estabelecer um ambiente de adoração contínua, 24 horas por dia, 7 dias por semana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programação */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <Clock className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Adoração aos Sábados</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Todos os sábados, das 10h da manhã às 22h, nos reunimos para um tempo intenso de adoração e busca pela presença de Deus.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <Users className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Cultos Dominicais</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Cultos todos os domingos, às 10h da manhã. Um tempo de comunhão, palavra e celebração em família.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <BookOpen className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Ensino do Reino</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Além dos encontros presenciais, disponibilizamos aulas gravadas sobre o Reino de Deus, organizadas em módulos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visão 24/7 */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Visão 24/7</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Acreditamos que a adoração contínua muda a atmosfera de uma cidade. O nosso maior sonho e visão para o futuro é expandir a Casa de Oração para que funcione 24 horas por dia, 7 dias por semana.
              </p>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Queremos ser um farol de esperança e um altar de adoração ininterrupta em São José dos Campos, sustentando espiritualmente todas as ações sociais do Jump.
              </p>
              <Link
                href="/voluntario"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
              >
                Seja um Intercessor <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1475869430886-fb14585f7443?q=80&w=800&auto=format&fit=crop"
                alt="Fogo Contínuo"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Aulas CTA */}
      <section className="py-24 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PlayCircle className="w-16 h-16 text-white mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Aprofunde-se no Reino</h2>
          <p className="text-zinc-400 text-lg mb-10">
            Acesse nossa plataforma de ensino com aulas gravadas sobre o Reino de Deus, organizadas em módulos de aprendizado para o seu crescimento espiritual.
          </p>
          <Link
            href="/aulas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors"
          >
            Acessar Plataforma de Ensino
          </Link>
        </div>
      </section>
    </div>
  );
}
