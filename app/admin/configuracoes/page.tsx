'use client';

import { motion } from 'motion/react';
import { Settings, Globe, Bell, Shield, Database } from 'lucide-react';

export default function ConfiguracoesPage() {
  const inputStyle = {
    background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)',
    color: 'var(--admin-text-primary)',
  };

  const cardStyle = {
    background: 'var(--admin-card)',
    border: '1px solid var(--admin-border)',
    boxShadow: 'var(--admin-shadow-sm)',
  };

  const itemStyle = {
    background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Configurações</h1>
        <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Gerencie as preferências do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geral */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F5F0FF', color: '#6C5CE7' }}>
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-display" style={{ color: 'var(--admin-text-primary)' }}>Informações Gerais</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>Nome do Site</label>
              <input type="text" defaultValue="Casa de Oração & Jump"
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>E-mail Principal</label>
              <input type="email" defaultValue="contato@casajump.com.br"
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--admin-text-secondary)' }}>WhatsApp</label>
              <input type="text" defaultValue="(12) 99999-9999"
                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all" style={inputStyle} />
            </div>
          </div>
          <button className="mt-6 px-6 py-3 font-semibold rounded-xl transition-all text-sm"
            style={{ background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)' }}>
            Salvar Alterações
          </button>
        </div>

        {/* Segurança */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E6FFF9', color: '#00B894' }}>
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-display" style={{ color: 'var(--admin-text-primary)' }}>Segurança</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Autenticação JWT', desc: 'Token de sessão via cookie seguro', status: 'Ativo' },
              { title: 'Hash de Senha', desc: 'bcrypt com salt rounds = 10', status: 'Ativo' },
              { title: 'Proteção de Rotas', desc: 'Middleware verifica role ADMIN', status: 'Ativo' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between p-4 rounded-xl" style={itemStyle}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--admin-text-primary)' }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>{item.desc}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: '#E6FFF9', color: '#00B894' }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notificações */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF4F0', color: '#E17055' }}>
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-display" style={{ color: 'var(--admin-text-primary)' }}>Notificações</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Novos Leads', desc: 'Receber alerta quando novo lead chegar', active: true },
              { title: 'Novas Doações', desc: 'Receber alerta de novas doações', active: true },
              { title: 'Novos Cadastros', desc: 'Receber alerta de novos usuários', active: false },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between p-4 rounded-xl" style={itemStyle}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--admin-text-primary)' }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>{item.desc}</p>
                </div>
                <div className="w-11 h-6 rounded-full relative cursor-pointer transition-all" style={{
                  background: item.active ? '#00B894' : '#D1D5DB',
                }}>
                  <div className="absolute top-1 w-4 h-4 rounded-full transition-all" style={{
                    background: '#fff',
                    left: item.active ? '24px' : '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EDF5FF', color: '#0984E3' }}>
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-display" style={{ color: 'var(--admin-text-primary)' }}>Banco de Dados</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Provider', desc: 'PostgreSQL (Neon)', badge: 'Conectado', badgeBg: '#E6FFF9', badgeColor: '#00B894' },
              { title: 'ORM', desc: 'Prisma v7', badge: 'v7.5.0', badgeBg: 'var(--admin-bg)', badgeColor: 'var(--admin-text-secondary)' },
              { title: 'Modelos', desc: 'User, Lead, Course, Event, Donation, BlogPost...', badge: '12 modelos', badgeBg: 'var(--admin-bg)', badgeColor: 'var(--admin-text-secondary)' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between p-4 rounded-xl" style={itemStyle}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--admin-text-primary)' }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>{item.desc}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: item.badgeBg, color: item.badgeColor }}>{item.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
