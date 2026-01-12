import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  username: string;
  message: string;
  isSystem?: boolean;
  isOwn?: boolean;
}

export const ChatMessage = ({ username, message, isSystem, isOwn }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "max-w-[70%] p-3 rounded-2xl mb-2.5 backdrop-blur-sm",
        isSystem 
          ? "text-center italic opacity-60 bg-white/5 mx-auto" 
          : isOwn 
            ? "ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
            : "mr-auto bg-white/12 text-white"
      )}
    >
      {isSystem ? (
        <span>{message}</span>
      ) : (
        <span>{message}</span>
      )}
    </motion.div>
  );
};
