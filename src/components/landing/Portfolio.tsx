import { motion } from "framer-motion";
import virtuvesImg from "@/assets/portfolio-virtuves.webp";

type Project = {
  bg?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  tag: string;
  name: string;
  desc: string;
};

const projects: Project[] = [
  { bg: "#1a1a2e", tag: "Zobārstniecība", name: "iDental Rīgā", desc: "Moderns klīnikas dizains ar online rezervāciju" },
  { bg: "#0d1f12", tag: "Enerģētika", name: "Sovereign Solar", desc: "Lead-gen lapa saules paneļu montāžai" },
  { bg: "#1f1a0d", tag: "Autoserviss", name: "Auto Masters Rīgā", desc: "Lokāla SEO optimizēta lapa ar CTA" },
  {
    image: virtuvesImg,
    imageAlt: "Iebūvējamās virtuves Rīgā",
    url: "https://www.iebuvejamasvirtuves.lv",
    tag: "Mēbeles",
    name: "Iebūvējamās Virtuves",
    desc: "Landing lapa ar CRM",
  },
];

export function Portfolio() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
            Darbi, kas runā paši par sevi
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Reāli projekti. Reāli klienti. Reāli rezultāti.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl bg-card border border-hairline overflow-hidden transition-all hover:border-primary/30"
            >
              {p.image ? (
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="h-[200px] p-6 flex flex-col justify-between" style={{ backgroundColor: p.bg }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-2/3 rounded bg-foreground/80" />
                    <div className="h-2 w-1/2 rounded bg-foreground/40" />
                    <div className="mt-3 h-7 w-28 rounded-md bg-primary/90" />
                  </div>
                </div>
              )}
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-primary font-medium">{p.tag}</p>
                <h3 className="mt-2 font-display font-bold text-xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{p.desc}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Apskatīt projektu →
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
