'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MoreVertical, RefreshCw, Mail, Phone, Calendar, ShieldCheck, User as UserIcon } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Falha ao carregar usuários', data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Usuários do Sistema</h1>
          <p className="text-zinc-400">Gerencie contas, permissões e acessos.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
            Adicionar Usuário
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none min-w-[150px]">
            <option value="">Todos os Cargos</option>
            <option value="USER">Usuário Comum</option>
            <option value="LEADER">Líder</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-white/10 text-white rounded-xl hover:bg-zinc-800 transition-colors">
            <Filter className="w-5 h-5" /> Filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-4 text-sm font-medium text-zinc-400">Usuário</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Permissão</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Data de Cadastro</th>
                <th className="p-4 text-sm font-medium text-zinc-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    Carregando usuários...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    Nenhum usuário encontrado no sistema.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          {user.role === 'ADMIN' ? (
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <UserIcon className="w-5 h-5 text-zinc-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{user.name}</p>
                          <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                            {user.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider
                        ${user.role === 'ADMIN' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          user.role === 'LEADER' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                          'bg-white/10 text-zinc-300 border border-white/10'}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col text-sm text-zinc-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
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
