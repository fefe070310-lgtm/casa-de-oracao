'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { SignInCard } from '@/components/ui/sign-in-card-2';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          setError('Acesso negado. Apenas administradores podem acessar.');
          setIsLoading(false);
        }
      } else {
        setError(data.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Erro de conexão ao tentar fazer login.');
      setIsLoading(false);
    }
  };

  return (
    <HeroGeometric theme="light">
      <div className="relative">
        <SignInCard
          theme="light"
          title="Acesso Restrito"
          subtitle="Área exclusiva para administradores da plataforma."
          logoIcon={<img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />}
          buttonText="Entrar no Painel"
          email={email}
          password={password}
          error={error}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          forgotPasswordHref="/admin/forgot-password"
          showBackLink={true}
          onBack={() => router.push('/')}
        />

        {/* Botão de Acesso Rápido (Bypass) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={async () => {
              const res = await fetch('/api/auth/bypass', { method: 'POST' });
              if (res.ok) router.push('/admin');
            }}
            className="px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-400 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 hover:text-zinc-600 transition-all"
          >
             Acesso Rápido (Sem Login)
          </button>
        </motion.div>
      </div>
    </HeroGeometric>
  );
}
