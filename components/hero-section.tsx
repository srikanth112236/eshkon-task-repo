"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax calculations based on scroll position
  const leftCloudX = scrollY * -0.3 // Move left
  const rightCloudX = scrollY * 0.3 // Move right
  const contentY = scrollY * -0.15 // Move up slightly
  const monaY = scrollY * 0.25 // Move down

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0d1117]"
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)"
      }}
    >
      {/* Navigation Bar */}
      <nav className="relative z-50 w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* GitHub Logo */}
          <div className="flex items-center">
            <svg height="32" viewBox="0 0 16 16" fill="white" className="w-6 h-6 sm:w-8 sm:h-8">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-white text-xs sm:text-sm">
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              Platform
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              Solutions
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              Resources
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              Open Source
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              Enterprise
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
              </svg>
            </button>
            <button className="hover:text-gray-300 transition-colors">Pricing</button>
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md border border-gray-700 bg-[#0d1117] text-gray-400 text-xs sm:text-sm">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="hidden sm:block">
              <path d="M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 017.922 8.982zM11.42 10.74a5.5 5.5 0 10-7.78-7.78 5.5 5.5 0 007.78 7.78z"/>
              <path d="M10.293 11.707a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z"/>
            </svg>
            <span className="hidden sm:inline">Search or jump to...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-800 rounded">/</kbd>
          </div>
          <button className="px-2 sm:px-4 py-1.5 text-white text-xs sm:text-sm hover:text-gray-300 transition-colors">
            Sign in
          </button>
          <button className="px-2 sm:px-4 py-1.5 rounded-md border border-gray-600 text-white text-xs sm:text-sm hover:bg-gray-800 transition-colors">
            Sign up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 pt-4 sm:pt-0">
        {/* Left Cloud with Parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -left-4 sm:left-0 top-[12%] sm:top-1/4 w-24 xs:w-28 sm:w-40 md:w-56 lg:w-80 pointer-events-none z-10 opacity-50 sm:opacity-100"
        >
          <div
            style={{ 
              transform: `translateX(${leftCloudX}px)`,
              willChange: "transform"
            }}
          >
            <Image
              src="/clouds1-left.webp"
              alt=""
              width={400}
              height={300}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Right Cloud with Parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -right-4 sm:right-0 top-[20%] sm:top-1/3 w-24 xs:w-28 sm:w-40 md:w-56 lg:w-80 pointer-events-none z-10 opacity-50 sm:opacity-100"
        >
          <div
            style={{ 
              transform: `translateX(${rightCloudX}px)`,
              willChange: "transform"
            }}
          >
            <Image
              src="/clouds2-right.webp"
              alt=""
              width={400}
              height={300}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Bottom Mona with Butterfly and Parallax - Render FIRST so it's behind */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-[58%] xs:top-[60%] sm:top-[60%] md:top-[57%] left-1/2 -translate-x-1/2 w-56 xs:w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[500px] pointer-events-none z-10"
        >
          <div
            style={{ 
              transform: `translateY(${monaY}px)`,
              willChange: "transform"
            }}
          >
          <div className="relative">
            {/* Gradient Blob */}
            <div className="absolute inset-0 top-1/4">
              <div 
                className="w-full h-full rounded-full blur-2xl sm:blur-3xl opacity-80 sm:opacity-90"
                style={{
                  background: "radial-gradient(circle, #ff1493 0%, #ff69b4 30%, #da70d6 60%, #8b5cf6 100%)"
                }}
              />
            </div>
            
            {/* Mona Head */}
            <div className="relative z-10">
              <Image
                src="/mona-head.webp"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Butterfly */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[20%] right-[-3%] w-8 xs:w-10 sm:w-12 md:w-12 lg:w-16 z-20"
            >
              <Image
                src="/butterfly-f293964f26e0.webp"
                alt=""
                width={40}
                height={40}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
          </div>
        </motion.div>

        {/* Center Content with Parallax */}
        <div 
          style={{ 
            transform: `translateY(${contentY}px)`,
            willChange: "transform"
          }}
          className="relative z-40 text-center w-full max-w-[90%] xs:max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-2 sm:py-2 rounded-full bg-gradient-to-r from-[#1f2937] to-[#374151] border border-[#4b5563] hover:border-[#6b7280] transition-colors cursor-pointer max-w-full"
          >
            <span className="text-base sm:text-2xl flex-shrink-0">🎂</span>
            <span className="text-white text-[11px] xs:text-xs sm:text-sm font-medium truncate">Explore the latest tools from Universe &apos;25</span>
            <svg width="14" height="14" fill="white" viewBox="0 0 16 16" className="hidden xs:block sm:w-4 sm:h-4 flex-shrink-0">
              <path d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"/>
            </svg>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[28px] leading-[1.2] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 sm:leading-tight"
          >
            The future of building happens together
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[13px] leading-relaxed xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-[95%] xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto"
          >
            Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full"
          >
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ea44f] w-full sm:w-56 md:w-64 text-sm"
              />
              <button className="px-5 py-3 rounded-md bg-[#2ea44f] text-white font-semibold hover:bg-[#2c974b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2ea44f] focus:ring-offset-2 focus:ring-offset-[#0d1117] text-sm whitespace-nowrap w-full sm:w-auto">
                Sign up for GitHub
              </button>
            </div>
            <button className="px-5 py-3 rounded-md border border-gray-600 text-white font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-[#0d1117] text-sm whitespace-nowrap w-full sm:w-auto">
              Try GitHub Copilot free
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
