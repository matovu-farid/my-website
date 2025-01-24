"use client"

import { motion } from "framer-motion"

interface ExperienceCardProps {
  company: string
  position: string
  period: string
  description: string
}

export default function ExperienceCard({ company, position, period, description }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{position}</h3>
        <h4 className="text-lg text-gray-600 dark:text-gray-300 mb-2">{company}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{period}</p>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}

