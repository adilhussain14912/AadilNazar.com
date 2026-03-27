import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Database, Globe } from "lucide-react";

const highlights = [
  { icon: Database, label: "Data Engineering" },
  { icon: Brain, label: "AI & ML" },
  { icon: Globe, label: "Web Development" },
  { icon: Code2, label: "NLP Research" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// about me"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Building the future with <span className="text-gradient">code & data</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground text-lg leading-relaxed mb-10"
        >
          As a proactive IT student, I have developed practical skills in database management, 
          machine learning, AI, website development, and AI application through prompt engineering. 
          I am passionate about leveraging technology to build efficient solutions and am eager to 
          apply my technical knowledge in a dynamic professional environment.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass rounded-xl p-5 text-center hover:border-primary/50 transition-all duration-300 group"
            >
              <item.icon className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" size={28} />
              <p className="text-sm font-mono text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
