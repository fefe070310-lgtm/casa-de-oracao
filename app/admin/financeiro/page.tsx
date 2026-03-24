'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, DollarSign, Plus, RefreshCw, Calendar, ArrowUpRight } from 'lucide-react';

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

  const financeCards = [
    { icon: Wallet, label: 'Receita Histórica', value: formatCurrency(stats.totalAmount), color: '#E17055', bg: '#FFF4F0', badge: '12%' },
    { icon: TrendingUp, label: 'Receita do Mês', value: formatCurrency(stats.monthlyTotal), color: '#00B894', bg: '#E6FFF9' },
    { icon: DollarSign, label: 'Doações Totais', value: stats.totalDonations, color: '#0984E3', bg: '#EDF5FF' },
    { icon: Calendar, label: 'Mensalidade Ativa', value: stats.monthlyDonations, color: '#6C5CE7', bg: '#F5F0FF' },
  ];

  const inputStyle = {
    background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)',
    color: 'var(--admin-text-primary)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Gestão Financeira</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Controle de dízimos, ofertas e doações sociais.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchDonations} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all text-sm"
            style={{ background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)' }}>
            <Plus className="w-4 h-4" /> Registrar Doação
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {financeCards.map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl p-5 transition-all"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--admin-shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: card.bg, color: card.color }}>
                <card.icon className="w-5 h-5" />
              </div>
              {card.badge && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: card.color, background: card.bg }}>
                  <ArrowUpRight className="w-3 h-3" /> {card.badge}
                </span>
              )}
            </div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--admin-text-muted)' }}>{card.label}</h3>
            <p className="text-2xl font-bold font-display tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold font-display" style={{ color: 'var(--admin-text-primary)' }}>Fluxo de Caixa</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--admin-text-muted)' }}>Comparativo de performance semestral</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#6C5CE7' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--admin-text-muted)' }}>Entradas</span>
          </div>
        </div>

        <div className="h-64 w-full flex items-end justify-between gap-3 md:gap-6 px-4">
          {chartData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
              <div className="relative w-full flex justify-center items-end h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxVal) * 100}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[48px] rounded-xl relative transition-all"
                  style={{ background: 'linear-gradient(to top, #6C5CE7, #a29bfe)' }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap"
                    style={{ background: 'var(--admin-text-primary)', color: '#fff', boxShadow: 'var(--admin-shadow-md)' }}>
                    {formatCurrency(item.value)}
                  </div>
                </motion.div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider transition-colors" style={{ color: 'var(--admin-text-muted)' }}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl p-6 mb-8" style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}>
          <h2 className="text-lg font-bold mb-6 font-display" style={{ color: 'var(--admin-text-primary)' }}>Registrar Nova Doação</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Valor (R$)</label>
              <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Tipo</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all appearance-none" style={inputStyle}>
                <option value="PIX">PIX</option>
                <option value="CreditCard">Cartão de Crédito</option>
                <option value="Recorrente">Recorrente</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Nome do Doador</label>
              <input type="text" value={formData.donorName} onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} placeholder="Anônimo (opcional)" />
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 transition-colors rounded-xl" style={{ color: 'var(--admin-text-muted)' }}>Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-3 font-semibold rounded-xl transition-all disabled:opacity-50"
                style={{ background: 'var(--admin-active-text)', color: '#fff' }}>
                {saving ? 'Salvando...' : 'Registrar Doação'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Donations Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', background: 'var(--admin-bg)' }}>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Doador</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Valor</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Tipo</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Data</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>Carregando doações...</td></tr>
              ) : donations.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>Nenhuma doação registrada.</td></tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="transition-colors" style={{ borderBottom: '1px solid var(--admin-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--admin-bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                    <td className="p-4 text-sm font-semibold" style={{ color: 'var(--admin-text-primary)' }}>{donation.donorName || donation.user?.name || 'Anônimo'}</td>
                    <td className="p-4 font-bold text-sm" style={{ color: '#00B894' }}>{formatCurrency(donation.amount)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: 'var(--admin-bg)', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)' }}>{donation.type}</span>
                    </td>
                    <td className="p-4 text-sm" style={{ color: 'var(--admin-text-secondary)' }}>{new Date(donation.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: '#E6FFF9', color: '#00B894', border: '1px solid #00B89430' }}>{donation.status}</span>
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
