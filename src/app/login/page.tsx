"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@365online.test");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          throw authError;
        }

        router.push("/admin");
        return;
      }

      if (!email.trim() || !password.trim()) {
        throw new Error("Vui lòng nhập email và mật khẩu.");
      }

      localStorage.setItem(
        "365online_demo_user",
        JSON.stringify({ email, name: "Admin 365online", role: "admin" })
      );
      router.push("/admin");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">365online</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Đăng nhập</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Chưa có tài khoản? <Link href="/" className="font-semibold text-slate-900 underline">Đăng ký</Link>
        </div>
      </div>
    </main>
  );
}
