import { motion } from "framer-motion";

const CodingBackground = () => {
  const codeSnippets = [
    {
      code: "const buildFuture = () => {",
      color: "text-blue-400",
      delay: 0,
    },
    {
      code: "  return <Innovation />;",
      color: "text-green-400",
      delay: 0.2,
    },
    {
      code: "};",
      color: "text-blue-400",
      delay: 0.4,
    },
    {
      code: "async function innovate() {",
      color: "text-purple-400",
      delay: 0.6,
    },
    {
      code: "  await transform();",
      color: "text-yellow-400",
      delay: 0.8,
    },
    {
      code: "  return success;",
      color: "text-green-400",
      delay: 1,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: [0, 1, 1, 0],
      x: [-100, 0, 0, 100],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: 0,
      },
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left floating code */}
      <motion.div
        className="absolute top-20 left-10 max-w-xs"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {codeSnippets.slice(0, 3).map((snippet, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`font-mono text-xs md:text-sm ${snippet.color} opacity-60 mb-2`}
          >
            {snippet.code}
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom right floating code */}
      <motion.div
        className="absolute bottom-32 right-10 max-w-xs"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {codeSnippets.slice(3, 6).map((snippet, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`font-mono text-xs md:text-sm ${snippet.color} opacity-60 mb-2`}
            style={{
              animationDelay: `${snippet.delay + 1}s`,
            }}
          >
            {snippet.code}
          </motion.div>
        ))}
      </motion.div>

      {/* Animated floating brackets */}
      <motion.div
        className="absolute top-1/3 left-1/4 text-6xl font-bold text-primary/20"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {'</>'}
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-6xl font-bold text-accent/20"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        {'{}'}
      </motion.div>

      {/* Animated vertical lines */}
      <motion.div
        className="absolute left-1/3 top-0 w-0.5 h-96 bg-gradient-to-b from-primary/50 to-transparent opacity-30"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      <motion.div
        className="absolute right-1/4 bottom-0 w-0.5 h-96 bg-gradient-to-t from-accent/50 to-transparent opacity-30"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      {/* Animated dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default CodingBackground;
