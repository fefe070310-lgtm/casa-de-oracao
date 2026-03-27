"use client"

import * as React from "react"
import { motion, type Variants, type Transition } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MenuItem {
  icon: LucideIcon | React.FC<any>
  label: string
  href: string
  gradient: string
  iconColor: string
}

interface MenuBarProps {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string, href: string) => void
  className?: string
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
  },
}

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
  },
}

const sharedTransition: Transition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar({ className, items, activeItem, onItemClick }: MenuBarProps) {
  return (
    <motion.nav
      className={cn(
        "p-2 rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl border border-zinc-100 relative overflow-hidden",
        className,
      )}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="absolute -inset-2 bg-gradient-radial from-transparent via-blue-400/30 via-30% to-transparent rounded-3xl z-0 pointer-events-none"
        variants={navGlowVariants}
      />
      <ul className="flex items-center gap-1 sm:gap-2 relative z-10 w-full justify-around sm:justify-center">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.label === activeItem

          return (
            <motion.li key={item.label} className="relative">
              <button
                onClick={() => onItemClick?.(item.label, item.href)}
                className="block w-full"
              >
                <motion.div
                  className="block rounded-xl overflow-visible group relative"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 1 : 0,
                      borderRadius: "16px",
                    }}
                  />
                  <motion.div
                    className={cn(
                      "flex flex-col sm:flex-row items-center justify-center sm:gap-2 px-2 sm:px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                      isActive
                        ? "text-zinc-900"
                        : "text-zinc-500 group-hover:text-zinc-900",
                    )}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? item.iconColor : "text-zinc-500",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="hidden sm:inline-block text-sm">{item.label}</span>
                  </motion.div>
                  <motion.div
                    className={cn(
                      "flex flex-col sm:flex-row items-center justify-center sm:gap-2 px-2 sm:px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl",
                      isActive
                        ? "text-zinc-900"
                        : "text-zinc-500 group-hover:text-zinc-900",
                    )}
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      rotateX: 90,
                    }}
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? item.iconColor : "text-zinc-500",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="hidden sm:inline-block text-sm">{item.label}</span>
                  </motion.div>
                </motion.div>
              </button>
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
