"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--color-ink)" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] p-9"
        style={{ backgroundColor: "var(--color-ivory)", border: "1px solid var(--color-paper-line)" }}
      >
        <div
          className="w-[46px] h-[46px] rounded-full border flex items-center justify-center font-display mb-5"
          style={{ borderColor: "var(--color-brass)", color: "var(--color-brass)" }}
        >
          MM
        </div>
        <h1 className="font-display font-semibold text-2xl mb-1">Admin Access</h1>
        <p className="text-[0.88rem] mb-6" style={{ color: "var(--color-ink-soft)" }}>
          Manohar Medical Agencies — Internal Dashboard
        </p>
        <label className="text-[0.78rem] uppercase tracking-wide block mb-2" style={{ color: "var(--color-ink-soft)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3.5 py-3 text-[0.92rem] rounded-sm mb-4"
          style={{ border: "1px solid var(--color-paper-line)", backgroundColor: "#fff" }}
        />
        {error && <p className="text-sm mb-3" style={{ color: "#a23b3b" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3.5 font-semibold text-[0.92rem] rounded-sm disabled:opacity-60"
          style={{ backgroundColor: "var(--color-ink)", color: "var(--color-ivory)" }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
