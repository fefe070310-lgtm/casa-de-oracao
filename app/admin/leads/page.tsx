'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MoreVertical, MessageSquare, Mail, Phone, Calendar, RefreshCw } from 'lucide-react';

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Leads e Contatos</h1>
          <p className="text-zinc-400">Pessoas interessadas na Casa de Oração ou no Jump.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-sm">
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none min-w-[150px]">
            <option value="">Todos os Interesses</option>
            <option value="voluntariado">Voluntariado</option>
            <option value="doacao">Doações</option>
            <option value="duvida">Dúvidas</option>
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
                <th className="p-4 text-sm font-medium text-zinc-400">Contato</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Interesse</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Data</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Status</th>
                <th className="p-4 text-sm font-medium text-zinc-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    Carregando leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-medium">{lead.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{lead.name}</p>
                          <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                            {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-zinc-300 text-xs font-medium uppercase tracking-wider">
                        {lead.interest}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col text-sm text-zinc-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span className="text-xs text-zinc-600 mt-0.5">{new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {lead.responded ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
                          Respondido
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">
                          Pendente
                        </span>
                      )}
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
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-zinc-500">
          <p>Mostrando <span className="text-white">1</span> a <span className="text-white">{leads.length}</span> de <span className="text-white">{leads.length}</span> resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md hover:bg-white/5 transition-colors disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 bg-white/10 text-white rounded-md">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-white/5 transition-colors disabled:opacity-50" disabled>Próxima</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
