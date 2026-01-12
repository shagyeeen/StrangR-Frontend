import { AnimatePresence } from "framer-motion";
import { JoinScreen } from "@/components/chat/JoinScreen";
import { ChatScreen } from "@/components/chat/ChatScreen";
import FeedbackModal from "@/components/FeedbackModal";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const {
    username,
    messages,
    isConnected,
    isSearching,
    isJoined,
    isTyping,
    showFeedback,
    setShowFeedback,
    join,
    sendMessage,
    nextStranger,
    report,
    disconnect,
    handleTyping,
    handleStopTyping,
  } = useChat();

  return (
    <>
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
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
};

export default Index;
