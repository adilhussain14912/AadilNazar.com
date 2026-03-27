import { motion } from "framer-motion";
import { ArrowDown, MapPin, Mail, Github, Linkedin, Database, Brain, Terminal, Code2 } from "lucide-react";
import TypingText from "./TypingText";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-primary text-sm mb-4 tracking-widest">
            {"// Hello, World! I'm"}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-gradient">Aadil Nazar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-xl md:text-2xl text-muted-foreground mb-4 font-mono font-light h-8 flex justify-center items-center">
            <span className="text-primary mr-2">&gt;</span>
            <TypingText text="Data Engineer & AI Developer" delay={1500} speed={40} />
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-8">
            <MapPin size={14} />
            <span>Khairpur, Sindh, Pakistan</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=adilhussainburiro14912@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-5 py-2.5 rounded-full text-sm font-mono text-primary hover:glow transition-all duration-300 flex items-center gap-2"
          >
            <Mail size={16} />
            Say Hello
          </a>
          <a
            href="https://www.linkedin.com/in/adil-hussain-buriro-2b6445257"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/adilhussain14912"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center"
        >
          <a href="#about" className="animate-bounce text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
