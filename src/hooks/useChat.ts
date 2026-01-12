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

    socket.on("message", (data: { username: string; msg: string }) => {
      const isSystem = data.username === "StrangR";

      // Handle system state
      if (isSystem) {
        if (data.msg.includes("chatting")) {
          setIsConnected(true);
          setIsSearching(false);
        }

        if (data.msg.includes("Waiting")) {
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

  const report = useCallback(() => {
    toast({
      title: "Report submitted",
      description: "Thanks for keeping StrangR safe.",
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
    join,
    sendMessage,
    nextStranger,
    report,
    disconnect,
  };
};
