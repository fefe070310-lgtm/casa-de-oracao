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
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    { href: '/admin/leads', icon: Megaphone, label: 'Leads / Voluntários' },
    { href: '/admin/oracoes', icon: HeartPulse, label: 'Pedidos de Oração' },
    { href: '/admin/financeiro', icon: Wallet, label: 'Financeiro' },
    { href: '/admin/cursos', icon: BookOpen, label: 'Cursos & Aulas' },
    { href: '/admin/eventos', icon: Calendar, label: 'Eventos' },
    { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded" />
          <span className="text-[10px] text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded uppercase tracking-widest">Admin</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white bg-white/5 rounded-lg border border-white/5"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop and Mobile Drawer */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`
              fixed md:relative inset-y-0 left-0 z-50
              w-72 md:w-64 lg:w-72 bg-zinc-950 border-r border-white/10 flex flex-col
              shadow-2xl md:shadow-none
              ${!isSidebarOpen && 'hidden md:flex'}
            `}
          >
            <div className="p-8 border-b border-white/10 hidden md:block">
              <Link href="/" className="block mb-6 group">
                <img 
                  src="/logo.jpg" 
                  alt="Casa de Oração" 
                  className="w-32 h-auto rounded-xl shadow-2xl transition-transform group-hover:scale-105" 
                />
              </Link>
              <p className="text-sm text-emerald-500 flex items-center gap-2 font-bold tracking-tight">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sistema Online
              </p>
            </div>
            
            <div className="flex-1 px-4 py-8 md:p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold transition-all text-sm group ${
                      isActive
                        ? 'bg-white/10 text-white shadow-lg'
                        : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white' : 'bg-transparent text-zinc-600 group-hover:text-white'}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-zinc-600" />}
                  </Link>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-5 py-4 text-zinc-600 hover:text-red-400 w-full rounded-2xl font-bold transition-all group hover:bg-red-500/5"
              >
                <div className="p-2 rounded-xl bg-transparent group-hover:bg-red-500/10 text-zinc-700 group-hover:text-red-500 transition-all">
                  <LogOut className="w-5 h-5" />
                </div>
                Sair
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:p-8 lg:p-12 mt-20 md:mt-0 max-h-screen overflow-y-auto">
        <div className="w-full h-full">
          {children}
        </div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
