import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelectedUsers } from "@/store/useSelectedUsers";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/action/message.actions";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const MessageBody = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const { selectedUser } = useSelectedUsers();
  const { user: currentUser, isLoading: isUserLoading } =
    useKindeBrowserClient();

  const { data: messages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    queryFn: async () => {
      if (selectedUser && currentUser) {
        return await getMessages(selectedUser?.id, currentUser?.id);
      }
    },
    enabled: !!selectedUser && !!currentUser && !isUserLoading,
  });

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div ref={messagesRef} className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
      <AnimatePresence>
        {!isMessagesLoading &&
          messages?.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.senderId === currentUser?.id
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-2.5 items-center">
                {message.senderId === selectedUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="border-2 border-white rounded-full"
                    />
                  </Avatar>
                )}
                {message.messageType === "text" ? (
                  <span className="bg-accent p-2 rounded-md max-w-xs">
                    {message.content}
                  </span>
                ) : (
                  <img
                    src={message.content}
                    alt="Message Image"
                    className="border p-2 rounded h-40 md:h-52 object-cover"
                  />
                )}
                {message.senderId === currentUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={currentUser?.picture || "/user-placeholder.png"}
                      alt={currentUser?.picture || "User Image"}
                      className="border-2 border-white rounded-full"
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        {isMessagesLoading && (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageBody;
