import { content } from "@/data/content"
import { TypewriterText } from "@/components/ui/TypewriterText"
import { NodeGraphWrapper } from "@/components/graph/NodeGraphWrapper"

export function Hero() {
  const { headline, typewriterWords, sublineTemplate, cta, microcopy } = content.hero

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
        {/* Left — text */}
        <div className="animate-fade-up">
          <h1 className="font-display font-black text-foreground leading-[1.05] text-[40px] md:text-[64px]">
            {headline.map((line, i) => (
              <span key={i}>
                {line}
                {i < headline.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[520px]">
            <TypewriterText words={typewriterWords} template={sublineTemplate} />
          </p>

          <div className="mt-8 flex flex-col gap-3 items-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              {cta}
            </a>
            <span className="text-sm text-muted-foreground">{microcopy}</span>
          </div>
        </div>

        {/* Right — NodeGraph A/B (desktop only) */}
        <div
          className="relative hidden lg:block w-full"
          style={{ height: "460px" }}
          aria-hidden="true"
        >
          <NodeGraphWrapper />
        </div>
      </div>
    </section>
  )
}
