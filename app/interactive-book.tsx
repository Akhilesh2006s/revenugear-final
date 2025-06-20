"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ComicBookReader() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTime = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null)

  const pages = [
    {
      title: "Page 1",
      leftPage: {
        background: "COVER2.png",
        photos: [
          { default: "1.png", hover: "1-hover.png" },
          { default: "2.png", hover: "2-hover.png" },
        ],
      },
      rightPage: {
        background: "COVER2.png",
        photos: [
          { default: "3.png", hover: "3-hover.png" },
          { default: "4.png", hover: "4-hover.png" },
        ],
      },
    },
    {
      title: "Page 2",
      leftPage: {
        background: "COVER2.png",
        photos: [
          { default: "5.png", hover: "5-hover.png" },
          { default: "6.png", hover: "6-hover.png" },
        ],
      },
      rightPage: {
        background: "COVER2.png",
        photos: [
          { default: "7.png", hover: "7-hover.png" },
          { default: "8.png", hover: "8-hover.png" },
        ],
      },
    },
    {
      title: "Page 3",
      leftPage: {
        background: "COVER2.png",
        photos: [
          { default: "9.png", hover: "9-hover.png" },
          { default: "10.png", hover: "10-hover.png" },
        ],
      },
      rightPage: {
        background: "COVER2.png",
        photos: [
          { default: "12.png", hover: "12-hover.png" },
          { default: "13.png", hover: "13-hover.png" },
        ],
      },
    },
  ]

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()

    const now = Date.now()
    if (now - lastScrollTime.current < 500 || isFlipping || isOpening) return
    lastScrollTime.current = now

    if (e.deltaY > 0) {
      if (currentPage < pages.length - 1) {
        setFlipDirection("next")
        setIsFlipping(true)
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1)
          setTimeout(() => setIsFlipping(false), 300)
        }, 300)
      } else {
        setIsFlipping(true)
        setTimeout(() => {
          setIsOpen(false)
          setCurrentPage(0)
          setIsFlipping(false)
        }, 500)
      }
    } else {
      if (currentPage > 0) {
        setFlipDirection("prev")
        setIsFlipping(true)
        setTimeout(() => {
          setCurrentPage((prev) => prev - 1)
          setTimeout(() => setIsFlipping(false), 300)
        }, 300)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      const bookElement = document.getElementById("book-container")
      if (bookElement) {
        bookElement.addEventListener("wheel", handleScroll, { passive: false })
        return () => bookElement.removeEventListener("wheel", handleScroll)
      }
    }
  }, [isOpen, currentPage, isFlipping, isOpening])

  const openBook = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }

    setIsOpening(true)
    setIsOpen(true)
    setCurrentPage(0)

    setTimeout(() => {
      setIsOpening(false)
    }, 1000)
  }

  const closeBook = () => {
    setIsOpen(false)
    setCurrentPage(0)
    setIsOpening(false)
  }

  const renderPage = (pageData: any, isLeft: boolean) => {
    if (!pageData) return null

    return (
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${pageData.background})`,
          }}
        />
        <div className="absolute inset-0 bg-orange-50/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 sm:gap-6 sm:p-8">
          {pageData.photos.map((photo: any, index: number) => {
            const photoKey = `${currentPage}-${isLeft ? "left" : "right"}-${index}`
            const isHovered = hoveredPhoto === photoKey

            return (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-110 border-4 border-white/90 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  maxWidth: "100%",
                  maxHeight: "70%",
                  minHeight: "250px",
                  transform: `rotate(${index % 2 === 0 ? 3 : -3}deg)`,
                }}
                onMouseEnter={() => setHoveredPhoto(photoKey)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <img
                  src={photo.default || photo || "/placeholder.png"}
                  alt="Comic Photo"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-4 sm:p-8 md:p-20 pt-16 sm:pt-24 md:pt-32">
      {/* Animated Heading */}
      <div className="mb-8 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent animate-pulse-glow font-serif tracking-wider drop-shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, #FF8C00, #FF6B35, #FF8C00)`,
          }}
        >
          THE COMIC STORY
        </h1>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: "#FF8C00" }}></div>
          <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: "#FF8C00", animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>

      <div className="relative">
        {!isOpen ? (
          // Closed Book with Photo Cover
          <div
            className="cursor-pointer transform perspective-1000 transition-all duration-500"
            onClick={openBook}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: isHovered ? "rotateZ(-15deg) rotateY(10deg) scale(1.05)" : "rotateZ(0deg) scale(1)",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Card className="w-full sm:w-[400px] md:w-[500px] h-[500px] sm:h-[550px] md:h-[600px] shadow-2xl relative overflow-hidden border-4 border-orange-400 bg-white">
              <div className="absolute inset-0">
                <img src="COVER.jpg" alt="Comic Book Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-transparent to-yellow-900/30"></div>
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-white">
                <div className="text-yellow-200 text-xs sm:text-sm bg-gray-800/70 px-4 py-1 rounded-full backdrop-blur-sm border border-orange-300/30">
                  Click to explore • Scroll to turn pages
                </div>
              </div>
              <div className="absolute right-0 top-0 w-3 h-full bg-gradient-to-l from-orange-600 to-orange-400 shadow-inner"></div>
              <div className="absolute right-3 top-0 w-1 h-full bg-orange-500"></div>
            </Card>
          </div>
        ) : (
          // Open Book with Page Turning Animation
          <div id="book-container" className="relative cursor-grab active:cursor-grabbing">
            <Card
              className={`w-full sm:w-[800px] md:w-[900px] h-[500px] sm:h-[550px] md:h-[600px] bg-white shadow-2xl relative overflow-hidden border border-orange-200 transition-all duration-1000 ${isOpening ? "animate-book-open" : ""}`}
            >
              {/* Book Binding */}
              <div className="absolute left-1/2 top-0 w-2 h-full bg-orange-600 transform -translate-x-1/2 z-20 shadow-lg"></div>

              {/* Opening Animation Cover */}
              {isOpening && (
                <div className="absolute inset-0 z-30">
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-white origin-right animate-page-turn-left shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
                      <div className="text-gray-600 text-lg font-serif">Opening...</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Page Spread */}
              <div className="absolute inset-0 flex">
                {/* Left Page */}
                <div className="w-1/2 h-full border-r border-orange-200 relative overflow-hidden">
                  {renderPage(pages[currentPage]?.leftPage, true)}
                </div>

                {/* Right Page */}
                <div className="w-1/2 h-full relative overflow-hidden">
                  {renderPage(pages[currentPage]?.rightPage, false)}
                </div>
              </div>

              {/* Page Turning Animation Overlay */}
              {isFlipping && !isOpening && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {flipDirection === "next" ? (
                    <div className="absolute right-0 top-0 w-1/2 h-full origin-left animate-flip-next shadow-2xl relative overflow-hidden">
                      <div className="transform scale-x-[-1] w-full h-full">
                        {currentPage < pages.length && renderPage(pages[currentPage]?.rightPage, false)}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-0 top-0 w-1/2 h-full origin-right animate-flip-prev shadow-2xl relative overflow-hidden">
                      {renderPage(pages[currentPage]?.leftPage, true)}
                    </div>
                  )}
                </div>
              )}

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-100 z-30">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((currentPage + 1) / pages.length) * 100}%`,
                    backgroundColor: "#FF8C00",
                  }}
                ></div>
              </div>
            </Card>

            {/* Instructions */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-gray-700 text-xs sm:text-sm font-medium">
                Scroll down for next page • Scroll up for previous page • Hover over photos for effects
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Page {currentPage + 1} of {pages.length}
              </p>
            </div>

            {/* Close Button */}
            
          </div>
        )}
      </div>

      {/* Audio element for book opening sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/book.mp4" type="audio/mp4" />
        <source src="/book.m4a" type="audio/mp4" />
      </audio>

      <style jsx global>{`
        @keyframes flip-next {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(-90deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }
        
        @keyframes flip-prev {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(90deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(180deg);
            opacity: 0;
          }
        }

        @keyframes page-turn-left {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }

        @keyframes book-open {
          0% {
            transform: scale(0.8) rotateX(10deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 140, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.3), 0 0 60px rgba(255, 140, 0, 0.1);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 140, 0, 0.8), 0 0 60px rgba(255, 140, 0, 0.5), 0 0 90px rgba(255, 140, 0, 0.3);
          }
        }
        
        .animate-flip-next {
          animation: flip-next 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-flip-prev {
          animation: flip-prev 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-page-turn-left {
          animation: page-turn-left 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-book-open {
          animation: book-open 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        #book-container {
          perspective: 1200px;
        }
      `}</style>
    </div>
  )
}
