import { motion } from "framer-motion";
import { Zap, Brain, TrendingUp, Search, Target, type LucideIcon } from "lucide-react";
import { servicesData } from "@/data/content";

const iconMap: { [key: string]: LucideIcon } = {
  Zap,
  Brain,
  TrendingUp,
  Search,
  Target,
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
            Mūsu pakalpojumi
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No ātrām mājaslapām līdz pilniem AI sistēmiem. Mēs risinām problēmas, nevis pārdodam tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-hairline p-8 flex flex-col transition-all hover:border-primary/30 hover:shadow-lg"
              >
                {/* Icon */}
                <Icon className="text-primary" size={32} />

                {/* Title */}
                <h3 className="mt-5 font-display font-bold text-xl text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Price & Timeline Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {service.priceRange}
                  </span>
                  <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                    {service.timeline}
                  </span>
                </div>

                {/* CTA Button */}
                <a
                  href="#cta"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 w-fit"
                >
                  Uzzināt vairāk →
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
