'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingBag, MapPin, Clock, HeartHandshake } from 'lucide-react';

export default function Bazar() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1920&auto=format&fit=crop"
            alt="Bazar Solidário"
            fill
            className="object-cover opacity-20"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8 border border-white/20">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
              Bazar Solidário
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
              Moda com propósito. Cada peça adquirida no nosso bazar ajuda a sustentar as ações da Casa de Oração e os projetos sociais do Jump.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Sustento do Reino</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Tanto no Jump como na Casa de Oração existe um bazar que serve como uma das principais fontes de sustento para os projetos.
              </p>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Recebemos doações de roupas, calçados e acessórios em bom estado, que são triados, higienizados e vendidos a preços acessíveis para a comunidade.
              </p>
              
              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">Como Doar</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Aceitamos roupas masculinas, femininas, infantis, calçados e acessórios em bom estado de conservação. Você pode entregar suas doações diretamente no nosso endereço durante os horários de funcionamento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">Onde Comprar</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Nosso bazar funciona fisicamente no mesmo endereço da Casa de Oração em São José dos Campos. Venha nos visitar e conhecer as peças disponíveis!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">Horário de Funcionamento</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Sábados: 10h às 22h<br />
                      Domingos: a partir das 10h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative h-[700px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1489987707023-afc6e441612f?q=80&w=800&auto=format&fit=crop"
                alt="Roupas do Bazar"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                <p className="text-white font-medium text-lg mb-2">100% do valor arrecadado</p>
                <p className="text-zinc-400 text-sm">é revertido para as ações sociais do Jump e manutenção da Casa de Oração.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
