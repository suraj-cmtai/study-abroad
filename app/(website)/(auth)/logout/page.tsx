"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove user from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      // Remove user cookie (set expiry in past)
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95">
      <div className="w-full max-w-sm bg-card rounded-lg border shadow-sm p-8 flex flex-col items-center animate-in fade-in">
        <LogOut className="w-16 h-16 text-foreground/80" />
        <h2 className="text-xl font-semibold mt-4 text-foreground">Signing Out</h2>
        <div className="text-muted-foreground text-sm mt-1">Redirecting to homepage...</div>
        <div className="mt-6 w-8 h-8 border-2 border-foreground/10 border-t-foreground rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LogoutPage;