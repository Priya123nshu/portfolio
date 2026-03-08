"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"
import { NeonText } from "@/components/ui/neon-text"
import { Terminal, Sparkles, ChevronDown } from "lucide-react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-sm text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>System Online</span>
          <Terminal className="h-4 w-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            <NeonText as="span" className="block text-primary">
              Priyanshu Kumar
            </NeonText>
          </h1>
        </motion.div>

        <div className="mb-6 text-2xl font-light text-muted-foreground md:text-3xl">
          <AnimatedText text="AI & Full-Stack" delay={0.4} />
          <AnimatedText text="Engineer" delay={0.8} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          I'm an AI engineer passionate about building intelligent systems that combine
          machine learning, large language models, and data engineering. I work on real-world
          projects like AI agents, recommendation systems, and authenticity detection platforms,
          focusing on turning complex data into scalable, impactful products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            <Sparkles className="h-4 w-4" />
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 w-full max-w-lg rounded-lg border border-border bg-card/50 p-4 font-mono text-sm backdrop-blur-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <div className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <div className="text-left">
            <span className="text-muted-foreground">{">"}</span>
            <span className="text-primary"> loading</span>
            <span className="text-foreground"> priyanshu.ai</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="ml-1 inline-block h-4 w-2 bg-primary"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
