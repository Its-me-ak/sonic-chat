import Image from "next/image";
import {
  Image as ImageIcon,
  Loader,
  SendHorizonalIcon,
  ThumbsUp,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "./EmojiPicker";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { usePreferences } from "@/store/usePreferences";

const ChatBottomInput = () => {
  const {soundEnabled} = usePreferences()
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isPending = false;
  const [keySound1] = useSound("/sounds/keystroke1.mp3")
  const [keySound2] = useSound("/sounds/keystroke2.mp3");
  const [keySound3] = useSound("/sounds/keystroke3.mp3");
  const [keySound4] = useSound("/sounds/keystroke4.mp3");

  const playKeyboardSound = [keySound1, keySound2, keySound3, keySound4];

  const playRandomKeySounds = () => {
    const randomSound = Math.floor(Math.random() * playKeyboardSound.length)
    soundEnabled && playKeyboardSound[randomSound]()
  }


  return (
    <div className="flex justify-between items-center w-full p-2 gap-2">
      {!message.trim() && (
        <ImageIcon size={20} className="cursor-pointer text-muted-foreground" />
      )}
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
            onChange={(e) => {
              setMessage(e.target.value);
              playRandomKeySounds()
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
          >
            <SendHorizonalIcon size={20} />
          </Button>
        ) : (
          <Button
            key={"like"}
            className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            variant={"ghost"}
            size={"icon"}
          >
            {!isPending && <ThumbsUp size={20} />}
            {isPending && <Loader size={20} className="animate-spin" />}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottomInput;
