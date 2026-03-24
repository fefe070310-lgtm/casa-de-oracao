'use client';

import { motion } from 'framer-motion';
import { HandHeart, Users, Megaphone, Music, ArrowRight, CheckCircle2, Heart, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Voluntario() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    area: '',
    mensagem: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.whatsapp,
          interest: `Voluntário: ${formData.area}`,
          message: formData.mensagem
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-amber-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8 border border-amber-500/20">
              Faça parte da nossa história
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight leading-none">
              Seja um <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Voluntário</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              Não chamamos de "trabalho", chamamos de privilégio. <br />
              Use seus talentos para servir ao próximo e construir o Reino.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 font-display">Onde você pode servir?</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
              Existem diversas frentes na Casa de Oração e no Projeto Jump. 
              Encontre o lugar que faz seu coração bater mais forte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: Users, title: 'Projeto Jump', color: 'emerald', desc: 'Resgate nas ruas, presídios e apoio social direto.' },
              { icon: Music, title: 'Louvor', color: 'amber', desc: 'Músicos e técnicos para os turnos de adoração.' },
              { icon: Heart, title: 'Intercessão', color: 'rose', desc: 'Sustento em oração para todos os nossos projetos.' },
              { icon: Megaphone, title: 'Mídia', color: 'blue', desc: 'Fotografia, vídeo, design e redes sociais.' },
            ].map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <area.icon className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-display">{area.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{area.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-6xl font-bold text-white font-display leading-[0.9]">
                 Uma entrega <br /> que transforma
               </h2>
               <p className="text-zinc-400 text-lg leading-relaxed font-light">
                 Ao se tornar um voluntário, você não apenas ajuda os outros; você é transformado. 
                 É no serviço que descobrimos nosso verdadeiro propósito.
               </p>
               <ul className="space-y-4">
                  {[
                    'Treinamento e capacitação contínua',
                    'Comunidade unida e acolhedora',
                    'Impacto direto na vida de centenas de pessoas',
                    'Alegria de servir ao Reino de Deus'
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                       <CheckCircle2 className="w-5 h-5 text-amber-500" />
                       <span className="text-sm font-medium">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative bg-zinc-900/30 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-amber-500">
                       <Star className="w-12 h-12 fill-amber-500" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4 font-display">Inscrição Recebida!</h3>
                    <p className="text-zinc-400 text-lg mb-10 max-w-sm mx-auto">
                      Obrigado por se dispor. Entraremos em contato via WhatsApp nas próximas 48 horas.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-10 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all font-bold"
                    >
                      Enviar nova inscrição
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-8 font-display">Preencha seus dados</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                            placeholder="Nome Completo"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          />
                          <input
                            type="email"
                            required
                            className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                            placeholder="Seu melhor E-mail"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="tel"
                            required
                            className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                            placeholder="WhatsApp (00) 90000-0000"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          />
                          <select
                            required
                            className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          >
                            <option value="" className="bg-zinc-900">Área de Interesse...</option>
                            <option value="projeto-jump" className="bg-zinc-900">Projeto Jump</option>
                            <option value="louvor" className="bg-zinc-900">Louvor & Adoração</option>
                            <option value="intercessao" className="bg-zinc-900">Intercessão</option>
                            <option value="midia" className="bg-zinc-900">Mídia & Design</option>
                            <option value="outros" className="bg-zinc-900">Outros</option>
                          </select>
                        </div>
                        <textarea
                          rows={4}
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all resize-none"
                          placeholder="Fale um pouco sobre seus dons e por que deseja servir..."
                          value={formData.mensagem}
                          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Enviando...' : 'Quero ser Voluntário'}
                        {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
