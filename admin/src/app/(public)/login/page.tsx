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
import { useLogin } from "@/hooks/useAuth";

import Image from "next/image";
import {  useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    login({username,password});
  };

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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2.5">
              {isError && (
                <div className="p-3 text-sm text-red-500 ...">
                  {error?.message || 'Invalid credentials. Please try again.'}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="emilys"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isPending}
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
                  disabled={isPending}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
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