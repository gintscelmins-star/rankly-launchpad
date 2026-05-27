import { content } from "@/data/content"

const flowSteps = [
  { top: true, label: "Google Ads", arrow: "→", label2: "Mājaslapa" },
  { label: "Lead ienāk" },
  { label: "CRM automātiski" },
  { label: "AI outreach → Klients atbild" },
  { label: "Tu saņem zvanu ✓", isLast: true },
]

export function LeadGenBlock() {
  const { title, subtitle, pillars, pricing, statement } = content.leadgen

  return (
    <section id="leadgen" className="py-12 md:py-20 lg:py-32 border-t border-hairline scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* 4 Pillars — 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-hairline bg-card p-6 shadow-sm"
            >
              <h3 className="font-display font-bold text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Flow Diagram */}
        <div className="mb-20">
          <div className="max-w-sm mx-auto flex flex-col items-center gap-0">
            {/* Top row: Google Ads → Mājaslapa */}
            <div className="flex items-center gap-3 w-full justify-center mb-1">
              <div className="rounded-xl border border-hairline bg-card px-4 py-2 text-sm text-foreground font-medium">
                Google Ads
              </div>
              <span className="text-muted-foreground text-lg">→</span>
              <div className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-foreground font-medium">
                Mājaslapa
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center" style={{ height: "32px" }}>
              <div className="w-px flex-1 bg-hairline" />
              <span className="text-muted-foreground text-xs">↓</span>
            </div>

            {/* Vertical flow steps */}
            {["Lead ienāk", "CRM automātiski", "AI outreach → Klients atbild", "Tu saņem zvanu ✓"].map(
              (label, i, arr) => (
                <div key={label} className="flex flex-col items-center w-full">
                  <div
                    className={`rounded-xl border px-4 py-2 text-sm font-medium w-full text-center ${
                      i === arr.length - 1
                        ? "border-primary/60 bg-primary/15 text-foreground"
                        : "border-hairline bg-card text-foreground"
                    }`}
                  >
                    {label}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex flex-col items-center" style={{ height: "32px" }}>
                      <div className="w-px flex-1 bg-hairline" />
                      <span className="text-muted-foreground text-xs">↓</span>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
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
          <a
            href="#kontakti"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            {pricing.cta}
          </a>
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
