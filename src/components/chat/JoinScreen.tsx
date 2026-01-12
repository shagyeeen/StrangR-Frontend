import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { GlassInput } from "./GlassInput";
import { GlassButton } from "./GlassButton";

interface JoinScreenProps {
  onJoin: (username: string) => void;
}

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    const trimmed = username.trim();
    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    setError("");
    onJoin(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="strangr-title text-4xl md:text-5xl mb-8"
      >
        StrangR
      </motion.h1>

      <GlassCard className="w-full max-w-[400px]">
        <div className="space-y-4">
          <GlassInput
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm"
            >
              {error}
            </motion.p>
          )}

          <GlassButton
            variant="primary"
            onClick={handleStart}
            className="w-full"
          >
            Start Chat
          </GlassButton>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground text-sm mt-5"
        >
          Connect anonymously with strangers
        </motion.p>
      </GlassCard>
    </div>
  );
};
