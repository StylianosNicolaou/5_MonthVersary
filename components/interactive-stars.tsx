"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function InteractiveStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }))
    setStars(newStars)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {stars.map((star) => {
        // Calculate distance from mouse
        const dx = star.x - mousePosition.x
        const dy = star.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Stars move slightly away from mouse
        const repelStrength = Math.min(5, 100 / (distance + 10))
        const moveX = dx > 0 ? repelStrength : -repelStrength
        const moveY = dy > 0 ? repelStrength : -repelStrength

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              x: distance < 20 ? moveX : 0,
              y: distance < 20 ? moveY : 0,
              opacity: [0.4, 1, 0.4],
              scale: distance < 10 ? [1, 1.5, 1] : [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + star.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}
