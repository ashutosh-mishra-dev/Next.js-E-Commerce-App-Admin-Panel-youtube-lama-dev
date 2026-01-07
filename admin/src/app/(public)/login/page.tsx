"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LoginPage() {
  const router = useRouter();
  const { login, hasHydrated, accessToken, syncWithCookie } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    // Step 1: Pehle hydration wait karo
    if (!hasHydrated) return;

    // Step 2: Cookie sync karo
    syncWithCookie();

    // Step 3: Check karo ki user already logged in hai ki nahi
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken || cookieToken) {
      // Already logged in, redirect to home
      router.replace("/");
      return;
    }

    // Step 4: Not logged in, ready to show login form
    setIsReady(true);
  }, [accessToken, hasHydrated, router, syncWithCookie]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      // Login function khud cookie set karega
      login(
        {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
        },
        data.accessToken
      );

      router.replace("/");
    
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (!hasHydrated || !isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-screen min-h-dvh flex flex-col items-center justify-center space-y-5 bg-amber-200/300">
      <Image src="/logo.svg" alt="logo" height={60} width={60} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="emilys"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="emilyspass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground text-center">
            Test credentials: <strong>emilys</strong> / <strong>emilyspass</strong>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;