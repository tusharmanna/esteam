'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + 2
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-page"
          id="preloader-active"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="counter">
            <Image
              src="/images/logo/logo.png"
              alt="ESteam Logo"
              width={150}
              height={50}
              priority
            />
            <span className="number">{progress}%</span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
