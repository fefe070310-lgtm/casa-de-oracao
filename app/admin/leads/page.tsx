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
        <div className="flex w-full sm:w-auto gap-3">
          <button 
            onClick={fetchLeads}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all text-[11px] uppercase tracking-widest"
            style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', boxShadow: 'var(--admin-shadow-sm)' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 font-bold rounded-xl transition-all text-[11px] uppercase tracking-widest" style={{
            background: 'var(--admin-accent)', color: '#fff', boxShadow: 'var(--admin-shadow-md)'
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
        {/* Mobile View (Cards) */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-400">Carregando leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">Nenhum lead encontrado.</div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50 text-red-600 font-bold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{lead.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')} • {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {lead.responded ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">Respondido</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-orange-50 text-orange-600 border border-orange-100">Pendente</span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 transition-active active:scale-95">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase truncate">E-mail</span>
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 transition-active active:scale-95">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase truncate">Ligar</span>
                    </a>
                  )}
                </div>

                <div className="p-3 bg-red-50/30 rounded-xl border border-red-100/50">
                   <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1 italic">Interesse: {lead.interest}</p>
                   <p className="text-xs text-slate-600 line-clamp-2 italic">"{lead.message || 'Sem mensagem'}"</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF2F2', color: '#EF4444' }}>
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
