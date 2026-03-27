import { motion } from "framer-motion";

const Logo3D = () => {
  return (
    <motion.div
      className="flex items-center gap-3 text-primary font-bold text-2xl md:text-3xl perspective"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 3D Logo Container */}
      <motion.div
        className="relative w-12 h-12 md:w-14 md:h-14"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          perspective: "1000px",
        }}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-lg blur-lg opacity-60 animate-pulse" />

        {/* 3D Box effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg shadow-2xl shadow-primary/50">
          {/* Top face shine */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          </div>

          {/* Inner text */}
          <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xl drop-shadow-lg">
            و
          </div>
        </div>

        {/* Reflection */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-2 bg-primary/30 rounded-full blur-md"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Brand name with 3D effect */}
      <motion.div
        className="relative"
        animate={{
          textShadow: [
            "0px 0px 0px rgba(59, 130, 246, 0)",
            "0px 0px 20px rgba(59, 130, 246, 0.8)",
            "0px 0px 0px rgba(59, 130, 246, 0)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          واھُرو
        </div>

        {/* Subtle animated underline */}
        <motion.div
          className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
          animate={{
            width: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Logo3D;
