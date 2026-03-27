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
  Calendar,
  MessageSquare,
  Send
} from 'lucide-react';
import { isLessonUnlocked } from '@/lib/progress-utils';
import dynamic from 'next/dynamic';


// Dynamic import with SSR disabled to prevent window/document errors
const VideoPlayer = dynamic(() => import('@/components/video-player'), { ssr: false });

const getVideoData = (url: string): { provider: 'youtube' | 'vimeo'; videoId: string } | null => {
  if (!url) return null;
  try {
    let videoId = '';
    let provider: 'youtube' | 'vimeo' = 'youtube';

    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      videoId = urlObj.searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || '';
    } else if (url.includes('vimeo.com/')) {
      provider = 'vimeo';
      videoId = url.split('vimeo.com/')[1]?.split('?')[0]?.split('/')[0] || '';
    }

    if (videoId) return { provider, videoId };
  } catch (e) {
    console.error("Invalid video URL format", e);
  }
  return null;
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  // Chat state
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [sendingComment, setSendingComment] = useState(false);

  useEffect(() => {
    fetchLesson();
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?lessonId=${params.lessonId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    setSendingComment(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: commentText,
          lessonId: params.lessonId,
        }),
      });
      const newComment = await res.json();
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSendingComment(false);
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
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!lesson) return <div className="p-10 text-zinc-950">Aula não encontrada.</div>;

  const isCompleted = progress.some(p => p.lessonId === lesson.id && p.completed);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col font-sans selection:bg-red-500/20 selection:text-red-900">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <button 
          onClick={() => router.push('/membros')}
          className="flex items-center gap-3 text-zinc-500 hover:text-zinc-950 transition-all group lg:w-48"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
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
                  className="flex items-center gap-2 text-red-600 text-[9px] md:text-[10px] font-black tracking-widest uppercase py-1.5 px-3 md:py-2 md:px-4 bg-red-50 rounded-full border border-red-100"
                >
                  <CheckCircle className="w-3 md:w-3.5 h-3 md:h-3.5" /> CONFIRMADA
                </motion.span>
             )}
           </AnimatePresence>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6 md:space-y-10">
            {/* Video Player - "Masked" */}
            <div className="relative aspect-video bg-zinc-100 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-200/50 border border-zinc-200">
              {lesson.videoUrl ? (
                (() => {
                  const videoData = getVideoData(lesson.videoUrl);
                  if (!videoData) {
                    return (
                      <iframe 
                        src={lesson.videoUrl}
                        className="w-full h-full border-0 outline-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  return (
                    <VideoPlayer videoId={videoData.videoId} provider={videoData.provider} />
                  );
                })()
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 gap-6">
                  <PlayCircle className="w-24 h-24 opacity-10" />
                  <p className="text-sm font-black tracking-widest uppercase opacity-20">Vídeo não disponível</p>
                </div>
              )}
            </div>


            {/* Content Details */}
            <div className="relative pt-4 px-2 md:px-0">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 mb-8 md:mb-10">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-4 md:mb-6 font-display">
                      {lesson.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
                       <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" /> Publicada em {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}</span>
                       <span className="w-1 h-1 rounded-full bg-zinc-300" />
                       <span className="flex items-center gap-1.5"><PlayCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" /> Módulo {lesson.module.title.split(' ')[1] || '01'}</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleComplete}
                    disabled={isCompleted || completing}
                    className={`relative overflow-hidden group px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all flex items-center justify-center gap-3 ${
                      isCompleted 
                      ? 'bg-red-600 text-white cursor-default shadow-xl shadow-red-600/30' 
                      : 'bg-zinc-900 text-white hover:scale-105 active:scale-95 shadow-xl shadow-zinc-200/50 group'
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

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 md:gap-12 pb-10">
                <div className="xl:col-span-2 space-y-12">
                  <div>
                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 border-l-2 border-red-600 pl-4">Sobre esta aula</h4>
                    <p className="text-zinc-600 leading-relaxed text-base md:text-lg font-normal md:font-light">
                      {lesson.description}
                    </p>
                  </div>

                  {/* Chat / Apontamentos Section */}
                  <div className="pt-8 border-t border-zinc-100">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                          <MessageSquare className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 leading-none mb-1">Dúvidas e Apontamentos</h4>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Somente você e o administrador podem ver estas mensagens</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                      {comments.length === 0 ? (
                        <div className="py-12 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 text-center text-zinc-400">
                           <p className="text-xs font-bold uppercase tracking-widest px-8">Nenhuma dúvida enviada ainda. Use o campo abaixo para falar com o líder.</p>
                        </div>
                      ) : (
                        comments.map((msg: any) => (
                          <div key={msg.id} className="space-y-3">
                            {/* Aluno message */}
                            <div className="flex justify-end">
                              <div className="bg-zinc-900 text-white rounded-2xl rounded-tr-none px-5 py-3.5 max-w-[80%] shadow-lg shadow-zinc-200/50">
                                <p className="text-sm font-medium">{msg.text}</p>
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mt-2 text-right">
                                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                            
                            {/* Admin reply */}
                            {msg.adminReply && (
                              <div className="flex justify-start">
                                <div className="bg-red-50 border border-red-100 text-red-950 rounded-2xl rounded-tl-none px-5 py-3.5 max-w-[80%] shadow-sm">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Administração</p>
                                  <p className="text-sm font-medium">{msg.adminReply}</p>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-red-400 block mt-2">
                                    {new Date(msg.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="relative group">
                       <textarea
                         value={commentText}
                         onChange={(e) => setCommentText(e.target.value)}
                         placeholder="Tem alguma dúvida ou observação? Escreva aqui..."
                         className="w-full bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all min-h-[120px] pr-20 shadow-sm group-hover:shadow-md"
                       />
                       <button
                         disabled={sendingComment || !commentText.trim()}
                         onClick={handleSendComment}
                         className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 disabled:opacity-50 active:scale-95"
                       >
                         {sendingComment ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                       </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 border-l-2 border-red-600 pl-4">Materiais</h4>
                  <div className="space-y-3">
                    {lesson.pdfUrl ? (
                      <a 
                        href={lesson.pdfUrl} 
                        target="_blank" 
                        className="flex items-center gap-4 p-5 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-300 transition-all group shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black uppercase tracking-tighter">Material de Apoio</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Digital PDF • Download</p>
                        </div>
                      </a>
                    ) : (
                      <div className="p-5 border border-zinc-100 rounded-2xl opacity-40 text-center text-xs font-black uppercase tracking-widest text-zinc-400">
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
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Próximas Aulas</h3>
              <span className="text-[9px] md:text-[10px] font-black bg-zinc-200/50 px-2 py-1 rounded text-zinc-500">{allLessons.length} AULAS</span>
            </div>
            
            <div className="space-y-3 lg:max-h-[70vh] overflow-y-auto pr-1 md:pr-3 custom-scrollbar">
              {allLessons.map((l, index) => {
                const isUnlocked = isLessonUnlocked(l, allLessons, progress);
                const isActive = l.id === params.lessonId;
                const isDone = progress.some(p => p.lessonId === l.id && p.completed);

                return (
                  <button
                    key={l.id}
                    disabled={!isUnlocked}
                    onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${l.id}`)}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl md:rounded-3xl transition-all border flex items-center gap-4 group relative ${
                      isActive 
                        ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/20 z-10 scale-[1.02]' 
                        : isUnlocked 
                          ? 'bg-white border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50' 
                          : 'bg-zinc-200/20 border-transparent opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'bg-white/10' : 'bg-red-50'
                    }`}>
                      {!isUnlocked ? (
                        <Lock className="w-4 h-4 text-zinc-300" />
                      ) : isDone ? (
                        <CheckCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-600'}`} />
                      ) : (
                        <PlayCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-600'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-zinc-900">
                      <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-white/60' : 'text-zinc-400'}`}>Aula {index + 1}</p>
                      <p className={`text-sm font-bold truncate tracking-tight ${isActive ? 'text-white' : 'text-zinc-900'}`}>{l.title}</p>
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
      <footer className="p-4 md:p-6 border-t border-zinc-200 bg-white/90 backdrop-blur-xl shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {prevLesson ? (
            <button 
              onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${prevLesson.id}`)}
              className="flex items-center gap-3 text-zinc-400 hover:text-zinc-950 transition-all text-[9px] md:text-[10px] font-black uppercase tracking-widest group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-zinc-300 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Anterior
            </button>
          ) : <div className="w-24 md:w-32" />}

          <div className="hidden md:flex flex-col items-center">
             <div className="w-48 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-1000" 
                  style={{ width: `${(currentIndex + 1) / allLessons.length * 100}%` }}
                />
             </div>
             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">{currentIndex + 1} de {allLessons.length} AULAS</span>
          </div>

          {nextLesson ? (
            <button 
              disabled={!isCompleted}
              onClick={() => router.push(`/membros/cursos/${params.courseId}/aulas/${nextLesson.id}`)}
              className={`flex items-center gap-2 md:gap-3 transition-all text-[9px] md:text-[10px] font-black uppercase tracking-widest group ${
                isCompleted ? 'text-zinc-950 hover:text-red-600' : 'text-zinc-300 cursor-not-allowed'
              }`}
            >
              Próxima Aula
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                isCompleted ? 'bg-red-50 border border-red-100 group-hover:bg-red-100' : 'bg-transparent border border-zinc-100'
              }`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
               <CheckCircle className="w-4 h-4 text-red-600" /> Curso Finalizado
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
