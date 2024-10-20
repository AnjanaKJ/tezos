import Lamp from "@/components/ui/lamp";
import SignupForm from "@/components/example/signup-form-demo";
import DepositCard from "@/components/ui/DepositCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-xl">
              Logo
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="text-white px- 3 py-2 rounded-md text-sm font-medium hover:text-cyan-500"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500"
              >
                About
              </a>
              <a
                href="#"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500"
              >
                Services
              </a>
              <a
                href="#"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
      {/* Lamp component */}
      <Waterfall />

      {/* Button */}
      

      {/* Signup Form (uncomment if needed) */}
      {/* <SignupForm /> */}
    </div>
  );
}
