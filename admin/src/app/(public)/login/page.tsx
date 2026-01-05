"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Image from "next/image";
import { useAuthStore } from "../../../../store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function LoginPage(){
  const router = useRouter();
  const {login,hasHydrated,accessToken} = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

// agar already login h user to vo home page pr jayega. 
  useEffect(() => {
  if (!hasHydrated) return;

  if (accessToken) {
    router.replace("/"); 
  }
}, [accessToken, hasHydrated, router]);


  const handleLogin = async () => {
    try{
      setLoading(true);

      const res = await fetch("https://dummyjson.com/auth/login", { 
        method:"POST",
        headers:{"Content-Type":"application/json"},
         body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await res.json();

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
    }catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

return ( 
<div className="w-screen min-h-dvh flex flex-col items-center justify-center space-y-5 bg-amber-200/3">
<Image src="logo.svg" alt="logo" height={60} width={60} /> 
<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              
              </div>
              <Input id="password" 
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        
      </CardFooter>
    </Card>
</div>
);
}

export default LoginPage;