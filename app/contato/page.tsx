'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2, Send, Globe, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          interest: formData.assunto,
          message: formData.mensagem,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      } else {
        alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
      }
    } catch (error) {
      alert('Erro inesperado. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-600 text-xs font-bold uppercase tracking-widest mb-8 border border-cyan-500/10">
              Estamos aqui para ouvir você
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 font-display tracking-tight leading-none">
              Entre em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">Contato</span>
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed font-light">
              Tire suas dúvidas, proponha parcerias ou compartilhe seu testemunho. 
              Sua voz é fundamental para nossa comunidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar Information */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-zinc-100 hover:border-cyan-500/20 transition-all shadow-sm hover:shadow-xl shadow-zinc-200/50">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 font-display">Localização</h3>
                    <p className="text-zinc-500 text-base leading-relaxed">
                      São José dos Campos, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-zinc-100 hover:border-emerald-500/20 transition-all shadow-sm hover:shadow-xl shadow-zinc-200/50">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 font-display">Email</h3>
                    <p className="text-zinc-500 text-base leading-relaxed">
                      contato@casadeoracao.org.br
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-zinc-100 hover:border-blue-500/20 transition-all shadow-sm hover:shadow-xl shadow-zinc-200/50">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 font-display">WhatsApp</h3>
                    <p className="text-zinc-500 text-base leading-relaxed">
                      (12) 99999-9999
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-white border border-zinc-100 relative overflow-hidden group shadow-xl shadow-zinc-200/50"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -mr-8 -mt-8" />
                <div className="flex items-center gap-4 mb-8">
                  <Clock className="w-8 h-8 text-cyan-600" />
                  <h3 className="text-2xl font-bold text-zinc-900 font-display">Horários</h3>
                </div>
                 <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm border-b border-zinc-50 pb-4">
                    <span className="text-zinc-400">Administrativo</span>
                    <span className="text-zinc-900 font-medium">09h — 18h</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-zinc-50 pb-4">
                    <span className="text-zinc-400">Casa de Oração (Sáb)</span>
                    <span className="text-zinc-900 font-medium">10h — 22h</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Culto (Dom)</span>
                    <span className="text-zinc-900 font-medium">A partir das 10h</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
             <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 relative shadow-2xl shadow-zinc-200/60">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                     <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-4xl font-bold text-zinc-900 mb-4 font-display">Mensagem Enviada!</h3>
                    <p className="text-zinc-600 text-lg mb-10 max-w-sm mx-auto">
                      Agradecemos o seu contato. Nossa equipe responderá em até 24 horas úteis.
                    </p>
                     <button
                      onClick={() => setSubmitted(false)}
                      className="px-10 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                      Enviar nova mensagem
                    </button>
                  </motion.div>
                ) : (
                  <>
                     <div className="mb-12">
                      <h3 className="text-3xl font-bold text-zinc-900 mb-4 font-display">Envie sua Mensagem</h3>
                      <p className="text-zinc-500 font-light">Preencha os campos abaixo e entraremos em contato.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Nome Completo</label>
                           <input
                            type="text"
                            id="nome"
                            required
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-400"
                            placeholder="Ex: João Silva"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          />
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Seu melhor E-mail</label>
                           <input
                            type="email"
                            id="email"
                            required
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-400"
                            placeholder="voce@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="assunto" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Assunto da Mensagem</label>
                         <select
                          id="assunto"
                          required
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                          value={formData.assunto}
                          onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        >
                          <option value="" className="bg-white">Selecione uma opção...</option>
                          <option value="duvida" className="bg-white">Dúvida Geral</option>
                          <option value="parceria" className="bg-white">Parceria / Apoio</option>
                          <option value="doacao" className="bg-white">Dúvidas sobre Doações</option>
                          <option value="voluntariado" className="bg-white">Quero ser Voluntário</option>
                          <option value="testemunho" className="bg-white">Compartilhar Testemunho</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Sua Mensagem</label>
                         <textarea
                          id="mensagem"
                          required
                          rows={6}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:border-cyan-500/50 transition-all resize-none placeholder:text-zinc-400"
                          placeholder="Como podemos ajudar?"
                          value={formData.mensagem}
                          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-cyan-500/20 group"
                      >
                        {loading ? 'Processando...' : (
                          <>
                            Enviar Mensagem 
                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or CTA Section */}
       <section className="py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <Globe className="w-12 h-12 text-zinc-300 mx-auto mb-8" />
           <h2 className="text-3xl font-bold text-zinc-900 mb-6 font-display">Uma comunidade sem fronteiras</h2>
           <p className="text-zinc-400 max-w-2xl mx-auto">
             Mesmo em São José dos Campos, nossa visão alcança as nações. 
             Estamos conectados com casas de oração ao redor do globo.
           </p>
        </div>
      </section>
    </div>
  );
}
