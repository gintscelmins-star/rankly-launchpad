import { motion } from "framer-motion";
import autoMastersImg from "@/assets/hero-auto-masters.png";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6">
            / Web aģentūra Rīgā
          </p>
          <h1 className="font-display font-black uppercase text-foreground leading-[0.95] text-[40px] md:text-[64px]">
            Tava mājaslapa<br />šobrīd zaudē<br />klientus.
          </h1>
          <p className="mt-6 text-[17px] md:text-[18px] text-muted-foreground max-w-[480px] leading-relaxed">
            Rankly izveido augstas konversijas mājaslapas autoservisiem, zobārstniecībām, juridiskām firmām un citiem Latvijas B2B uzņēmumiem. Demo 24h laikā.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Saņemt bezmaksas demo →
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {["Demo 24h laikā", "Nav saistību", "Redzēsi pirms maksā"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-primary">✓</span> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:rotate-2"
        >
          <BrowserMock />
        </motion.div>
      </div>
    </section>
  );
}

function BrowserMock() {
  return (
    <div className="rounded-2xl border border-hairline bg-card shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline bg-background/40">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 max-w-xs rounded-md bg-background/70 border border-hairline px-3 py-1 text-xs text-muted-foreground">
          riga-auto-masters.lv
        </div>
      </div>
      <img
        src={autoMastersImg}
        alt="Auto Masters Rīgā — premium autoserviss"
        className="w-full h-auto block"
      />
    </div>
  );
}
