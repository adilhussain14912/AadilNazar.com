import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TypingText from "./TypingText";

const skillCategories = [
  {
    title: "Programming & Dev",
    color: "primary",
    skills: ["Python", "C++", "Java", "MySQL", "Web Dev", "Data Structures", "Software Dev"],
  },
  {
    title: "Data Science",
    color: "accent",
    skills: ["Data Analytics", "Data Mining", "Business Intelligence", "Statistics", "Data Visualization", "Data Wrangling", "Data Engineering"],
  },
  {
    title: "AI & ML",
    color: "primary",
    skills: ["Machine Learning", "NLP", "Prompt Engineering", "AI Essentials"],
  },
  {
    title: "Tools & Platforms",
    color: "accent",
    skills: ["WordPress", "Microsoft Office", "PowerBI", "Git", "Cloud Platforms", "Database Management"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// skills"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            My <span className="text-gradient"><TypingText text="tech stack" speed={50} delay={500} showCursor={true} /></span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)" }}
              className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
              
              <h3 className="font-mono text-sm text-primary mb-4 relative z-10">{`> ${cat.title}`}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
