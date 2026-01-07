"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken, hasHydrated, syncWithCookie } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    
    if (!hasHydrated) return;

    syncWithCookie();

    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];


    if (!accessToken && !cookieToken) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
  }, [accessToken, hasHydrated, router, syncWithCookie]);

 
  if (!hasHydrated || !isReady) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}