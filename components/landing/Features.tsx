"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/glass/GlassCard"
import { Brain, MessageSquare, Code, Zap, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Intelligent Understanding",
    description: "Advanced AI that comprehends context and nuance in every conversation."
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Flow seamlessly between topics with human-like dialogue capabilities."
  },
  {
    icon: Code,
    title: "Code Assistance",
    description: "Get help with coding, debugging, and technical documentation."
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Lightning-fast replies powered by cutting-edge AI technology."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays secure with enterprise-grade encryption."
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Communicate in multiple languages with ease."
  }
]

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need in an AI co-worker, designed for modern teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full hover:bg-white/10 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
