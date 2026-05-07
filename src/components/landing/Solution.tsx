import { motion } from "framer-motion";

const items = [
  { n: "01", t: "Dizains, kas rada uzticību", b: "Moderns, tīrs, premium izskats, kas atbilst tavai nozarei. Ne template. Ne Wix." },
  { n: "02", t: "Saturs, kas pārdod", b: "Katrs teksts, katrs virsraksts, katrs CTA ir veidots tā, lai apmeklētājs veiktu darbību." },
  { n: "03", t: "Ātrums un mērogojamība", b: "Lapa ielādējas zibens ātrumā. Optimizēta Google indeksācijai no pirmās dienas." },
];

export function Solution() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-4xl md:text-5xl text-foreground"
        >
          Ko tu saņem no Rankly
        </motion.h2>
        <div className="space-y-10">
          {items.map((i, idx) => (
            <motion.div
              key={i.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6"
            >
              <span className="font-display font-black text-4xl md:text-5xl text-primary leading-none">
                {i.n}
              </span>
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{i.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{i.b}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
