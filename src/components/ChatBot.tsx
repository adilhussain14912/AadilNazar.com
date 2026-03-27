import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Minimize2, Maximize2, Mic, MicOff } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  reactions?: string[];
}

const ChatBot = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "السلام عليكم! مان نظر اي آءِ صلاحڪار آهيان. توهان سان ڳالھ ڪرڻ لاء خوش آهيان! 🤖",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "توهان مجھ سان ڇي باري ۾ پڇڻ چاھيو ٿا؟ منهنجي صلاحيتون، منصوبا، يا رابطو جي باري ۾...",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { theme } = useTheme();

  const quickReplies = [
    "صلاحيتون",
    "منصوبا",
    "رابطو",
    "مدد",
  ];

  const botResponses: { [key: string]: string } = {
    ڪيس: "مان آپ سان مدد ڪرڻ لاء تيار آهيان! ڪي توهان مان ڪجھ پڇڻ چاھيو ٿو؟",
    مدد:
      "مان (واھُرو) پليٽ فارم جي باري ۾ معلومات فراهم ڪري سگان ٿو. مثال طور: صلاحيتون، منصوبا، يا رابطو.",
    صلاحيتون:
      "مان ڊيٽا انجنيئري، ويب ڊيولپمنٽ، ۽ مصنوعي ذهانت ۾ ماھر آهيان. 💻",
    منصوبا:
      "مين مختلف منصوبن تي ڪم ڪيو آهي جيڪي ڊيٽا انجنيئري ۽ ويب ڊيولپمنٽ ۾ شامل آهن. 🚀",
    رابطو:
      "توهان مسلسل رابطو صفحي تي مراجعو ڪري سگو يا مجھ سان براہ راست رابطو ڪري سگو. 📧",
    سلام: "السلام عليكم! ڪيئن ڪريو ٿا؟ 👋",
    شكران: "خوش آیا! مان توهان سان مدد ڪره ٿو. 😊",
    default:
      "معاف ڪجو، مين تمام سوالن جو جواب نٿو ڏي سگان. ڪيئ توهان ڪجھ ٻيو پڇي سگو ٿو؟",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "sd-PK";
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, input")) return;
    setIsDragging(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lowerInput = text.toLowerCase();
      let responseText = botResponses.default;

      for (const key of Object.keys(botResponses)) {
        if (lowerInput.includes(key)) {
          responseText = botResponses[key];
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ur-PK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
            ...msg,
            reactions: msg.reactions?.includes(emoji)
              ? msg.reactions.filter((r) => r !== emoji)
              : [...(msg.reactions || []), emoji],
          }
          : msg
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            x: position.x,
            y: position.y,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          className={`fixed bottom-20 left-4 rounded-3xl shadow-2xl z-50 flex flex-col ${isMinimized ? "h-auto w-80" : "h-[600px] w-[calc(100%-2rem)] max-w-2xl sm:w-96"
            } ${theme === "dark"
              ? "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50"
              : "bg-white/80 backdrop-blur-xl border border-slate-200/50"
            } transition-all duration-300`}
        >
          {/* Header - Draggable */}
          <div
            className={`flex items-center justify-between p-4 rounded-t-3xl cursor-grab active:cursor-grabbing select-none ${theme === "dark"
              ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"
              : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              } shadow-lg`}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <MessageCircle size={20} className="text-white" />
              </motion.div>
              <h3 className="font-bold text-white text-sm md:text-base">
                نظر اي آءِ صلاحڪار
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded-lg transition"
              >
                {isMinimized ? (
                  <Maximize2 size={16} className="text-white" />
                ) : (
                  <Minimize2 size={16} className="text-white" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div
                className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-50/50"
                  }`}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.sender === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                      }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user"
                        ? theme === "dark"
                          ? "bg-cyan-600"
                          : "bg-cyan-500"
                        : theme === "dark"
                          ? "bg-blue-600"
                          : "bg-blue-500"
                        } text-white text-xs font-bold`}
                    >
                      {message.sender === "user" ? "👤" : "🤖"}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`flex flex-col max-w-xs ${message.sender === "user"
                        ? "items-end"
                        : "items-start"
                        }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm ${message.sender === "user"
                          ? theme === "dark"
                            ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-br-none"
                            : "bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-br-none"
                          : theme === "dark"
                            ? "bg-slate-700 text-slate-100 rounded-bl-none"
                            : "bg-slate-200 text-slate-900 rounded-bl-none"
                          } shadow-md`}
                      >
                        {message.text}
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-2">
                        <span
                          className={`text-xs ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                            }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1">
                            {message.reactions.map((emoji) => (
                              <span key={emoji} className="text-xs">
                                {emoji}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => addReaction(message.id, "👍")}
                          className={`text-xs px-2 py-1 rounded hover:${theme === "dark" ? "bg-slate-600" : "bg-slate-300"
                            } transition`}
                          title="Like"
                        >
                          👍
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                        } text-white text-xs font-bold`}
                    >
                      🤖
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl rounded-bl-none ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                        }`}
                    >
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className={`px-4 py-3 border-t ${theme === "dark"
                  ? "border-slate-700 bg-slate-800/30"
                  : "border-slate-200 bg-slate-50/30"
                  }`}>
                  <p className={`text-xs mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}>
                    تيز جواب:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleSendMessage(reply)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-slate-100"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                          }`}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div
                className={`p-4 border-t ${theme === "dark"
                  ? "border-slate-700 bg-slate-900/50"
                  : "border-slate-200 bg-white/50"
                  }`}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="نظر سان ڳالھايو..."
                    className={`flex-1 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${theme === "dark"
                      ? "bg-slate-700 text-white placeholder-slate-400"
                      : "bg-slate-100 text-slate-900 placeholder-slate-500"
                      }`}
                  />
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-full transition ${isListening
                      ? "bg-red-600 text-white"
                      : theme === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                      }`}
                    title="Voice input"
                  >
                    {isListening ? (
                      <Mic size={18} />
                    ) : (
                      <MicOff size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-full transition ${isLoading || !input.trim()
                      ? theme === "dark"
                        ? "bg-slate-700 text-slate-500"
                        : "bg-slate-200 text-slate-400"
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                      }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
