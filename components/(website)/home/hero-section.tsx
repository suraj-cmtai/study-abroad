"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function HeroSection() {
  const router = useRouter()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Original scroll-based transformations for content
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // New: Background pattern pan/zoom effect
  const patternScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const patternX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const handleWatchNow = async () => {
    if (videoRef.current) {
      try {
        if (isVideoPlaying) {
          videoRef.current.pause()
          setIsVideoPlaying(false)
        } else {
          await videoRef.current.play()
          setIsVideoPlaying(true)
        }
      } catch (error) {
        console.error("Video play failed:", error)
        setVideoError(true)
      }
    }
  }

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children animations
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback Image */}
        {(!isVideoLoaded || videoError) && (
          <Image
            src="/images/hero.jpeg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}

        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => {
            setIsVideoLoaded(true)
            videoRef.current
              ?.play()
              .then(() => setIsVideoPlaying(true))
              .catch((err) => {
                console.error("Autoplay failed:", err)
                setIsVideoPlaying(false)
              })
          }}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onError={() => {
            console.error("Video failed to load")
            setVideoError(true)
            setIsVideoLoaded(false)
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dynamic Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy/90"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>

      {/* Animated Pattern */}
      <motion.div
        style={{ scale: patternScale, x: patternX, y: patternY }}
        className="absolute inset-0 opacity-10 z-10"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-20"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="w-full max-w-7xl mx-auto px-4 relative z-20"
      >
        <motion.div
          className="text-center text-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Only animate once when in view
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Your Gateway to{" "}
            <span className="text-orange block">Global Education</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
          >
            Discover world-class education opportunities abroad with our
            comprehensive study programs. Transform your future with
            international experience.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/courses" className="w-full sm:w-auto">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8 group py-4 text-lg transition-all">
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

            {/* <Button
              size="lg"
              variant="outline"
              className="border-navy hidden text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg transition-all"
              onClick={handleWatchNow}
            >
              <Play
                className={`mr-2 h-5 w-5 transition-opacity ${isVideoPlaying ? "opacity-50" : ""}`}
              />
              {isVideoPlaying ? "Pause Video" : "Watch Now"}
            </Button> */}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-orange/20 rounded-full blur-xl z-10"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl z-10"
      />
    </section>
  )
}