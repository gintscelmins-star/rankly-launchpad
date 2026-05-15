import { useState, useEffect, useCallback } from "react";
import autoMastersImg from "@/assets/hero-auto-masters.webp";
import identalImg from "@/assets/hero-idental.webp";
import kuukImg from "@/assets/hero-kuuk.webp";
import almaImg from "@/assets/hero-alma.webp";

const slides = [
  { src: autoMastersImg, alt: "Auto Masters Rīgā — premium autoserviss", label: "automastersriga.lv" },
  { src: identalImg, alt: "iDental — zobārstniecība Rīgā", label: "idental.lv" },
  { src: kuukImg, alt: "Cakes & Breakfast — kafejnīca", label: "kuuk.lv" },
  { src: almaImg, alt: "Alma — maizes māksla", label: "alma.lv" },
];

const AUTOPLAY_INTERVAL = 3500;

export function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6">
            / Web aģentūra Rīgā
          </p>
          <h1 className="font-display font-black uppercase text-foreground leading-[0.95] text-[40px] md:text-[64px]">
            Tava mājaslapa<br />šobrīd zaudē<br />klientus.
          </h1>
          <p className="mt-6 text-[17px] md:text-[18px] text-muted-foreground max-w-[480px] leading-relaxed">
            Rankly<span className="text-primary">.</span> izveido augstas konversijas mājaslapas autoservisiem, zobārstniecībām, ēdināšanas un citiem Latvijas uzņēmumiem. Demo 24h laikā.
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
        </div>

        <div className="lg:rotate-2 animate-fade-up [animation-delay:150ms]">
          <BrowserMock current={current} onSelect={setCurrent} />
        </div>
      </div>
    </section>
  );
}

function BrowserMock({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (i: number) => void;
}) {
  const slide = slides[current];
  return (
    <div className="rounded-2xl border border-hairline bg-card shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline bg-background/40">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 max-w-xs rounded-md bg-background/70 border border-hairline px-3 py-1 text-xs text-muted-foreground">
          {slide.label}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <img
          key={current}
          src={slide.src}
          alt={slide.alt}
          width={634}
          height={349}
          className="w-full h-auto block transition-opacity duration-500 animate-fade-in"
          fetchpriority={current === 0 ? "high" : "auto"}
          loading={current === 0 ? "eager" : "lazy"}
        />
      </div>

      <div className="flex justify-center gap-2 py-3 bg-background/40 border-t border-hairline">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Rādīt: ${s.label}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary w-5"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
