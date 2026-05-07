import { AlertTriangle, Smartphone, MousePointerClick, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const cards: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: AlertTriangle, title: "Novecojusi lapa", body: "Apmeklētājs 3 sekundēs izlemj — palikt vai aiziet. Veca mājaslapa = aiziešana." },
  { icon: Smartphone, title: "Mobilajā viss jūk", body: "67% meklēšanas notiek mobilajā. Ja lapa mobilajā izskatās slikti — tu zaudē vairākumu." },
  { icon: MousePointerClick, title: "Nav ceļa līdz pieteikumam", body: "Labs produkts, bet apmeklētājs nezina ko darīt tālāk. Nav CTA = nav pieprasījuma." },
];

export function Problem() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
            Kāpēc lielākā daļa Latvijas uzņēmumu zaudē tiešsaistē?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Ne kvalitātes dēļ. Viņi zaudē, jo izskatās neuzticami.
          </p>
        </motion.div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-card border border-hairline p-8 transition-all hover:border-primary/30"
            >
              <c.icon className="text-primary" size={28} />
              <h3 className="mt-5 font-display font-bold text-xl text-foreground">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
