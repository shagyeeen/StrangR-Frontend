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

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on("message", (data: { username: string; msg: string }) => {
      const isSystem = data.username === "StrangR";
      
      // Update connection state based on system messages
      if (isSystem) {
        if (data.msg.includes("chatting") || data.msg.includes("connected")) {
          setIsConnected(true);
          setIsSearching(false);
        }
        if (data.msg.includes("Waiting") || data.msg.includes("disconnected") || data.msg.includes("left")) {
          setIsConnected(false);
          setIsSearching(true);
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          username: data.username,
          msg: data.msg,
          isSystem,
        },
      ]);
    });

    socket.on("connect_error", () => {
      toast({
        title: "Connection Error",
        description: "Failed to connect to server. Retrying...",
        variant: "destructive",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const join = useCallback((name: string) => {
    setUsername(name);
    setMessages([]);
    setIsJoined(true);
    setIsSearching(true);
    socketRef.current?.emit("join");
  }, []);

  const sendMessage = useCallback((msg: string) => {
    if (!isConnected || !msg.trim()) return;
    
    socketRef.current?.emit("message", { username, msg });
    
    // Optimistically add own message
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        username,
        msg,
        isSystem: false,
      },
    ]);
  }, [isConnected, username]);

  const nextStranger = useCallback(() => {
    setMessages([]);
    setIsConnected(false);
    setIsSearching(true);
    socketRef.current?.emit("next");
  }, []);

  const report = useCallback(() => {
    toast({
      title: "Report Submitted",
      description: "Thank you for helping keep StrangR safe.",
    });
  }, []);

  const disconnect = useCallback(() => {
    setIsJoined(false);
    setIsConnected(false);
    setIsSearching(false);
    setMessages([]);
    setUsername("");
    socketRef.current?.emit("leave");
  }, []);

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
