'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical, 
  Video, 
  FileText, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  PlusCircle,
  Settings,
  MoreVertical,
  Play,
  Layers,
  Upload,
  X,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

type Lesson = {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  materialsUrl: string | null;
  pdfUrl: string | null;
  allowDownload: boolean;
  order: number;
};

type Module = {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  modules: Module[];
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleFormData, setModuleFormData] = useState({ title: '', description: '' });
  const [showLessonForm, setShowLessonForm] = useState<string | null>(null); // moduleId
  const [lessonFormData, setLessonFormData] = useState({ 
    title: '', description: '', videoUrl: '', pdfUrl: '', allowDownload: false 
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editCourseData, setEditCourseData] = useState({ title: '', description: '', image: '' });
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'course' | 'module' | 'lesson' } | null>(null);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${id}`);
      const data = await res.json();
      if (data.success) {
        setCourse(data.course);
        setEditCourseData({
          title: data.course.title,
          description: data.course.description,
          image: data.course.image || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourseData),
      });
      if (res.ok) {
        setIsEditingCourse(false);
        fetchCourse();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCourseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setEditCourseData(prev => ({ ...prev, image: data.url }));
        // Se estivermos editando a capa diretamente, salvamos logo em seguida
        if (!isEditingCourse) {
           await fetch(`/api/admin/courses/${id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ ...editCourseData, image: data.url }),
           });
           fetchCourse();
        }
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao subir imagem.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'videoUrl' | 'pdfUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLessonFormData(prev => ({ ...prev, [field]: data.url }));
      }
    } catch (err) {
      console.error('Erro no upload:', err);
      alert('Falha ao subir arquivo.');
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteAction = async () => {
    if (!itemToDelete) return;
    setSaving(true);
    try {
      let url = '';
      if (itemToDelete.type === 'course') url = `/api/admin/courses/${itemToDelete.id}`;
      else if (itemToDelete.type === 'module') url = `/api/admin/modules/${itemToDelete.id}`;
      else url = `/api/admin/lessons/${itemToDelete.id}`;

      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        if (itemToDelete.type === 'course') {
          router.push('/admin/cursos');
        } else {
          setItemToDelete(null);
          fetchCourse();
        }
      } else {
        const errData = await res.json();
        alert(errData.error || 'Erro ao deletar item.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão.');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...moduleFormData, courseId: id }),
      });
      if (res.ok) {
        setShowModuleForm(false);
        setModuleFormData({ title: '', description: '' });
        fetchCourse();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lessonFormData, moduleId: showLessonForm }),
      });
      if (res.ok) {
        setShowLessonForm(null);
        setLessonFormData({ title: '', description: '', videoUrl: '', pdfUrl: '', allowDownload: false });
        fetchCourse();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <RefreshCw className="w-10 h-10 text-white animate-spin opacity-20" />
      <span className="uppercase text-[10px] font-black tracking-[0.2em] text-zinc-500">Sincronizando Conteúdo...</span>
    </div>
  );
  
  if (!course) return <div className="text-center py-12 text-zinc-500 font-display text-xl">Curso não encontrado.</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Custom Global Delete Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setItemToDelete(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-red-900/20 w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden text-center">
               <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-600/20 text-red-600">
                  <Trash2 className="w-12 h-12" />
               </div>
               <h2 className="text-3xl font-black text-white font-display mb-4 uppercase tracking-tighter shrink">Apagar {itemToDelete.type === 'course' ? 'Curso' : itemToDelete.type === 'module' ? 'Módulo' : 'Aula'}?</h2>
               <p className="text-zinc-500 text-sm mb-12 font-light leading-relaxed">
                 Esta ação é permanente e apagará todos os dados vinculados a este {itemToDelete.type}. Tem certeza?
               </p>
               <div className="flex flex-col gap-3">
                  <button 
                    disabled={saving}
                    onClick={confirmDeleteAction}
                    className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-2xl shadow-red-600/20"
                  >
                    {saving ? 'PROCESSANDO...' : 'SIM, APAGAR DEFINITIVAMENTE'}
                  </button>
                  <button 
                    onClick={() => setItemToDelete(null)}
                    disabled={saving}
                    className="w-full py-5 bg-transparent text-zinc-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:text-white transition-all"
                  >
                    CANCELAR
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-12">
        <Link href="/admin/cursos" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-[0.2em]">
          <ArrowLeft className="w-4 h-4" /> Voltar para Biblioteca
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cover preview in details */}
          <div className="w-full lg:w-72 h-44 rounded-[2.5rem] bg-zinc-900 border border-white/5 overflow-hidden relative group shrink-0 shadow-2xl shadow-black">
             {course.image ? (
               <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-zinc-950 p-6">
                  <BookOpen className="w-10 h-10 text-zinc-800" />
                  <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Sem Capa</span>
               </div>
             )}
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => document.getElementById('direct-image-upload')?.click()}>
                <div className="flex flex-col items-center gap-2">
                   <Upload className="w-6 h-6 text-white" />
                   <span className="text-white text-[10px] font-black uppercase tracking-widest">Subir Capa</span>
                </div>
             </div>
             <input type="file" id="direct-image-upload" className="hidden" accept="image/*" onChange={handleCourseImageUpload} />
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500">Curso ID: {course.id.split('-')[0]}</span>
                 <span className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-[9px] font-black uppercase tracking-widest text-red-500">Ativo Professional</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 font-display tracking-tight leading-none uppercase">{course.title}</h1>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl">{course.description}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setIsEditingCourse(true)} title="Configurações" className="p-4 bg-zinc-900 border border-white/10 text-white rounded-2xl hover:bg-zinc-800 transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={() => setShowModuleForm(true)} className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                <PlusCircle className="w-5 h-5" /> Adicionar Módulo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Course Settings Modal */}
      <AnimatePresence>
        {isEditingCourse && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditingCourse(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 w-full max-w-3xl rounded-[3rem] p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900" />
              
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight leading-none">Configurações Gerais</h2>
                <button onClick={() => setIsEditingCourse(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-500 hover:text-white transition-all">
                   <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateCourse} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Nome do Curso</label>
                        <input type="text" required value={editCourseData.title} onChange={(e) => setEditCourseData({ ...editCourseData, title: e.target.value })}
                          className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-all font-bold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Descrição</label>
                        <textarea rows={5} value={editCourseData.description} onChange={(e) => setEditCourseData({ ...editCourseData, description: e.target.value })}
                          className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-all resize-none font-light leading-relaxed" />
                      </div>
                   </div>

                   <div className="space-y-6">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Imagem de Capa (Banner)</label>
                      <div 
                        className="relative aspect-video rounded-[2.5rem] border-2 border-dashed border-white/5 bg-black overflow-hidden group cursor-pointer hover:border-red-600/30 transition-all"
                        onClick={() => document.getElementById('edit-course-image')?.click()}
                      >
                        {editCourseData.image ? (
                           <>
                            <img src={editCourseData.image} alt="Preview" className="w-full h-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                               <Upload className="w-6 h-6 text-white" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-white">Alterar Capa</span>
                            </div>
                           </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-4">
                             <Plus className="w-8 h-8 text-zinc-700" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Subir Capa</span>
                          </div>
                        )}
                        <input type="file" id="edit-course-image" className="hidden" accept="image/*" onChange={handleCourseImageUpload} />
                        
                        {uploading && (
                           <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                              <RefreshCw className="w-10 h-10 text-white animate-spin opacity-40" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Fazendo Upload...</span>
                           </div>
                        )}
                      </div>
                   </div>
                </div>

                <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
                   <button type="submit" disabled={saving || uploading} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50">
                    {saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                  </button>
                </div>

                {/* Zona de Perigo embutida no modal para facilitar */}
                <div className="mt-12 pt-10 border-t border-red-900/20 flex flex-col md:flex-row items-center justify-between gap-6 bg-red-900/10 -mx-10 px-10 py-10">
                  <div>
                    <h4 className="text-red-500 font-black uppercase tracking-widest text-xs mb-1">Zona de Exclusão</h4>
                    <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-tight">O curso e todo o seu conteúdo serão apagados para sempre.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setItemToDelete({ id: id as string, type: 'course' })} 
                    className="flex items-center gap-3 px-8 py-5 bg-red-600/10 border border-red-600/30 text-red-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-2xl shadow-red-600/10"
                  >
                    <Trash2 className="w-4 h-4" /> APAGAR ESTE CURSO
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modules List */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {course.modules.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-zinc-900/30 border border-white/5 rounded-[3.5rem] flex flex-col items-center gap-6">
              <Layers className="w-16 h-16 text-zinc-800" />
              <div className="space-y-2">
                <p className="text-zinc-500 text-lg">Este curso ainda está vazio.</p>
                <p className="text-zinc-600 text-xs uppercase font-black tracking-widest">Adicione módulos para começar a organizar as aulas.</p>
              </div>
              <button onClick={() => setShowModuleForm(true)} className="flex items-center gap-3 px-10 py-5 bg-zinc-900 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-800 transition-all">
                <PlusCircle className="w-5 h-5" /> Adicionar Primeiro Módulo
              </button>
            </motion.div>
          ) : (
            course.modules.sort((a, b) => a.order - b.order).map((module, idx) => (
              <motion.div 
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl shadow-black/20"
              >
                {/* Module Header */}
                <div className="px-10 py-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white font-black text-xl border border-white/5 shadow-inner">
                      {idx + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white font-display mb-1 uppercase tracking-tight">{module.title}</h2>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> {module.lessons.length} aulas</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Ordem: {module.order}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowLessonForm(module.id)} className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-zinc-300 rounded-2xl hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
                      <Plus className="w-4 h-4" /> Nova Aula
                    </button>
                    <button 
                      onClick={() => setItemToDelete({ id: module.id, type: 'module' })}
                      className="p-4 text-zinc-600 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Lessons in Module */}
                <div className="p-6 space-y-3">
                  {module.lessons.length === 0 ? (
                    <div className="text-center py-12 text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Estrutura aguardando conteúdos</div>
                  ) : (
                    module.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                      <div key={lesson.id} className="group relative flex items-center justify-between p-6 bg-black/20 hover:bg-white/[0.03] rounded-3xl transition-all border border-transparent hover:border-white/5 overflow-hidden">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner border border-white/5">
                            <Play className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-zinc-300 group-hover:text-white transition-colors">{lesson.title}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              {lesson.videoUrl && <span className="flex items-center gap-2 text-[9px] text-zinc-500 uppercase font-bold tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5"><Video className="w-3.5 h-3.5" /> Videoaula</span>}
                              {lesson.pdfUrl && <span className="flex items-center gap-2 text-[9px] text-zinc-500 uppercase font-bold tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5"><FileText className="w-3.5 h-3.5" /> PDF</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => setItemToDelete({ id: lesson.id, type: 'lesson' })}
                            className="p-4 bg-red-600/10 text-red-600/50 hover:bg-red-600 hover:text-white rounded-2xl transition-all border border-red-600/10"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal - Module Form */}
      <AnimatePresence>
        {showModuleForm && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModuleForm(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 w-full max-w-lg rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <h2 className="text-3xl font-black text-white mb-8 font-display uppercase tracking-tight leading-none">Novo Módulo</h2>
              <form onSubmit={handleCreateModule} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Título</label>
                  <input type="text" required value={moduleFormData.title} onChange={(e) => setModuleFormData({ ...moduleFormData, title: e.target.value })}
                    className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-colors" placeholder="Ex: Fundamentos Básicos" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Resumo</label>
                  <textarea rows={4} value={moduleFormData.description} onChange={(e) => setModuleFormData({ ...moduleFormData, description: e.target.value })}
                    className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-colors resize-none font-light leading-relaxed" placeholder="O que o aluno aprenderá aqui..." />
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                   <button type="button" onClick={() => setShowModuleForm(false)} className="px-8 py-5 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Cancelar</button>
                   <button type="submit" disabled={saving} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-2xl shadow-white/5">
                    {saving ? 'CRIANDO...' : 'CRIAR MÓDULO'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal - Lesson Form */}
      <AnimatePresence>
        {showLessonForm && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLessonForm(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-black text-white mb-8 font-display uppercase tracking-tight leading-none">Configurar Aula</h2>
              <form onSubmit={handleCreateLesson} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Título da Aula</label>
                    <input type="text" required value={lessonFormData.title} onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                      className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-600/50 transition-all text-lg font-bold" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Video className="w-4 h-4" /> Endpoint de Vídeo</span>
                      {uploading && <RefreshCw className="w-4 h-4 text-white animate-spin opacity-40" />}
                    </label>
                    <div className="flex gap-2">
                      <input type="text" value={lessonFormData.videoUrl} onChange={(e) => setLessonFormData({ ...lessonFormData, videoUrl: e.target.value })}
                        className="flex-1 bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-all font-mono text-xs" placeholder="URL ou Upload..." />
                      <label className="flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black cursor-pointer transition-all">
                        <Upload className="w-6 h-6" />
                        <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'videoUrl')} />
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Material Complementar (PDF)</span>
                    </label>
                    <div className="flex gap-2">
                      <input type="text" value={lessonFormData.pdfUrl} onChange={(e) => setLessonFormData({ ...lessonFormData, pdfUrl: e.target.value })}
                        className="flex-1 bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600/50 transition-all font-mono text-xs" placeholder="URL do arquivo..." />
                      <label className="flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black cursor-pointer transition-all">
                        <Upload className="w-6 h-6" />
                        <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'pdfUrl')} />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <input type="checkbox" id="allowDownload" checked={lessonFormData.allowDownload} onChange={(e) => setLessonFormData({ ...lessonFormData, allowDownload: e.target.checked })}
                      className="w-6 h-6 accent-red-600 rounded-lg border-white/10" />
                    <label htmlFor="allowDownload" className="text-xs font-black uppercase tracking-widest text-zinc-400 cursor-pointer select-none">Permitir Donwload deste PDF</label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-10 border-t border-white/5">
                  <button type="button" onClick={() => setShowLessonForm(null)} className="px-8 py-5 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Cancelar</button>
                  <button type="submit" disabled={saving || uploading} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-[1.5rem] hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center gap-3">
                    {saving ? 'SINCRONIZANDO...' : 'PUBLICAR AULA'} <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
