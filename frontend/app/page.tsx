import Lamp from "@/components/ui/lamp";
import SignupForm from "@/components/example/signup-form-demo";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Lamp component */}
      <Lamp />

      {/* Button */}
      <div className="relative z-100 mt-12">
        <button
          className="px-6 py-3 bg-cyan-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          Learn More
        </button>
      </div>

      {/* Signup Form (uncomment if needed) */}
      {/* <SignupForm /> */}
    </div>
  );
}
