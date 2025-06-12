"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, UserCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch {}
      if (!user) {
        const match = document.cookie.match(/user=([^;]+)/);
        if (match) {
          try {
            user = JSON.parse(decodeURIComponent(match[1]));
          } catch {}
        }
      }
      if (user && user.role) {
        if (user.role === "admin") {
          router.replace("/dashboard");
        } else {
          router.replace("/profile");
        }
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    const users = [
      { email: "admin@gmail.com", password: "admin123", role: "admin" },
      { email: "user@gmail.com", password: "user123", role: "user" },
    ];
    setTimeout(() => {
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        setSuccess(true);
        setError("");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify({ email: found.email, role: found.role }));
          document.cookie = `user=${encodeURIComponent(JSON.stringify({ email: found.email, role: found.role }))}; path=/`;
        }
        if (found.role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/profile";
        }
      } else {
        setError("Invalid email or password");
        setSuccess(false);
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 px-4">
      <div className="w-full max-w-md bg-card rounded-lg border shadow-sm p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <UserCircle2 className="w-16 h-16 text-foreground/80" />
          <h2 className="text-2xl font-semibold mt-4 text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </div>
        <form className="w-full space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground/90">Email</label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={`pl-10 pr-3 ${error ? "border-destructive" : ""}`}
                required
                autoFocus
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground/90">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className={`pl-10 pr-10 ${error ? "border-destructive" : ""}`}
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          {success && <div className="text-primary text-sm text-center">Login successful! 🎉</div>}
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</span>
            ) : (
              <>Sign In</>
            )}
          </Button>
        </form>
        <div className="mt-6 text-sm text-muted-foreground text-center">
          Don&apos;t have an account? <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;