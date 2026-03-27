import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import TypingText from "./TypingText";

const blogs = [
  {
    title: "The Orbital Intelligence Paradigm: Scaling Satellite Remote Sensing for Agriculture and Industrial Transformation",
    excerpt: "The \"Orbital Intelligence\" paradigm has officially shifted satellite technology from a niche research tool to a $32 billion industrial powerhouse. By 2026, the convergence of LEO small-satellite swarms and AI-driven Geospatial Foundation Models has enabled a real-time, planetary-scale operating system for global trade and resource management.",
    link: "https://www.linkedin.com/posts/adil-hussain-buriro-2b6445257_the-orbital-intelligence-paradigm-has-officially-activity-7432008479915188225-oK2v",
    date: "Latest",
    readTime: "5 min read"
  },
  {
    title: "Sindhi: A Morphological Frontier for NLP",
    excerpt: "I’ve always been fascinated by how we communicate, but it wasn't until I looked closer at my own mother tongue, Sindhi, that I realized how complex a single word can be. While some languages use long sentences to explain an idea, Sindhi often \"fuses\" all that information directly into the word itself.",
    link: "https://www.linkedin.com/posts/adil-hussain-buriro-2b6445257_ive-always-been-fascinated-by-how-we-communicate-activity-7430870590950887424-ck5a",
    date: "Recent",
    readTime: "4 min read"
  }
];

const BlogsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blogs" className="section-padding relative" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// articles"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            My <span className="text-gradient"><TypingText text="writings" speed={50} delay={500} showCursor={true} /></span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.15)" }}
              className="glass rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-3 mb-4 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1 text-primary">
                    <BookOpen size={14} />
                    {blog.date}
                  </span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-3">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {blog.excerpt}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-border/50 flex justify-between items-center">
                <span className="text-xs font-mono text-primary/70 group-hover:text-primary transition-colors">
                  READ ON LINKEDIN
                </span>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 transform group-hover:-rotate-12"
                  aria-label="Read full article on LinkedIn"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
