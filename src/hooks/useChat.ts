import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "@/hooks/use-toast";

const SOCKET_URL = "https://strangr-backend-5gbp.onrender.com";

interface Message {
  id: string;
  username: string;
  msg: string;
  isSystem?: boolean;
}

export const useChat = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  /* ================= SOCKET SETUP ================= */

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    // Sound setup
    const sound = new Audio("/message.mp3");

    socket.on("message", (data: { username: string; msg: string }) => {
      const isSystem = data.username === "StrangR";

      // Handle system state
      if (isSystem) {
        if (data.msg.includes("chatting")) {
          setIsConnected(true);
          setIsSearching(false);
        }

        if (data.msg.includes("Waiting") || data.msg.includes("left")) {
          setIsConnected(false);
          setIsSearching(true);
        }
      }

      // Add message ONLY from server
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          username: data.username,
          msg: data.msg,
          isSystem,
        },
      ]);

      // Play sound and vibrate for non-self messages
      if (data.username !== username && !isSystem) {
        sound.play().catch(() => {});
        navigator.vibrate?.(15);
      }
    });

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop_typing", () => {
      setIsTyping(false);
    });

    socket.on("connect_error", () => {
      toast({
        title: "Connection error",
        description: "Reconnecting to StrangR…",
        variant: "destructive",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* ================= ACTIONS ================= */

  const join = useCallback((name: string) => {
    setUsername(name);
    setMessages([]);
    setIsJoined(true);
    setIsSearching(true);
    setIsConnected(false);

    socketRef.current?.emit("join");
  }, []);

  const sendMessage = useCallback(
    (msg: string) => {
      if (!isConnected || !msg.trim()) return;

      // ❗ DO NOT add message locally
      socketRef.current?.emit("message", { username, msg });
    },
    [isConnected, username]
  );

  const nextStranger = useCallback(() => {
    setMessages([]);
    setIsConnected(false);
    setIsSearching(true);

    socketRef.current?.emit("next");
  }, []);

  const handleTyping = useCallback(() => {
    socketRef.current?.emit("typing");
  }, []);

  const handleStopTyping = useCallback(() => {
    socketRef.current?.emit("stop_typing");
  }, []);

  const report = useCallback(() => {
    socketRef.current?.emit("report");
    
    toast({
      title: "User reported",
      description: "User has been temporarily banned.",
    });
  }, []);

  const disconnect = useCallback(() => {
    setUsername("");
    setMessages([]);
    setIsJoined(false);
    setIsConnected(false);
    setIsSearching(false);

    socketRef.current?.disconnect();
  }, []);

  /* ================= EXPORT ================= */

  return {
    username,
    messages,
    isConnected,
    isSearching,
    isJoined,
    isTyping,
    join,
    sendMessage,
    nextStranger,
    report,
    disconnect,
    handleTyping,
    handleStopTyping,
  };
};
