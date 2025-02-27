"use client";
import Image from "next/image";
import "./landing.css"; // Ensure this import is present

const images = [
  "/sample-business-resume.png",
  "/sample-business-resume.png",
  "/sample-business-resume.png",
];

export default function AutoScrollImagesDown() {
  return (
    <div className="relative w-full h-[700px] overflow-hidden flex justify-center p-4">
      <div className="fade-overlay top-0 h-[100px] w-[400px] absolute z-10"></div>
      <div className="fade-overlay bottom-0 h-[100px] w-[400px] absolute z-10"></div>
      <div className="image-container">
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] shadow-lg rounded-lg overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Resume ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
