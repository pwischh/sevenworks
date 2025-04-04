"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/sample-business-resume.png",
  "/sample-business-resume.png",
  "/sample-business-resume.png",
];

export default function TemplatePreview() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="resumes" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-blue-900">Templates for your</span>
            <span className="italic text-red-500"> every need</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </motion.div>

        {/* Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl"
              variants={itemVariants}
              whileHover={{ 
                // scale: 1.05,
                // transition: { duration: 0.3 }
              }}
            >
              <Image
                src={src}
                alt={`Template ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700"
                priority={index < 3}
              />
              
              Overlay on hover
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Template {index + 1}</h3>
                  <p className="text-sm opacity-80">Professional resume design</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* "See all" link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a href="/templates" className="inline-flex items-center text-lg font-medium text-blue-900 hover:text-red-500 transition-colors">
            See all templates
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}