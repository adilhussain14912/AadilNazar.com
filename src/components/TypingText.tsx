import { useTypewriter } from "@/hooks/useTypewriter";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

const TypingText = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  showCursor = true,
}: TypingTextProps) => {
  const { displayedText, isComplete } = useTypewriter({
    text,
    speed,
    delay,
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: isComplete ? 0 : [1, 0] }}
          transition={{
            duration: 0.6,
            repeat: isComplete ? 0 : Infinity,
            repeatType: "loop",
          }}
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
        />
      )}
    </span>
  );
};

export default TypingText;
