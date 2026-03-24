'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, RefreshCw, Layers, PlayCircle, Trash2 } from 'lucide-react';
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

  const inputStyle = {
    background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)',
    color: 'var(--admin-text-primary)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Delete Modal */}
      <AnimatePresence>
        {courseToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCourseToDelete(null)}
              className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl p-10 text-center" style={{
                background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-lg)'
              }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#FEF2F1', color: '#E8443A' }}>
                <Trash2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-3" style={{ color: 'var(--admin-text-primary)' }}>Apagar Curso?</h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--admin-text-muted)' }}>
                Isso apagará permanentemente o curso, todos os seus módulos e aulas. Esta ação não tem volta.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  disabled={saving}
                  onClick={confirmDelete}
                  className="w-full py-4 font-bold uppercase tracking-wider text-xs rounded-xl transition-all disabled:opacity-50"
                  style={{ background: '#E8443A', color: '#fff', boxShadow: '0 4px 12px rgba(232, 68, 58, 0.3)' }}>
                  {saving ? 'PROCESSANDO...' : 'SIM, APAGAR AGORA'}
                </button>
                <button
                  onClick={() => setCourseToDelete(null)}
                  disabled={saving}
                  className="w-full py-4 font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
                  style={{ color: 'var(--admin-text-muted)' }}>
                  CANCELAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Cursos e Aulas</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Gerencie módulos e conteúdos de ensino.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchCourses} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all text-sm"
            style={{ background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)' }}>
            <Plus className="w-4 h-4" /> Novo Curso
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl p-6 mb-8" style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}>
          <h2 className="text-lg font-bold mb-6 font-display" style={{ color: 'var(--admin-text-primary)' }}>Criar Novo Curso</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Título do Curso</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} placeholder="Ex: Fundamentos do Reino de Deus" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Descrição</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all resize-none" style={inputStyle} placeholder="Descrição detalhada do curso..." />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Capa do Curso</label>
                <div
                  className="relative aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  style={{ borderColor: formData.image ? 'var(--admin-border)' : 'var(--admin-border)' }}
                  onClick={() => document.getElementById('course-image')?.click()}
                >
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Trocar Imagem</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {uploading ? (
                        <RefreshCw className="w-8 h-8 animate-spin mb-2" style={{ color: 'var(--admin-active-text)' }} />
                      ) : (
                        <div className="p-4 rounded-full mb-2" style={{ background: 'var(--admin-bg)' }}>
                          <BookOpen className="w-6 h-6" style={{ color: 'var(--admin-text-muted)' }} />
                        </div>
                      )}
                      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--admin-text-muted)' }}>{uploading ? 'Subindo...' : 'Fazer upload da capa'}</p>
                    </>
                  )}
                  <input type="file" id="course-image" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4" style={{ borderTop: '1px solid var(--admin-border)' }}>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 transition-colors rounded-xl" style={{ color: 'var(--admin-text-muted)' }}>Cancelar</button>
              <button type="submit" disabled={saving || uploading} className="px-10 py-3 font-bold uppercase tracking-wider text-xs rounded-xl transition-all disabled:opacity-50"
                style={{ background: 'var(--admin-active-text)', color: '#fff' }}>
                {saving ? 'Criando...' : 'Criar Curso'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-24 flex flex-col items-center gap-4" style={{ color: 'var(--admin-text-muted)' }}>
            <RefreshCw className="w-10 h-10 animate-spin opacity-50" />
            <span className="uppercase text-[10px] font-bold tracking-widest">Sincronizando Biblioteca...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center py-20 rounded-2xl" style={{
            border: '2px dashed var(--admin-border)', color: 'var(--admin-text-muted)'
          }}>
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Nenhum curso catalogado.</p>
          </div>
        ) : (
          courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => router.push(`/admin/cursos/${course.id}`)}
              className="rounded-2xl overflow-hidden transition-all group cursor-pointer"
              style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div className="aspect-video flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--admin-bg)', borderBottom: '1px solid var(--admin-border)' }}>
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                ) : (
                  <BookOpen className="w-10 h-10" style={{ color: 'var(--admin-text-muted)', opacity: 0.3 }} />
                )}
                <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCourseToDelete(course.id); }}
                    className="p-2.5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(255,255,255,0.9)', color: '#E8443A', boxShadow: 'var(--admin-shadow-sm)' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold font-display mb-2 transition-colors" style={{ color: 'var(--admin-text-primary)' }}>{course.title}</h3>
                <p className="text-sm mb-5 line-clamp-2 leading-relaxed" style={{ color: 'var(--admin-text-muted)' }}>{course.description}</p>
                <div className="flex items-center gap-5 pt-4 text-xs font-semibold" style={{ borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)' }}>
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> {course.modules.length} módulos</span>
                  <span className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4" /> {course.modules.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0)} aulas</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
