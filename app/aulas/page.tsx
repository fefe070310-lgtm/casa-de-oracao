'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, Lock, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Aulas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/members/courses'); // Using the same public/member endpoint
        const data = await res.json();
        if (data.courses) setCourses(data.courses);
      } catch (err) {
        console.error('Erro ao buscar cursos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Gradient & Premium Look */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        {/* Background glow Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-red-600/10 via-transparent to-transparent opacity-50 z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Conteúdo Exclusivo</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 font-display tracking-tighter leading-[0.9]">
              Plataforma de <br />
              <span className="text-zinc-500">Ensino do Reino.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light mb-12 max-w-2xl">
              Uma biblioteca completa de módulos e aulas para equipar sua jornada espiritual e transformação social.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/membros/login"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-3xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5"
              >
                Acessar minha conta <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/membros/registro"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 text-white font-black uppercase tracking-widest text-xs rounded-3xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Criar conta gratuita
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Módulos Area */}
      <section className="py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8 font-display tracking-tighter uppercase">Nossas Trilhas</h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Explore as diversas áreas de conhecimento prático e espiritual desenvolvidas por nossa comunidade ao longo dos anos.
              </p>
            </div>
            <div className="hidden md:block">
               <div className="px-6 py-4 bg-white/5 rounded-[2rem] border border-white/5 text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-red-600" /> {courses.length} Especializações
               </div>
            </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-6 opacity-30">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Sincronizando Biblioteca...</p>
             </div>
          ) : courses.length === 0 ? (
             <div className="py-40 text-center border border-white/5 rounded-[4rem] bg-black/50">
                <BookOpen className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Em breve novos cursos</h3>
                <p className="text-zinc-600 uppercase text-[10px] font-bold tracking-widest">Aguarde o lançamento de nossos módulos exclusivos.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {courses.map((course) => {
                const totalLessons = course.modules?.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0) || 0;
                
                return (
                  <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/40 rounded-[3rem] border border-white/5 overflow-hidden group hover:border-red-600/50 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-red-600/5 shadow-inner"
                  >
                    <div className="relative h-60 md:h-80 w-full overflow-hidden">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out brightness-[0.7] group-hover:brightness-100"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                           <BookOpen className="w-20 h-20 text-zinc-800" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                      
                      <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 text-[10px] font-black text-white flex items-center gap-2 uppercase tracking-widest shadow-2xl">
                        <PlayCircle className="w-4 h-4 text-red-600" /> {totalLessons} aulas
                      </div>

                      <div className="absolute bottom-8 left-10">
                         <div className="flex items-center gap-3 text-red-500 drop-shadow-lg">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Iniciante • Certificado</span>
                         </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-12">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 font-display group-hover:text-red-500 transition-colors tracking-tight uppercase leading-none">{course.title}</h3>
                      <p className="text-zinc-500 leading-relaxed text-base md:text-lg font-light mb-8 md:mb-10 line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-white/10">
                        <Link
                          href="/membros/login"
                          className="inline-flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-widest group/link transition-all"
                        >
                          Começar agora <ArrowRight className="w-4 h-4 text-red-600 group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                        
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                           <Lock className="w-3.5 h-3.5" /> Acesso Protegido
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
