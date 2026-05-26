import { motion } from "framer-motion";
import { aboutData } from "@/data/content";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
            {aboutData.heading}
          </h2>
        </motion.div>

        {/* Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutData.intro}
          </p>
        </motion.div>

        {/* Trust Signals */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {aboutData.trustSignals.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-card border border-hairline p-8 text-center"
            >
              <div className="font-display font-black text-4xl md:text-5xl text-primary">
                {signal.value}
              </div>
              <div className="mt-3 text-sm text-muted-foreground font-medium">
                {signal.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-display font-bold text-xl text-foreground mb-6 text-center">
            Mūsu specialitātes
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {aboutData.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
