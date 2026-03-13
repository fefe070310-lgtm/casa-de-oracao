'use client';

import { motion } from 'motion/react';
import { PlayCircle, CheckCircle, Clock, BookOpen, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function MembrosDashboard() {
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white font-display">Meu Painel</h2>
          <p className="text-sm text-zinc-500 mt-1">Bem-vindo, Aluno</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/membros" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Meus Cursos
          </Link>
          <Link href="/membros/perfil" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <User className="w-5 h-5" /> Meu Perfil
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 w-full rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Continue Aprendendo</h1>
          <p className="text-zinc-400 mb-10">Retome de onde você parou.</p>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-full md:w-1/3 aspect-video bg-black rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
              <PlayCircle className="w-12 h-12 text-white/50" />
            </div>
            <div className="flex-1 w-full">
              <div className="text-sm text-zinc-500 font-medium mb-2">Módulo 1 • Aula 3</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">O Poder da Intercessão</h3>
              <div className="w-full bg-black rounded-full h-2 mb-4">
                <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-6">
                <span>45% concluído</span>
                <span>12 min restantes</span>
              </div>
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Continuar Assistindo
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 font-display">Seus Módulos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-zinc-400" />
                  </div>
                  {i === 1 ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Concluído
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-zinc-400 bg-zinc-900 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> Em andamento
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">Módulo {i}</h3>
                <p className="text-sm text-zinc-500 mb-4">Fundamentos do Reino de Deus e a vida cristã.</p>
                <div className="w-full bg-zinc-900 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${i === 1 ? 'bg-emerald-500 w-full' : 'bg-white w-1/3'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
