'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Casa de Oração', href: '/casa-de-oracao' },
  { name: 'Jump', href: '/jump' },
  { name: 'Agenda', href: '/agenda' },
  { name: 'Aulas', href: '/aulas' },
  { name: 'Bazar', href: '/bazar' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              CASA<span className="text-zinc-500">JUMP</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="flex items-center space-x-2 text-sm font-medium text-zinc-400 hover:text-white px-2 py-2 transition-colors"
              title="Acesso Administrativo"
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </Link>
            <Link
              href="/doacoes"
              className="flex items-center space-x-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Doar</span>
            </Link>
            <Link
              href="/membros"
              className="flex items-center space-x-2 text-sm font-medium text-black bg-white hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-2 px-3">
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-sm font-medium text-zinc-400 hover:text-white bg-transparent border border-white/10 hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
                <Link
                  href="/doacoes"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Doar</span>
                </Link>
                <Link
                  href="/membros"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-sm font-medium text-black bg-white hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Entrar</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
