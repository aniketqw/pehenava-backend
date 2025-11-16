"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen font-[Inter] overflow-hidden">

      {/* ------ FULL BACKGROUND IMAGE ------ */}
      <Image
        src="/background.jpg"   // your image
        alt="Fashion Background"
        fill
        priority
        className="object-cover scale-105 brightness-[0.82]"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* ------ TEXT + BUTTONS ------ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
        
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide text-white drop-shadow-2xl">
          Pehnava
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-lg tracking-wide">
          Discover fashion. Inspire style.<br />
          Join the fashion-forward community.
        </p>

        {/* LOGIN BUTTON ONLY */}
        <Link
          href="/login"
          className="mt-12 px-10 py-3.5 text-lg font-semibold rounded-xl shadow-2xl
            bg-gradient-to-r from-blue-500 to-blue-700 
            hover:from-blue-600 hover:to-blue-800
            text-white tracking-wide 
            transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
        >
          Login
        </Link>

        {/* Create account link */}
        <p className="mt-4 text-gray-200 text-sm tracking-wide">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* ------ ANIMATION ------ */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
