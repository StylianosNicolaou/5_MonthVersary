"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function ParallaxImage({ src, alt, width, height, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Calculate element's position relative to viewport
  useEffect(() => {
    if (!ref.current) return

    const setValues = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        setElementTop(rect.top + window.scrollY)
      }
      setClientHeight(window.innerHeight)
    }

    setValues()
    window.addEventListener("resize", setValues)
    return () => window.removeEventListener("resize", setValues)
  }, [ref])

  const y = useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [-50, 50])

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-lg ${className}`}>
      <motion.div style={{ y }} className="relative">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-300 w-full h-auto"
        />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-pulse shadow-lg shadow-pink-400/50" />
      </motion.div>
    </div>
  )
}
