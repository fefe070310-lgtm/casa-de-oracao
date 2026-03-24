'use client';

import { motion } from 'motion/react';
import { Settings, Globe, Bell, Shield, Palette, Database } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-display">Configurações</h1>
        <p className="text-zinc-400">Gerencie as preferências do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geral */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Globe className="w-5 h-5 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Informações Gerais</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Site</label>
              <input type="text" defaultValue="Casa de Oração & Jump"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">E-mail Principal</label>
              <input type="email" defaultValue="contato@casajump.com.br"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">WhatsApp</label>
              <input type="text" defaultValue="(12) 99999-9999"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
          </div>
          <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors text-sm">
            Salvar Alterações
          </button>
        </div>

        {/* Segurança */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Shield className="w-5 h-5 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Segurança</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Autenticação JWT</p>
                <p className="text-zinc-500 text-xs mt-1">Token de sessão via cookie seguro</p>
              </div>
              <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-md">Ativo</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Hash de Senha</p>
                <p className="text-zinc-500 text-xs mt-1">bcrypt com salt rounds = 10</p>
              </div>
              <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-md">Ativo</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Proteção de Rotas</p>
                <p className="text-zinc-500 text-xs mt-1">Middleware verifica role ADMIN</p>
              </div>
              <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-md">Ativo</span>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Bell className="w-5 h-5 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Novos Leads</p>
                <p className="text-zinc-500 text-xs mt-1">Receber alerta quando novo lead chegar</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Novas Doações</p>
                <p className="text-zinc-500 text-xs mt-1">Receber alerta de novas doações</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Novos Cadastros</p>
                <p className="text-zinc-500 text-xs mt-1">Receber alerta de novos usuários</p>
              </div>
              <div className="w-12 h-6 bg-zinc-700 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Database */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Database className="w-5 h-5 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Banco de Dados</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Provider</p>
                <p className="text-zinc-500 text-xs mt-1">PostgreSQL (Neon)</p>
              </div>
              <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-md">Conectado</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">ORM</p>
                <p className="text-zinc-500 text-xs mt-1">Prisma v7</p>
              </div>
              <span className="text-zinc-400 text-xs font-medium bg-zinc-800 px-2 py-1 rounded-md">v7.5.0</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Modelos</p>
                <p className="text-zinc-500 text-xs mt-1">User, Lead, Course, Event, Donation, BlogPost...</p>
              </div>
              <span className="text-zinc-400 text-xs font-medium bg-zinc-800 px-2 py-1 rounded-md">12 modelos</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
