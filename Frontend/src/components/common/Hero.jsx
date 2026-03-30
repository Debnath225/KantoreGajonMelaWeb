import { useEffect, useRef, useState } from "react";
import Mahadev from "../../assets/images/mahadev1.webp";
import MahadevVideo from "../../assets/videos/Mahadev-Video-row.mp4";
import imageData from "@/store/imageData.json";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react"; // Added Icons
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import AnimatedText from "@/components/shared/AnimatedText";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

function HeroTextOverlay({ isPlaying, isMuted, onTogglePlay, onToggleMute }) {
  return (
    <div className="flex flex-col gap-2">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="inline-flex w-fit items-center rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-200"
      >
        Live Festival Experience
      </motion.span>
      <AnimatedText
        as="h1"
        text="Kantore Gajon Mala 2026"
        className="typo-display text-white drop-shadow-lg !text-2xl sm:!text-3xl md:!text-5xl"
        delay={0.12}
        wordDelay={0.05}
      />
      <AnimatedText
        text="A living celebration of faith, rhythm, and devotion."
        className="typo-body text-gray-200 drop-shadow-md max-w-lg"
        delay={0.26}
        wordDelay={0.03}
        duration={0.38}
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <button
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 hover:scale-105 transition-all duration-300 active:scale-95"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-2 flex flex-wrap gap-2"
      >
        <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-cyan-100/90">
          Sacred Rituals
        </span>
        <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-cyan-100/90">
          Community Gathering
        </span>
      </motion.div>
    </div>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(max-width: 767px)").matches;
  });
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [liteMobileMode, setLiteMobileMode] = useState(false);

  // Enable lightweight mode on lower-powered/data-saving mobile devices.
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateLiteMode = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const saveData = Boolean(connection?.saveData);
      const lowCpu = (navigator.hardwareConcurrency || 8) <= 4;
      const lowMemory = (navigator.deviceMemory || 8) <= 4;
      const enable = mobileQuery.matches && (saveData || lowCpu || lowMemory || reducedMotionQuery.matches);
      setLiteMobileMode(enable);
    };

    updateLiteMode();
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", updateLiteMode);
      reducedMotionQuery.addEventListener("change", updateLiteMode);
    } else {
      mobileQuery.addListener(updateLiteMode);
      reducedMotionQuery.addListener(updateLiteMode);
    }
    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener("change", updateLiteMode);
        reducedMotionQuery.removeEventListener("change", updateLiteMode);
      } else {
        mobileQuery.removeListener(updateLiteMode);
        reducedMotionQuery.removeListener(updateLiteMode);
      }
    };
  }, []);

  // Intro Screen Timer (desktop only).
  useEffect(() => {
    if (!showIntro || liteMobileMode) {
      return undefined;
    }

    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, [liteMobileMode, showIntro]);

  // Carousel Tracker
  useEffect(() => {
    if (!carouselApi) return;
    const updateSlide = () =>
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);
    return () => {
      carouselApi.off("select", updateSlide);
      carouselApi.off("reInit", updateSlide);
    };
  }, [carouselApi]);

  // Unified Media Controls
  const toggleMediaState = (type) => {
    const videos = [videoRef.current, mobileVideoRef.current].filter(Boolean);
    if (!videos.length) return;

    if (type === "play") {
      const shouldPlay = videos.some((v) => v.paused);
      videos.forEach((v) => (shouldPlay ? v.play() : v.pause()));
      setIsPlaying(shouldPlay);
    } else {
      const nextMuted = !isMuted;
      videos.forEach((v) => (v.muted = nextMuted));
      setIsMuted(nextMuted);
    }
  };

  return (
    <section className="section-shell-with-nav relative overflow-hidden bg-black min-h-[76vh] md:min-h-screen flex items-center">
      {/* Cinematic Intro Overlay */}
      <AnimatePresence>
        {showIntro && !liteMobileMode && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="absolute inset-0 z-50 bg-black pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Smooth custom easing
              className="h-1 w-full max-w-md bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Background Video */}
      {liteMobileMode ? (
        <img
          src={Mahadev}
          alt="Mahadev"
          loading="eager"
          decoding="async"
          className="absolute inset-0 block w-full h-full object-cover object-center md:hidden opacity-65"
        />
      ) : (
        <video
          ref={mobileVideoRef}
          src={MahadevVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={Mahadev}
          className="absolute inset-0 w-full h-full object-cover md:hidden opacity-60"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:hidden" />

      {/* Ambient Desktop Glow */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-blue-900/10 to-black blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -top-24 left-1/2 hidden h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl md:block"
      />

      <div className="section-inner relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 min-h-[62vh] md:min-h-[75vh]">
          {/* Mobile Text Overlay (Only visible on mobile) */}
          <motion.div
            initial={liteMobileMode ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              liteMobileMode
                ? { duration: 0.2 }
                : {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.2,
                  }
            }
            className="md:hidden flex flex-col justify-center sm:justify-end min-h-[38vh] sm:min-h-[44vh] pb-4 pt-2"
          >
            <HeroTextOverlay
              isPlaying={isPlaying}
              isMuted={isMuted}
              onTogglePlay={() => toggleMediaState("play")}
              onToggleMute={() => toggleMediaState("mute")}
            />
          </motion.div>

          {/* Main Desktop Video Bento Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="hidden md:flex md:col-span-8 md:row-span-2 rounded-[2rem] overflow-hidden relative border border-white/10 shadow-2xl group"
          >
            <video
              ref={videoRef}
              src={MahadevVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={Mahadev}
              className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {/* Desktop Vignette & Text Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
            <div className="absolute left-8 bottom-8 z-20 pr-8">
              <HeroTextOverlay
                isPlaying={isPlaying}
                isMuted={isMuted}
                onTogglePlay={() => toggleMediaState("play")}
                onToggleMute={() => toggleMediaState("mute")}
              />
            </div>
          </motion.div>

          {/* Carousel Bento Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
            className="md:col-span-4 md:row-span-1 rounded-3xl overflow-hidden border border-white/10 h-[220px] sm:h-[250px] md:h-full bg-zinc-900/50 relative group"
          >
            <Carousel
              opts={{ loop: true, align: "start" }}
              setApi={setCarouselApi}
              className="h-full w-full"
            >
              <CarouselContent className="h-full -ml-0">
                {imageData.images.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="pl-0 h-full basis-full"
                  >
                    <Card className="border-0 h-full bg-transparent rounded-none">
                      <CardContent className="p-0 h-full relative">
                        <img
                          alt={image.title}
                          src={optimizeCloudinaryUrl(image.url, {
                            width: 1200,
                            height: 800,
                            crop: "fill",
                          })}
                          loading="lazy"
                          className="block object-cover object-center h-full w-full transition-transform duration-700 hover:scale-110"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Refined Carousel Buttons */}
              <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <CarouselPrevious className="left-3 md:left-4 bg-black/50 border-white/20 text-white hover:bg-black hover:text-white" />
                <CarouselNext className="right-3 md:right-4 bg-black/50 border-white/20 text-white hover:bg-black hover:text-white" />
              </div>
            </Carousel>

            {/* Slide Indicator Pill */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-xs text-white font-medium px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              {currentSlide} / {imageData.images.length}
            </div>
          </motion.div>

          {/* Static Image Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            className="hidden sm:block md:col-span-4 md:row-span-1 rounded-3xl overflow-hidden border border-white/10 h-[200px] md:h-full relative group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src={Mahadev}
              alt="Mahadev portrait"
              loading="lazy"
              className="block object-cover object-center h-full w-full transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
