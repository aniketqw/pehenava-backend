"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginUser } from "@/app/api/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(email, password);

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      window.location.href = "/home";
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-[Inter]">
      {/* Left Side Image */}
      <div className="relative h-64 md:h-auto">
        <Image
          src="/background-login.jpg"
          alt="Login Background"
          fill
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-8 left-8 text-white drop-shadow-xl">
          <h1 className="text-5xl font-extrabold">Pehnava</h1>
          <p className="text-sm text-gray-200 max-w-xs">
            Step into your fashion world.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center px-10 py-16 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 border rounded-xl"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border rounded-xl"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
