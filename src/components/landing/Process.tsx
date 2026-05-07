import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Tu nosūti", b: "Atsūti mums sava uzņēmuma nosaukumu vai esošās lapas saiti. Tas ir viss." },
  { n: "02", t: "Mēs veidojam", b: "24h laikā saņem personalizētu demo tieši tavam biznesam un nozarei." },
  { n: "03", t: "Tu izlemj", b: "Redzēsi rezultātu pirms jebkāda lēmuma. Patīk — turpinām. Nē — nav problēmu." },
];

export function Process() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display font-black text-4xl md:text-5xl text-foreground text-center">
          Kā tas strādā
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="font-display font-black text-5xl text-primary">{s.n}</div>
              <h3 className="mt-4 font-display font-bold text-xl text-foreground">{s.t}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{s.b}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-12 border-t border-dashed border-primary/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
