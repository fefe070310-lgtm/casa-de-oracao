'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  CheckCircle, 
  ChevronLeft, 
  Download, 
  FileText, 
  Lock,
  ChevronRight,
  Loader2,
  Calendar
} from 'lucide-react';
import { isLessonUnlocked } from '@/lib/progress-utils';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, [params.lessonId]);

  const fetchLesson = async () => {
    try {
      const res = await fetch(`/api/members/lessons/${params.lessonId}`);
      const data = await res.json();
      
      if (data.lesson) {
        setLesson(data.lesson);
        setAllLessons(data.lesson.module.lessons);
        setProgress(data.progress || []);
        
        // Verificar se está desbloqueada
        const unlocked = isLessonUnlocked(data.lesson, data.lesson.module.lessons, data.progress || []);
        if (!unlocked) {
          // alert('Esta aula ainda está bloqueada! Complete as anteriores.');
          // router.push('/membros');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await fetch('/api/members/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: params.lessonId }),
      });
      
      // Atualizar progresso local
      const newProgress = [...progress, { lessonId: params.lessonId, completed: true }];
      setProgress(newProgress);
      
      // Ir para a próxima aula se existir
      const currentIndex = allLessons.findIndex(l => l.id === params.lessonId);
      if (currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        router.push(`/membros/cursos/${params.courseId}/aulas/${nextLesson.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!lesson) return <div className="p-10 text-white">Aula não encontrada.</div>;

  const isCompleted = progress.some(p => p.lessonId === lesson.id && p.completed);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Header */}
      <header className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <button 
          onClick={() => router.push('/membros')}
          className="flex items-center gap-3 text-zinc-500 hover:text-white transition-all group lg:w-48"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden md:inline">Painel</span>
        </button>

        <div className="text-center flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-black mb-1">
              {lesson.module.title}
            </p>
            <h1 className="text-sm md:text-lg font-black tracking-tighter truncate max-w-[200px] md:max-w-md mx-auto">
              {lesson.title}
            </h1>
          </motion.div>
        </div>

        <div className="lg:w-48 flex justify-end">
           <AnimatePresence>
             {isCompleted && (
               <motion.span 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-2 text-red-500 text-[10px] font-black tracking-widest uppercase py-2 px-4 bg-red-500/10 rounded-full border border-red-500/20"
               >
                 <CheckCircle className="w-3.5 h-3.5" /> CONFIRMADA
               </motion.span>
             )}
           </AnimatePresence>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-10">
            {/* Video Player - "Masked" */}
            <div className="relative aspect-video bg-zinc-950 rounded-[2.5rem] overflow-hidden group shadow-2xl ring-1 ring-white/10">
              {lesson.videoUrl ? (
                <div className="w-full h-full relative">
                  {/* Overlay para "mascarar" o player e dar um look premium */}
                  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Iframe com parâmetros de limpeza para Youtube/Vimeo */}
                  <iframe 
                    src={`${lesson.videoUrl}${lesson.videoUrl.includes('?') ? '&' : '?'}modestbranding=1&rel=0&showinfo=0&autoplay=0&hl=pt&iv_load_policy=3`}
                    className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[1.05]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Branding Mask - Logo over player top left */}
                  <div className="absolute top-6 left-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <PlayCircle className="w-5 h-5 text-red-500" />
                     </div>
                     <span className="text-xs font-black tracking-tighter text-white drop-shadow-lg uppercase">CASA JUMP <span className="text-red-500">PLAYER</span></span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 gap-6">
                  <PlayCircle className="w-24 h-24 opacity-10" />
                  <p className="text-sm font-black tracking-widest uppercase opacity-20">Vídeo não disponível</p>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="relative pt-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 font-display">
                      {lesson.title}
                    </h2>
                    <div className="flex items-center gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">
                       <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-red-500" /> Publicada em {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}</span>
                       <span className="w-1 h-1 rounded-full bg-zinc-800" />
                       <span className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4 text-red-500" /> Módulo {lesson.module.title.split(' ')[1] || '01'}</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleComplete}
                    disabled={isCompleted || completing}
                    className={`relative overflow-hidden group px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 ${
                      isCompleted 
                      ? 'bg-red-600 text-white cursor-default shadow-2xl shadow-red-600/30 ring-1 ring-red-500/50' 
                      : 'bg-white text-black hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 group'
                    }`}
                  >
                    {completing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isCompleted ? (
                      <><CheckCircle className="w-4 h-4" /> Aula Concluída</>
                    ) : (
                      <>Concluir esta Aula <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 border-l-2 border-red-600 pl-4">Sobre esta aula</h4>
                  <p className="text-zinc-400 leading-relaxed text-lg font-light">
                    {lesson.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-l-2 border-red-600 pl-4">Materiais</h4>
                  <div className="space-y-3">
                    {lesson.pdfUrl ? (
                      <a 
                        href={lesson.pdfUrl} 
                        target="_blank" 
                        className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group"
                      >
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black uppercase tracking-tighter">Material de Apoio</p>
                          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Digital PDF • Download</p>
                        </div>
                      </a>
                    ) : (
                      <div className="p-5 border border-white/5 rounded-2xl opacity-20 text-center text-xs font-black uppercase tracking-widest">
                        Sem anexos
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Playlist */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Próximas Aulas</h3>
              <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-zinc-400">{allLessons.length} AULAS</span>
            </div>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-3 custom-scrollbar">
              {allLessons.map((l, index) => {
                const isUnlocked = isLessonUnlocked(l, allLessons, progress);
                const isActive = l.id === params.lessonId;
                const isDone = progress.some(p => p.lessonId === l.id && p.completed);

                return (
                  <button
                    key={l.id}
                    disabled={!isUnlocked}
                    onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${l.id}`)}
                    className={`w-full text-left p-5 rounded-3xl transition-all border flex items-center gap-4 group relative ${
                      isActive 
                        ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/20 z-10 scale-[1.02]' 
                        : isUnlocked 
                          ? 'bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60' 
                          : 'bg-zinc-950/20 border-transparent opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'bg-white/10' : 'bg-red-500/10'
                    }`}>
                      {!isUnlocked ? (
                        <Lock className="w-4 h-4 text-zinc-600" />
                      ) : isDone ? (
                        <CheckCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-500'}`} />
                      ) : (
                        <PlayCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-500'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-white/60' : 'text-zinc-600'}`}>Aula {index + 1}</p>
                      <p className="text-sm font-bold truncate tracking-tight">{l.title}</p>
                    </div>

                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute -left-1 top-1/4 bottom-1/4 w-1 bg-white rounded-full" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-6 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {prevLesson ? (
            <button 
              onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${prevLesson.id}`)}
              className="flex items-center gap-3 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group"
            >
              <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Anterior
            </button>
          ) : <div className="w-32" />}

          <div className="hidden md:flex flex-col items-center">
             <div className="w-48 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-1000" 
                  style={{ width: `${(currentIndex + 1) / allLessons.length * 100}%` }}
                />
             </div>
             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">{currentIndex + 1} de {allLessons.length} AULAS</span>
          </div>

          {nextLesson ? (
            <button 
              disabled={!isCompleted}
              onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${nextLesson.id}`)}
              className={`flex items-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest group ${
                isCompleted ? 'text-white hover:text-red-400' : 'text-zinc-800 cursor-not-allowed'
              }`}
            >
              Próxima Aula
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isCompleted ? 'bg-red-600/20 border border-red-500/20 group-hover:bg-red-600/40' : 'bg-transparent border border-white/5'
              }`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
               <CheckCircle className="w-4 h-4 text-red-500" /> Curso Finalizado
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
