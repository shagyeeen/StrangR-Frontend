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
    join,
    sendMessage,
    nextStranger,
    report,
    disconnect,
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
          onSendMessage={sendMessage}
          onNext={nextStranger}
          onReport={report}
          onDisconnect={disconnect}
        />
      )}
    </AnimatePresence>
  );
};

export default Index;
