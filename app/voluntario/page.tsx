'use client';

import { motion } from 'motion/react';
import { HandHeart, Users, Megaphone, Music, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Voluntario() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <HandHeart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Seja um Voluntário
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Junte-se a nós para transformar vidas. Precisamos de pessoas dispostas a servir, amar e construir o Reino de Deus na terra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Onde você pode servir?</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Existem diversas formas de se envolver com a Casa de Oração e o Jump. Encontre a área que mais se alinha com seus dons e paixões.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-800 transition-colors">
                <Users className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">Ação Social (Jump)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Visitas a abrigos, presídios, resgate nas ruas e apoio prático às pessoas em vulnerabilidade.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-800 transition-colors">
                <Music className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">Louvor & Adoração</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Músicos, cantores e técnicos de som para os turnos de adoração da Casa de Oração.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-800 transition-colors">
                <HandHeart className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">Intercessão</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Pessoas dispostas a orar e interceder durante os turnos da Casa de Oração e pelos projetos.
              </p>
            </div>

            <div className="bg-black p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-800 transition-colors">
                <Megaphone className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">Comunicação</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Apoio na criação de conteúdo, redes sociais, fotografia e vídeo para expandir a visão.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="max-w-3xl mx-auto bg-black p-8 md:p-12 rounded-3xl border border-white/10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4 font-display">Inscrição Recebida!</h3>
                <p className="text-zinc-400 text-lg mb-8">
                  Obrigado por se dispor a servir. Nossa equipe entrará em contato com você em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Enviar nova inscrição
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-8 font-display text-center">Preencha o formulário</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-zinc-400 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        id="nome"
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-zinc-400 mb-2">Telefone / WhatsApp</label>
                      <input
                        type="tel"
                        id="telefone"
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-zinc-400 mb-2">Área de Interesse</label>
                      <select
                        id="area"
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                      >
                        <option value="">Selecione uma área...</option>
                        <option value="jump">Ação Social (Jump)</option>
                        <option value="louvor">Louvor & Adoração</option>
                        <option value="intercessao">Intercessão</option>
                        <option value="comunicacao">Comunicação / Mídia</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-zinc-400 mb-2">Por que você quer ser voluntário?</label>
                    <textarea
                      id="mensagem"
                      rows={4}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Conte-nos um pouco sobre você e sua motivação..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    Enviar Inscrição <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
