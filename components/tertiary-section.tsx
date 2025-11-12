"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export default function TertiarySection() {
  const [isInView, setIsInView] = useState(false)
  const [lineKey, setLineKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setLineKey(prev => prev + 1)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-parallax="hero"
      className="min-h-screen max-w-7xl mx-auto bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl mb-4 relative overflow-hidden will-change-transform"
      aria-label="Hero section with decorative elements"
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden' as const
      }}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
        {/* Left Section - Promotional Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-2 px-3 sm:px-4 py-2 rounded-full bg-[#1a2744] border border-[#3a5a8a] backdrop-blur-sm text-xs sm:text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d4ff]" aria-hidden="true" />
            <span className="text-[#a8c5dd]">Explore the latest tools</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">
            The future of building happens together
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#8a9bb8] leading-relaxed max-w-xl">
            Tools and trends evolve, but collaboration endures. Build amazing experiences with our platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-[#0a0e27] font-semibold hover:bg-[#f0f0f0] transition-colors text-sm sm:text-base"
            >
              Sign up &gt;
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-transparent border border-[#3a5a8a] text-white font-semibold hover:bg-[#1a2744] transition-colors text-sm sm:text-base"
            >
              Try it free
            </motion.button>
          </div>

          {/* See also section */}
          <div className="pt-6 border-t border-[#3a5a8a]">
            <p className="text-xs font-semibold text-[#8a9bb8] mb-3">See also</p>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="text-[#00d4ff] hover:text-[#00b8e6] text-xs sm:text-sm">
                  Collaboration tools for seamless teamwork
                </a>
              </li>
              <li>
                <a href="#" className="text-[#00d4ff] hover:text-[#00b8e6] text-xs sm:text-sm">
                  AI-powered development assistance
                </a>
              </li>
              <li>
                <a href="#" className="text-[#00d4ff] hover:text-[#00b8e6] text-xs sm:text-sm">
                  Cloud infrastructure for modern apps
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Section - Visual Mockup with Images */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center lg:justify-center"
        >
          <div className="relative w-full max-w-sm lg:-ml-16">
            {/* Left Side Decorative Icons */}
            <div className="absolute -left-24 top-[20%] hidden lg:block pointer-events-none">
              <div className="space-y-26 opacity-60 relative">
                {/* Cloud icon - Top */}
                <div className="w-12 h-12 border border-[#3a5a8a] rounded-lg flex items-center justify-center bg-[#1a2744]/60 shadow-sm backdrop-blur-sm">
                  <Image 
                    src="/clouds1-left.webp" 
                    alt="Cloud decoration" 
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
                {/* Butterfly icon - Bottom */}
                <div className="w-12 h-12 border border-[#3a5a8a] rounded-lg flex items-center justify-center bg-[#1a2744]/60 shadow-sm backdrop-blur-sm">
                  <Image 
                    src="/butterfly-f293964f26e0.webp" 
                    alt="Butterfly decoration" 
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Left connecting lines */}
            {isInView && (
              <AnimatePresence initial={false}>
                {/* Left Top Line */}
                <motion.div 
                  key={`left-top-${lineKey}`}
                  className="absolute -left-24 top-[20%] hidden lg:block pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    width="160" 
                    height="280" 
                    viewBox="0 0 160 280" 
                    fill="none" 
                    className="absolute left-0 top-0"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id={`lineGradient-left-${lineKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                      </linearGradient>
                      <filter id={`glow-left-${lineKey}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <motion.path
                      d="M 48 24 L 90 24 Q 105 24 105 39 L 105 170 Q 105 185 120 185 L 160 185"
                      stroke={`url(#lineGradient-left-${lineKey})`}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#glow-left-${lineKey})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.5, 
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
                    >
                      <circle cx="48" cy="24" r="5" fill="#60a5fa" opacity="0.3" />
                      <circle cx="48" cy="24" r="3" fill="#60a5fa" />
                    </motion.g>
                    
                    <motion.circle
                      cx="105" cy="39" r="3" fill="#818cf8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.0, ease: "backOut" }}
                    />
                    
                    <motion.circle
                      cx="105" cy="170" r="3" fill="#a78bfa"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.5, ease: "backOut" }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.0, ease: "backOut" }}
                    >
                      <circle cx="160" cy="185" r="8" fill={`url(#lineGradient-left-${lineKey})`} opacity="0.2" />
                      <circle cx="160" cy="185" r="5" fill={`url(#lineGradient-left-${lineKey})`} filter={`url(#glow-left-${lineKey})`} />
                      <circle cx="160" cy="185" r="2" fill="white" opacity="0.8" />
                    </motion.g>
                  </svg>
                </motion.div>

                {/* Left Bottom Line */}
                <motion.div 
                  key={`left-bottom-${lineKey}`}
                  className="absolute -left-24 top-[20%] hidden lg:block pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    width="160" 
                    height="400" 
                    viewBox="0 0 160 400" 
                    fill="none" 
                    className="absolute left-0 top-0"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id={`lineGradient-left-bottom-${lineKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#c084fc" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                      </linearGradient>
                      <filter id={`glow-left-bottom-${lineKey}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <motion.path
                      d="M 48 176 L 90 176 Q 105 176 105 191 L 105 290 Q 105 305 120 305 L 160 305"
                      stroke={`url(#lineGradient-left-bottom-${lineKey})`}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#glow-left-bottom-${lineKey})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.8, 
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
                    >
                      <circle cx="48" cy="176" r="5" fill="#f472b6" opacity="0.3" />
                      <circle cx="48" cy="176" r="3" fill="#f472b6" />
                    </motion.g>
                    
                    <motion.circle
                      cx="105" cy="191" r="3" fill="#c084fc"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.3, ease: "backOut" }}
                    />
                    
                    <motion.circle
                      cx="105" cy="290" r="3" fill="#a78bfa"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.8, ease: "backOut" }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.3, ease: "backOut" }}
                    >
                      <circle cx="160" cy="305" r="8" fill={`url(#lineGradient-left-bottom-${lineKey})`} opacity="0.2" />
                      <circle cx="160" cy="305" r="5" fill={`url(#lineGradient-left-bottom-${lineKey})`} filter={`url(#glow-left-bottom-${lineKey})`} />
                      <circle cx="160" cy="305" r="2" fill="white" opacity="0.8" />
                    </motion.g>
                  </svg>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Right connecting lines */}
            {isInView && (
              <AnimatePresence initial={false}>
                {/* Right Top Line */}
                <motion.div 
                  key={`right-top-${lineKey}`}
                  className="absolute -right-16 top-[20%] hidden lg:block pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    width="160" 
                    height="280" 
                    viewBox="0 0 160 280" 
                    fill="none" 
                    className="absolute right-0 top-0"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id={`lineGradient-right-top-${lineKey}`} x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="1" />
                      </linearGradient>
                      <filter id={`glow-right-top-${lineKey}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <motion.path
                      d="M 112 24 L 70 24 Q 55 24 55 39 L 55 170 Q 55 185 40 185 L 0 185"
                      stroke={`url(#lineGradient-right-top-${lineKey})`}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#glow-right-top-${lineKey})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.5, 
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
                    >
                      <circle cx="112" cy="24" r="5" fill="#34d399" opacity="0.3" />
                      <circle cx="112" cy="24" r="3" fill="#34d399" />
                    </motion.g>
                    
                    <motion.circle
                      cx="55" cy="39" r="3" fill="#10b981"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.0, ease: "backOut" }}
                    />
                    
                    <motion.circle
                      cx="55" cy="170" r="3" fill="#059669"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.5, ease: "backOut" }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.0, ease: "backOut" }}
                    >
                      <circle cx="0" cy="185" r="8" fill={`url(#lineGradient-right-top-${lineKey})`} opacity="0.2" />
                      <circle cx="0" cy="185" r="5" fill={`url(#lineGradient-right-top-${lineKey})`} filter={`url(#glow-right-top-${lineKey})`} />
                      <circle cx="0" cy="185" r="2" fill="white" opacity="0.8" />
                    </motion.g>
                  </svg>
                </motion.div>

                {/* Right Bottom Line */}
                <motion.div 
                  key={`right-bottom-${lineKey}`}
                  className="absolute -right-16 top-[20%] hidden lg:block pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    width="160" 
                    height="400" 
                    viewBox="0 0 160 400" 
                    fill="none" 
                    className="absolute right-0 top-0"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id={`lineGradient-right-bottom-${lineKey}`} x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
                      </linearGradient>
                      <filter id={`glow-right-bottom-${lineKey}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <motion.path
                      d="M 112 176 L 70 176 Q 55 176 55 191 L 55 290 Q 55 305 40 305 L 0 305"
                      stroke={`url(#lineGradient-right-bottom-${lineKey})`}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#glow-right-bottom-${lineKey})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.8, 
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
                    >
                      <circle cx="112" cy="176" r="5" fill="#fbbf24" opacity="0.3" />
                      <circle cx="112" cy="176" r="3" fill="#fbbf24" />
                    </motion.g>
                    
                    <motion.circle
                      cx="55" cy="191" r="3" fill="#f59e0b"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.3, ease: "backOut" }}
                    />
                    
                    <motion.circle
                      cx="55" cy="290" r="3" fill="#d97706"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.8, ease: "backOut" }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.3, ease: "backOut" }}
                    >
                      <circle cx="0" cy="305" r="8" fill={`url(#lineGradient-right-bottom-${lineKey})`} opacity="0.2" />
                      <circle cx="0" cy="305" r="5" fill={`url(#lineGradient-right-bottom-${lineKey})`} filter={`url(#glow-right-bottom-${lineKey})`} />
                      <circle cx="0" cy="305" r="2" fill="white" opacity="0.8" />
                    </motion.g>
                  </svg>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Right Side Decorative Icons */}
            <div className="absolute -right-16 top-[20%] hidden lg:block pointer-events-none">
              <div className="space-y-26 opacity-60 relative">
                {/* Cloud icon - Top */}
                <div className="w-12 h-12 border border-[#3a5a8a] rounded-lg flex items-center justify-center bg-[#1a2744]/60 shadow-sm backdrop-blur-sm">
                  <Image 
                    src="/clouds2-right.webp" 
                    alt="Cloud decoration" 
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
                {/* Mona Head icon - Bottom */}
                <div className="w-12 h-12 border border-[#3a5a8a] rounded-lg flex items-center justify-center bg-[#1a2744]/60 shadow-sm backdrop-blur-sm overflow-hidden">
                  <Image 
                    src="/mona-head.webp" 
                    alt="Mona decoration" 
                    width={32} 
                    height={32}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Central Visual Element */}
            <div className="rounded-3xl shadow-2xl p-[2px] relative z-10 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 max-w-[400px] mx-auto">
              <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] rounded-3xl p-8 min-h-[500px] overflow-hidden relative flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center space-y-6"
                >
                  {/* Central decorative element */}
                  <div className="relative w-64 h-64 mx-auto">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="absolute inset-0"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-60" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-60" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl opacity-60" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-80 blur-2xl" />
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="50%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#f472b6" />
                          </linearGradient>
                        </defs>
                        <circle cx="100" cy="100" r="60" fill="url(#hero-grad)" opacity="0.3" />
                        <circle cx="100" cy="100" r="40" fill="url(#hero-grad)" opacity="0.5" />
                        <circle cx="100" cy="100" r="20" fill="white" opacity="0.8" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Build Together</h3>
                    <p className="text-sm text-[#8a9bb8]">Experience the power of collaboration</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
