import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{"// contact"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            I'm always open to discussing new opportunities, collaborations, or just a friendly chat about tech.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-4 mb-12"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=adilhussainburiro14912@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-mono">Email</p>
              <p className="text-sm text-foreground truncate">adilhussainburiro14912@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+923283035027"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-mono">Phone</p>
              <p className="text-sm text-foreground">(+92) 328 303 5027</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/adil-hussain-buriro-2b6445257"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Linkedin size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-mono">LinkedIn</p>
              <p className="text-sm text-foreground">Adil Hussain Buriro</p>
            </div>
          </a>

          <div className="glass rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-mono">Location</p>
              <p className="text-sm text-foreground">Khairpur, Sindh, Pakistan</p>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default ContactSection;
