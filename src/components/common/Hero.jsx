import Mahadev from "../../assets/images/Mahadev1.jpg";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MahadevVideo from "../../assets/videos/Mahadev-Video-row.mp4";
import imageData from "@/store/imageData.json";
import Background from "./Background";
import { Card, CardContent } from "../ui/card";
function Hero() {

  return (
    <div className="min-h-[calc(100vh-32px)] flex items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900 to-blue-900 opacity-50 blur-[120px]"></div>
      <div className="relative mt-10 px-2 flex items-center justify-center z-10">
        <div className="grid grid-cols-2 gap-2 grid-row-2  md:grid-cols-5 md:grid-rows-5 md:gap-4 h-[90dvh]">
          {/* Video  */}
          <div class="col-span-2 md:col-span-4 md:row-span-5 bg-transparent rounded-3xl overflow-hidden">
            <motion.video
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              src={MahadevVideo}
              autoPlay
              //   loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          {/* Imags */}
          <div class="col-span-1  md:row-span-3 md:col-start-5 md:row-start-3 bg-transparent rounded-4xl overflow-hidden border-1 border-white/50">
            <motion.img
              whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
              src={Mahadev}
              alt="mahadev-img"
              className="object-cover h-full w-full "
            />
          </div>
          {/* Imags */}
          <div class="col-span-1 md:row-span-2 md:col-start-5 md:row-start-1 bg-transparent rounded-4xl overflow-hidden border-1 border-white/50">
            <Carousel onSlideChange={(index) => SetCount(index + 1)}>
              <CarouselContent >
                {/* Map through your images and create CarouselItem for each */}
                {imageData.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <Card className="m-px">
                      <CardContent className="flex aspect-square items-center justify-center rounded-4xl overflow-hidden">
                        <motion.img
                          className="object-cover h-full w-full "
                          alt={image.title}
                          src={image.url}
                          whileHover={{
                            scale: 1.06,
                            transition: { duration: 0.3 },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
      <Background />
    </div>
  );
}

export default Hero;
