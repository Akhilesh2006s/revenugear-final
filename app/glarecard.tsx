"use client"

import type React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, GaugeCircle, BarChart3, SearchCheck, Languages, Wrench, FileCheck } from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: Languages,
      title: "Understands Indian & International Languages",
      description:
        "From Hindi, Tamil, and Marathi to English and beyond—RevenueGear analyzes voice data across languages to uncover insights, no matter how your customers speak.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: AlertTriangle,
      title: "Automatic Revenue Leak Classification",
      description:
        "AI auto-tags every call with churn risk, service issues, overcharging, delay, or escalation—no manual effort needed.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: FileCheck,
      title: "Sales Intelligence",
      description:
        "Understand customer budget, urgency to buy, test drive feedback, comparisons with competitors, and missed follow-ups—so your team can close faster.",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: SearchCheck,
      title: "100% Visibility & Analysis on All Recorded Calls",
      description: "Every single call is analyzed—outbound, inbound, Maintenance Reminders, PSFU—nothing is missed.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: GaugeCircle,
      title: "Customer Sentiment Score in Each Call",
      description:
        "Automatically detect tone and emotion to score every customer call—happy, neutral, or frustrated—at a glance.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "Voice of Customer Dashboard",
      description:
        "Track positive and negative feedback, top complaint categories, sentiment trends, and team performance—all in one powerful view.",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: Wrench,
      title: "Service Insights",
      description:
        "Identify at-risk customers, repeat complaints, poor service quality, and unresolved issues. Get a daily hotlist to prevent churn and improve NPS.",
      gradient: "from-yellow-500 to-amber-500",
    },
  ]

  return (
    <section id="features" className="py-20 z-10 relative" style={{ backgroundColor: "rgba(183, 183, 152, 0)" }}>
      <div className="container mx-auto px-6 lg:px-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 z-10 relative"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Protect Revenue
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI capabilities designed specifically for vehicle dealerships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer z-10 relative"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={32} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              <div className="mt-6 flex items-center text-yellow-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="text-sm">Learn more</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
