'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, RefreshCw, Layers, PlayCircle, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Lesson = {
  id: string;
  title: string;
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
  createdAt: string;
};

export default function CursosPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error('Erro no upload:', err);
      alert('Falha ao subir imagem de capa.');
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '', image: '' });
        fetchCourses();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Erro ao criar curso.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao tentar criar curso.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setCourseToDelete(null);
        fetchCourses();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Não foi possível deletar o curso.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao tentar deletar o curso.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <AnimatePresence>
        {courseToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCourseToDelete(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-red-900/20 w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden text-center">
               <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-600/20">
                  <Trash2 className="w-12 h-12 text-red-600" />
               </div>
               <h2 className="text-3xl font-black text-white font-display mb-4 uppercase tracking-tighter">Apagar Curso?</h2>
               <p className="text-zinc-500 text-sm mb-12 font-light leading-relaxed">Isso apagará permanentemente o curso, todos os seus módulos e aulas. Esta ação não tem volta.</p>
               <div className="flex flex-col gap-3">
                  <button 
                    disabled={saving}
                    onClick={confirmDelete}
                    className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-2xl shadow-red-600/20"
                  >
                    {saving ? 'PROCESSANDO...' : 'SIM, APAGAR AGORA'}
                  </button>
                  <button 
                    onClick={() => setCourseToDelete(null)}
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

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Cursos e Aulas</h1>
          <p className="text-zinc-400">Gerencie módulos e conteúdos de ensino.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchCourses} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Novo Curso
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 font-display">Criar Novo Curso</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Título do Curso</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Ex: Fundamentos do Reino de Deus" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Descrição</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Descrição detalhada do curso..." />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Capa do Curso</label>
                <div 
                  className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer ${
                    formData.image ? 'border-zinc-500' : 'border-zinc-800 hover:border-zinc-600'
                  }`}
                  onClick={() => document.getElementById('course-image')?.click()}
                >
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Trocar Imagem</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {uploading ? (
                        <RefreshCw className="w-8 h-8 text-white animate-spin mb-2" />
                      ) : (
                        <div className="bg-white/5 p-4 rounded-full mb-2">
                           <BookOpen className="w-6 h-6 text-zinc-600" />
                        </div>
                      )}
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{uploading ? 'Subindo...' : 'Fazer upload da capa'}</p>
                    </>
                  )}
                  <input type="file" id="course-image" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">Cancelar</button>
              <button type="submit" disabled={saving || uploading} className="px-10 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
                {saving ? 'Criando...' : 'Criar Curso'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-zinc-500 py-24 opacity-50 flex flex-col items-center gap-4">
            <RefreshCw className="w-10 h-10 animate-spin" />
            <span className="uppercase text-[10px] font-black tracking-widest">Sincronizando Biblioteca...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-zinc-500 py-20 border border-dashed border-white/10 rounded-[3rem]">
             <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p className="uppercase text-[10px] font-black tracking-widest">Nenhum curso catalogado.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => router.push(`/admin/cursos/${course.id}`)}
              className="bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all group cursor-pointer block hover:shadow-2xl hover:shadow-black"
            >
              <div className="aspect-video bg-black flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <BookOpen className="w-10 h-10 text-zinc-800" />
                )}
                <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                   <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCourseToDelete(course.id);
                    }} 
                    className="p-3 text-zinc-500 hover:text-white hover:bg-red-600 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10"
                   >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-red-500 transition-colors uppercase tracking-tight">{course.title}</h3>
                <p className="text-sm text-zinc-500 mb-6 line-clamp-2 font-light leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-6 pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-zinc-600" /> {course.modules.length} módulos</span>
                  <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-zinc-600" /> {course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} aulas</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
