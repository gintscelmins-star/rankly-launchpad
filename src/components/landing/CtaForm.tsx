import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

type ServiceId = "majaslapa" | "leadgen" | "ai"
type FormValues = { name: string; email: string; company: string; message?: string }

const WEBHOOK_URL = "https://formspree.io/f/mzdovwrg"

const CONFIG: Record<ServiceId, {
  fullLabel: string
  textareaLabel: string | null
  textareaRequired: boolean
  buttonText: string
  successMessage: string
}> = {
  majaslapa: {
    fullLabel: "Mājaslapa Demo — 24h laikā",
    textareaLabel: null,
    textareaRequired: false,
    buttonText: "Pasūtīt bezmaksas demo →",
    successMessage: "Demo gatavs 24h laikā. Sazināsimies drīz!",
  },
  leadgen: {
    fullLabel: "Lead Gen sistēma — bezmaksas konsultācija",
    textareaLabel: "Aprakstiet savu biznesu un mērķus",
    textareaRequired: false,
    buttonText: "Pieteikties konsultācijai →",
    successMessage: "Paldies! Sazināsimies par Lead Gen sistēmu.",
  },
  ai: {
    fullLabel: "AI risinājums — aprakstīt uzdevumu",
    textareaLabel: "Aprakstiet uzdevumu vai procesu ko vēlaties automatizēt",
    textareaRequired: true,
    buttonText: "Aprakstīt AI uzdevumu →",
    successMessage: "Paldies! Izskatīsim jūsu AI uzdevumu.",
  },
}

const TAB_LABELS: Record<ServiceId, string> = {
  majaslapa: "Mājaslapa",
  leadgen: "Lead Gen",
  ai: "AI",
}

export function CtaForm() {
  const [service, setService] = useState<ServiceId>("majaslapa")

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#majaslapa") setService("majaslapa")
    else if (hash === "#leadgen") setService("leadgen")
    else if (hash === "#ai") setService("ai")
  }, [])

  const cfg = CONFIG[service]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ shouldUnregister: true })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, service }),
      })
      if (!res.ok) throw new Error()
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "cta_form_success", service })
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion()
      }
      toast.success(cfg.successMessage)
      reset()
    } catch {
      toast.error("Kļūda. Lūdzu mēģini vēlreiz.")
    }
  }

  return (
    <section id="kontakti" className="py-24 md:py-32 bg-card scroll-mt-20">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
          Saņem demo savam uzņēmumam
        </h2>
        <p className="mt-4 mb-8 text-muted-foreground text-lg">
          Izvēlies pakalpojumu un sazinies ar mums.
        </p>

        {/* Service tabs */}
        <div className="flex rounded-xl overflow-hidden border border-hairline mb-3">
          {(["majaslapa", "leadgen", "ai"] as ServiceId[]).map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setService(s)}
              className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors ${
                i > 0 ? "border-l border-hairline" : ""
              } ${
                service === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {TAB_LABELS[s]}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-8 text-left">{cfg.fullLabel}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <Input
              placeholder="Jūsu vārds"
              className="h-12 bg-background border-hairline"
              {...register("name", { required: "Lūdzu ievadi vārdu", maxLength: 100 })}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              type="email"
              placeholder="jusu@epasts.lv"
              className="h-12 bg-background border-hairline"
              {...register("email", {
                required: "Lūdzu ievadi e-pastu",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Nederīgs e-pasts" },
                maxLength: 255,
              })}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              placeholder="Uzņēmuma nosaukums vai URL"
              className="h-12 bg-background border-hairline"
              {...register("company", { required: "Lūdzu ievadi uzņēmumu", maxLength: 255 })}
            />
            {errors.company && <p className="text-xs text-destructive mt-1">{errors.company.message}</p>}
          </div>

          {cfg.textareaLabel && (
            <div>
              <textarea
                placeholder={cfg.textareaLabel}
                rows={4}
                className="w-full rounded-md border border-hairline bg-background px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                {...register("message", {
                  required: cfg.textareaRequired ? "Lūdzu aprakstiet uzdevumu" : false,
                  maxLength: 2000,
                })}
              />
              {errors.message && (
                <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? "Sūta..." : cfg.buttonText}
          </button>

          <a
            href="https://wa.me/37129320325"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-14 rounded-xl font-bold transition-transform hover:scale-[1.02] text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            Rakstīt WhatsApp →
          </a>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          ✓ Bez maksas &nbsp; ✓ Bez saistībām &nbsp; ✓ 24h atbilde
        </p>
      </div>
    </section>
  )
}
