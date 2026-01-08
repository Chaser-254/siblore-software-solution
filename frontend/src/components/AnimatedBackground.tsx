import React from 'react';
import { motion } from 'framer-motion';
export function AnimatedBackground() {
  return <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0f]">
      {/* Blob 1 - Cyan */}
      <motion.div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00ffff] opacity-20 blur-[100px]" animate={{
      x: [0, 100, 0],
      y: [0, 50, 0],
      scale: [1, 1.2, 1]
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />

      {/* Blob 2 - Acid Green */}
      <motion.div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#ccff00] opacity-15 blur-[120px]" animate={{
      x: [0, -100, 0],
      y: [0, -50, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />

      {/* Blob 3 - Mixed/Center */}
      <motion.div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-[#00ffff] to-[#ccff00] opacity-10 blur-[90px]" animate={{
      x: [0, 50, -50, 0],
      y: [0, -50, 50, 0],
      rotate: [0, 180, 360]
    }} transition={{
      duration: 30,
      repeat: Infinity,
      ease: 'linear'
    }} />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
    }} />
    </div>;
}