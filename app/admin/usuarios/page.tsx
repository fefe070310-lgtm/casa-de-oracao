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

  const roleBadge = (role: string) => {
    const map: Record<string, { bg: string; text: string; border: string }> = {
      ADMIN: { bg: '#E6FFF9', text: '#00B894', border: '#00B89430' },
      LEADER: { bg: '#EDF5FF', text: '#0984E3', border: '#0984E330' },
      USER: { bg: '#F5F6FA', text: '#6B7085', border: '#E8EAF0' },
    };
    const style = map[role] || map.USER;
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider" style={{
        background: style.bg, color: style.text, border: `1px solid ${style.border}`
      }}>
        {role}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Usuários do Sistema</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Gerencie contas, permissões e acessos.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all text-sm" style={{
            background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)'
          }}>
            Adicionar Usuário
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--admin-text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            className="w-full rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none transition-all"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)', boxShadow: 'var(--admin-shadow-sm)' }}
          />
        </div>
        <div className="flex gap-3">
          <select className="rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none min-w-[150px]"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <option value="">Todos os Cargos</option>
            <option value="USER">Usuário Comum</option>
            <option value="LEADER">Líder</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <Filter className="w-5 h-5" /> Filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', boxShadow: 'var(--admin-shadow-sm)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', background: 'var(--admin-bg)' }}>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Usuário</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Permissão</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Data de Cadastro</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--admin-text-muted)' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                    Carregando usuários...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                    Nenhum usuário encontrado no sistema.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="group transition-colors" style={{ borderBottom: '1px solid var(--admin-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--admin-bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                          background: user.role === 'ADMIN' ? '#E6FFF9' : '#F5F0FF',
                          color: user.role === 'ADMIN' ? '#00B894' : '#6C5CE7',
                        }}>
                          {user.role === 'ADMIN' ? (
                            <ShieldCheck className="w-5 h-5" />
                          ) : (
                            <UserIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--admin-text-primary)' }}>{user.name}</p>
                          <div className="flex items-center gap-3 text-xs mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                            {user.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{roleBadge(user.role)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--admin-text-secondary)' }}>
                        <Calendar className="w-3.5 h-3.5" /> {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100" style={{ color: 'var(--admin-text-muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--admin-hover-bg)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
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
