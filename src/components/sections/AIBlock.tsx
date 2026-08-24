import { content } from "@/data/content";
import { BlurCard } from "@/components/ui/BlurCard";

export function AIBlock() {
  const { warning, title, subtitle, cards, cta, microcopy, statement } = content.ai;

  return (
    <section
      id="ai"
      className="py-12 md:py-20 lg:py-32 border-t border-hairline scroll-mt-20"
      style={{ backgroundColor: "oklch(0.11 0 0)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Warning Banner */}
        <div
          className="mb-12 px-6 py-3 rounded-lg"
          style={{ backgroundColor: "#FBBF24", color: "#000" }}
        >
          <p
            className="font-bold uppercase text-sm tracking-wide text-center"
            style={{ letterSpacing: "0.05em" }}
          >
            {warning}
          </p>
        </div>

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* 4 BlurCards — 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {cards.map((card) => (
            <BlurCard key={card.title} title={card.title} content={card.blurredContent} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-2 mb-20">
          <a
            href="#kontakti"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            {cta}
          </a>
          <span className="text-sm text-muted-foreground">{microcopy}</span>
        </div>

        {/* Rankly Statement */}
        <blockquote className="border-l-2 border-primary pl-6 max-w-xl">
          <p className="text-muted-foreground leading-loose italic whitespace-pre-line text-[15px]">
            {statement}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
