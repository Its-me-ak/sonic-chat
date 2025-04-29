import { USERS } from "@/db/dummy";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePreferences } from "@/store/usePreferences";
import useSound from "use-sound";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface SidebarProps {
  isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const selectedUser = USERS[0];
  const { soundEnabled } = usePreferences();
  const [playMouseClick] = useSound("/sounds/mouse-click.mp3", { volume: 0.1 });

  return (
    <div
      className={`group relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background ${
        isCollapsed && "items-center"
      }`}
    >
      {!isCollapsed && (
        <div className="flex justify-center items-center p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
          </div>
        </div>
      )}
      <ScrollArea className="gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {USERS.map((user) =>
          isCollapsed ? (
            <TooltipProvider key={user.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      soundEnabled && playMouseClick();
                    }}
                  >
                    <Avatar className="flex justify-center items-center my-1 w-11 h-11">
                      <AvatarImage
                        src={user.image || "/user-placeholder.png"}
                        alt="User Profile"
                        className="border-1 border-white rounded-full w-10 h-10"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">{user.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={user.id}
              variant={"grey"}
              size={"xl"}
              className={cn(
                "w-full justify-start gap-3 my-1",
                selectedUser.email === user.email &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink"
              )}
              onClick={() => {
                soundEnabled && playMouseClick();
              }}
            >
              <Avatar className="flex justify-center items-center my-1 h-10 w-10">
                <AvatarImage
                  src={user.image || "/user-placeholder.png"}
                  alt="User Profile"
                  className="w-10 h-10"
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
              </div>
            </Button>
          )
        )}
      </ScrollArea>
      {/* Logout section */}
      <div className="mt-auto">
        <div className="flex justify-between items-center gap-2 md:px-4 py-2">
          {!isCollapsed && (
            <div className="hidden md:flex gap-2 items-center">
              <Avatar className="flex items-center justify-center">
                <AvatarImage
                  src={"/user-placeholder.png"}
                  alt="Avatar Image"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 border-2 border-white rounded-full"
                />
              </Avatar>
              <p className="font-bold">Akib Khan</p>
            </div>
          )}
          <div className="flex">
            <LogoutLink >
              <LogOut size={22} cursor={"pointer"} />
            </LogoutLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
