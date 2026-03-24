'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { SignUpCard } from '@/components/ui/sign-up-card';
import { BookOpen } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar conta.');
      }

      // Redireciona para a área de membros após sucesso
      router.push('/membros');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroGeometric>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <SignUpCard
          title="Criar sua Conta"
          subtitle="Faça parte da nossa comunidade"
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          isLoading={loading}
          logoIcon={<BookOpen className="w-8 h-8 text-white" />}
          loginHref="/membros/login"
        />
      </div>
    </HeroGeometric>
  );
}
