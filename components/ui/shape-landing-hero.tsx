"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    theme = "dark",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    theme?: "light" | "dark";
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px]",
                        theme === "light" 
                            ? "border border-zinc-200/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)]" 
                            : "border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        theme === "light"
                            ? "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]"
                            : "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    children,
    theme = "dark"
}: {
    children?: React.ReactNode;
    theme?: "light" | "dark";
}) {
    return (
        <div className={cn(
            "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
            theme === "light" ? "bg-[#fafafa]" : "bg-[#030303]"
        )}>
            <div className={cn(
                "absolute inset-0 blur-3xl pointer-events-none opacity-50",
                theme === "light" 
                    ? "bg-gradient-to-br from-indigo-500/[0.1] via-transparent to-rose-500/[0.1]" 
                    : "bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]"
            )} />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ElegantShape
                    theme={theme}
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient={theme === "light" ? "from-indigo-500/[0.08]" : "from-indigo-500/[0.15]"}
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    theme={theme}
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient={theme === "light" ? "from-rose-500/[0.08]" : "from-rose-500/[0.15]"}
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    theme={theme}
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient={theme === "light" ? "from-emerald-500/[0.08]" : "from-emerald-500/[0.15]"}
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    theme={theme}
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient={theme === "light" ? "from-amber-500/[0.08]" : "from-amber-500/[0.15]"}
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    theme={theme}
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient={theme === "light" ? "from-cyan-500/[0.08]" : "from-cyan-500/[0.15]"}
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 md:px-6">
                {children}
            </div>

            <div className={cn(
                "absolute inset-0 pointer-events-none",
                theme === "light"
                    ? "bg-gradient-to-t from-white/20 via-transparent to-white/10"
                    : "bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80"
            )} />
        </div>
    );
}

export { HeroGeometric };
