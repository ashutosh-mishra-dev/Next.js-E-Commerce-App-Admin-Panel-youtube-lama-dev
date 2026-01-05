"use client";

import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "../../../../store/authStore";

export default function ProfilePage() {
  const { user, accessToken, login } = useAuthStore();

  useEffect(() => {
    if (!user && accessToken) {
      fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          login(
            {
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              image: data.image,
            },
            accessToken
          );
        });
    }
  }, [user, accessToken, login]);

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl">
              {user.firstName} {user.lastName}
            </CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input value={user.username} disabled />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={user.firstName} disabled />
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={user.lastName} disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
