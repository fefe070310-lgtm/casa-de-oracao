'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  User, 
  LogOut, 
  Loader2,
  Menu,
  X,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MembrosDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, progressRes] = await Promise.all([
          fetch('/api/members/courses'),
          fetch('/api/members/progress')
        ]);
        const coursesData = await coursesRes.json();
        const progressData = await progressRes.json();
        
        if (coursesData.courses) setCourses(coursesData.courses);
        if (progressData.progress) setProgress(progressData.progress);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  const completedTotal = progress.length;

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row antialiased">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          CASA<span className="text-red-500">JUMP</span> <span className="text-[10px] text-zinc-500 font-bold ml-2 border border-zinc-900 px-2 py-0.5 rounded uppercase">Membros</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white bg-white/5 rounded-xl border border-white/10"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50
        w-80 md:w-64 lg:w-72 bg-zinc-950 border-r border-white/10 flex flex-col
        transition-transform duration-300 transform md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 border-b border-white/10 hidden md:block">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 block">
            CASA<span className="text-red-500">JUMP</span>
          </Link>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center font-bold text-white shadow-lg">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase text-white truncate">Aluno</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Ativo</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 md:p-4 space-y-2 mt-20 md:mt-0">
          <Link href="/membros" className="flex items-center justify-between px-5 py-4 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10 shadow-xl shadow-black/50">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-red-500" /> Meus Cursos
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </Link>
          <Link href="/membros/perfil" className="flex items-center gap-3 px-5 py-4 text-zinc-500 hover:bg-white/5 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-transparent">
            <User className="w-5 h-5" /> Meu Perfil
          </Link>
        </nav>

        <div className="p-6 md:p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-5 text-zinc-600 hover:text-red-400 w-full rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-red-500/5 group"
          >
            <div className="p-2 rounded-xl bg-transparent group-hover:bg-red-500/10 transition-all">
              <LogOut className="w-5 h-5" />
            </div>
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-16 mt-20 md:mt-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <TrendingUp className="w-4 h-4 text-red-500" /> Dashboard do Aluno
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter font-display mb-4">Seus Cursos</h1>
              <p className="text-zinc-400 text-lg font-light">Explore todos os cursos e trilhas de aprendizado liberadas para você.</p>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-6 flex items-center gap-6 backdrop-blur-md">
               <div className="text-center">
                  <p className="text-2xl font-black text-white">{courses.length}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cursos</p>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div className="text-center">
                  <p className="text-2xl font-black text-red-500">{completedTotal}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Aulas Done</p>
               </div>
            </div>
          </header>

          {courses.length === 0 ? (
            <div className="bg-zinc-950/50 border border-white/5 border-dashed rounded-[3rem] p-24 text-center">
              <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5 ring-4 ring-white/5">
                <BookOpen className="w-10 h-10 text-zinc-700" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 font-display uppercase tracking-tight">Nenhum curso disponível ainda</h3>
              <p className="text-zinc-500 max-w-sm mx-auto">Em breve novos conteúdos serão liberados aqui para você.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course) => {
                const totalLessons = course.modules?.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0) || 0;
                const completedLessons = progress.filter(p => course.modules?.some((m: any) => m.lessons?.some((l: any) => l.id === p.lessonId))).length;
                const percent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
                
                // Encontrar a primeira aula válida para o link
                const firstLesson = course.modules?.find((m: any) => m.lessons?.length > 0)?.lessons?.[0];

                return (
                  <Link 
                    key={course.id} 
                    href={firstLesson ? `/membros/cursos/${course.id}/aulas/${firstLesson.id}` : '#'}
                    className="group relative bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all flex flex-col hover:shadow-2xl hover:shadow-black/60 shadow-lg"
                  >
                    <div className="aspect-[16/10] bg-zinc-950 relative overflow-hidden">
                      {course.image ? (
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out grayscale-[0.5] group-hover:grayscale-0" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-zinc-800" />
                        </div>
                      )}
                      
                      {/* Badge Progression */}
                      <div className="absolute top-6 left-6 z-20">
                         <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] animate-pulse" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white">Pronto p/ Assistir</span>
                         </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                    </div>

                    <div className="p-8 pt-4 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-white mb-3 font-display line-clamp-1 group-hover:text-red-500 transition-colors uppercase tracking-tight">{course.title}</h3>
                      <p className="text-zinc-500 mb-8 line-clamp-2 text-sm leading-relaxed">{course.description}</p>
                      
                      <div className="mt-auto space-y-5">
                        <div className="space-y-3">
                           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                              <span className="text-zinc-500">Progresso</span>
                              <span className="text-white">{Math.round(percent)}%</span>
                           </div>
                           <div className="w-full bg-black/40 rounded-full h-2 ring-1 ring-white/5">
                              <div 
                                className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                                style={{ width: `${percent}%` }} 
                              />
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1.5 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                              <PlayCircle className="w-3.5 h-3.5 text-red-600" /> {totalLessons} Aulas
                           </div>
                           <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
                             <ChevronRight className="w-5 h-5" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
