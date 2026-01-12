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
        "py-1.5 leading-relaxed",
        isSystem && "system-message",
        isOwn && "text-primary/90"
      )}
    >
      {isSystem ? (
        <span>{message}</span>
      ) : (
        <>
          <span className={cn(
            "font-medium mr-1.5",
            isOwn ? "text-primary" : "text-accent"
          )}>
            {username}:
          </span>
          <span className="text-foreground/85">{message}</span>
        </>
      )}
    </motion.div>
  );
};
