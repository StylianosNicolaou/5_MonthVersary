"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import Image from "next/image";

interface Memory {
  title: string;
  content: string;
  image?: string;
}

interface GalaxyModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
}

export default function GalaxyModal({
  isOpen,
  onClose,
  memory,
}: GalaxyModalProps) {
  if (!memory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-slate-900/95 backdrop-blur-xl border border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-serif text-pink-300 flex items-center gap-2">
              <Star className="h-6 w-6 fill-current text-yellow-300" />
              {memory.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-[90vh] overflow-y-auto px-2">
          {memory.image && (
            <div className="relative w-full max-h-[80vh] overflow-hidden flex justify-center">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                width={500}
                height={800}
                className="rounded-lg shadow-2xl border border-white/20 object-contain max-h-[60vh] w-auto"
              />
            </div>
          )}

          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <p className="text-lg leading-relaxed text-purple-100">
              {memory.content}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-1 text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
