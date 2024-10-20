"use client";
import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

// Main Waterfall Component
export default function Waterfall() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WaterContainer>
      {/* Centered Text */}
      <h1 className="text-center text-4xl font-medium tracking-tight text-white md:text-7xl font-neua-machina">
        Unlock the full potential of{" "}
        <span className="text-green-500">WALLETS</span>
      </h1>

      {/* New Subtext as h2 with margin */}
      <h2 className="text-center text-2xl text-white mt-4 md:text-3xl font-neua-machina">
        Experience Streamlined Dapp Experience
      </h2>

      {/* Button to open modal */}
      <div className="relative z-100 mt-12">
        <button
          className="px-6 py-3 bg-cyan-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
          onClick={() => setIsModalOpen(true)}
        >
          Get Started
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
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

      <div className="relative z-50 flex flex-col items-center px-5">
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
      `}</style>
    </div>
  );
};

// Modal Component
interface ModalProps {
  closeModal: () => void;
}

const Modal = ({ closeModal }: ModalProps) => {
  const handleLogin = () => {
    alert("Login clicked!");
    closeModal(); // Close modal after action
  };

  const handleSignup = () => {
    alert("Signup clicked!");
    closeModal(); // Close modal after action
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-104"> {/* Increased modal width */}
        <h2 className="text-2xl font-bold mb-6 text-center font-neua-machina">Choose an Option</h2>
        
        {/* Stacked buttons */}
        <div className="space-y-4"> {/* Adds vertical spacing */}
          <button 
            className="w-full py-5 bg-blue-400 text-white rounded-lg hover:bg-blue-500" // Changed to warm blue
            onClick={handleLogin} // Action for Login button
          >
            Login
          </button>
          <button 
            className="w-full py-5 bg-blue-400 text-white rounded-lg hover:bg-blue-500" // Changed to warm blue
            onClick={handleSignup} // Action for Signup button
          >
            Signup
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-gray-500 underline"
            onClick={closeModal} // Close the modal on click
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Additional CSS for warm blue colors
<style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Neua+Machina:wght@400;700&display=swap');

  body {
    font-family: 'Neua Machina', sans-serif;
  }

  .bg-blue-400 {
    background-color: #60a5fa; /* Warm blue color */
  }

  .hover\\:bg-blue-500:hover {
    background-color: #3b82f6; /* Slightly darker warm blue */
  }
`}</style>
