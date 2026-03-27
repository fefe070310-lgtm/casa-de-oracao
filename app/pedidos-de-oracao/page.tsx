'use client';

import { motion } from 'motion/react';
import { MessageCircleHeart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function PedidosOracao() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get('nome'),
      telefone: formData.get('telefone'),
      pedido: formData.get('pedido'),
      anonimo: formData.get('anonimo') === 'on'
    };

    try {
      const response = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.nome,
          telefone: data.telefone,
          pedido: data.pedido,
          isPublic: !data.anonimo // Se for anonimo, isPublic = false
        }),
      });

      if (!response.ok) throw new Error('Falha ao enviar');
      setSubmitted(true);
    } catch (err) {
      setError('Ocorreu um erro ao enviar seu pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
       <section className="relative py-24 md:py-32 overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-8 border border-zinc-200 shadow-sm">
              <MessageCircleHeart className="w-8 h-8 text-rose-500" />
            </div>
             <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 font-display tracking-tight">
              Pedidos de Oração
            </h1>
             <p className="text-xl text-zinc-600 leading-relaxed font-light mb-10">
              Acreditamos no poder da intercessão. Nossa equipe da Casa de Oração está pronta para orar por você, sua família e suas necessidades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulário */}
       <section className="py-24 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-100 relative overflow-hidden shadow-2xl shadow-zinc-200/60">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                 <CheckCircle2 className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-zinc-900 mb-4 font-display">Pedido Recebido!</h3>
                <p className="text-zinc-600 text-lg mb-8">
                  Seu pedido foi encaminhado para nossa equipe de intercessores. Estaremos orando por você.
                </p>
                   <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-full hover:bg-black transition-colors shadow-lg shadow-black/10"
                >
                  Enviar novo pedido
                </button>
              </motion.div>
            ) : (
              <>
                 <h3 className="text-2xl font-bold text-zinc-900 mb-8 font-display text-center">Como podemos orar por você?</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label htmlFor="nome" className="block text-sm font-medium text-zinc-500 mb-2">Seu Nome (Opcional)</label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-emerald-500/30 transition-colors placeholder:text-zinc-400"
                        placeholder="Como gostaria de ser chamado?"
                      />
                    </div>
                    <div>
                       <label htmlFor="telefone" className="block text-sm font-medium text-zinc-500 mb-2">Telefone (Opcional)</label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-emerald-500/30 transition-colors placeholder:text-zinc-400"
                        placeholder="Caso queira que entremos em contato"
                      />
                    </div>
                  </div>

                  <div>
                     <label htmlFor="pedido" className="block text-sm font-medium text-zinc-500 mb-2">Seu Pedido de Oração</label>
                    <textarea
                      id="pedido"
                      name="pedido"
                      required
                      rows={6}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-emerald-500/30 transition-colors resize-none placeholder:text-zinc-400"
                      placeholder="Descreva aqui o motivo da sua oração..."
                    ></textarea>
                  </div>

                   <div className="flex items-center gap-3">
                    <input type="checkbox" id="anonimo" name="anonimo" className="w-4 h-4 rounded border-zinc-200 bg-zinc-50 text-emerald-600 focus:ring-emerald-500/50" />
                    <label htmlFor="anonimo" className="text-sm text-zinc-500">Desejo que este pedido seja mantido em sigilo (apenas a liderança terá acesso).</label>
                  </div>

                   <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-black/10"
                  >
                    {loading ? 'Enviando...' : 'Enviar Pedido de Oração'} <ArrowRight className="w-5 h-5" />
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
