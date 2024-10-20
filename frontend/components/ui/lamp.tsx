"use client";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Main Component
export default function Waterfall() {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <WaterContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 300 }} // Start from below the viewport
        animate={isAnimated ? { opacity: 1, y: 0 } : {}} // Animate into the center
        transition={{
          duration: 3, // Animation duration set to 3 seconds
          ease: "easeInOut",
        }}
        onAnimationComplete={() => setIsAnimated(true)} // Set animation state when complete
        className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Unlock the full potential of <br /> WALLETS
      </motion.h1>
    </WaterContainer>
  );
}

// Container for Waterfall
interface WaterContainerProps {
  children: ReactNode;
  className?: string;
}

// WaterContainer Component
export const WaterContainer = ({ children, className }: WaterContainerProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 to-black w-full rounded-md z-0",
        className
      )}
    >
      <div className="droplets-container">
        {/* Create water droplets */}
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className={`droplet droplet-${index % 5}`}
            style={{
              left: `${Math.random() * 100}vw`, // Random horizontal position
              animationDelay: `${Math.random() * 10}s`, // Random delay
              animationDuration: `${7 + Math.random() * 5}s`, // Slow fall duration between 7-12 seconds
              width: `${Math.random() * 10 + 5}px`, // Random droplet size
              height: `${Math.random() * 10 + 5}px`, // Make sure it's circular
            }}
          />
        ))}
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>

      <style jsx>{`
        .droplets-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .droplet {
          position: absolute;
          top: -10%; /* Start above the viewport */
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6); /* Water-like appearance */
          opacity: 0.8;
          animation: fall linear infinite; /* Falling animation */
        }

        /* Falling Animation */
        @keyframes fall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(110vh); /* Go past the viewport */
          }
        }

        /* Ripple effect after droplets hit the ground */
        .ripple {
          position: absolute;
          bottom: 0;
          width: 15px;
          height: 15px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: ripple 2s infinite ease-in-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      <div className="relative z-100 mt-12">
      <a href="/signin">
        <button
          className="px-6 py-3 bg-cyan-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          Get Started
        </button>
      </a>
      </div>
    </div>
  );
};
