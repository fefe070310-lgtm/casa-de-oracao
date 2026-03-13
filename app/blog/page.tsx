'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'O Poder da Adoração Contínua',
    excerpt: 'Descubra como a adoração 24/7 pode transformar a atmosfera espiritual de uma cidade inteira.',
    category: 'Casa de Oração',
    author: 'Guilherme Gonçalves',
    date: '10 Jul, 2026',
    image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Amor em Ação: Resgatando Vidas nas Ruas',
    excerpt: 'Um relato emocionante sobre a última ação do Jump e as vidas que foram impactadas.',
    category: 'Jump',
    author: 'Geane Gonçalves',
    date: '05 Jul, 2026',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Entendendo o Reino de Deus',
    excerpt: 'Uma introdução aos princípios fundamentais do Reino e como vivê-los no dia a dia.',
    category: 'Ensino',
    author: 'Equipe Casa Jump',
    date: '28 Jun, 2026',
    image: 'https://images.unsplash.com/photo-1511649475664-e5f1d6a9462e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'O Papel da Intercessão na Igreja Local',
    excerpt: 'Por que precisamos de intercessores e como você pode se tornar um.',
    category: 'Casa de Oração',
    author: 'Guilherme Gonçalves',
    date: '15 Jun, 2026',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Blog() {
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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Blog & Conteúdos
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Artigos, devocionais, testemunhos e estudos bíblicos para edificar a sua vida e expandir a sua visão do Reino.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Destaque */}
          <div className="mb-16">
            <div className="bg-black rounded-3xl border border-white/10 overflow-hidden group hover:border-white/30 transition-colors flex flex-col lg:flex-row">
              <div className="relative h-64 lg:h-auto lg:w-1/2 overflow-hidden">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-medium px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
                    {posts[0].category}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar className="w-4 h-4" /> {posts[0].date}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    {posts[0].author}
                  </div>
                  <Link href="#" className="flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors">
                    Ler artigo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="bg-black rounded-3xl border border-white/10 overflow-hidden group hover:border-white/30 transition-colors flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-display leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <Link href="#" className="text-white hover:text-zinc-300 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-white/5 text-white font-medium rounded-full hover:bg-white hover:text-black transition-colors border border-white/10">
              Carregar mais artigos
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
