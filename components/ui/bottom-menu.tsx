"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

export interface BottomMenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

interface BottomMenuBarProps extends React.HTMLAttributes<HTMLElement> {
  items: BottomMenuItem[]
}

const springConfig = {
  duration: 0.3,
  ease: "easeInOut" as const
}

export function BottomMenuBar({ items, className, ...props }: BottomMenuBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [activeTooltip, setActiveTooltip] = React.useState<number | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState({ left: 0 })
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (activeTooltip !== null && menuRef.current && tooltipRef.current) {
      const menuItem = menuRef.current.children[activeTooltip] as HTMLElement
      const menuRect = menuRef.current.getBoundingClientRect()
      const itemRect = menuItem.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      const left = itemRect.left - menuRect.left + (itemRect.width - tooltipRect.width) / 2

      setTooltipPosition({
        left: Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)),
      })
    }
  }, [activeTooltip])

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-[env(safe-area-inset-bottom,8px)] pt-2 px-4",
        className
      )}
      aria-label="Navegação mobile"
      {...props}
    >
      <div className="relative w-full max-w-md">
        {/* Tooltip Label */}
        <AnimatePresence>
          {activeTooltip !== null && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={springConfig}
              className="absolute left-0 right-0 -top-[36px] pointer-events-none z-50"
            >
              <motion.div
                ref={tooltipRef}
                className={cn(
                  "h-7 px-3 rounded-lg inline-flex justify-center items-center overflow-hidden",
                  "bg-white/95 dark:bg-zinc-900/95 backdrop-blur",
                  "border border-black/5 dark:border-white/10",
                  "shadow-lg"
                )}
                initial={{ x: tooltipPosition.left }}
                animate={{ x: tooltipPosition.left }}
                transition={springConfig}
              >
                <p className="text-[12px] font-semibold leading-tight whitespace-nowrap text-zinc-800 dark:text-zinc-200">
                  {items[activeTooltip].label}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Bar */}
        <div
          ref={menuRef}
          className={cn(
            "w-full h-14 px-2 inline-flex justify-around items-center overflow-hidden",
            "rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl",
            "border border-black/5 dark:border-white/10",
            "shadow-[0_-4px_20px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]",
            "dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]"
          )}
        >
          {items.map((item, index) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && item.href !== '/membros' && pathname?.startsWith(item.href))
            const Icon = item.icon

            return (
              <button
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 h-full rounded-xl transition-all duration-200",
                  isActive
                    ? "text-[var(--admin-active-text,#6C5CE7)]"
                    : "text-zinc-400 dark:text-zinc-500 active:scale-90"
                )}
                onClick={() => handleNavigation(item.href)}
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
                onTouchStart={() => setActiveTooltip(index)}
                onTouchEnd={() => setTimeout(() => setActiveTooltip(null), 1500)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative flex items-center justify-center">
                  {isActive && (
                    <motion.div
                      layoutId="bottomMenuIndicator"
                      className="absolute -inset-2 rounded-xl"
                      style={{ background: 'var(--admin-active-bg, rgba(108,92,231,0.1))' }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 relative z-10 transition-all",
                    isActive && "scale-110"
                  )} />
                </div>
                <span className={cn(
                  "text-[9px] font-bold leading-tight transition-all",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
