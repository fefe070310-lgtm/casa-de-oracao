'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle, 
  Reply, 
  User, 
  BookOpen, 
  Clock,
  Loader2,
  RefreshCw,
  MoreVertical,
  X
} from 'lucide-react';

type Comment = {
  id: string;
  text: string;
  adminReply: string | null;
  isRead: boolean;
  createdAt: string;
  user: { name: string; email: string };
  lesson: { 
    title: true; 
    module: { course: { title: string } } 
  };
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/comments';
      if (filter === 'unread') url += '?read=false';
      if (filter === 'read') url += '?read=true';
      
      const res = await fetch(url);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, adminReply: replyText }),
      });
      setReplyId(null);
      setReplyText('');
      fetchMessages();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-1 md:p-0"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Mensagens & Dúvidas</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Responda perguntas dos alunos e gerencie o suporte.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchMessages}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'unread', label: 'Não Lidas' },
          { id: 'read', label: 'Respondidas' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              filter === btn.id 
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
              : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 italic text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4 opacity-20" />
          Carregando mensagens...
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 text-slate-400">
          <MessageSquare className="w-12 h-12 mb-4 opacity-10" />
          <p className="text-sm font-semibold">Nenhuma mensagem encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <motion.div
              layout
              key={msg.id}
              className={`group relative rounded-[2rem] p-6 md:p-8 transition-all border ${
                !msg.isRead ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-white'
              }`}
            >
              {!msg.isRead && (
                 <div className="absolute top-8 right-8">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                 </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{msg.user.name}</h3>
                      <p className="text-xs text-slate-400">{msg.user.email}</p>
                    </div>
                  </div>

                  <div className="bg-white/50 border border-slate-100 rounded-2xl p-5 mb-6 text-slate-700 italic relative">
                    <div className="absolute -top-3 left-6 px-2 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 rounded">Pergunta do Aluno</div>
                    "{msg.text}"
                  </div>

                  {msg.adminReply ? (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-slate-800 relative">
                       <div className="absolute -top-3 left-6 px-2 bg-red-50 text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-100 rounded">Sua Resposta</div>
                       {msg.adminReply}
                    </div>
                  ) : (
                    <AnimatePresence>
                      {replyId === msg.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Escreva sua resposta para o aluno..."
                            className="w-full rounded-2xl p-4 text-sm border border-red-200 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white min-h-[120px]"
                          />
                          <div className="flex gap-2">
                            <button
                              disabled={submitting}
                              onClick={() => handleReply(msg.id)}
                              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-50"
                            >
                              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Reply className="w-4 h-4" />}
                              Enviar Resposta
                            </button>
                            <button
                              onClick={() => setReplyId(null)}
                              className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
                            >
                              Cancelar
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setReplyId(msg.id)}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                        >
                          <Reply className="w-4 h-4" /> Responder Aluno
                        </button>
                      )}
                    </AnimatePresence>
                  )}
                </div>

                <div className="md:w-64 flex flex-col gap-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Contexto</p>
                    <div className="flex items-start gap-2 mb-3">
                       <BookOpen className="w-3.5 h-3.5 text-red-500 mt-0.5" />
                       <p className="text-[11px] font-bold text-slate-700 leading-tight">
                        {msg.lesson.module.course.title}
                       </p>
                    </div>
                    <div className="flex items-start gap-2">
                       <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                       <span className="text-[11px] text-slate-500">Aula: {msg.lesson.title}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => markAsRead(msg.id, msg.isRead)}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        msg.isRead 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {msg.isRead ? 'Lida' : 'Marcar como Lida'}
                    </button>
                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
                       {new Date(msg.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
