"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { LocalStorage } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use } from "react";

const Profile = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("sign-in");
    return;
  }

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="flex flex-col items-center text-white gap-y-2">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-green-500">
            <User />
          </AvatarFallback>
        </Avatar>
        <p>Edit your profile picture</p>
      </div>
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        defaultValue={user.first_name}
        placeholder="first name"
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        defaultValue={user.last_name}
        placeholder="last name"
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        placeholder="Username"
        defaultValue={user.username}
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        defaultValue={user.email}
        placeholder="Email"
      />
      <Button
        onClick={() => setUser(undefined)}
        className="bg-blue-500 rounded-full w-full"
      >
        Log out <LogOut className="ml-2" />
      </Button>
    </div>
  );
};

export default Profile;
