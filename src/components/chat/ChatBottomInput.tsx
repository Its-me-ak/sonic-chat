import Image from "next/image";
import {
  Image as ImageIcon,
  Loader,
  SendHorizonalIcon,
  ThumbsUp,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "./EmojiPicker";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { usePreferences } from "@/store/usePreferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageAction } from "@/action/message.actions";
import { useSelectedUsers } from "@/store/useSelectedUsers";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { pusherClient } from "@/lib/pusher";
import { Message } from "@/db/dummy";

const ChatBottomInput = () => {
  const { soundEnabled } = usePreferences();
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [keySound1] = useSound("/sounds/keystroke1.mp3", { volume: 0.2 });
  const [keySound2] = useSound("/sounds/keystroke2.mp3", { volume: 0.2 });
  const [keySound3] = useSound("/sounds/keystroke3.mp3", { volume: 0.2 });
  const [keySound4] = useSound("/sounds/keystroke4.mp3", { volume: 0.2 });
  const [playNotificationSound] = useSound("/sounds/notification.mp3", {
    volume: 0.2,
  });
  const playKeyboardSound = [keySound1, keySound2, keySound3, keySound4];
  const playRandomKeySounds = () => {
    const randomSound = Math.floor(Math.random() * playKeyboardSound.length);
    soundEnabled && playKeyboardSound[randomSound]();
  };
  const queryClient = useQueryClient();
  const { selectedUser } = useSelectedUsers();
  const { user: currentUser } = useKindeBrowserClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendMessageAction,
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage({
      content: message,
      messageType: "text",
      receiverId: selectedUser?.id!,
    });
    setMessage("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // send message with enter key and if enter key with shift key pressed then add new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      setMessage((prev) => prev + "\n");
    }
  };

  useEffect(() => {
    if (!currentUser?.id || !selectedUser?.id || !pusherClient) return;

    const channelName = `${currentUser?.id}__${selectedUser?.id}`
      .split("__")
      .sort()
      .join("__");

    const channel = pusherClient?.subscribe(channelName);

    const handleNewMessage = (data: { message: Message }) => {
      queryClient.setQueryData(
        ["messages", selectedUser.id],
        (oldMessages: Message[] = []) => [...oldMessages, data.message]
      );

      if (soundEnabled && data.message.senderId !== currentUser.id) {
        playNotificationSound();
      }
    };

    channel?.bind("newMessage", handleNewMessage);

    return () => {
      channel?.unbind("newMessage", handleNewMessage);
      pusherClient?.unsubscribe(channelName);
    };
  }, [
    currentUser?.id,
    selectedUser?.id,
    queryClient,
    playNotificationSound,
    soundEnabled,
  ]);

  return (
    <div className="flex justify-between items-center w-full p-2 gap-2">
      {!message.trim() && (
        <CldUploadWidget
          signatureEndpoint={`/api/sign-cloudinary-params`}
          onSuccess={(result, widget) => {
            setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <ImageIcon
                size={20}
                className="cursor-pointer text-muted-foreground"
                onClick={() => {
                  open();
                }}
              />
            );
          }}
        </CldUploadWidget>
      )}

      <Dialog
        open={!!imageUrl}
        onOpenChange={(open) => {
          if (!open) {
            setImageUrl("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center relative h-96 w-full mx-auto">
            <Image
              src={imageUrl}
              alt="Image Upload"
              fill
              className="object-contain"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (isPending) return;
                sendMessage({
                  content: imageUrl,
                  messageType: "image",
                  receiverId: selectedUser?.id!,
                });
                setImageUrl("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        <motion.div
          key={"input"}
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
          className="w-full relative"
        >
          <Textarea
            autoComplete="off"
            placeholder="Aaa..."
            rows={1}
            className="flex items-center w-full rounded-full border h-9 resize-none overflow-hidden bg-background min-h-0"
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setMessage(e.target.value);
              playRandomKeySounds();
            }}
            ref={inputRef}
          />
          <div className="absolute right-2.5 bottom-[4.5px]">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage(message + emoji);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>
        {message.trim() ? (
          <Button
            key={"send"}
            className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            variant={"ghost"}
            size={"icon"}
            onClick={handleSendMessage}
          >
            <SendHorizonalIcon size={20} />
          </Button>
        ) : (
          <Button
            key={"like"}
            className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              sendMessage({
                content: "👍",
                messageType: "text",
                receiverId: selectedUser?.id!,
              })
            }
            disabled={isPending}
          >
            {!isPending && (
              <ThumbsUp size={20} className="text-muted-foreground" />
            )}
            {isPending && <Loader size={20} className="animate-spin" />}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottomInput;
