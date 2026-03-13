'use client';

import { motion } from 'motion/react';
import { Users, DollarSign, Calendar, BookOpen, Activity, Settings, LogOut, BarChart3, User, Wallet, Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white font-display">Admin Panel</h2>
          <p className="text-sm text-emerald-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-colors">
            <BarChart3 className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" /> Usuários
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Megaphone className="w-5 h-5" /> Leads / Voluntários
          </Link>
          <Link href="/admin/financeiro" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Wallet className="w-5 h-5" /> Financeiro
          </Link>
          <Link href="/admin/cursos" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Cursos & Aulas
          </Link>
          <Link href="/admin/eventos" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Calendar className="w-5 h-5" /> Eventos
          </Link>
          <Link href="/admin/configuracoes" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Configurações
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 w-full rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 font-display">Visão Geral</h1>
              <p className="text-zinc-400">Métricas e informações em tempo real.</p>
            </div>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
              Gerar Relatório
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <Users className="w-6 h-6 text-zinc-400" />
                </div>
                <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
              </div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Total de Membros</h3>
              <p className="text-3xl font-bold text-white font-display">2,450</p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-zinc-400" />
                </div>
                <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">+24</span>
              </div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Novos Leads (Mês)</h3>
              <p className="text-3xl font-bold text-white font-display">156</p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-zinc-400" />
                </div>
                <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">+18%</span>
              </div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Financeiro (Receita)</h3>
              <p className="text-3xl font-bold text-white font-display">R$ 15.420</p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <Activity className="w-6 h-6 text-zinc-400" />
                </div>
                <span className="text-zinc-500 text-sm font-medium bg-zinc-800 px-2 py-1 rounded-md">Hoje</span>
              </div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Visitas no Site</h3>
              <p className="text-3xl font-bold text-white font-display">1,204</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 font-display">Atividades Recentes</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Novo usuário registrado</p>
                      <p className="text-zinc-500 text-xs">João Silva se cadastrou na plataforma.</p>
                    </div>
                  </div>
                  <span className="text-zinc-500 text-xs font-medium">Há {i * 15} min</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors border border-white/10 rounded-xl hover:bg-white/5">
              Ver todas as atividades
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
