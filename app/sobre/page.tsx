'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 mb-6 font-display tracking-tight">
              Nossa História
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
              A Casa de Oração e o Jump são movimentos que caminham juntos com o propósito de transformar vidas através do Reino de Deus, da adoração e do amor prático ao próximo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fundadores */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="relative w-full aspect-square md:aspect-[4/5] max-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl shadow-red-600/10">
              <Image
                src="/fundadores.jpg"
                alt="Guilherme e Geane Gonçalves"
                fill
                className="object-cover transition-all duration-1000 scale-105 hover:scale-100"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 md:mb-6 font-display mt-6 md:mt-0">Os Fundadores</h2>
              <p className="text-zinc-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Os projetos foram fundados por <strong>Guilherme Jorge Gonçalves</strong> e <strong>Geane de Andrade Gonçalves</strong>, na cidade de São José dos Campos, em São Paulo, no Brasil.
              </p>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                Com uma visão clara de que o amor de Deus deve ser demonstrado tanto na adoração contínua quanto no serviço prático à comunidade, eles iniciaram o Jump há 14 anos e, mais recentemente, a Casa de Oração.
              </p>
              
              <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 mt-12">
                <h3 className="text-xl font-semibold text-zinc-900 mb-4">Nossa Visão Central</h3>
                <p className="text-zinc-600 italic">
                  &quot;Que todas as pessoas conheçam o Reino de Deus e que, através desse conhecimento, seja possível formar uma sociedade mais saudável, com valores, propósito e esperança.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / Projetos */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="border border-zinc-100 rounded-3xl p-8 md:p-10 bg-white hover:bg-zinc-50 transition-colors shadow-sm">
              <div className="text-zinc-400 font-mono text-sm mb-4">HÁ 14 ANOS</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 font-display">O Início do Jump</h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                O Jump nasceu como uma ONG focada na transformação de vidas e no cuidado com pessoas em situações vulneráveis. Desde o início, o foco foi ir onde poucos vão: abrigos, presídios e ruas.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  Resgate de mulheres na prostituição
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  Palestras em escolas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  Aulas de luta e disciplina
                </li>
              </ul>
            </div>

            <div className="border border-zinc-100 rounded-3xl p-8 md:p-10 bg-white hover:bg-zinc-50 transition-colors shadow-sm">
              <div className="text-zinc-400 font-mono text-sm mb-4">ESTE ANO</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 font-display">A Casa de Oração</h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Nasceu com o objetivo de ser um lugar dedicado à adoração, intercessão e ensino do Reino de Deus. O alicerce espiritual que sustenta todas as ações práticas do Jump.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  Adoração aos sábados (10h às 22h)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
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
