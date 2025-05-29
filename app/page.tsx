"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Star, Heart } from "lucide-react";
import Image from "next/image";
import { chapters, memories } from "@/data/memories";
import AudioPlayer from "@/components/audio-player";
import GalaxyModal from "@/components/galaxy-modal";
import StarField from "@/components/star-field";
import LoadingScreen from "@/components/loading-screen";
import InteractiveStars from "@/components/interactive-stars";
import HoldButton from "@/components/hold-button";
import ParallaxImage from "@/components/parallax-image";
import SurpriseModal from "@/components/surprise-modal";

export default function TimelineOfUs() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const loveLetterRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const loveLetter = `ΨΧμ,

I wanted to say that basically you are my entire life. You are the reason I live, the reason I breathe and I would NEVER, not in a million years change ANY decision I took that brought me to you.

I will always love you (more) and I will always protect you and our future family with my life. 

You are the best thing that ever happened to me and I am so glad that I have the privilege to call you my girlfriend, and soon wife.

I love you agapi mou, zoi mou, kardia mou, moro mou ❤️

Forever yours,
❤️ KK ❤️`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = chapterRefs.current.indexOf(
              entry.target as HTMLElement
            );
            if (index !== -1) {
              setCurrentChapter(index);
            }

            // Check if love letter section is in view
            if (entry.target === loveLetterRef.current) {
              setShowLoveLetter(true);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    chapterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (loveLetterRef.current) {
      observer.observe(loveLetterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showLoveLetter) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= loveLetter.length) {
          setTypewriterText(loveLetter.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [showLoveLetter]);

  const scrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleHoldComplete = () => {
    setTimeout(() => {
      setShowSurprise(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 text-white overflow-x-hidden relative">
      <LoadingScreen />
      <StarField />
      <InteractiveStars />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="text-center z-10 px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
          >
            Our Universe
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-purple-200"
          >
            in 5 Chapters
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button
              onClick={() => scrollToChapter(0)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Start our Story
            </Button>
          </motion.div>
        </div>

        {/* Easter Egg Star */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => setShowEasterEgg(true)}
          className="absolute top-20 left-20 text-yellow-300 hover:text-yellow-200 transition-all duration-300 hover:scale-125 animate-pulse"
        >
          <Star className="h-6 w-6 fill-current" />
        </motion.button>
      </motion.section>

      {/* Chapters */}
      {chapters.map((chapter, index) => (
        <motion.section
          key={index}
          ref={(el) => (chapterRefs.current[index] = el)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="min-h-screen flex items-center py-20 px-4 md:px-8"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <motion.div
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <h2 className="text-4xl md:text-5xl font-serif text-pink-300">
                    Chapter {index + 1}
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-light text-purple-200">
                    {chapter.title}
                  </h3>
                  <p className="text-purple-300 text-lg">{chapter.date}</p>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/20 backdrop-blur-sm border border-white/20 p-6">
                    <p className="text-lg leading-relaxed text-purple-100 italic">
                      "{chapter.quote}"
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <button
                    onClick={() => setSelectedMemory(memories[index])}
                    className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors"
                  >
                    <Star className="h-5 w-5 fill-current" />
                    <span>View Constellation Memory</span>
                  </button>
                </motion.div>
              </div>

              <div
                className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <motion.div
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <ParallaxImage
                    src={chapter.image || "/placeholder.svg"}
                    alt={chapter.title}
                    width={500}
                    height={400}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/20 backdrop-blur-sm border border-white/20 p-4">
                    <h4 className="text-lg font-medium text-purple-200 mb-2">
                      Star Map - {chapter.date}
                    </h4>
                    <Image
                      src={chapter.starMap || "/placeholder.svg"}
                      alt={`Star map for ${chapter.date}`}
                      width={400}
                      height={200}
                      className="rounded-lg w-full"
                    />
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Love Letter Section */}
      <section
        ref={loveLetterRef}
        className="min-h-screen flex items-center justify-center py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif mb-12 text-pink-300"
          >
            A Letter from the Stars
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/30 backdrop-blur-sm border border-white/20 p-8 md:p-12">
              <div className="text-left space-y-4">
                <pre className="whitespace-pre-wrap text-lg leading-relaxed text-purple-100 font-sans">
                  {typewriterText}
                </pre>
                {showLoveLetter &&
                  typewriterText.length >= loveLetter.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="text-center pt-8"
                    >
                      <div className="inline-flex items-center gap-2 text-pink-300 animate-pulse">
                        <Heart className="h-6 w-6 fill-current" />
                        <span className="text-xl">Forever and Always</span>
                        <Heart className="h-6 w-6 fill-current" />
                      </div>

                      <div className="mt-12">
                        <HoldButton onComplete={handleHoldComplete} />
                      </div>
                    </motion.div>
                  )}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <GalaxyModal
        isOpen={!!selectedMemory}
        onClose={() => setSelectedMemory(null)}
        memory={selectedMemory}
      />

      <GalaxyModal
        isOpen={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
        memory={{
          title: "Secret Message",
          content: "Telika ontos 💌 Είμαστε αλλιώς 💌",
          image: "/sm.png?height=300&width=400",
        }}
      />

      <SurpriseModal
        isOpen={showSurprise}
        onClose={() => setShowSurprise(false)}
      />
    </div>
  );
}
