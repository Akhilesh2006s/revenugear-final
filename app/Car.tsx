"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import type { Group } from "three"
import { Poppins, Inter } from "next/font/google"
import { Brain } from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

interface Brand {
  logo: string
}

const brands: Brand[] = [
  {
    logo: "brand1.png",
  },
  {
    logo: "brand-2.png",
  },
  {
    logo: "brand-3.png",
  },
  {
    logo: "brand4.png",
  },
  {
    logo: "brand-4.png",
  },
  {
    logo: "brand-6.png",
  },
  {
    logo: "brand7.png",
  },
  {
    logo: "brand-8.png",
  },
  {
    logo: "brand-9.png",
  },
  {
    logo: "brand-10.png",
  },
]

interface RotatingModelProps {
  scrollY: number
}

function RotatingModel({ scrollY }: RotatingModelProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF("20.glb")

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollY * 0.005
      modelRef.current.rotation.x = Math.sin(scrollY * 0.003) * 0.1
    }
  })

  return (
    <group ref={modelRef} scale={[1, 1, 1]} position={[0, -1.8, 0]}>
      <primitive object={scene} />
    </group>
  )
}

interface SceneProps {
  scrollY: number
}

function Scene({ scrollY }: SceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, -0.3, 6]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
      <RotatingModel scrollY={scrollY} />
      <Environment preset="city" />

      {/* Warm transparent overlay */}
      <mesh position={[0, -0.44, 4.9]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#FEF3C7" transparent={true} opacity={0.7} />
      </mesh>
    </>
  )
}

const FlyText = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  flyDirection = "up",
  flyDistance = 100,
  scale = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  flyDirection?: "up" | "down" | "left" | "right"
  flyDistance?: number
  scale?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: `-${threshold * 100}% 0px -${threshold * 100}% 0px`,
  })

  let initialX = 0
  let initialY = 0
  let exitX = 0
  let exitY = 0

  switch (flyDirection) {
    case "up":
      initialY = flyDistance
      exitY = -flyDistance
      break
    case "down":
      initialY = -flyDistance
      exitY = flyDistance
      break
    case "left":
      initialX = flyDistance
      exitX = -flyDistance
      break
    case "right":
      initialX = -flyDistance
      exitX = flyDistance
      break
  }

  return (
    <div ref={ref} className="overflow-visible">
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{
              opacity: 0,
              x: initialX,
              y: initialY,
              scale: scale ? 0.5 : 1,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: exitX,
              y: exitY,
              scale: scale ? 0.5 : 1,
              transition: {
                duration: duration * 0.8,
                ease: [0.32, 0.72, 0, 1],
              },
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const EnhancedStaggeredText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  flyDirection = "up",
  flyDistance = 80,
  style,
}: {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  flyDirection?: "up" | "down" | "left" | "right"
  flyDistance?: number
  style?: React.CSSProperties
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" })
  const words = text.split(" ")

  let initialX = 0
  let initialY = 0

  switch (flyDirection) {
    case "up":
      initialY = flyDistance
      break
    case "down":
      initialY = -flyDistance
      break
    case "left":
      initialX = flyDistance
      break
    case "right":
      initialX = -flyDistance
      break
  }

  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {isInView && (
          <div className="flex flex-wrap justify-center gap-2">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  x: initialX,
                  y: initialY,
                  scale: 0.3,
                  rotateX: -45,
                  rotateY: flyDirection === "left" || flyDirection === "right" ? -30 : 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: delay + index * staggerDelay,
                  ease: [0.215, 0.61, 0.355, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="inline-block whitespace-nowrap"
                style={{
                  transformOrigin: "center center",
                  textShadow: "0 4px 8px rgba(249, 160, 27, 0.3)",
                  fontFamily: poppins.style.fontFamily,
                  ...style,
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#F9A01B",
                  textShadow: "0 6px 12px rgba(249, 160, 27, 0.5)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 mx-6 group cursor-pointer">
      <div className="relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
        <img
          src={brand.logo || "logo.png"}
          alt="Brand Logo"
          className="w-32 h-32 object-contain transition-all duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

export default function RevenueGearLanding() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)

  // Model opacity and scale - instant disappear when reaching "Experience the Difference" section
  const modelOpacity = useTransform(scrollYProgress, [0.68, 0.72], [1, 0])
  const modelScale = useTransform(scrollYProgress, [0.68, 0.72], [1, 0.8])

  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Audio handling - more aggressive autoplay detection
  useEffect(() => {
    let hasTriedAutoplay = false

    const tryPlayAudio = async () => {
      if (!audioRef.current || audioStarted) return

      try {
        audioRef.current.volume = 0.5
        await audioRef.current.play()
        setAudioStarted(true)
        console.log("Audio started successfully")
        return true
      } catch (error) {
        console.log("Audio play attempt failed:", error)
        return false
      }
    }

    // Try to play immediately on component mount
    const attemptAutoplay = async () => {
      if (hasTriedAutoplay) return
      hasTriedAutoplay = true

      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners if successful
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    const handleInteraction = async () => {
      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners after successful start
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    // Try autoplay first
    attemptAutoplay()

    // Add multiple event listeners for user interaction
    document.addEventListener("click", handleInteraction, { passive: true })
    document.addEventListener("scroll", handleInteraction, { passive: true })
    document.addEventListener("touchstart", handleInteraction, { passive: true })
    document.addEventListener("keydown", handleInteraction, { passive: true })
    document.addEventListener("mousemove", handleInteraction, { passive: true })
    window.addEventListener("focus", handleInteraction, { passive: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("scroll", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("mousemove", handleInteraction)
      window.removeEventListener("focus", handleInteraction)
    }
  }, [audioStarted])

  // Additional audio setup and retry mechanism
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Set up audio properties
    audio.preload = "auto"
    audio.volume = 0.5

    // Try to load the audio
    const handleCanPlay = () => {
      console.log("Audio can play")
    }

    const handleLoadedData = () => {
      console.log("Audio loaded")
    }

    const handleError = (e: Event) => {
      console.log("Audio error:", e)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("error", handleError)

    // Force load
    audio.load()

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 ${poppins.className}`}
    >
      {/* Audio Element - plays once until it ends */}
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src="1000.mp4" type="audio/mp4" />
        <source src="1000.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Navigation Header */}
    <motion.nav
  className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-transparent"
  initial={{ opacity: 0, y: -30 }}
  animate={{
    opacity: 1,
    y: scrollDirection === "down" ? -140 : 0,
  }}
  transition={{
    duration: scrollDirection === "down" ? 0.3 : 0.6,
    delay: scrollDirection === "down" ? 0 : 0.1,
    ease: "easeInOut",
  }}
>
  {/* Logo on the left */}
  <motion.img
    src="logo100.png"
    alt="Revenue Gear Logo"
    className="w-[150px] h-auto object-contain -translate-y-10"
    whileHover={{
      scale: 1.05,
    }}
    transition={{ duration: 0.4 }}
  />

  {/* Contact Us Button on the right */}
  <motion.a
    href="https://revlabs.tech/#contact"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold tracking-wide shadow-lg text-sm md:text-base transition-all  -translate-y-10"
    style={{
      background: `linear-gradient(to right, #F9A01B, #F97316)`,
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(249, 160, 27, 0.4)",
    }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="flex items-center space-x-2">
      <span>Contact Us</span>
      <motion.svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </motion.svg>
    </span>
  </motion.a>
</motion.nav>


      {/* 3D Model Section */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{
          opacity: modelOpacity,
          scale: modelScale,
        }}
      >
        <Canvas className="w-full h-full">
          <Scene scrollY={scrollY} />
        </Canvas>
      </motion.div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-yellow-50/20 to-orange-50/30 overflow-hidden pt-20">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
               
                

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Customers never forget a bad experience at the dealership <br></br>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    95% of calls go unreviewed where hidden revenue leaks occur.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 mb-8 max-w-2xl"
                >
                  It's impossible to manually catch every revenue leak in call centers flooded with thousands of calls.
                  RevenueGear's AI Agent provides visibility on 100% of customer calls—detecting churn risks, repeat
                  complaints, and service issues across Indian and global languages.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 mb-8 max-w-2xl"
                >
                  Get an actionable hotlist of at-risk customers, plus voice of customer analytics and agent
                  performance, playbook adherence for sales and service at vehicle dealerships.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
                ></motion.div>
              </motion.div>

              {/* Right Content - Animated Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="space-y-6">
                    {/* Waveform Animation */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Brain size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-2">Live Call Analysis</div>
                        <div className="flex items-center gap-1">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-full"
                              style={{ height: `${Math.random() * 40 + 10}px` }}
                              animate={{ height: [`${Math.random() * 40 + 10}px`, `${Math.random() * 40 + 10}px`] }}
                              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-medium">High churn risk detected</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-amber-700 font-medium">Customer frustration: Medium</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-700 font-medium">Service team alerted</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
      </div>
      {/* Trusted Brands Section */}
      <div className="relative z-10 py-20">
        <div className="text-center mb-16">
          <FlyText delay={0.2} flyDirection="up" flyDistance={80}>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${poppins.className}`}
              style={{ color: "#743400" }}
            >
              OUR CUSTOMERS'S BRAND
            </h2>
          </FlyText>
        </div>

        {/* Single Line Brand Animation */}
        <div className="relative space-y-8 py-8">
          <div className="relative overflow-hidden">
            {/* Gradient Fade Effects */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-transparent via-white/20 to-transparent z-10"></div>

            <div className="flex animate-scroll-left">
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <BrandLogo key={`brand-${index}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for horizontal animations */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
