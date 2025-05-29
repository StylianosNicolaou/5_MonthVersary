"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, X } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurpriseModal({ isOpen, onClose }: SurpriseModalProps) {
  const [step, setStep] = useState(0);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#8b5cf6", "#6366f1"],
    });
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-slate-900/95 backdrop-blur-xl border border-white/20 text-white max-w-2xl p-0 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white hover:bg-white/10 z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <div className="text-center space-y-6 py-8">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Gift className="h-16 w-16 mx-auto text-pink-400" />
                </motion.div>
                <h2 className="text-3xl font-serif text-pink-300">
                  A Special Surprise
                </h2>
                <p className="text-lg text-purple-200">
                  I have something special waiting for you. Are you ready to see
                  it?
                </p>
                <Button
                  onClick={handleConfetti}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  Reveal Surprise
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="text-center space-y-6 py-4">
                <div className="relative w-full h-64 md:h-80">
                  <Image
                    src="/sike.png?height=400&width=600"
                    alt="Special surprise"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-3xl font-serif text-pink-300">
                  Your Gift Awaits
                </h2>
                <p className="text-lg text-purple-200">
                  Hahaha... got ya bitch. I guess you'll see tomorrow. Love ya.
                  Bye.
                </p>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    >
                      <Heart className="h-6 w-6 text-pink-400 fill-pink-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
