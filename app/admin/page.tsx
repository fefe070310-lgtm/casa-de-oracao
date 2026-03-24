'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Activity, User, Wallet, Megaphone, Plus, Calendar, ArrowRight, Loader2, HeartPulse, TrendingUp } from 'lucide-react';
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
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--admin-active-text)' }} />
    </div>
  );

  const statCards = [
    {
      icon: Users,
      label: 'Membros Ativos',
      value: data?.stats?.totalMembers || 0,
      color: '#6C5CE7',
      bgLight: '#F5F0FF',
    },
    {
      icon: Megaphone,
      label: 'Contatos',
      value: data?.stats?.totalLeads || 0,
      color: '#00B894',
      bgLight: '#E6FFF9',
      badge: data?.stats?.pendingLeads > 0 ? `${data?.stats?.pendingLeads} Leads` : null,
    },
    {
      icon: Wallet,
      label: 'Doações',
      value: formatCurrency(data?.stats?.totalRevenue || 0),
      color: '#E17055',
      bgLight: '#FFF4F0',
    },
    {
      icon: Activity,
      label: 'Orações',
      value: data?.stats?.prayerCount || 0,
      color: '#0984E3',
      bgLight: '#EDF5FF',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ ['--reduced' as string]: 'var(--reduced-motion, 0.5)' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>
            Visão Geral
          </h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>
            Atividade real do seu banco de dados em tempo real.
          </p>
        </div>
        <button className="px-5 py-2.5 font-semibold rounded-xl transition-all text-sm" style={{
          background: 'var(--admin-card)',
          border: '1px solid var(--admin-border)',
          color: 'var(--admin-text-secondary)',
          boxShadow: 'var(--admin-shadow-sm)',
        }}>
          Exportar Dados
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl p-5 transition-all cursor-default group"
            style={{
              background: 'var(--admin-card)',
              border: '1px solid var(--admin-border)',
              boxShadow: 'var(--admin-shadow-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--admin-shadow-md)';
              e.currentTarget.style.borderColor = card.color + '40';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--admin-shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--admin-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all" style={{
                background: card.bgLight,
                color: card.color,
              }}>
                <card.icon className="w-5 h-5" />
              </div>
              {card.badge && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{
                  color: card.color,
                  background: card.bgLight,
                }}>
                  {card.badge}
                </span>
              )}
            </div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--admin-text-muted)' }}>
              {card.label}
            </h3>
            <p className="text-2xl font-bold font-display tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <section className="lg:col-span-1">
          <div className="rounded-2xl p-6" style={{
            background: 'var(--admin-card)',
            border: '1px solid var(--admin-border)',
            boxShadow: 'var(--admin-shadow-sm)',
          }}>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--admin-text-primary)' }}>
              Atalhos
            </h2>
            <div className="space-y-2">
              {[
                { href: '/admin/financeiro', icon: Plus, label: 'Nova Doação', color: '#E17055', bg: '#FFF4F0' },
                { href: '/admin/oracoes', icon: HeartPulse, label: 'Ver Orações', color: '#0984E3', bg: '#EDF5FF' },
                { href: '/admin/eventos', icon: Calendar, label: 'Agendar Evento', color: '#6C5CE7', bg: '#F5F0FF' },
              ].map((shortcut) => (
                <Link
                  key={shortcut.href}
                  href={shortcut.href}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl transition-all group"
                  style={{
                    background: 'var(--admin-bg)',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = shortcut.color + '30';
                    e.currentTarget.style.background = shortcut.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = 'var(--admin-bg)';
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{
                      background: shortcut.bg,
                      color: shortcut.color,
                    }}>
                      <shortcut.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--admin-text-secondary)' }}>
                      {shortcut.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: 'var(--admin-text-muted)' }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl p-6" style={{
            background: 'var(--admin-card)',
            border: '1px solid var(--admin-border)',
            boxShadow: 'var(--admin-shadow-sm)',
          }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--admin-text-primary)' }}>
                Atividades Recentes
              </h2>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
            </div>
            <div className="space-y-2">
              {data?.activities?.length > 0 ? (
                data.activities.map((act: any) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-4 rounded-xl transition-all"
                    style={{
                      background: 'var(--admin-bg)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: act.type === 'USER' ? '#E6FFF9' : '#FFF4F0',
                        color: act.type === 'USER' ? '#00B894' : '#E17055',
                      }}>
                        {act.type === 'USER' ? <User className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--admin-text-primary)' }}>
                          {act.title}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>
                          {act.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold whitespace-nowrap ml-4" style={{ color: 'var(--admin-text-muted)' }}>
                      {new Date(act.time).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center rounded-xl" style={{ background: 'var(--admin-bg)', color: 'var(--admin-text-muted)' }}>
                  <Activity className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhuma atividade recente encontrada.</p>
                </div>
              )}
            </div>
            {data?.activities?.length > 0 && (
              <button
                className="w-full mt-5 py-3.5 text-sm font-semibold rounded-xl transition-all"
                style={{
                  color: 'var(--admin-active-text)',
                  background: 'var(--admin-active-bg)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(108, 92, 231, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                Ver Todas as Atividades
              </button>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
