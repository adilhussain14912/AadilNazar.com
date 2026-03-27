import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Sparkles } from "lucide-react";

const projects = [
  {
    title: "Terra-Sight",
    subtitle: "Satellite data simplified for crop analysis",
    description:
      "Interactive web app allowing users to define field boundaries, compute NDVI, NDRE, NDWI from satellite imagery, and get AI-driven insights with recommendations.",
    tech: ["JavaScript", "HTML/CSS", "Geospatial APIs", "AI/NLP", "Netlify"],
    link: "https://tsight.netlify.app/",
    date: "Aug 2025 – Jan 2026",
  },
  {
    title: "Sindhi NLP Suite",
    subtitle: "Comprehensive Sindhi text processing toolkit",
    description:
      "Morphological analysis, rule-based lemmatization, spellchecking with orthographic confusion handling, POS tagging, and synonym support.",
    tech: ["Python", "NLP", "Unicode", "PyPI"],
    link: "https://pypi.org/project/aadil-nazar-sindhi-nlp/",
    date: "Feb 2026 – Present",
  },
  {
    title: "Sentiment Analysis in Sindhi",
    subtitle: "Low-resource NLP classifier",
    description:
      "Built a sentiment classifier for Sindhi using ~1.6M labeled sentences (balanced positive/negative), achieving 92% accuracy.",
    tech: ["Python", "scikit-learn", "TensorFlow", "PyTorch"],
    date: "Apr 2024 – Present",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// projects"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Things I've <span className="text-gradient">built</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">{project.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary/70">{project.subtitle}</p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors mt-1"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map((t, idx) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
