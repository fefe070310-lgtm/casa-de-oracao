'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Heart, PlayCircle, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1920&auto=format&fit=crop"
            alt="Worship Background"
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-zinc-400 font-medium tracking-widest uppercase text-sm mb-4 block">
              São José dos Campos, SP
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-display">
              Transformando Vidas <br className="hidden md:block" />
              através do Reino
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              A Casa de Oração e o Jump são movimentos que caminham juntos com o propósito de levar esperança, adoração e amor prático ao próximo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/casa-de-oracao"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Conheça a Casa <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/jump"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                Conheça o Jump
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Casa de Oração Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Casa de Oração</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Um lugar dedicado à adoração, intercessão e ensino sobre o Reino de Deus. Nossa visão é expandir para um ambiente de adoração contínua, 24 horas por dia, 7 dias por semana.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span>Adoração todos os sábados, das 10h às 22h</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span>Cultos todos os domingos às 10h</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span>Plataforma de ensino com aulas gravadas</span>
                </li>
              </ul>
              <Link
                href="/casa-de-oracao"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors"
              >
                Saiba mais <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop"
                alt="Casa de Oração"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Jump Section */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1593113565630-1de8eb06550a?q=80&w=800&auto=format&fit=crop"
                alt="Projeto Jump"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Projeto Jump</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Há 14 anos, o Jump atua como uma ONG levando esperança, dignidade e propósito para pessoas em diferentes contextos de vulnerabilidade social.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-black p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2">Ação Social</h3>
                  <p className="text-sm text-zinc-400">Visitas a abrigos, presídios e resgate de mulheres em situação de prostituição.</p>
                </div>
                <div className="bg-black p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2">Educação</h3>
                  <p className="text-sm text-zinc-400">Palestras em escolas sobre ética, propósito de vida e valores.</p>
                </div>
                <div className="bg-black p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2">Esporte</h3>
                  <p className="text-sm text-zinc-400">Aulas de luta promovendo disciplina, saúde e transformação pessoal.</p>
                </div>
                <div className="bg-black p-6 rounded-xl border border-white/5">
                  <h3 className="text-white font-semibold mb-2">Sustento</h3>
                  <p className="text-sm text-zinc-400">Bazar solidário que ajuda a manter financeiramente os projetos.</p>
                </div>
              </div>
              <Link
                href="/jump"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors"
              >
                Conheça o impacto <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Faça parte deste movimento</h2>
          <p className="text-zinc-400 text-lg mb-10">
            Seja através da oração, do voluntariado ou de doações, você pode nos ajudar a transformar mais vidas e expandir o Reino de Deus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/voluntario"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Quero ser Voluntário
            </Link>
            <Link
              href="/doacoes"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" /> Fazer uma Doação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
