"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { registerUser } from "@/app/api/authApi";

export default function RegisterPage() {
  const [Name, setName] = useState("");
  const [role, setRole] = useState("Influencer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SIMPLE Validation
  function validate() {
    if (Name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number");
      return false;
    }

    if (!/[A-Za-z]/.test(password)) {
      setError("Password must contain at least one letter");
      return false;
    }

    return true;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      await registerUser(Name, email, password, role);

      // Redirect to login page after successful registration
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-[Inter]">

      {/* LEFT: Background Image */}
      <div className="relative h-64 md:h-auto">
        <Image
          src="/background-register.jpg"
          alt="Register Background"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-8 left-8 text-white drop-shadow-xl">
          <h1 className="text-5xl font-extrabold">Pehnava</h1>
          <p className="text-sm text-gray-200 max-w-xs">
            Begin your fashion journey.
          </p>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="flex items-center justify-center px-10 py-16 bg-gray-50">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Create Account
          </h2>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl"
                placeholder="Create a secure password"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-semibold">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-xl"
              >
                <option value="Influencer">Influencer</option>
                <option value="Recommender">Recommender</option>
                <option value="Explorer">Explorer</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-[#111827] text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-black transition-all"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

          </form>

          <p className="mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#A27B5C] underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
