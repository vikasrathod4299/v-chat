import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, User } from "lucide-react";
import React from "react";

const Profile = () => {
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
        placeholder="Full name"
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        placeholder="Email"
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        placeholder="Username"
      />
      <Input
        className="bg-slate-500/10 backdrop-blur-md rounded-full focus:outelin placeholder:text-white placeholder:font-light"
        type="text"
        placeholder="Password"
      />
      <Button className="bg-blue-500 rounded-full w-full">
        Log out <LogOut className="ml-2" />
      </Button>
    </div>
  );
};

export default Profile;
