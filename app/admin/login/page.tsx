"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tractor, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("admin@prakashagri.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-800 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-[#11341c] text-[#d4b672] flex items-center justify-center mx-auto shadow-md">
          <Tractor className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 font-serif">
          Prakash Agri Tools
        </h1>
        <p className="text-xs text-stone-500 font-medium">
          Catalogue Management Portal & Admin Sign In
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
            />
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            Default password: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700 font-mono">Admin@Prakash2026!</code>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] disabled:opacity-60 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
        >
          <span>{loading ? "Signing in..." : "Sign In to Admin Portal"}</span>
          <ArrowRight className="w-4 h-4 text-[#d4b672]" />
        </button>
      </form>

      <div className="pt-4 border-t border-stone-100 text-center">
        <Link
          href="/"
          className="text-xs font-semibold text-stone-500 hover:text-stone-900"
        >
          ← Return to Public Showroom
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#091a0e] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white text-xs">Loading admin portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
