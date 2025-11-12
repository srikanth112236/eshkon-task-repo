"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import SecondarySection from "@/components/secondary-section"
import TertiarySection from "@/components/tertiary-section"

gsap.registerPlugin(ScrollTrigger)

/**
 * Page Component
 * 
 * Main page component with scroll-triggered animations and overlays.
 * Features:
 * - Parallax effects for hero section elements (clouds, center image)
 * - Hero overlay that gradually becomes black on scroll
 * - Section overlay that covers fixed hero when "Trusted by" section comes into view
 * - Scroll-triggered animations for secondary and tertiary sections
 * - Full accessibility support with prefers-reduced-motion handling
 * 
 * @component
 * @example
 * ```tsx
 * <Page />
 * ```
 */
export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const heroOverlay = containerRef.current.querySelector('[data-hero-overlay]')
    const sectionOverlay = containerRef.current.querySelector('[data-section-overlay]')
    const leftCloud = containerRef.current.querySelector('[data-parallax="left-cloud"]')
    const rightCloud = containerRef.current.querySelector('[data-parallax="right-cloud"]')
    const centerImage = containerRef.current.querySelector('[data-parallax="center"]')
    const secondaryContent = containerRef.current.querySelector('[data-parallax="secondary"]')
    const tertiaryContent = containerRef.current.querySelector('[data-parallax="tertiary"]')

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Adjust parallax speed based on device (mobile gets less parallax)
    const isMobile = window.innerWidth < 768
    const parallaxIntensity = isMobile ? 0.5 : 1

    if (!prefersReducedMotion) {
      // Hero section overlay gradually becomes black on scroll
      if (heroOverlay) {
        gsap.to(heroOverlay, {
          opacity: 1,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom center",
            scrub: 1,
          },
        })
      }

      // Section overlay covers fixed hero when secondary section comes into view
      if (sectionOverlay && secondaryContent) {
        // Initialize overlay as hidden
        gsap.set(sectionOverlay, { opacity: 0, display: "none" })

        gsap.fromTo(
          sectionOverlay,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: secondaryContent,
              start: "top 70%",
              end: "top 30%",
              scrub: 2,
              anticipatePin: 1,
              onEnter: () => {
                // Ensure overlay is visible when section enters viewport
                gsap.set(sectionOverlay, { display: "block" })
              },
              onLeaveBack: () => {
                // Hide overlay when scrolling back up
                gsap.to(sectionOverlay, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    gsap.set(sectionOverlay, { display: "none" })
                  }
                })
              },
            },
          },
        )
      }

      // Left cloud moves left with device-aware intensity
      if (leftCloud) {
        gsap.to(leftCloud, {
          x: -150 * parallaxIntensity,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom center",
            scrub: 1,
          },
        })
      }

      // Right cloud moves right with device-aware intensity
      if (rightCloud) {
        gsap.to(rightCloud, {
          x: 150 * parallaxIntensity,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom center",
            scrub: 1,
          },
        })
      }

      // Center image moves down and fades with device-aware intensity
      if (centerImage) {
        gsap.to(centerImage, {
          y: 300 * parallaxIntensity,
          opacity: 0,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "center center",
            scrub: 1.2,
          },
        })
      }

      // Secondary section slides up smoothly
      if (secondaryContent) {
        gsap.fromTo(
          secondaryContent,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: secondaryContent,
              start: "top 85%",
              end: "top 40%",
              scrub: 1.5,
              anticipatePin: 1,
            },
          },
        )
      }

      // Tertiary section slides up after secondary
      if (tertiaryContent) {
        gsap.fromTo(
          tertiaryContent,
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: tertiaryContent,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        )
      }
    } else {
      // For reduced motion, set overlay to be visible when section is in view
      if (sectionOverlay && secondaryContent) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.set(sectionOverlay, { opacity: 1, display: "block" })
              } else {
                gsap.set(sectionOverlay, { opacity: 0, display: "none" })
              }
            })
          },
          { threshold: 0.3 },
        )
        observer.observe(secondaryContent)

        return () => {
          observer.disconnect()
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-gradient-to-b from-[#0a0e27] via-[#0a0e27] to-[#0a0e27]">
      <div className="sticky top-0 h-screen z-0 pointer-events-none relative" data-hero-section>
        <HeroSection />
        {/* Overlay that gradually becomes black on scroll - covers all hero content including text */}
        <div
          data-hero-overlay
          className="absolute inset-0 bg-black opacity-0 pointer-events-none z-[100]"
          aria-hidden="true"
        />
        {/* Section overlay that covers fixed hero when "Trusted by" section comes into view */}
        <div
          data-section-overlay
          className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0a0e27] to-[#151b34] opacity-0 pointer-events-none z-[101] transition-opacity duration-300 hidden"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 pointer-events-auto">
        <div className="h-48 sm:h-64 md:h-80" /> {/* Responsive spacer for scroll trigger */}
        <SecondarySection />
        <div className="h-64 sm:h-72 md:h-96" /> {/* Responsive spacer between sections */}
        <TertiarySection />
        <div className="h-32 sm:h-48 md:h-96" /> {/* Extra space at bottom */}
      </div>
    </div>
  )
}
