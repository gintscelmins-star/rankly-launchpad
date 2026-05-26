import { motion } from "framer-motion";
import { caseStudiesData } from "@/data/content";

export function CaseStudies() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
            Mūsu projekti
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Reāli cilvēki, reālas problēmas, reāli rezultāti. Šie nav mockup — tie ir dzīvi biznesi.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudiesData.map((caseStudy, i) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-background border border-hairline p-8 md:p-10 transition-all hover:border-primary/30"
            >
              {/* Header: Name + Industry + Status */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                    {caseStudy.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mt-1 uppercase tracking-wide">
                    {caseStudy.industry}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      caseStudy.status === "Live"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {caseStudy.status}
                  </span>
                </div>
              </div>

              {/* Situation & Solution */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-muted-foreground tracking-wide mb-2">
                    Situācija
                  </h4>
                  <p className="text-foreground leading-relaxed">{caseStudy.situation}</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-muted-foreground tracking-wide mb-2">
                    Risinājums
                  </h4>
                  <p className="text-foreground leading-relaxed">{caseStudy.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="font-display font-bold text-sm uppercase text-muted-foreground tracking-wide mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-lg bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-muted-foreground tracking-wide mb-3">
                  Rezultāti
                </h4>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground">
                      <span className="text-primary font-bold min-w-fit">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
