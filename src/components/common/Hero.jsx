import { useEffect, useRef, useState } from "react";
import Mahadev from "../../assets/images/mahadev1.jpg";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MahadevVideo from "../../assets/videos/Mahadev-Video-row.mp4";
import imageData from "@/store/imageData.json";
import { Card, CardContent } from "../ui/card";

function Hero() {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSlide = () => setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);
    return () => {
      carouselApi.off("select", updateSlide);
      carouselApi.off("reInit", updateSlide);
    };
  }, [carouselApi]);

  const togglePlay = () => {
    const videos = [videoRef.current, mobileVideoRef.current].filter(Boolean);
    if (!videos.length) return;

    const shouldPlay = videos.some((video) => video.paused);
    videos.forEach((video) => {
      if (shouldPlay) {
        video.play();
      } else {
        video.pause();
      }
    });
    setIsPlaying(shouldPlay);
  };

  const toggleMute = () => {
    const videos = [videoRef.current, mobileVideoRef.current].filter(Boolean);
    if (!videos.length) return;

    const nextMuted = !isMuted;
    videos.forEach((video) => {
      video.muted = nextMuted;
    });
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative overflow-hidden px-3 md:px-6 pt-16 pb-8">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="absolute inset-0 z-30 bg-black/90 pointer-events-none"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-full w-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-transparent origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <video
        ref={mobileVideoRef}
        src={MahadevVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={Mahadev}
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 bg-black/45 md:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-indigo-900/25 to-black blur-[100px]" />
      <div className="relative z-10 mt-8 md:mt-10">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:grid-rows-5 md:gap-4 min-h-[78vh] md:h-[88vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.45, delay: 0.2 }}
            className="md:hidden rounded-2xl border border-white/20 bg-black/35 backdrop-blur-sm p-4"
          >
            <h1 className="text-xl font-bold text-white leading-tight">
              Kantore Gajon Mala 2026
            </h1>
            <p className="text-xs text-gray-200 mt-1.5">
              A living celebration of faith, rhythm, and devotion.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-3 py-1.5 text-xs rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {isPlaying ? "Pause Video" : "Play Video"}
              </button>
              <button
                onClick={toggleMute}
                className="px-3 py-1.5 text-xs rounded-full border border-cyan-300 text-cyan-200 hover:bg-cyan-600/25 transition-colors cursor-pointer"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.55 }}
            className="hidden md:block md:col-span-4 md:row-span-5 rounded-2xl md:rounded-3xl overflow-hidden relative border border-white/20"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute left-3 bottom-3 z-20 md:left-6 md:bottom-6 max-w-[90%]">
              <h1 className="text-lg sm:text-xl md:text-4xl font-bold text-white max-w-3xl leading-tight">
                Kantore Gajon Mala 2026
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-200 mt-1 md:mt-2">
                A living celebration of faith, rhythm, and devotion.
              </p>
              <div className="mt-2.5 md:mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  {isPlaying ? "Pause Video" : "Play Video"}
                </button>
                <button
                  onClick={toggleMute}
                  className="px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full border border-cyan-300 text-cyan-200 hover:bg-cyan-600/25 transition-colors cursor-pointer"
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
            <motion.video
              ref={videoRef}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              src={MahadevVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              poster={Mahadev}
              className="h-full w-full object-cover min-h-[48vh] md:min-h-0"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-3 md:contents">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.55, delay: 0.1 }}
              className="md:row-span-2 md:col-start-5 md:row-start-1 rounded-2xl md:rounded-4xl overflow-hidden border border-white/30 h-[210px] sm:h-[240px] md:h-auto bg-black/30"
            >
              <Carousel opts={{ loop: true, align: "start" }} setApi={setCarouselApi}>
                <CarouselContent className="-ml-2">
                  {imageData.images.map((image) => (
                    <CarouselItem
                      key={image.id}
                      className="pl-2 basis-[84%] sm:basis-[72%] md:basis-full"
                    >
                      <Card className="m-px h-full">
                        <CardContent className="flex h-full items-center justify-center rounded-4xl overflow-hidden p-0">
                          <motion.img
                            className="object-cover h-full w-full"
                            alt={image.title}
                            src={image.url}
                            loading="lazy"
                            whileHover={{
                              scale: 1.04,
                              transition: { duration: 0.3 },
                            }}
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 top-auto bottom-2 -translate-y-0" />
                <CarouselNext className="right-2 top-auto bottom-2 -translate-y-0" />
              </Carousel>
              <div className="absolute top-2 right-2 bg-black/55 text-[10px] text-cyan-100 px-2 py-1 rounded-full border border-cyan-400/30">
                {currentSlide}/{imageData.images.length}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.55, delay: 0.2 }}
              className="hidden sm:block md:row-span-3 md:col-start-5 md:row-start-3 rounded-2xl md:rounded-4xl overflow-hidden border border-white/30 h-[180px] sm:h-[220px] md:h-auto"
            >
              <motion.img
                whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                src={Mahadev}
                alt="Mahadev portrait"
                loading="lazy"
                className="object-cover h-full w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
