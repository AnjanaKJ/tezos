"use client";
import Lamp from "@/components/ui/lamp";import SignupForm from "@/components/example/signup-form-demo";
import { CardSpotlightDemo } from "@/components/ui/cards/page";
export default function Home() {  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">      {/* Lamp component */}
      {/* <Lamp /> */}
      {/* Row of Cards */}      <div className="flex flex-row flex-wrap gap-6 justify-center mt-12">
        {/* Passing different titles and numbers to each card */}        <CardSpotlightDemo title="Plenty" firstNumber={1} secondNumber={10} />
        <CardSpotlightDemo title="Swap" firstNumber={2} secondNumber={20} />        <CardSpotlightDemo title="Stake" firstNumber={3} secondNumber={30} />
      </div>
      {/* Signup Form (uncomment if needed) */}      {/* <SignupForm /> */}
    </div> 
     );
}