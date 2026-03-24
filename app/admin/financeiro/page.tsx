'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, DollarSign, Plus, RefreshCw, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

type DonationStats = {
  totalAmount: number;
  monthlyTotal: number;
  totalDonations: number;
  monthlyDonations: number;
};

type Donation = {
  id: string;
  amount: number;
  type: string;
  status: string;
  donorName: string | null;
  userId: string | null;
  user: { name: string; email: string } | null;
  createdAt: string;
};

export default function FinanceiroPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats>({ totalAmount: 0, monthlyTotal: 0, totalDonations: 0, monthlyDonations: 0 });
  const [chartData, setChartData] = useState<{ month: string, value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ amount: '', type: 'PIX', donorName: '' });
  const [saving, setSaving] = useState(false);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/donations');
      const data = await res.json();
      if (data.success) {
        setDonations(data.donations);
        setStats(data.stats);
        setChartData(data.chartData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDonations(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ amount: '', type: 'PIX', donorName: '' });
        fetchDonations();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const maxVal = Math.max(...chartData.map(d => d.value), 1000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 pb-32"
    >
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 font-display">Gestão Financeira</h1>
          <p className="text-zinc-400">Controle de dízimos, ofertas e doações sociais.</p>
        </div>
        <div className="flex gap-4">
           {/* Botões de Ação */}
          <button onClick={fetchDonations} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Registrar Doação
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <Wallet className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex items-center gap-1 text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
               <ArrowUpRight className="w-3 h-3" /> 12%
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Receita Histórica</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">{formatCurrency(stats.totalAmount)}</p>
        </div>
        
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Receita do Mês</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">{formatCurrency(stats.monthlyTotal)}</p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Doações Totais</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">{stats.totalDonations}</p>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-colors group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Mensalidade Ativa</h3>
          <p className="text-3xl font-black text-white font-display tracking-tighter">{stats.monthlyDonations}</p>
        </div>
      </div>

      {/* Financial Chart Section */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] -mr-32 -mt-32" />
        
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-2xl font-black text-white font-display tracking-tighter">Fluxo de Caixa</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Comparativo de performance semestral</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Entradas</span>
            </div>
          </div>
        </div>
 
        <div className="h-72 w-full flex items-end justify-between gap-3 md:gap-6 px-4 relative z-10">
          {chartData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
               <div className="relative w-full flex justify-center items-end h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxVal) * 100}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[48px] bg-gradient-to-t from-red-600 to-red-400 rounded-2xl relative group-hover:from-red-500 group-hover:to-red-300 transition-all shadow-2xl shadow-red-600/20"
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl">
                       {formatCurrency(item.value)}
                    </div>
                  </motion.div>
               </div>
               <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] group-hover:text-white transition-colors">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 font-display">Registrar Nova Doação</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Valor (R$)</label>
              <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                <option value="PIX">PIX</option>
                <option value="CreditCard">Cartão de Crédito</option>
                <option value="Recorrente">Recorrente</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Doador</label>
              <input type="text" value={formData.donorName} onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Anônimo (opcional)" />
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
                {saving ? 'Salvando...' : 'Registrar Doação'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Donations Table */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-4 text-sm font-medium text-zinc-400">Doador</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Valor</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Tipo</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Data</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Carregando doações...</td></tr>
              ) : donations.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Nenhuma doação registrada.</td></tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white text-sm font-medium">{donation.donorName || donation.user?.name || 'Anônimo'}</td>
                    <td className="p-4 text-emerald-500 font-bold text-sm">{formatCurrency(donation.amount)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-zinc-300 text-xs font-medium">{donation.type}</span>
                    </td>
                    <td className="p-4 text-zinc-400 text-sm">{new Date(donation.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">{donation.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
