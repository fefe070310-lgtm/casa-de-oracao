'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
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

interface SignInCardProps {
  title?: string;
  subtitle?: string;
  logoIcon?: React.ReactNode;
  buttonText?: string;
  loadingText?: string;
  email: string;
  password: string;
  error?: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showRegisterLink?: boolean;
  registerHref?: string;
  registerText?: string;
  showForgotPassword?: boolean;
  forgotPasswordHref?: string;
  showBackLink?: boolean;
  onBack?: () => void;
}

export function SignInCard({
  title = "Welcome Back",
  subtitle = "Sign in to continue",
  logoIcon,
  buttonText = "Sign In",
  loadingText,
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  showRegisterLink = false,
  registerHref = "/registro",
  registerText = "Cadastre-se",
  showForgotPassword = true,
  forgotPasswordHref = "#",
  showBackLink = true,
  onBack,
  theme = "dark",
}: SignInCardProps & { theme?: "light" | "dark" }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

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
      className="w-full max-w-sm relative z-10"
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 10 }}
      >
        <div className="relative group">
          {/* Card glow effect */}
          <motion.div
            className={cn(
              "absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700",
              theme === "light" ? "bg-zinc-400/10" : "bg-white/10"
            )}
            animate={{
              boxShadow: theme === "light"
                ? ["0 0 10px 2px rgba(0,0,0,0.02)", "0 0 15px 5px rgba(0,0,0,0.03)", "0 0 10px 2px rgba(0,0,0,0.02)"]
                : ["0 0 10px 2px rgba(255,255,255,0.03)", "0 0 15px 5px rgba(255,255,255,0.05)", "0 0 10px 2px rgba(255,255,255,0.03)"],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          />

          {/* Traveling light beam effect */}
          <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
            {/* Top light beam */}
            <motion.div
              className={cn(
                "absolute top-0 left-0 h-[2px] w-[40%] opacity-70",
                theme === "light" 
                  ? "bg-gradient-to-r from-transparent via-zinc-400 to-transparent" 
                  : "bg-gradient-to-r from-transparent via-white to-transparent"
              )}
              animate={{ left: ["-50%", "100%"] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            />
          </div>

          {/* Glass card background */}
          <div className={cn(
            "relative backdrop-blur-xl rounded-2xl p-8 border overflow-hidden shadow-2xl transition-colors duration-500",
            theme === "light" 
              ? "bg-white/80 border-zinc-200/50 shadow-zinc-200/50" 
              : "bg-black/40 border-white/[0.05] shadow-black/50"
          )}>
            {/* Subtle card inner patterns */}
            <div className={cn(
                "absolute inset-0",
                theme === "light" ? "opacity-[0.05]" : "opacity-[0.03]"
              )}
              style={{
                backgroundImage: theme === "light"
                  ? `linear-gradient(135deg, #000 0.5px, transparent 0.5px), linear-gradient(45deg, #000 0.5px, transparent 0.5px)`
                  : `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Logo and header */}
            <div className="text-center space-y-2 mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className={cn(
                  "mx-auto w-16 h-16 rounded-full border flex items-center justify-center relative shadow-sm",
                  theme === "light" ? "border-zinc-200 bg-white" : "border-white/10 bg-white/5"
                )}
              >
                {logoIcon}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "text-2xl font-bold font-display",
                  theme === "light" ? "text-zinc-900" : "text-white"
                )}
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "text-sm font-light",
                  theme === "light" ? "text-zinc-500" : "text-white/60"
                )}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Login form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-3">
                {/* Email input */}
                <div className="relative">
                  <Mail className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10",
                    focusedInput === "email" 
                      ? (theme === "light" ? 'text-zinc-900' : 'text-white')
                      : (theme === "light" ? 'text-zinc-400' : 'text-white/40')
                  )} />
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className={cn(
                      "w-full h-12 pl-10 pr-4 rounded-xl transition-all duration-300",
                      theme === "light"
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-zinc-900/5"
                        : "bg-white/5 border-transparent text-white placeholder:text-white/30 focus:bg-white/10"
                    )}
                    required
                  />
                </div>

                {/* Password input */}
                <div className="relative">
                  <Lock className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10",
                    focusedInput === "password"
                      ? (theme === "light" ? 'text-zinc-900' : 'text-white')
                      : (theme === "light" ? 'text-zinc-400' : 'text-white/40')
                  )} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className={cn(
                      "w-full h-12 pl-10 pr-12 rounded-xl transition-all duration-300",
                      theme === "light"
                        ? "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-zinc-900/5"
                        : "bg-white/5 border-transparent text-white placeholder:text-white/30 focus:bg-white/10"
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors z-10"
                  >
                    {showPassword ? (
                      <Eye className={theme === "light" ? "w-4 h-4 text-zinc-400" : "w-4 h-4 text-white/40"} />
                    ) : (
                      <EyeClosed className={theme === "light" ? "w-4 h-4 text-zinc-400" : "w-4 h-4 text-white/40"} />
                    )}
                  </button>
                </div>
                
                {showForgotPassword && (
                  <div className="flex justify-end px-1">
                    <Link
                      href={forgotPasswordHref}
                      className={cn(
                        "text-xs font-medium transition-colors hover:underline underline-offset-4",
                        theme === "light" ? "text-zinc-500 hover:text-zinc-900" : "text-white/40 hover:text-white"
                      )}
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-600 text-[10px] md:text-xs font-medium bg-red-50 px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {error}
                </motion.div>
              )}

              {/* Sign in button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group active:scale-[0.98] shadow-lg",
                  theme === "light"
                    ? "bg-zinc-900 text-white hover:bg-black shadow-zinc-900/10"
                    : "bg-white text-black hover:opacity-90 shadow-white/5"
                )}
              >
                {isLoading ? (
                  <div className={cn(
                    "w-5 h-5 border-2 rounded-full animate-spin",
                    theme === "light" ? "border-white/30 border-t-white" : "border-black/30 border-t-black"
                  )} />
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="pt-6 space-y-4 text-center">
                {showRegisterLink && (
                  <p className={cn(
                    "text-xs",
                    theme === "light" ? "text-zinc-500" : "text-white/60"
                  )}>
                    Ainda não tem conta?{' '}
                    <Link href={registerHref} className={cn(
                      "font-bold transition-colors hover:underline underline-offset-4",
                      theme === "light" ? "text-zinc-900" : "text-white"
                    )}>
                      {registerText}
                    </Link>
                  </p>
                )}
                {showBackLink && onBack && (
                  <div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onBack();
                      }} 
                      className={cn(
                        "text-xs px-6 py-2 rounded-full transition-all flex items-center gap-2 mx-auto",
                        theme === "light" 
                          ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200" 
                          : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      &larr; Voltar para o site
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
