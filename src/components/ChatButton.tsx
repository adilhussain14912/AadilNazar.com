import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ChatButton = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useTheme();

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-4 left-4 p-4 rounded-full shadow-lg z-40 transition ${
        theme === "dark"
          ? "bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          : "bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      } text-white`}
      aria-label="Open AI Assistant"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={24} />
      </motion.div>
    </motion.button>
  );
};

export default ChatButton;
