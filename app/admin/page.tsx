'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Activity, User, Wallet, Megaphone, Plus, Calendar, Settings, ArrowRight, Loader2, HeartPulse } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Visão Geral</h1>
          <p className="text-zinc-400">Atividade real do seu banco de dados em tempo real.</p>
        </div>
        <div className="flex gap-4">
           <button className="px-4 py-2 bg-zinc-900 border border-white/10 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors text-sm">
             Exportar Dados
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <Users className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Membros Ativos</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">
            {data?.stats?.totalMembers || 0}
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <Megaphone className="w-6 h-6 text-red-500" />
            </div>
            {data?.stats?.pendingLeads > 0 && (
              <span className="text-red-500 text-[10px] font-black bg-red-500/10 px-2 py-1 rounded-md tracking-widest uppercase">
                {data?.stats?.pendingLeads} Leads
              </span>
            )}
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Contatos</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">
            {data?.stats?.totalLeads || 0}
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <Wallet className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Doações</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">
            {formatCurrency(data?.stats?.totalRevenue || 0)}
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <Activity className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Orações</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">
            {data?.stats?.prayerCount || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
              <h2 className="text-lg font-black text-white mb-6 font-display uppercase tracking-widest">Atalhos</h2>
              <div className="space-y-3">
                 <Link href="/admin/financeiro" className="w-full flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-red-500/30 group transition-all">
                    <div className="flex items-center gap-3">
                       <Plus className="w-5 h-5 text-red-500" />
                       <span className="text-sm font-black text-zinc-300 uppercase tracking-widest text-[10px]">Nova Doação</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-red-500 transition-all" />
                 </Link>
                 <Link href="/admin/oracoes" className="w-full flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-red-500/30 group transition-all">
                    <div className="flex items-center gap-3">
                       <HeartPulse className="w-5 h-5 text-red-500" />
                       <span className="text-sm font-black text-zinc-300 uppercase tracking-widest text-[10px]">Ver Orações</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-red-500 transition-all" />
                 </Link>
                 <Link href="/admin/eventos" className="w-full flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-red-500/30 group transition-all">
                    <div className="flex items-center gap-3">
                       <Calendar className="w-5 h-5 text-red-500" />
                       <span className="text-sm font-black text-zinc-300 uppercase tracking-widest text-[10px]">Agendar Evento</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-red-500 transition-all" />
                 </Link>
              </div>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
           <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 font-display">Atividades Recentes</h2>
            <div className="space-y-4">
              {data?.activities?.length > 0 ? (
                data.activities.map((act: any) => (
                  <div key={act.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-800 ${
                        act.type === 'USER' ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        {act.type === 'USER' ? <User className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm tracking-tight">{act.title}</p>
                        <p className="text-zinc-500 text-xs">{act.desc}</p>
                      </div>
                    </div>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      {new Date(act.time).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-600 italic">
                   Nenhuma atividade recente encontrada.
                </div>
              )}
            </div>
            {data?.activities?.length > 0 && (
              <button className="w-full mt-6 py-4 text-sm font-bold text-zinc-500 hover:text-white transition-colors border border-white/5 rounded-2xl hover:bg-white/5">
                Ver Todas as Atividades
              </button>
            )}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
