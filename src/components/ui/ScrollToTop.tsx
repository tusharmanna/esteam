'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setIsVisible(scrollTop > 300)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const circumference = 2 * Math.PI * 49

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="progressParent"
          id="back-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          style={{ cursor: 'pointer' }}
        >
          <svg className="backCircle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path
              d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference - (scrollProgress / 100) * circumference,
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
