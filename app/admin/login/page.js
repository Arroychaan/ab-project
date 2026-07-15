"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="adm-login-error">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div className="adm-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="adm-form-input"
            placeholder="admin@albahjah.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="adm-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="adm-form-input"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="adm-login-btn"
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        {/* Logo & Title */}
        <div className="adm-login-logo">
          <img src="/Logo-assets/Logo-Albahjah.png?v=3" alt="Al-Bahjah" />
          <h1>Admin Panel</h1>
          <p>Masuk untuk mengelola konten website</p>
        </div>
        
        <Suspense fallback={<div style={{ textAlign: "center", padding: "20px" }}>Memuat form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
