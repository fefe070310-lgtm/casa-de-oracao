'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, CheckCircle2, Clock, RefreshCw, MessageSquare, Trash2 } from 'lucide-react';

type Prayer = {
  id: string;
  name: string;
  request: string;
  isPublic: boolean;
  status: string;
  createdAt: string;
};

export default function OracoesAdmin() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/prayers');
      const data = await res.json();
      setPrayers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 font-display">Pedidos de Oração</h1>
          <p className="text-zinc-400">Intercedendo por cada vida e cada necessidade.</p>
        </div>
        <button 
          onClick={fetchPrayers}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Buscando pedidos...</div>
        ) : prayers.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-white/5 text-zinc-500 text-lg">
            Nenhum pedido de oração encontrado.
          </div>
        ) : (
          prayers.map((prayer) => (
            <div 
              key={prayer.id}
              className="group bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/20 transition-all overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                 </button>
                 <button className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-all">
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <HeartPulse className="w-7 h-7 text-emerald-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{prayer.name}</h3>
                    {!prayer.isPublic && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-widest border border-white/5">Sigiloso</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6 uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatDate(prayer.createdAt)}</span>
                    <span className={`flex items-center gap-1.5 ${prayer.status === 'PENDING' ? 'text-amber-500' : 'text-emerald-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${prayer.status === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      {prayer.status === 'PENDING' ? 'Pendente' : 'Orado'}
                    </span>
                  </div>

                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 leading-relaxed text-zinc-300 italic group-hover:border-white/10 transition-colors">
                    "{prayer.request}"
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
