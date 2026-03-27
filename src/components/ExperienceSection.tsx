import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experience = [
  {
    type: "work",
    icon: Briefcase,
    title: "Data Engineer",
    org: "Abdul Majid Bhurgri Institute of Language Engineering",
    location: "Hyderabad",
    date: "Feb 2026 – Present",
    description:
      "Engineered the aadil-nazar-sindhi-nlp (v1.1.4) library, implementing core NLP tools including a custom lemmatizer and spell checker for the Sindhi language.",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "B.IT – Information Technologies",
    org: "Shah Abdul Latif University, Khairpur",
    date: "2022 – 2026",
    description: "Bachelors of Information Technology with focus on AI, data science, and software engineering.",
  },
  {
    type: "award",
    icon: Award,
    title: "2nd Place – Web Expo Hackathon",
    org: "IT Department, Shah Abdul Latif University",
    date: "Oct 2024",
    description: "Campus-level web development competition organized by Institute of Computer Science.",
  },
];

const certifications = [
  { name: "AI – NAVTTC", date: "Oct 2024" },
  { name: "Cyber Security – ISC2", date: "May 2025" },
  { name: "Introduction to AI – Google/Coursera", date: "Feb 2026" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// experience"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Where I've <span className="text-gradient">been</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
          <motion.div 
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-primary origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative pl-12 md:pl-16 mb-10 last:mb-0"
            >
              <motion.div 
                className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.5, boxShadow: "0 0 15px hsl(var(--primary)/0.8)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </motion.div>
              <div className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon size={16} className="text-primary" />
                  <span className="font-mono text-xs text-primary">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.org}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-mono text-primary text-sm mb-6">{"> certifications"}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="glass rounded-xl p-4 hover:border-primary/30 transition-all duration-300"
              >
                <p className="text-sm font-medium text-foreground">{cert.name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{cert.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
