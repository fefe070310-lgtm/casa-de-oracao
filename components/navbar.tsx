'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Lightbulb, 
  Map, 
  Calendar, 
  PlaySquare, 
  ShoppingBag, 
  Heart, 
  User, 
  ShieldCheck,
  Menu,
  X 
} from 'lucide-react';
import { MenuBar } from '@/components/ui/glow-menu';

const navItems = [
  { icon: Home, label: 'Home', href: '/', iconColor: "text-blue-500", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)" },
  { icon: Map, label: 'Sobre', href: '/sobre', iconColor: "text-sky-500", gradient: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.06) 50%, rgba(3,105,161,0) 100%)" },
  { icon: Heart, label: 'A Casa', href: '/casa-de-oracao', iconColor: "text-red-500", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)" },
  { icon: Lightbulb, label: 'Jump', href: '/jump', iconColor: "text-red-500", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)" },
  { icon: Calendar, label: 'Agenda', href: '/agenda', iconColor: "text-orange-500", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)" },
  { icon: PlaySquare, label: 'Aulas', href: '/aulas', iconColor: "text-green-500", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)" },
  { icon: ShoppingBag, label: 'Bazar', href: '/bazar', iconColor: "text-sky-500", gradient: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.06) 50%, rgba(3,105,161,0) 100%)" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentItem = navItems.find((item) => item.href === pathname);
    if (currentItem) setActiveItem(currentItem.label);
    setIsMenuOpen(false); // Close menu on route change
  }, [pathname]);

  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label);
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-zinc-100 mx-auto transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-bold font-display tracking-tighter text-zinc-900">
            CASA<span className="text-red-600">JUMP</span>
          </span>
        </Link>

        {/* Glow Menu - Desktop Only (Center) */}
        <div className="hidden md:flex flex-1 justify-center max-w-4xl px-4">
          <MenuBar items={navItems} activeItem={activeItem} onItemClick={handleItemClick} />
        </div>

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/admin/login" className="p-2 text-zinc-500 hover:text-white transition-colors" title="Admin">
              <ShieldCheck className="w-4 h-4" />
            </Link>
            <Link href="/membros/login" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-5 py-2.5 rounded-full transition-all border border-zinc-200">
              <User className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </Link>
          </div>

          {/* Toggle Mobile Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-900 bg-zinc-100 rounded-xl border border-zinc-200 active:scale-95 transition-all"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-white bg-gradient-to-br from-white via-zinc-50 to-red-50/20 md:hidden pt-32 px-5 sm:px-8 pb-10 flex flex-col gap-6 overflow-y-auto"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8">Navegação Principal</p>
              {navItems.map((item) => {
                const isActive = item.label === activeItem;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all border ${
                      isActive 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-900 shadow-lg' 
                        : 'bg-zinc-50 border-zinc-100 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${isActive ? 'bg-white' : 'bg-zinc-200/50'}`}>
                        <Icon className={`w-6 h-6 ${isActive ? item.iconColor : 'text-zinc-500'}`} />
                      </div>
                      <span className="text-xl font-bold font-display">{item.label}</span>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto mb-12 flex flex-col gap-3">
              <Link href="/membros/login" className="w-full py-5 bg-zinc-900 text-white text-center font-bold rounded-3xl flex items-center justify-center gap-2 text-lg shadow-xl shadow-black/10">
                <User className="w-5 h-5" /> ÁREA DE MEMBROS
              </Link>
              <Link href="/admin/login" className="text-center py-4 text-zinc-400 hover:text-zinc-900 text-sm transition-colors">
                Acesso Administrativo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
