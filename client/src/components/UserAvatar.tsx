import Link from "next/link";
import React, { FC, useEffect } from "react";
import { AvatarFallback, Avatar } from "./ui/avatar";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

interface UserAvatarProps {
  userDetails: User;
}

const UserAvatar: FC<UserAvatarProps> = ({ userDetails }) => {
  return (
    <Link href={`profile/${userDetails.id}`}>
      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">
          {userDetails?.first_name[0].toUpperCase()}
          {userDetails?.last_name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
