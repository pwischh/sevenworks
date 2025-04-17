"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./landing.css";

const images = [
  "/Thumbnails/Business-Resume.png",
  "/Thumbnails/Data-Analytics-Resume.png",
  "/Thumbnails/Data-Science-Resume.png",,
];

export default function AutoScrollImagesDown() {
  return (
    <>
      <div className="relative w-full h-[700px] overflow-hidden flex justify-center">
        {/* Top and bottom fade overlays */}
        <div className="fade-overlay top-0 h-[100px] w-full absolute z-10"></div>
        <div className="fade-overlay bottom-0 h-[100px] w-full absolute z-10"></div>

        {/* Scrolling image container */}
        <motion.div
          className="image-container space-y-4" // Added spacing between images
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{
            ease: "linear",
            duration: 20, // Adjust the duration as needed
            repeat: Infinity,
          }}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Resume ${index + 1}`}
                width={400}
                height={500}
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}