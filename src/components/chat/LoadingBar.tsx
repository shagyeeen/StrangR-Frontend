import { motion } from "framer-motion";

interface LoadingBarProps {
  message?: string;
}

export const LoadingBar = ({ message = "Searching for a stranger..." }: LoadingBarProps) => {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <span className="text-sm text-muted-foreground animate-pulse-glow">{message}</span>
      <div className="w-full max-w-[200px] h-1.5 glow-bar">
        <motion.div
          className="glow-bar-fill h-full w-1/4"
          animate={{ x: ["0%", "300%"] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
};
