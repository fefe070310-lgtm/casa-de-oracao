'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight, User, Phone, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

interface SignUpCardProps {
  title?: string;
  subtitle?: string;
  logoIcon?: React.ReactNode;
  buttonText?: string;
  loadingText?: string;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    city?: string;
  };
  error?: string;
  isLoading: boolean;
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loginHref?: string;
}

export function SignUpCard({
  title = "Criar Conta",
  subtitle = "Junte-se à nossa comunidade",
  logoIcon,
  buttonText = "Registrar",
  loadingText = "Criando...",
  formData,
  error,
  isLoading,
  onChange,
  onSubmit,
  loginHref = "/membros/login",
}: SignUpCardProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md relative z-10"
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative group">
          <div className="absolute -inset-[1px] rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-white blur-sm" />
          
          <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
            <div className="text-center space-y-2 mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4"
              >
                {logoIcon || <User className="w-8 h-8 text-white" />}
              </motion.div>
              <h1 className="text-2xl font-bold text-white font-display">{title}</h1>
              <p className="text-white/50 text-sm">{subtitle}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "name" ? "text-white" : "text-white/30")} />
                  <Input
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "email" ? "text-white" : "text-white/30")} />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "phone" ? "text-white" : "text-white/30")} />
                  <Input
                    placeholder="WhatsApp (Opcional)"
                    value={formData.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                  />
                </div>
                <div className="relative">
                  <MapPin className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "city" ? "text-white" : "text-white/30")} />
                  <Input
                    placeholder="Cidade (Opcional)"
                    value={formData.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    onFocus={() => setFocusedInput("city")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Lock className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "password" ? "text-white" : "text-white/30")} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={formData.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 pr-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/30 hover:text-white">
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", focusedInput === "confirmPassword" ? "text-white" : "text-white/30")} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChange={(e) => onChange("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                    className="pl-10 bg-white/5 border-transparent focus:border-white/20 h-11 text-white"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black h-12 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-white/40 text-xs">
                  Já tem uma conta?{' '}
                  <Link href={loginHref} className="text-white hover:underline">
                    Entrar agora
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
