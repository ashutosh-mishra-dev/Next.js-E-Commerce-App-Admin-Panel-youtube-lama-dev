"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";


export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken,hasHydrated } = useAuthStore();
    
  console.log("accessToken : ",accessToken);

  useEffect(() => {
     if (!hasHydrated) return;

    if (!accessToken) {
      router.replace("login");
    }
  }, [accessToken, router,hasHydrated]);

  
  return <>{children}</>;
}
