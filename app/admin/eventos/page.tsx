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

  const typeColors: Record<string, { bg: string; text: string; border: string }> = {
    'Adoração': { bg: '#FFF8E6', text: '#E17055', border: '#E1705530' },
    'Culto': { bg: '#E6FFF9', text: '#00B894', border: '#00B89430' },
    'Jump': { bg: '#EDF5FF', text: '#0984E3', border: '#0984E330' },
    'Evento': { bg: '#F5F0FF', text: '#6C5CE7', border: '#6C5CE730' },
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
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Eventos e Agenda</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Gerencie cultos, adoração e eventos especiais.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchEvents} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all text-sm"
            style={{ background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)' }}>
            <Plus className="w-4 h-4" /> Novo Evento
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl p-6 mb-8"
          style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}
        >
          <h2 className="text-lg font-bold mb-6 font-display" style={{ color: 'var(--admin-text-primary)' }}>Criar Novo Evento</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Título</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} placeholder="Nome do evento" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Descrição</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all resize-none" style={inputStyle} placeholder="Descrição do evento" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Data</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Horário</label>
              <input type="time" required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Local</label>
              <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} placeholder="Local do evento" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Tipo</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all appearance-none" style={inputStyle}>
                <option value="Culto">Culto</option>
                <option value="Adoração">Adoração</option>
                <option value="Jump">Jump</option>
                <option value="Evento">Evento Especial</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 transition-colors rounded-xl" style={{ color: 'var(--admin-text-muted)' }}>Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-3 font-semibold rounded-xl transition-all disabled:opacity-50"
                style={{ background: 'var(--admin-active-text)', color: '#fff' }}>
                {saving ? 'Salvando...' : 'Criar Evento'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-sm" style={{ color: 'var(--admin-text-muted)' }}>Carregando eventos...</div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center py-12 text-sm" style={{ color: 'var(--admin-text-muted)' }}>
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            Nenhum evento cadastrado.
          </div>
        ) : (
          events.map((event, i) => {
            const tc = typeColors[event.type] || { bg: 'var(--admin-bg)', text: 'var(--admin-text-secondary)', border: 'var(--admin-border)' };
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-6 transition-all group"
                style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold" style={{
                    background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`
                  }}>{event.type}</span>
                  <button className="p-1 transition-all opacity-0 group-hover:opacity-100 rounded-lg" style={{ color: 'var(--admin-text-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--admin-hover-bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold mb-2 font-display" style={{ color: 'var(--admin-text-primary)' }}>{event.title}</h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--admin-text-muted)' }}>{event.description}</p>
                <div className="space-y-2 text-sm" style={{ color: 'var(--admin-text-secondary)' }}>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} /> {event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} /> {event.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} /> {event.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} /> {event.registrations?.length || 0} inscritos</div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
