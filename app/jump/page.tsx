'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { HeartHandshake, Shield, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Jump() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920&auto=format&fit=crop"
            alt="Jump Background"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Há 14 anos transformando vidas
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              O Projeto Jump
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              O Jump é uma ONG que atua levando esperança, dignidade e propósito para pessoas em diferentes contextos de vulnerabilidade na sociedade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Nossas Frentes de Ação</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Atuamos onde a necessidade é maior, levando não apenas palavras, mas ações concretas de amor e restauração.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <HeartHandshake className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Resgate e Apoio</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Visitas a abrigos, trabalho em presídios e apoio a mulheres em situação de prostituição. Já conseguimos retirar mais de 15 mulheres das ruas, oferecendo apoio para reconstruir suas vidas.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <GraduationCap className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Palestras nas Escolas</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Levamos conscientização para jovens e adolescentes, abordando temas cruciais como ética, propósito de vida e valores morais.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-zinc-800 transition-colors">
                <Shield className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Aulas de Luta</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Utilizamos o esporte como ferramenta de transformação social, promovendo disciplina, saúde física e mental, e desenvolvimento pessoal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop"
                alt="Impacto Social"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-white mb-2 font-display">+15</div>
                <div className="text-zinc-300">Mulheres retiradas da prostituição e com vidas transformadas.</div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">O Amor na Prática</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Acreditamos que o Evangelho não se resume a palavras, mas a poder e ação. O Jump é a extensão prática da Casa de Oração, levando a presença de Deus para os lugares mais escuros da sociedade.
              </p>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Cada vida restaurada é um testemunho do poder transformador do amor. E nós estamos apenas começando.
              </p>
              <Link
                href="/voluntario"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
              >
                Quero ser Voluntário <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
