'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function Sobre() {
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
              Nossa História
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              A Casa de Oração e o Jump são movimentos que caminham juntos com o propósito de transformar vidas através do Reino de Deus, da adoração e do amor prático ao próximo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fundadores */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511649475664-e5f1d6a9462e?q=80&w=800&auto=format&fit=crop"
                alt="Fundadores"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Os Fundadores</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Os projetos foram fundados por <strong>Guilherme Jorge Gonçalves</strong> e <strong>Geane de Andrade Gonçalves</strong>, na cidade de São José dos Campos, em São Paulo, no Brasil.
              </p>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Com uma visão clara de que o amor de Deus deve ser demonstrado tanto na adoração contínua quanto no serviço prático à comunidade, eles iniciaram o Jump há 14 anos e, mais recentemente, a Casa de Oração.
              </p>
              
              <div className="bg-black p-8 rounded-2xl border border-white/5 mt-12">
                <h3 className="text-xl font-semibold text-white mb-4">Nossa Visão Central</h3>
                <p className="text-zinc-400 italic">
                  &quot;Que todas as pessoas conheçam o Reino de Deus e que, através desse conhecimento, seja possível formar uma sociedade mais saudável, com valores, propósito e esperança.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / Projetos */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-white/10 rounded-3xl p-10 bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors">
              <div className="text-zinc-500 font-mono text-sm mb-4">HÁ 14 ANOS</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">O Início do Jump</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                O Jump nasceu como uma ONG focada na transformação de vidas e no cuidado com pessoas em situações vulneráveis. Desde o início, o foco foi ir onde poucos vão: abrigos, presídios e ruas.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Resgate de mulheres na prostituição
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Palestras em escolas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Aulas de luta e disciplina
                </li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-3xl p-10 bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors">
              <div className="text-zinc-500 font-mono text-sm mb-4">ESTE ANO</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">A Casa de Oração</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Nasceu com o objetivo de ser um lugar dedicado à adoração, intercessão e ensino do Reino de Deus. O alicerce espiritual que sustenta todas as ações práticas do Jump.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Adoração aos sábados (10h às 22h)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Cultos aos domingos (10h)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  Plataforma de ensino online
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
