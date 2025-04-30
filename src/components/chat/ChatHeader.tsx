import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";
import { useSelectedUsers } from "@/store/useSelectedUsers";

const ChatHeader = () => {
  const { selectedUser } = useSelectedUsers();
  return (
    <div className="w-full h-16 flex justify-between items-center p-4 border-b">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage
            src={selectedUser?.image || "/user-placeholder.png"}
            alt="User Profile"
            className="rounded-full object-cover"
          />
        </Avatar>
        <span className="font-semibold">{selectedUser?.name}</span>
      </div>

      <div className="flex gap-2">
        <Info
          className="text-muted-foreground cursor-pointer hover:text-primary"
          size={20}
        />
        <X
          className="text-muted-foreground cursor-pointer hover:text-primary"
          size={20}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
