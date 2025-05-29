"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const createHeart = () => {
      const colors = ["text-pink-300", "text-purple-300", "text-rose-300", "text-fuchsia-300"]
      const newHeart: FloatingHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: Math.random() * 20 + 15,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setHearts((prev) => [...prev, newHeart])

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id))
      }, 8000)
    }

    const interval = setInterval(createHeart, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: heart.x,
              y: heart.y,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: heart.x + (Math.random() - 0.5) * 200,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 8,
              ease: "easeOut",
            }}
            className={`absolute ${heart.color}`}
            style={{
              fontSize: heart.size,
            }}
          >
            <Heart className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
