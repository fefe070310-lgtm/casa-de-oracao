'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, CheckCircle2, Clock, RefreshCw, Trash2 } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Pedidos de Oração</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Intercedendo por cada vida e cada necessidade.</p>
        </div>
        <button 
          onClick={fetchPrayers}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
          style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {loading ? (
          <div className="text-center py-20 text-sm" style={{ color: 'var(--admin-text-muted)' }}>Buscando pedidos...</div>
        ) : prayers.length === 0 ? (
          <div className="text-center py-20 rounded-2xl text-sm" style={{
            background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', boxShadow: 'var(--admin-shadow-sm)'
          }}>
            <HeartPulse className="w-10 h-10 mx-auto mb-3 opacity-30" />
            Nenhum pedido de oração encontrado.
          </div>
        ) : (
          prayers.map((prayer) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-2xl p-6 md:p-8 transition-all overflow-hidden relative"
              style={{
                background: 'var(--admin-card)',
                border: '1px solid var(--admin-border)',
                boxShadow: 'var(--admin-shadow-sm)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-sm)'; }}
            >
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-2 rounded-lg transition-all" style={{ background: '#E6FFF9', color: '#00B894' }}>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg transition-all" style={{ background: '#FEF2F1', color: '#E8443A' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                  background: '#E6FFF9', color: '#00B894', border: '1px solid #00B89420'
                }}>
                  <HeartPulse className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--admin-text-primary)' }}>{prayer.name}</h3>
                    {!prayer.isPublic && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{
                        background: 'var(--admin-bg)', color: 'var(--admin-text-muted)', border: '1px solid var(--admin-border)'
                      }}>Sigiloso</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs mb-4 font-semibold" style={{ color: 'var(--admin-text-muted)' }}>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatDate(prayer.createdAt)}</span>
                    <span className="flex items-center gap-1.5" style={{ color: prayer.status === 'PENDING' ? '#E17055' : '#00B894' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: prayer.status === 'PENDING' ? '#E17055' : '#00B894' }} />
                      {prayer.status === 'PENDING' ? 'Pendente' : 'Orado'}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl leading-relaxed italic text-sm" style={{
                    background: 'var(--admin-bg)',
                    border: '1px solid var(--admin-border)',
                    color: 'var(--admin-text-secondary)',
                  }}>
                    &ldquo;{prayer.request}&rdquo;
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
