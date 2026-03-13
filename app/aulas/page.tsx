'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { PlayCircle, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const modulos = [
  {
    id: 1,
    title: 'Fundamentos do Reino',
    description: 'Compreenda as bases do Reino de Deus e como ele opera na terra.',
    aulas: 5,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Identidade e Propósito',
    description: 'Descubra quem você é em Cristo e qual o seu chamado.',
    aulas: 8,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Vida de Oração',
    description: 'Aprenda a desenvolver uma vida de intimidade e intercessão.',
    aulas: 6,
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Transformação Social',
    description: 'Como o amor prático transforma cidades e nações.',
    aulas: 4,
    image: 'https://images.unsplash.com/photo-1593113565630-1de8eb06550a?q=80&w=600&auto=format&fit=crop',
  },
];

export default function Aulas() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Plataforma de Ensino
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Acesse aulas gravadas sobre o Reino de Deus, organizadas em módulos de aprendizado para o seu crescimento espiritual.
            </p>
            <Link
              href="/membros"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Acessar minha conta <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Módulos Disponíveis</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Conheça os temas abordados em nossa plataforma. Faça login para acessar o conteúdo completo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modulos.map((modulo) => (
              <div key={modulo.id} className="bg-black rounded-3xl border border-white/5 overflow-hidden group hover:border-white/20 transition-colors">
                <div className="relative h-64 w-full">
                  <Image
                    src={modulo.image}
                    alt={modulo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" /> {modulo.aulas} aulas
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">{modulo.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {modulo.description}
                  </p>
                  <Link
                    href="/membros"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                  >
                    <Lock className="w-4 h-4" /> Faça login para assistir
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
