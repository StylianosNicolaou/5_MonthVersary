"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface HoldButtonProps {
  onComplete: () => void;
  duration?: number;
}

export default function HoldButton({
  onComplete,
  duration = 3,
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHolding && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (duration * 10);
          if (newProgress >= 100) {
            setIsComplete(true);
            setIsHolding(false);
            onComplete();
            return 100;
          }
          return newProgress;
        });
      }, 100);
    } else if (!isHolding && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 3;
          return Math.max(0, newProgress);
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isHolding, isComplete, duration, onComplete]);

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-80"
        style={{
          scaleX: progress / 100,
          transformOrigin: "left",
        }}
      />
      <Button
        onMouseDown={() => setIsHolding(true)}
        onTouchStart={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onTouchEnd={() => setIsHolding(false)}
        onMouseLeave={() => setIsHolding(false)}
        disabled={isComplete}
        className={`relative bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/40 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 ${
          isHolding ? "scale-105" : ""
        } ${isComplete ? "bg-gradient-to-r from-pink-500 to-purple-600" : ""}`}
      >
        <span className="flex items-center gap-2">
          {isComplete ? (
            <>
              <Heart className="h-5 w-5 fill-current" />
              <span>Forever Yours</span>
            </>
          ) : (
            <>Press and hold to see what&apos;s next</>
          )}
        </span>
      </Button>
    </div>
  );
}
