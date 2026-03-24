'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MoreVertical, Mail, Phone, Calendar, RefreshCw } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  interest: string;
  message: string | null;
  responded: boolean;
  createdAt: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      } else {
        console.error('Falha ao carregar leads', data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 font-display" style={{ color: 'var(--admin-text-primary)' }}>Leads e Contatos</h1>
          <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Pessoas interessadas na Casa de Oração ou no Jump.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all text-sm" style={{
            background: 'var(--admin-active-text)', color: '#fff', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)'
          }}>
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--admin-text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
            className="w-full rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none transition-all"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)', boxShadow: 'var(--admin-shadow-sm)' }}
          />
        </div>
        <div className="flex gap-3">
          <select className="rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none min-w-[150px]"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}>
            <option value="">Todos os Interesses</option>
            <option value="voluntariado">Voluntariado</option>
            <option value="doacao">Doações</option>
            <option value="duvida">Dúvidas</option>
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
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Contato</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Interesse</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Data</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--admin-text-muted)' }}>Status</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--admin-text-muted)' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                    Carregando leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm" style={{ color: 'var(--admin-text-muted)' }}>
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="group transition-colors" style={{ borderBottom: '1px solid var(--admin-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--admin-bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F5F0FF', color: '#6C5CE7' }}>
                          <span className="font-semibold text-sm">{lead.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--admin-text-primary)' }}>{lead.name}</p>
                          <div className="flex items-center gap-3 text-xs mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                            {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider" style={{
                        background: 'var(--admin-bg)', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)'
                      }}>
                        {lead.interest}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm" style={{ color: 'var(--admin-text-secondary)' }}>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span className="text-xs mt-0.5 block" style={{ color: 'var(--admin-text-muted)' }}>
                          {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {lead.responded ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{
                          background: '#E6FFF9', color: '#00B894', border: '1px solid #00B89430'
                        }}>
                          Respondido
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{
                          background: '#FFF8E6', color: '#E17055', border: '1px solid #E1705530'
                        }}>
                          Pendente
                        </span>
                      )}
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
        
        {/* Pagination */}
        <div className="p-4 flex items-center justify-between text-sm" style={{ borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)' }}>
          <p>Mostrando <span style={{ color: 'var(--admin-text-primary)' }}>1</span> a <span style={{ color: 'var(--admin-text-primary)' }}>{leads.length}</span> de <span style={{ color: 'var(--admin-text-primary)' }}>{leads.length}</span> resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg transition-colors disabled:opacity-50" disabled style={{ color: 'var(--admin-text-muted)' }}>Anterior</button>
            <button className="px-3 py-1 rounded-lg font-semibold" style={{ background: 'var(--admin-active-bg)', color: 'var(--admin-active-text)' }}>1</button>
            <button className="px-3 py-1 rounded-lg transition-colors disabled:opacity-50" disabled style={{ color: 'var(--admin-text-muted)' }}>Próxima</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
