'use client';

import { motion } from 'framer-motion';
import { Heart, CreditCard, Smartphone, ArrowRight, ShieldCheck, Copy, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Doacoes() {
  const [copied, setCopied] = useState(false);
  const pixKey = "00.000.000/0001-00";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-rose-500/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden mt-6 md:mt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/5 text-rose-600 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8 border border-rose-500/10">
              Sua generosidade transforma vidas
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 mb-4 md:mb-6 font-display tracking-tight leading-none px-2">
              Semeie neste <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">Movimento</span>
            </h1>
            <p className="text-base md:text-xl text-zinc-600 leading-relaxed font-light px-2">
              Sua doação sustenta a Casa de Oração, as ações sociais do Jump e a expansão do Reino nas nações.
              Nenhum valor é pequeno demais quando dado com amor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">

            {/* PIX Option */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-zinc-100 hover:border-emerald-500/20 transition-all duration-500 shadow-xl shadow-zinc-200/50"
            >
              <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 md:mb-6 font-display">Doação via PIX</h3>
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light">
                  A forma mais rápida de contribuir. Ideal para doações pontuais e ajuda imediata em situações de emergência.
                </p>

                <div className="bg-zinc-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-100 mb-8 md:mb-10 group-hover:border-emerald-500/10 transition-colors shadow-inner">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">Chave PIX (CNPJ)</span>
                    <Smartphone className="w-3 h-3 md:w-4 md:h-4 text-zinc-300" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-lg md:text-2xl text-zinc-900 font-mono font-bold tracking-tight">{pixKey}</code>
                    <button
                      onClick={handleCopy}
                      className="p-2 md:p-3 bg-white hover:bg-zinc-100 rounded-xl transition-colors shrink-0 shadow-sm border border-zinc-100"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" /> : <Copy className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />}
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500 mt-4 font-medium italic">Associação Casa Jump</p>
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full py-4 md:py-5 bg-emerald-500 text-black text-sm md:text-base font-black rounded-2xl hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {copied ? "Chave Copiada!" : "Copiar Chave PIX"}
                </button>
              </div>
            </motion.div>

            {/* Recurring Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-zinc-100 hover:border-rose-500/20 transition-all duration-500 flex flex-col h-full shadow-xl shadow-zinc-200/50"
            >
              <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-rose-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full md:text-right">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 md:mb-10 md:ml-auto group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 md:mb-6 font-display">Doação Recorrente</h3>
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light flex-grow">
                  Torne-se um mantenedor. Sua fidelidade mensal nos permite planejar a longo prazo e manter a casa funcionando 24/7.
                </p>

                 <div className="grid grid-cols-1 gap-3 md:gap-4 mb-8 md:mb-10">
                  {[
                    { label: 'Semente', value: '50', color: 'rose' },
                    { label: 'Fruto', value: '100', color: 'rose' },
                    { label: 'Outro Valor', value: 'Personalizado', color: 'zinc' },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="group/btn w-full flex items-center justify-between p-4 md:p-6 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-200 transition-all text-left shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-lg md:text-xl text-zinc-900 font-bold">{item.value === 'Personalizado' ? item.value : `R$ ${item.value}/mês`}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-zinc-300 group-hover/btn:text-rose-600 group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 md:gap-3 md:justify-end text-xs md:text-sm text-zinc-500 font-light italic mt-auto">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Pagamento seguro via Stripe/Asaas
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Transparency / Trust Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <div className="w-14 h-14 md:w-16 md:h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 shadow-sm border border-zinc-200">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-zinc-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 md:mb-8 font-display">Transparência Total</h2>
           <p className="text-zinc-600 text-base md:text-xl leading-relaxed font-light mb-10 md:mb-12">
            Honramos cada recurso que Deus nos confia. Todas as ofertas são destinadas à manutenção da Casa,
            ao sustento dos projetos sociais do Jump e à expansão missionária.
          </p>
           <Link
            href="/contato"
            className="inline-flex items-center gap-3 text-zinc-500 hover:text-zinc-900 transition-colors text-sm md:text-lg"
          >
            Ficou com alguma dúvida?
            <span className="font-bold border-b border-zinc-200 hover:border-zinc-900 pb-1">Fale conosco</span>
          </Link>
        </div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </section>

      {/* Bottom Floating Stats */}
      <div className="pb-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
           {[
            { label: 'Turnos semanais', val: '24' },
            { label: 'Pessoas impactadas', val: '3k+' },
            { label: 'Voluntários ativos', val: '120+' },
            { label: 'Almas para Cristo', val: '∞' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-3xl border border-zinc-100 bg-white shadow-sm">
              <div className="text-3xl font-black text-zinc-900 mb-2 font-display">{stat.val}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
