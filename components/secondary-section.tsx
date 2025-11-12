"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

/**
 * SecondarySection Component
 * 
 * Displays a payment solutions section with promotional content on the left
 * and an animated mobile payment mockup on the right.
 * Four active icons control which payment scenario is displayed.
 * 
 * @component
 * @example
 * ```tsx
 * <SecondarySection />
 * ```
 */
export default function SecondarySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [lineKey, setLineKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Generate random delays for skeleton animations (0 to 1.2 seconds)
  const getRandomDelay = () => Math.random() * 1.2
  
  // Fix hydration by only running client-side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const paymentScenarios = [
    {
      icon: "🇺🇸",
      productImage: "🪑",
      productName: "Wood Chair 001",
      price: "US$149",
      email: "jane.diaz@example.com",
      country: "United States",
      selectedMethod: "Card",
      currency: "$",
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "05/26",
      cvc: "123",
      zipCode: "97712",
      dividerText: "Or pay another way",
      emailLabel: "Email",
      paymentLabel: "Payment Method",
      cardLabel: "Card",
      countryLabel: "Country or Region",
      payButtonText: "Pay"
    },
    {
      icon: "🇩🇪",
      productImage: "🪑",
      productName: "Wood Chair 001",
      price: "€135.00",
      email: "klara.schurig@example.de",
      country: "Deutschland",
      selectedMethod: "Klarna",
      currency: "€",
      dividerText: "Oder mit Karte bezahlen",
      emailLabel: "E-Mail",
      paymentLabel: "Zahlungsmethoden",
      cardLabel: "Karte",
      klarnaLabel: "Klarna",
      countryLabel: "Land/Region",
      payButtonText: "zahlen"
    },
    {
      icon: "🇨🇳",
      productImage: "🪑",
      productName: "Wood Chair 001",
      price: "¥199.00",
      email: "wei.qing@example.cn",
      country: "China",
      selectedMethod: "Card",
      currency: "¥",
      cardNumber: "6200 0000 0000 0005",
      expiryDate: "12/24",
      cvc: "123",
      nameOnCard: "Wei Qing",
      dividerText: "或用另一方式支付",
      emailLabel: "邮箱",
      paymentLabel: "支付方式",
      cardLabel: "用银行卡支付",
      alipayLabel: "用支付宝支付",
      countryLabel: "国家/地区",
      payButtonText: "支付"
    },
    {
      icon: "🇳🇱",
      productImage: "🪑",
      productName: "Wood Chair 001",
      price: "€135.00",
      email: "maria.hoekstra@example.nl",
      country: "Netherlands",
      selectedMethod: "iDEAL",
      currency: "€",
      idealBank: "ING bank",
      dividerText: "Of betaal op een andere manier",
      emailLabel: "E-mail",
      paymentLabel: "Betaalmethode",
      cardLabel: "Kaart",
      idealLabel: "iDEAL",
      sepaLabel: "SEPA Direc",
      idealBankLabel: "iDEAL-bank",
      payButtonText: "Betaal"
    }
  ]

  // Detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
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

  // Restart skeleton loading when section comes into view
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    let loadingTimer: NodeJS.Timeout | null = null
    
    if (isInView) {
      // Reset to skeleton loading state
      setIsLoading(true)
      setCurrentIndex(0)
      setLineKey(prev => prev + 1)
      
      // Show skeleton for 8 seconds (to match animation duration)
      loadingTimer = setTimeout(() => {
      setIsLoading(false)
      
      // Start cycling through scenarios after skeleton is done
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const newIndex = (prev + 1) % paymentScenarios.length
          setLineKey(k => k + 1)
          return newIndex
        })
      }, 4000)
      }, 8000)
    }

    return () => {
      if (loadingTimer) clearTimeout(loadingTimer)
      if (interval) clearInterval(interval)
      }
  }, [isInView, paymentScenarios.length])

  const currentScenario = paymentScenarios[currentIndex]

  return (
    <section
      ref={sectionRef}
      data-parallax="secondary"
      className="min-h-screen max-w-7xl mx-auto bg-[#f5f5f7] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl mb-4 relative overflow-hidden will-change-transform"
      aria-label="Payment solutions section"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
        `,
        transform: 'translateZ(0)', // Force GPU acceleration
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
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-white rounded-sm rotate-45" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Payments</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Accept and optimise payments, globally
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
            Increase authorisation rates, offer local payment methods to boost conversion, and reduce fraud using AI.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow text-sm sm:text-base"
          >
            Start with Payments &gt;
          </motion.button>

          {/* See also section */}
          <div className="pt-6 border-t border-gray-300">
            <p className="text-xs font-semibold text-gray-500 mb-3">See also</p>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm">
                  Tax for automating tax registration, collection, and filing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm">
                  Radar for AI-powered fraud protection
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm">
                  Terminal for custom in-person payments
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Section - Mobile Payment Mockup */}
            <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center lg:justify-center"
        >
          <div className="relative w-full max-w-sm lg:-ml-16">
            {/* Left Side Decorative Icons - positioned more to the left */}
            <div className="absolute -left-24 top-[20%] hidden lg:block pointer-events-none">
              <div className="space-y-26 opacity-40 relative">
                {/* Infinity loop icon - Top */}
                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-white/60 shadow-sm">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4" />
                  </svg>
                </div>
                {/* Document icon - Bottom */}
                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-white/60 shadow-sm">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
              </div>
            </div>

            {/* Left connecting lines - Single AnimatePresence */}
            {!isLoading && (
              <AnimatePresence initial={false}>
                {/* Left Top Line - Scenario 0 only */}
                {currentIndex === 0 && (
                  <motion.div 
                    key={`left-top-${currentIndex}-${lineKey}`}
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
                    <linearGradient id={`lineGradient-left-${currentIndex}-${lineKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                    </linearGradient>
                    <filter id={`glow-left-${currentIndex}-${lineKey}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Smooth curved path from icon to mockup with proper bezier curves */}
                  <motion.path
                    d="M 48 24 L 90 24 Q 105 24 105 39 L 105 170 Q 105 185 120 185 L 160 185"
                    stroke={`url(#lineGradient-left-${currentIndex}-${lineKey})`}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glow-left-${currentIndex}-${lineKey})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5, 
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  
                  {/* Starting node at icon */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3, 
                      ease: "backOut" 
                    }}
                  >
                    <circle
                      cx="48"
                      cy="24"
                      r="5"
                      fill="#a78bfa"
                      opacity="0.3"
                    />
                    <circle
                      cx="48"
                      cy="24"
                      r="3"
                      fill="#a78bfa"
                    />
                  </motion.g>
                  
                  {/* Middle node at corner */}
                  <motion.circle
                    cx="105"
                    cy="39"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.0, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* Middle node at bottom corner */}
                  <motion.circle
                    cx="105"
                    cy="170"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.5, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* End node connecting to mockup */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 2.0, 
                      ease: "backOut" 
                    }}
                  >
                    {/* Outer glow ring */}
                    <circle
                      cx="160"
                      cy="185"
                      r="8"
                      fill={`url(#lineGradient-left-${currentIndex}-${lineKey})`}
                      opacity="0.2"
                    />
                    {/* Main node */}
                    <circle
                      cx="160"
                      cy="185"
                      r="5"
                      fill={`url(#lineGradient-left-${currentIndex}-${lineKey})`}
                      filter={`url(#glow-left-${currentIndex}-${lineKey})`}
                    />
                    {/* Inner highlight */}
                    <circle
                      cx="160"
                      cy="185"
                      r="2"
                      fill="white"
                      opacity="0.8"
                    />
                  </motion.g>
                  
                </svg>
                </motion.div>
              )}

              {/* Left Bottom Line - Scenario 2 only */}
              {currentIndex === 2 && (
                <motion.div 
                key={`left-bottom-${currentIndex}-${lineKey}`}
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
                    <linearGradient id={`lineGradient-left-bottom-${currentIndex}-${lineKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                    </linearGradient>
                    <filter id={`glow-left-bottom-${currentIndex}-${lineKey}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Smooth curved path from bottom icon to mockup - space-y-32 = 128px + 48px icon = 176px offset */}
                  <motion.path
                    d="M 48 176 L 90 176 Q 105 176 105 191 L 105 290 Q 105 305 120 305 L 160 305"
                    stroke={`url(#lineGradient-left-bottom-${currentIndex}-${lineKey})`}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glow-left-bottom-${currentIndex}-${lineKey})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8, 
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  
                  {/* Starting node at bottom icon */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6, 
                      ease: "backOut" 
                    }}
                  >
                    <circle
                      cx="48"
                      cy="176"
                      r="5"
                      fill="#a78bfa"
                      opacity="0.3"
                    />
                    <circle
                      cx="48"
                      cy="176"
                      r="3"
                      fill="#a78bfa"
                    />
                  </motion.g>
                  
                  {/* Middle node at corner */}
                  <motion.circle
                    cx="105"
                    cy="191"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.3, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* Middle node at bottom corner */}
                  <motion.circle
                    cx="105"
                    cy="290"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.8, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* End node connecting to mockup */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 2.3, 
                      ease: "backOut" 
                    }}
                  >
                    {/* Outer glow ring */}
                    <circle
                      cx="160"
                      cy="305"
                      r="8"
                      fill={`url(#lineGradient-left-bottom-${currentIndex}-${lineKey})`}
                      opacity="0.2"
                    />
                    {/* Main node */}
                    <circle
                      cx="160"
                      cy="305"
                      r="5"
                      fill={`url(#lineGradient-left-bottom-${currentIndex}-${lineKey})`}
                      filter={`url(#glow-left-bottom-${currentIndex}-${lineKey})`}
                    />
                    {/* Inner highlight */}
                    <circle
                      cx="160"
                      cy="305"
                      r="2"
                      fill="white"
                      opacity="0.8"
                    />
                  </motion.g>
                  
                </svg>
                </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Right connecting lines - Separate AnimatePresence */}
            {!isLoading && (
              <AnimatePresence initial={false}>
                {/* Right Top Line - Scenario 1 only */}
                {currentIndex === 1 && (
                  <motion.div 
                    key={`right-top-${currentIndex}-${lineKey}`}
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
                    <linearGradient id={`lineGradient-right-top-${currentIndex}-${lineKey}`} x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                    </linearGradient>
                    <filter id={`glow-right-top-${currentIndex}-${lineKey}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Smooth curved path from right icon to mockup (mirrored) */}
                  <motion.path
                    d="M 112 24 L 70 24 Q 55 24 55 39 L 55 170 Q 55 185 40 185 L 0 185"
                    stroke={`url(#lineGradient-right-top-${currentIndex}-${lineKey})`}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glow-right-top-${currentIndex}-${lineKey})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5, 
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  
                  {/* Starting node at right icon */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3, 
                      ease: "backOut" 
                    }}
                  >
                    <circle
                      cx="112"
                      cy="24"
                      r="5"
                      fill="#a78bfa"
                      opacity="0.3"
                    />
                    <circle
                      cx="112"
                      cy="24"
                      r="3"
                      fill="#a78bfa"
                    />
                  </motion.g>
                  
                  {/* Middle node at corner */}
                  <motion.circle
                    cx="55"
                    cy="39"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.0, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* Middle node at bottom corner */}
                  <motion.circle
                    cx="55"
                    cy="170"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.5, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* End node connecting to mockup */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 2.0, 
                      ease: "backOut" 
                    }}
                  >
                    {/* Outer glow ring */}
                    <circle
                      cx="0"
                      cy="185"
                      r="8"
                      fill={`url(#lineGradient-right-top-${currentIndex}-${lineKey})`}
                      opacity="0.2"
                    />
                    {/* Main node */}
                    <circle
                      cx="0"
                      cy="185"
                      r="5"
                      fill={`url(#lineGradient-right-top-${currentIndex}-${lineKey})`}
                      filter={`url(#glow-right-top-${currentIndex}-${lineKey})`}
                    />
                    {/* Inner highlight */}
                    <circle
                      cx="0"
                      cy="185"
                      r="2"
                      fill="white"
                      opacity="0.8"
                    />
                  </motion.g>
                  
                </svg>
                </motion.div>
              )}

              {/* Right Bottom Line - Scenario 3 only */}
              {currentIndex === 3 && (
                <motion.div 
                key={`right-bottom-${currentIndex}-${lineKey}`}
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
                    <linearGradient id={`lineGradient-right-bottom-${currentIndex}-${lineKey}`} x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                    </linearGradient>
                    <filter id={`glow-right-bottom-${currentIndex}-${lineKey}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Smooth curved path from bottom right icon to mockup (mirrored) */}
                  <motion.path
                    d="M 112 176 L 70 176 Q 55 176 55 191 L 55 290 Q 55 305 40 305 L 0 305"
                    stroke={`url(#lineGradient-right-bottom-${currentIndex}-${lineKey})`}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glow-right-bottom-${currentIndex}-${lineKey})`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8, 
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  
                  {/* Starting node at bottom right icon */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6, 
                      ease: "backOut" 
                    }}
                  >
                    <circle
                      cx="112"
                      cy="176"
                      r="5"
                      fill="#a78bfa"
                      opacity="0.3"
                    />
                    <circle
                      cx="112"
                      cy="176"
                      r="3"
                      fill="#a78bfa"
                    />
                  </motion.g>
                  
                  {/* Middle node at corner */}
                  <motion.circle
                    cx="55"
                    cy="191"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.3, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* Middle node at bottom corner */}
                  <motion.circle
                    cx="55"
                    cy="290"
                    r="3"
                    fill="#a78bfa"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.8, 
                      ease: "backOut" 
                    }}
                  />
                  
                  {/* End node connecting to mockup */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 2.3, 
                      ease: "backOut" 
                    }}
                  >
                    {/* Outer glow ring */}
                    <circle
                      cx="0"
                      cy="305"
                      r="8"
                      fill={`url(#lineGradient-right-bottom-${currentIndex}-${lineKey})`}
                      opacity="0.2"
                    />
                    {/* Main node */}
                    <circle
                      cx="0"
                      cy="305"
                      r="5"
                      fill={`url(#lineGradient-right-bottom-${currentIndex}-${lineKey})`}
                      filter={`url(#glow-right-bottom-${currentIndex}-${lineKey})`}
                    />
                    {/* Inner highlight */}
                    <circle
                      cx="0"
                      cy="305"
                      r="2"
                      fill="white"
                      opacity="0.8"
                    />
                  </motion.g>
                  
                </svg>
                </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Right Side Decorative Icons - positioned exactly as in image */}
            <div className="absolute -right-16 top-[20%] hidden lg:block pointer-events-none">
              <div className="space-y-26 opacity-40 relative">
                {/* Mountain/Landscape icon - Top */}
                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-white/60 shadow-sm">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4m-4 4l4 4m6-4l-4-4m4 4l-4 4" />
                    <path d="M3 18l6-6 4 4 8-8" stroke="none" fill="currentColor" opacity="0.2" />
                  </svg>
                </div>
                {/* Clock/Pie chart icon - Bottom */}
                <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-white/60 shadow-sm">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
                    <path d="M12 12l0-6" stroke="currentColor" strokeLinecap="round" />
                    <path d="M12 12l4 4" stroke="currentColor" strokeLinecap="round" />
                    <path d="M12 2 A 10 10 0 0 1 12 22 A 10 10 0 0 1 12 2 Z" fill="currentColor" opacity="0.15" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Frame - Ultra compact to fit without scrolling */}
            <div className="rounded-3xl shadow-2xl relative z-10 max-w-[280px] mx-auto" style={{ border: '0.5px solid #a78bfa' }}>
              <div className="bg-white rounded-3xl p-2 h-[560px] overflow-hidden relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  // Skeleton Loading Screen - Wireframe with Left-to-Right Fill
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-2"
                  >
                    {(() => {
                      // Use stable, consistent IDs for SSR/client hydration
                      // Generate random delays only on client side
                      const randomDelays = isMounted 
                        ? Array.from({ length: 13 }, () => Math.random() * 5.5)
                        : Array.from({ length: 13 }, (_, i) => i * 0.4) // Stable fallback for SSR
                      
                      const WireframeBox = ({ className, delay, boxIndex }: { className: string, delay: number, boxIndex: number }) => {
                        const gradId = `grad-box-${boxIndex}`
                        // Get random delay - each box starts at a random time
                        const randomDelay = randomDelays[delay]
                        
                        return (
                          <div className={`${className} relative overflow-hidden rounded-xl bg-white`}>
                            {/* SVG Border that draws around the box */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                              <defs>
                                {/* Purple Gradient */}
                                <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                                </linearGradient>
                              </defs>
                              
                              {/* Animated Border Path - Draws very slowly and smoothly around the box */}
                              <motion.rect
                                x="1.5"
                                y="1.5"
                                width="calc(100% - 3px)"
                                height="calc(100% - 3px)"
                                rx="10"
                                ry="10"
                                fill="none"
                                stroke={`url(#${gradId})`}
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                strokeDasharray="1000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ strokeDashoffset: 1000 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ 
                                  duration: 2.0, 
                                  delay: randomDelay, 
                                  ease: [0.16, 1, 0.3, 1]
                                }}
                              />
                            </svg>
                          </div>
                        )
                      }

                      return (
                        <>
                          {/* 1. Product Image */}
                          <WireframeBox className="w-full h-12" delay={0} boxIndex={0} />
                          
                          {/* 2. Price */}
                          <WireframeBox className="w-full h-6" delay={1} boxIndex={1} />
                          
                          {/* 3. Small divider */}
                          <WireframeBox className="w-1/3 h-4" delay={2} boxIndex={2} />
                          
                          {/* 4. Payment Buttons */}
                          <WireframeBox className="w-full h-14" delay={3} boxIndex={3} />
                          
                          {/* 5. Email */}
                          <WireframeBox className="w-full h-7" delay={4} boxIndex={4} />
                          
                          {/* 6. Payment Methods */}
                          <div className="grid grid-cols-2 gap-1.5">
                            <WireframeBox className="w-full h-8" delay={5} boxIndex={5} />
                            <WireframeBox className="w-full h-8" delay={6} boxIndex={6} />
                          </div>
                          
                          {/* 7. Card Info */}
                          <WireframeBox className="w-full h-16" delay={7} boxIndex={7} />
                          
                          {/* 8. Small label */}
                          <WireframeBox className="w-1/4 h-4" delay={8} boxIndex={8} />
                          
                          {/* 9. Expiry/CVC */}
                          <div className="grid grid-cols-2 gap-1.5">
                            <WireframeBox className="w-full h-7" delay={9} boxIndex={9} />
                            <WireframeBox className="w-full h-7" delay={10} boxIndex={10} />
                          </div>
                          
                          {/* 10. Country */}
                          <WireframeBox className="w-1/4 h-4" delay={11} boxIndex={11} />
                          
                          {/* 11. Pay Button */}
                          <WireframeBox className="w-full h-9" delay={12} boxIndex={12} />
                        </>
                      )
                    })()}
                  </motion.div>
                ) : (
                  // Actual Payment Form Content
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-0"
                  >
                  {/* Product Image */}
                  <div className="w-full h-12 bg-gray-50 rounded-md flex items-center justify-center mb-1.5">
                    {currentScenario.productImage === "💻" ? (
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <span className="text-2xl">{currentScenario.productImage}</span>
                    )}
                  </div>

                  {/* Product Name and Price */}
                  <div className="mb-1.5">
                    <h3 className="text-[9px] font-bold text-gray-800 mb-0">
                      {currentScenario.productName}
                    </h3>
                    <p className="text-sm font-bold text-gray-900">
                      {currentScenario.price}
                    </p>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-1 mb-1">
                    <button className="w-full bg-black text-white py-1 rounded-md font-semibold flex items-center justify-center gap-1 hover:bg-gray-800 transition-colors text-[9px]">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-.96-1.24 0-1.93.66-2.98 1.03-.52.19-1.06.38-1.66.38C2.22 21.13 0 19.5 0 15.28c0-6.4 5.53-11.28 12-11.28 1.5 0 2.85.28 4.05.75.52.2.98.4 1.35.6.19.1.35.2.48.3.13.1.23.2.3.3.07.1.1.2.1.3 0 .1-.03.2-.1.3-.07.1-.17.2-.3.3-.13.1-.29.2-.48.3-.37.2-.83.4-1.35.6-1.2.47-2.55.75-4.05.75-4.42 0-8 3.58-8 8 0 2.4 1.06 4.28 2.8 4.28.37 0 .74-.1 1.1-.2.65-.24 1.26-.46 1.88-.46.62 0 1.23.22 1.88.46.36.1.73.2 1.1.2 1.74 0 2.8-1.88 2.8-4.28 0-1.5-.5-2.88-1.35-4z"/>
                      </svg>
                      Pay
                    </button>
                    <button className="w-full bg-[#00d97e] text-white py-1 rounded-md font-semibold flex items-center justify-center gap-1 hover:bg-[#00c96e] transition-colors text-[9px]">
                      Pay with{" "}
                      <span className="font-bold text-[9px] tracking-tight">link</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative py-1 mb-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[8px] text-gray-500">
                      <span className="bg-white px-1">{currentScenario.dividerText}</span>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-1">
                    <label className="block text-[8px] font-medium text-gray-700 mb-0.5">
                      {currentScenario.emailLabel}
                    </label>
                    <input
                      type="email"
                      placeholder={currentScenario.email}
                      className="w-full px-1.5 py-0.5 border border-gray-300 rounded-md bg-white text-[8px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-1">
                    <label className="block text-[8px] font-medium text-gray-700 mb-0.5">
                      {currentScenario.paymentLabel}
                    </label>
                    <div className={`grid gap-1.5 ${currentScenario.selectedMethod === "iDEAL" ? "grid-cols-3" : "grid-cols-2"}`}>
                      <button
                        className={`p-1.5 rounded-md border flex items-center justify-center gap-1 transition-all ${
                          currentScenario.selectedMethod === "Card"
                            ? "border-purple-400 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-[10px] font-medium text-gray-700">{currentScenario.cardLabel}</span>
                      </button>
                      {currentScenario.selectedMethod === "iDEAL" ? (
                        <>
                          <button
                            className={`p-1.5 rounded-md border flex items-center justify-center gap-1 transition-all ${
                              currentScenario.selectedMethod === "iDEAL"
                                ? "border-black bg-white"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <div className="w-3.5 h-3.5 bg-red-500 rounded flex items-center justify-center text-white font-bold text-[8px]">
                              D
                            </div>
                            <span className="text-[10px] font-medium text-gray-700">{currentScenario.idealLabel}</span>
                          </button>
                          <button
                            className="p-1.5 rounded-md border flex items-center justify-center gap-1 transition-all border-gray-200 hover:border-gray-300 bg-white"
                          >
                            <span className="text-[10px] font-medium text-gray-700">{currentScenario.sepaLabel}</span>
                          </button>
                        </>
                      ) : currentScenario.selectedMethod === "Alipay" ? (
                        <button
                          className={`p-1.5 rounded-md border flex items-center justify-center gap-1 transition-all ${
                            currentScenario.selectedMethod === "Alipay"
                              ? "border-pink-500 bg-pink-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="w-3.5 h-3.5 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-[8px]">
                            支
                          </div>
                          <span className="text-[10px] font-medium text-gray-700">{currentScenario.alipayLabel}</span>
                        </button>
                      ) : (
                        <button
                          className={`p-1.5 rounded-md border flex items-center justify-center gap-1 transition-all ${
                            currentScenario.selectedMethod === "Klarna"
                              ? "border-black bg-white"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="w-3.5 h-3.5 bg-pink-500 rounded flex items-center justify-center text-white font-bold text-[8px]">
                            K
                          </div>
                          <span className="text-[10px] font-medium text-gray-700">{currentScenario.klarnaLabel || "Klarna"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* iDEAL Bank Selection (Netherlands) */}
                  {currentScenario.selectedMethod === "iDEAL" && currentScenario.idealBankLabel && (
                    <div className="mb-1.5">
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                        {currentScenario.idealBankLabel}
                      </label>
                      <div className="relative">
                        <select className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent appearance-none pr-6">
                          <option>{currentScenario.idealBank}</option>
                        </select>
                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Card Information (if available) */}
                  {currentScenario.cardNumber && (
                    <div className="space-y-1 mb-1.5">
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                        {currentScenario.selectedMethod === "Alipay" ? "卡信息" : "Card information"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={currentScenario.cardNumber}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent pr-10"
                        />
                        {currentScenario.cardNumber.includes("4242") && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <span className="text-[8px] font-bold text-blue-600">VISA</span>
                          </div>
                        )}
                        {currentScenario.cardNumber.includes("6200") && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <span className="text-[8px] font-bold text-red-600">银联</span>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          placeholder={currentScenario.expiryDate || "05/26"}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            placeholder={currentScenario.cvc || "123"}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] pr-6 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          />
                          <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      {currentScenario.nameOnCard && (
                        <div>
                          <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                            {currentScenario.selectedMethod === "Alipay" ? "卡上的姓名" : "Name on Card"}
                          </label>
                          <input
                            type="text"
                            placeholder={currentScenario.nameOnCard}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Empty space for layout consistency when no card info */}
                  {!currentScenario.cardNumber && <div className="mb-1.5 h-16"></div>}

                  {/* Country Selector */}
                  <div className="mb-1.5">
                    <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                      {currentScenario.countryLabel}
                    </label>
                    <div className="relative">
                      <select className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent appearance-none pr-6">
                        <option>{currentScenario.country}</option>
                      </select>
                      <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* ZIP Code (if available) */}
                  {currentScenario.zipCode ? (
                    <div className="mb-1.5">
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder={currentScenario.zipCode}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div className="mb-1.5 h-7"></div>
                  )}

                  {/* Pay Button */}
                  <button className="w-full bg-blue-700 text-white py-1.5 rounded-md font-semibold hover:bg-blue-800 transition-colors text-[10px]">
                    {currentScenario.payButtonText} {currentScenario.price}
                  </button>
            </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
        </div>
        </motion.div>
      </div>
    </section>
  )
}
