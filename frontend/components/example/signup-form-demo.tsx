"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const [isSparkling, setIsSparkling] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const newPassword = (e.target as any).newPassword.value;
    const reEnterPassword = (e.target as any).reEnterPassword.value;

    if (!email || !newPassword || !reEnterPassword) {
      setPopupMessage("Please fill in all the relevant fields.");
      setShowPopup(true);
      return;
    }

    if (newPassword !== reEnterPassword) {
      setPopupMessage("Password is not the same.");
      setShowPopup(true);
      return;
    }

    setIsSparkling(true);
    setTimeout(() => {
      setIsSparkling(false);
    }, 1000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-black border-b-2 border-blue-500 shadow-md">
        <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200 ml-3">
          DeFin
        </div>
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-3">
          Home
        </button>
      </nav>

      <div className="flex items-center justify-center flex-grow">
        <div className="max-w-2xl w-full p-6 md:p-10">
          <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-8 bg-white dark:bg-black transition duration-300 hover:border-blue-500 hover:border-4 dark:hover:border-blue-400">
            <h2 className="font-bold text-4xl text-center">
              <span className="text-blue-500">Welcome to </span>
              <span className="text-purple-600 font-extrabold">Tezos</span>
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                  className="border-neutral-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  name="newPassword"
                  placeholder="••••••••"
                  type="password"
                  className="border-neutral-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-8">
                <Label htmlFor="re-enter-password">Re-enter New Password</Label>
                <Input
                  id="re-enter-password"
                  name="reEnterPassword"
                  placeholder="••••••••"
                  type="password"
                  className="border-neutral-300 focus:border-violet-500 focus:ring-violet-500"
                />
              </LabelInputContainer>

              <button
                className={`bg-gradient-to-br relative group/btn ${
                  isSparkling ? "sparkling" : "from-black dark:from-zinc-900 to-neutral-600"
                } block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] transition duration-300`}
                type="submit"
              >
                Sign up &rarr; {/* Changed from "Sign up" to "Get Started" */}
                <BottomGradient />
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-peach-300 rounded-lg p-6 shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">{popupMessage}</h3>
              <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

// Add this CSS to your styles
const styles = `
.sparkling {
  background: linear-gradient(45deg, #00f, #8a2be2, #32cd32); /* Blue, Violet, Green */
  background-size: 400% 400%;
  animation: sparkle 1s ease-in-out infinite;
}

@keyframes sparkle {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-peach-300 {
  background-color: #ffe5b4; /* Peach color */
}
`;

export const addGlobalStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

// Call this function once when your app initializes
addGlobalStyles();
