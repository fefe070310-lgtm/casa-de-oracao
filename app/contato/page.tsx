'use client';

import { motion } from 'motion/react';
import { Mail, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contato() {
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
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Fale Conosco
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Estamos aqui para ouvir você. Entre em contato para dúvidas, parcerias, ou para saber mais sobre nossos projetos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Informações e Formulário */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Infos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 font-display">Informações de Contato</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">Endereço</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      São José dos Campos, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">E-mail</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      contato@casajump.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">Telefone / WhatsApp</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      (12) 99999-9999
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-black p-8 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 font-display">Horário de Atendimento</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Segunda a Sexta: 09h às 18h<br />
                  Sábados: 10h às 22h (Casa de Oração)<br />
                  Domingos: a partir das 10h (Culto)
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <div className="bg-black p-8 md:p-12 rounded-3xl border border-white/10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4 font-display">Mensagem Enviada!</h3>
                  <p className="text-zinc-400 text-lg mb-8">
                    Agradecemos o seu contato. Nossa equipe retornará o mais breve possível.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                  >
                    Enviar nova mensagem
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8 font-display">Envie uma Mensagem</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div>
                        <label htmlFor="assunto" className="block text-sm font-medium text-zinc-400 mb-2">Assunto</label>
                        <select
                          id="assunto"
                          required
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                        >
                          <option value="">Selecione um assunto...</option>
                          <option value="duvida">Dúvida Geral</option>
                          <option value="parceria">Parceria</option>
                          <option value="doacao">Doações</option>
                          <option value="voluntariado">Voluntariado</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium text-zinc-400 mb-2">Mensagem</label>
                      <textarea
                        id="mensagem"
                        required
                        rows={5}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                        placeholder="Escreva sua mensagem aqui..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                    >
                      Enviar Mensagem <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
