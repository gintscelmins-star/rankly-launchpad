import { content } from "@/data/content"

export function WebsiteBlock() {
  const { title, subtitle, cards, steps, pricing, statement } = content.website

  return (
    <section id="majaslapa" className="py-12 md:py-20 lg:py-32 border-t border-hairline scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* 6 Cards — 3x2 desktop, 2x3 tablet, 1x6 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-hairline bg-card p-6 shadow-sm"
            >
              <h3 className="font-display font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* 3 Steps — horizontal desktop, vertical mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="font-display font-black text-3xl text-primary">{step.number}</span>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-hairline" />
                )}
              </div>
              <h3 className="font-display font-bold text-foreground tracking-wider text-sm">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Block */}
        <div className="rounded-2xl border border-hairline bg-card p-8 md:p-10 max-w-lg mb-20">
          <p className="font-display font-black text-4xl text-foreground mb-6">{pricing.price}</p>
          <ul className="space-y-3 mb-6">
            {pricing.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="text-primary font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>
          {pricing.setup && (
            <p className="text-sm text-muted-foreground border-t border-hairline pt-4 mb-6">
              {pricing.setup}
            </p>
          )}
          <a
            href="#kontakti"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105 mb-3"
          >
            {pricing.cta}
          </a>
          <p className="text-xs text-muted-foreground">{pricing.microcopy}</p>
        </div>

        {/* Rankly Statement */}
        <blockquote className="border-l-2 border-primary pl-6 max-w-xl">
          <p className="text-muted-foreground leading-loose italic whitespace-pre-line text-[15px]">
            {statement}
          </p>
        </blockquote>
      </div>
    </section>
  )
}
