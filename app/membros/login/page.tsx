'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { SignInCard } from '@/components/ui/sign-in-card-2';

export default function MembrosLogin() {
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
        router.push('/membros');
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
      <SignInCard
        theme="light"
        title="Área do Membro"
        subtitle="Acesse seus cursos e aulas sobre o Reino de Deus."
        logoIcon={<img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />}
        buttonText="Acessar Meus Cursos"
        email={email}
        password={password}
        error={error}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        forgotPasswordHref="/membros/forgot-password"
        showRegisterLink
        registerHref="/membros/registro"
        registerText="Cadastre-se"
        showBackLink
        onBack={() => router.push('/')}
      />
    </HeroGeometric>
  );
}
