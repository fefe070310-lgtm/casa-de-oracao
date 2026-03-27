'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Settings, 
  LogOut, 
  BarChart3, 
  Wallet, 
  Megaphone, 
  HeartPulse,
  MessageSquare,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomMenuBar } from '@/components/ui/bottom-menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', icon: BarChart3, label: 'Dashboard' },
    { href: '/admin/usuarios', icon: Users, label: 'Usuários' },
    { href: '/admin/mensagens', icon: MessageSquare, label: 'Mensagens / Chat' },
    { href: '/admin/leads', icon: Megaphone, label: 'Leads / Voluntários' },
    { href: '/admin/oracoes', icon: HeartPulse, label: 'Pedidos de Oração' },
    { href: '/admin/financeiro', icon: Wallet, label: 'Financeiro' },
    { href: '/admin/cursos', icon: BookOpen, label: 'Cursos & Aulas' },
    { href: '/admin/eventos', icon: Calendar, label: 'Eventos' },
    { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row antialiased" style={{ background: 'var(--admin-bg)' }}>
      <style jsx global>{`
        :root {
          --admin-bg: #F8FAFC;
          --admin-sidebar: #FFFFFF;
          --admin-card: #FFFFFF;
          --admin-border: #E2E8F0;
          --admin-text-primary: #0F172A;
          --admin-text-secondary: #475569;
          --admin-text-muted: #94A3B8;
          --admin-accent: #EF4444;
          --admin-accent-light: #FEF2F2;
          --admin-accent-hover: #DC2626;
          --admin-hover-bg: #F1F5F9;
          --admin-active-bg: #FEF2F2;
          --admin-active-text: #EF4444;
          --admin-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
          --admin-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          --admin-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{
        background: 'var(--admin-sidebar)',
        borderBottom: '1px solid var(--admin-border)',
        boxShadow: 'var(--admin-shadow-sm)'
      }}>
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto rounded" />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest" style={{
            color: 'var(--admin-accent)',
            border: '1px solid var(--admin-border)',
            background: 'var(--admin-accent-light)'
          }}>Admin</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--admin-text-primary)', background: 'var(--admin-hover-bg)' }}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`
              fixed md:relative inset-y-0 left-0 z-50
              w-72 md:w-64 lg:w-72 flex flex-col
              ${!isSidebarOpen && 'hidden md:flex'}
            `}
            style={{
              background: 'var(--admin-sidebar)',
              borderRight: '1px solid var(--admin-border)',
              boxShadow: isSidebarOpen ? 'var(--admin-shadow-lg)' : 'var(--admin-shadow-sm)'
            }}
          >
            <div className="p-8 hidden md:block" style={{ borderBottom: '1px solid var(--admin-border)' }}>
              <Link href="/" className="block mb-6 group">
                <img 
                  src="/logo.png" 
                  alt="Casa de Oração" 
                  className="w-28 h-auto rounded-xl transition-transform group-hover:scale-105" 
                  style={{ boxShadow: 'var(--admin-shadow-md)' }}
                />
              </Link>
              <p className="text-sm flex items-center gap-2 font-semibold tracking-tight" style={{ color: '#10B981' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} /> Sistema Online
              </p>
            </div>
            
            <nav className="flex-1 px-4 py-8 md:p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all text-sm group"
                    style={{
                      background: isActive ? 'var(--admin-active-bg)' : 'transparent',
                      color: isActive ? 'var(--admin-active-text)' : 'var(--admin-text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--admin-hover-bg)';
                        e.currentTarget.style.color = 'var(--admin-text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--admin-text-secondary)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg transition-all" style={{
                        background: isActive ? 'rgba(108, 92, 231, 0.15)' : 'transparent',
                        color: isActive ? 'var(--admin-active-text)' : 'var(--admin-text-muted)',
                      }}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" style={{ color: 'var(--admin-active-text)' }} />}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4" style={{ borderTop: '1px solid var(--admin-border)' }}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl font-semibold transition-all group"
                style={{ color: 'var(--admin-text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--admin-accent-light)';
                  e.currentTarget.style.color = 'var(--admin-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--admin-text-muted)';
                }}
              >
                <div className="p-2 rounded-lg transition-all">
                  <LogOut className="w-5 h-5" />
                </div>
                Sair
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:p-8 lg:p-10 mt-20 md:mt-0 max-h-screen overflow-y-auto p-4 pb-24 md:pb-4">
        <div className="w-full h-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomMenuBar
        items={navItems.slice(0, 5).map(item => ({ 
          icon: item.icon, 
          label: item.label === 'Leads / Voluntários' ? 'Leads' : item.label === 'Pedidos de Oração' ? 'Orações' : item.label, 
          href: item.href 
        }))}
      />

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
