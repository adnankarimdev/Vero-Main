'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isRouterReady, setIsRouterReady] = useState(false)

  useEffect(() => {
    setIsRouterReady(true)
  }, [])

  if (!isRouterReady) {
    return null // or a loading spinner
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ borderRadius: 16, opacity: 0 }}
        animate={{ borderRadius: 0, opacity: 1 }}
        exit={{ borderRadius: 16, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}