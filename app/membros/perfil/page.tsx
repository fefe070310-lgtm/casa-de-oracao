'use client';

import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, BookOpen, Clock, Award, Save } from 'lucide-react';
import { useState } from 'react';

export default function PerfilPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulated save for now
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-white mb-2 font-display">Meu Perfil</h1>
      <p className="text-zinc-400 mb-10">Gerencie suas informações pessoais.</p>

      {/* Profile Header */}
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-black border-2 border-white/10 flex items-center justify-center">
            <User className="w-12 h-12 text-zinc-500" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white font-display">Aluno</h2>
            <p className="text-zinc-400 text-sm mt-1">Membro desde março 2026</p>
            <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
                <Award className="w-3 h-3" /> Membro Ativo
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-medium border border-white/10">
                <BookOpen className="w-3 h-3" /> 3 cursos
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-medium border border-white/10">
                <Clock className="w-3 h-3" /> 12h de aulas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 font-display">Informações Pessoais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> Nome Completo</span>
            </label>
            <input type="text" defaultValue="Aluno" 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> E-mail</span>
            </label>
            <input type="email" defaultValue="aluno@email.com" 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> Telefone</span>
            </label>
            <input type="text" placeholder="(00) 00000-0000" 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Cidade</span>
            </label>
            <input type="text" placeholder="Sua cidade" 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <h3 className="text-xl font-bold text-white mb-6 font-display">Alterar Senha</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Senha Atual</label>
              <input type="password" placeholder="••••••••" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Nova Senha</label>
              <input type="password" placeholder="••••••••" 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          {saved && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-500 text-sm mr-4 self-center"
            >
              ✓ Alterações salvas!
            </motion.span>
          )}
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
