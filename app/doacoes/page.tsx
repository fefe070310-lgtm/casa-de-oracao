'use client';

import { motion } from 'motion/react';
import { Heart, CreditCard, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Doacoes() {
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
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Semeie neste Movimento
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Sua doação sustenta a Casa de Oração e as ações sociais do Jump, transformando vidas e expandindo o Reino de Deus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opções de Doação */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* PIX */}
            <div className="bg-black p-10 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-8 relative z-10">
                <Smartphone className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-display relative z-10">Doação via PIX</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 relative z-10">
                A forma mais rápida e direta de contribuir. O valor cai na hora e ajuda imediatamente nos projetos.
              </p>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 relative z-10 mb-8">
                <p className="text-sm text-zinc-500 mb-2 font-medium">Chave PIX (CNPJ)</p>
                <p className="text-xl text-white font-mono font-bold tracking-wider">00.000.000/0001-00</p>
                <p className="text-sm text-zinc-500 mt-2">Associação Casa Jump</p>
              </div>
              <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-colors relative z-10">
                Copiar Chave PIX
              </button>
            </div>

            {/* Cartão / Recorrente */}
            <div className="bg-black p-10 rounded-3xl border border-white/10 hover:border-white/30 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-8 relative z-10">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-display relative z-10">Doação Mensal</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 relative z-10">
                Torne-se um mantenedor do projeto. Sua doação recorrente nos ajuda a planejar e expandir nossas ações a longo prazo.
              </p>
              
              <div className="space-y-4 mb-8 relative z-10">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-left">
                  <span className="text-white font-medium">Semente (R$ 50/mês)</span>
                  <ArrowRight className="w-5 h-5 text-zinc-500" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-left">
                  <span className="text-white font-medium">Fruto (R$ 100/mês)</span>
                  <ArrowRight className="w-5 h-5 text-zinc-500" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-left">
                  <span className="text-white font-medium">Colheita (Outro valor)</span>
                  <ArrowRight className="w-5 h-5 text-zinc-500" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-16 h-16 text-zinc-600 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-6 font-display">Transparência e Segurança</h2>
          <p className="text-zinc-400 text-lg mb-10">
            Levamos a sério a administração dos recursos que Deus nos confia através da sua vida. Todos os valores arrecadados são destinados integralmente para a manutenção da Casa de Oração, projetos sociais do Jump e expansão do Reino.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium border-b border-zinc-600 hover:border-white pb-1"
          >
            Fale conosco para dúvidas sobre doações
          </Link>
        </div>
      </section>
    </div>
  );
}
