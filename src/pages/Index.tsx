import { AnimatePresence } from "framer-motion";
import { JoinScreen } from "@/components/chat/JoinScreen";
import { ChatScreen } from "@/components/chat/ChatScreen";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const {
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
  } = useChat();

  return (
    <AnimatePresence mode="wait">
      {!isJoined ? (
        <JoinScreen key="join" onJoin={join} />
      ) : (
        <ChatScreen
          key="chat"
          username={username}
          messages={messages}
          isConnected={isConnected}
          isSearching={isSearching}
          isTyping={isTyping}
          onSendMessage={sendMessage}
          onNext={nextStranger}
          onReport={report}
          onDisconnect={disconnect}
          onTyping={handleTyping}
          onStopTyping={handleStopTyping}
        />
      )}
    </AnimatePresence>
  );
};

export default Index;
