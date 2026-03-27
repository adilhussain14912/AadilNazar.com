import { motion } from "framer-motion";
import useScrollProgress from "@/hooks/useScrollProgress";

const ScrollAnimatedBackground = () => {
  const { scrollProgress } = useScrollProgress();

  // Calculate different animation states based on scroll progress
  const layerOpacity = Math.max(0, 1 - scrollProgress * 2);
  const codeOpacity = Math.min(1, scrollProgress * 2);
  const particles = Math.max(0, 1 - scrollProgress);

  // Parallax effect
  const yOffset = scrollProgress * 200;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-background via-background/95 to-background">
      {/* Layer 1: Initial Code Animation - Fades out as you scroll */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ opacity: layerOpacity * 0.3 }}
      >
        {/* Top left floating code */}
        <div className="absolute top-20 left-10 max-w-xs">
          {[
            { code: "const buildFuture = () => {", color: "text-blue-400" },
            { code: "  return <Innovation />;", color: "text-green-400" },
            { code: "};", color: "text-blue-400" },
          ].map((snippet, index) => (
            <motion.div
              key={index}
              className={`font-mono text-xs md:text-sm ${snippet.color} opacity-60 mb-2`}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {snippet.code}
            </motion.div>
          ))}
        </div>

        {/* Bottom right floating code */}
        <div className="absolute bottom-32 right-10 max-w-xs">
          {[
            { code: "async function innovate() {", color: "text-purple-400" },
            { code: "  await transform();", color: "text-yellow-400" },
            { code: "  return success;", color: "text-green-400" },
          ].map((snippet, index) => (
            <motion.div
              key={index}
              className={`font-mono text-xs md:text-sm ${snippet.color} opacity-60 mb-2`}
              animate={{
                y: [0, 20, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {snippet.code}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Layer 2: Bracket animations - Changes as you scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: codeOpacity * 0.2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 text-6xl font-bold text-primary/40"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: scrollProgress,
          }}
        >
          {"</>"}
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/4 text-6xl font-bold text-accent/40"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: scrollProgress + 1,
          }}
        >
          {"{}"}
        </motion.div>
      </motion.div>

      {/* Layer 3: Evolving Lines - More visible as you scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: codeOpacity * 0.3 }}
      >
        {/* Horizontal lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`hline-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              width: "100%",
              top: `${25 + i * 20}%`,
              left: 0,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5 + scrollProgress,
            }}
          />
        ))}

        {/* Vertical lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`vline-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            style={{
              height: "100%",
              left: `${30 + i * 25}%`,
              top: 0,
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.6 + scrollProgress,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4: Animated Particles - Responsive to scroll */}
      <motion.div className="absolute inset-0" style={{ opacity: particles * 0.4 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.25 + scrollProgress,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 5: Flowing mesh lines - Data flow visualization */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: codeOpacity * 0.25 }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgb(59, 130, 246)", stopOpacity: 0.5 }} />
              <stop offset="50%" style={{ stopColor: "rgb(139, 92, 246)", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "rgb(16, 185, 129)", stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>

          {/* Animated mesh connections */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={`mesh-${i}`}
              x1={`${20 + i * 20}%`}
              y1="0%"
              x2={`${30 + i * 15}%`}
              y2="100%"
              stroke="url(#meshGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5 + scrollProgress,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Layer 6: Scroll indicator nodes (appear as you scroll) */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: Math.min(codeOpacity * 0.4, scrollProgress) }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full bg-accent/60 shadow-lg shadow-accent/40"
            style={{
              left: `${20 + i * 18}%`,
              top: `${Math.min(scrollProgress * 500, 80)}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Central glow effect that intensifies on scroll */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: scrollProgress > 0.3 
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default ScrollAnimatedBackground;
