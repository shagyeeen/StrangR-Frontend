import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { GlassInput } from "./GlassInput";
import { GlassButton } from "./GlassButton";
import { ChatMessage } from "./ChatMessage";
import { LoadingBar } from "./LoadingBar";

interface Message {
  id: string;
  username: string;
  msg: string;
  isSystem?: boolean;
}

interface ChatScreenProps {
  username: string;
  messages: Message[];
  isConnected: boolean;
  isSearching: boolean;
  onSendMessage: (message: string) => void;
  onNext: () => void;
  onReport: () => void;
  onDisconnect: () => void;
}

export const ChatScreen = ({
  username,
  messages,
  isConnected,
  isSearching,
  onSendMessage,
  onNext,
  onReport,
  onDisconnect,
}: ChatScreenProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !isConnected) return;
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 md:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 max-w-[480px] mx-auto w-full"
      >
        <h1 className="logo-text text-2xl">StrangR</h1>
        <GlassButton
          variant="ghost"
          onClick={onDisconnect}
          className="text-sm px-3 py-2"
        >
          Leave
        </GlassButton>
      </motion.div>

      {/* Chat Container */}
      <GlassCard className="flex-1 flex flex-col max-w-[480px] mx-auto w-full min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[45vh] max-h-[55vh] md:max-h-[50vh]">
          <AnimatePresence mode="popLayout">
            {isSearching && messages.length === 0 ? (
              <LoadingBar />
            ) : (
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  username={msg.username}
                  message={msg.msg}
                  isSystem={msg.isSystem}
                  isOwn={msg.username === username}
                />
              ))
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Searching indicator when in conversation */}
        <AnimatePresence>
          {isSearching && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <LoadingBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <GlassInput
              placeholder={isConnected ? "Type a message..." : "Waiting for connection..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
              className="flex-1"
            />
            <GlassButton
              variant="primary"
              onClick={handleSend}
              disabled={!isConnected || !inputValue.trim()}
              className="px-6"
            >
              Send
            </GlassButton>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <GlassButton
              variant="ghost"
              onClick={onNext}
              className="flex-1"
            >
              Next
            </GlassButton>
            <GlassButton
              variant="danger"
              onClick={onReport}
              disabled={!isConnected}
              className="flex-1"
            >
              Report
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-4"
      >
        <span className={`text-sm ${isConnected ? "text-accent" : "text-muted-foreground"}`}>
          {isConnected ? "● Connected" : isSearching ? "○ Searching..." : "○ Disconnected"}
        </span>
      </motion.div>
    </div>
  );
};
