import React, { FC } from "react";
import { Search, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import { User } from "@/lib/types";

interface navBarProps {
  userDetails: User;
  isMe: boolean;
}

const Navbar: FC<navBarProps> = ({ userDetails, isMe }) => {
  const router = useRouter();
  return (
    <div className="fixed z-50 w-full flex bg-white-300/10 px-6 py-4 justify-between items-center shadow-sm backdrop-blur-md border border-white/20">
      <div className="flex items-center gap-x-2">
        <UserAvatar userDetails={userDetails} />
        {!isMe ? (
          <p className="font-bold">
            {userDetails.first_name} {userDetails.last_name}
          </p>
        ) : null}
      </div>

      {isMe ? <div className="underline text-xl font-bold">LOGO</div> : null}

      {isMe ? (
        <Search
          className="cursor-pointer"
          onClick={() => router.push("search")}
        />
      ) : (
        <VideoIcon />
      )}
    </div>
  );
};

export default Navbar;
