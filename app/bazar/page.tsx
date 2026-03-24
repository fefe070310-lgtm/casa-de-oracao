'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, Clock, HeartHandshake, ArrowRight, CheckCircle2, ShoppingCart, Tag } from 'lucide-react';

export default function Bazar() {
  return (
    <div className="min-h-screen bg-black selection:bg-sky-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest mb-8 border border-sky-500/20">
               Moda com Propósito
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight leading-none">
              Bazar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Solidário</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              Cada peça adquirida no nosso bazar ajuda a sustentar as ações da Casa de Oração e os projetos sociais do Jump. Transforme seu estilo em impacto social.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white font-display leading-tight">
                Onde a solidariedade <br /> vira sustento
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                Tanto no Jump como na Casa de Oração, o bazar é uma das nossas principais fontes de recursos.
                Recebemos doações de roupas, calçados e acessórios, que são cuidadosamente triados para chegar até você com qualidade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  { icon: HeartHandshake, title: 'Como Doar', color: 'emerald', desc: 'Roupas e calçados em bom estado diretamente no nosso endereço.' },
                  { icon: MapPin, title: 'Onde Comprar', color: 'sky', desc: 'Fisicamente na Casa de Oração, em São José dos Campos.' },
                  { icon: Clock, title: 'Funcionamento', color: 'indigo', desc: 'Sábados (10h-22h) e Domingos (10h-13h).' },
                  { icon: Tag, title: 'Preços', color: 'rose', desc: 'Valores acessíveis para abençoar a comunidade local.' },
                ].map((item, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-display">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative">
               <div className="absolute -inset-4 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
               <div className="relative h-[600px] md:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/10">
                 <Image
                   src="/images/bazar/bazar-roupas.jpg"
                   alt="Roupas do Bazar"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                           <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">100% Solidário</h3>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed font-light">
                        Todo o lucro é revertido para as ações sociais do Jump e manutenção da Casa de Oração. 
                        Sua compra financia vidas.
                      </p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 border-t border-white/5">
           <h2 className="text-4xl font-bold text-white mb-8 font-display tracking-tight">Tem algo para doar?</h2>
           <p className="text-zinc-400 text-xl leading-relaxed font-light mb-12">
             Sua doação pode ser a resposta de oração de alguém. Limpe seu guarda-roupa e ajude a sustentar este movimento.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contato" 
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all text-center"
              >
                Falar com a equipe
              </Link>
              <Link 
                href="/doacoes" 
                className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 border border-white/5 active:scale-95 transition-all text-center"
              >
                Outras formas de ajudar
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
