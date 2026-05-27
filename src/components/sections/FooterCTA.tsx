import { content } from "@/data/content"

export function FooterCTA() {
  const { headline, cta, microcopy } = content.footer

  return (
    <section className="py-32 md:py-40 border-t border-hairline text-center">
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-6">
        <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-tight">
          {headline}
        </h2>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 font-bold text-primary-foreground transition-transform hover:scale-105 text-lg"
        >
          {cta}
        </a>
        <p className="text-sm text-muted-foreground">{microcopy}</p>
      </div>
    </section>
  )
}
