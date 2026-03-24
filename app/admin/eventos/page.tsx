'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Plus, RefreshCw, Users, MoreVertical } from 'lucide-react';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  registrations: { id: string }[];
  createdAt: string;
};

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', type: 'Culto',
  });
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/events');
      const data = await res.json();
      if (data.success) setEvents(data.events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '', date: '', time: '', location: '', type: 'Culto' });
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const typeColors: Record<string, string> = {
    'Adoração': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Culto': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Jump': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Evento': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Eventos e Agenda</h1>
          <p className="text-zinc-400">Gerencie cultos, adoração e eventos especiais.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchEvents} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Novo Evento
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 font-display">Criar Novo Evento</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Título</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Nome do evento" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Descrição</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Descrição do evento" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Data</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Horário</label>
              <input type="time" required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Local</label>
              <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Local do evento" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                <option value="Culto">Culto</option>
                <option value="Adoração">Adoração</option>
                <option value="Jump">Jump</option>
                <option value="Evento">Evento Especial</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
                {saving ? 'Salvando...' : 'Criar Evento'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-zinc-500 py-12">Carregando eventos...</div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center text-zinc-500 py-12">Nenhum evento cadastrado.</div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[event.type] || 'bg-white/10 text-zinc-300 border-white/10'}`}>
                  {event.type}
                </span>
                <button className="p-1 text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-display">{event.title}</h3>
              <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{event.description}</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.time}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {event.registrations?.length || 0} inscritos</div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
