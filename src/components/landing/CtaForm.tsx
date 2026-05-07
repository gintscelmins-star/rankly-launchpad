import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type FormValues = { name: string; email: string; company: string };

const WEBHOOK_URL = "https://hook.eu2.make.com/WEBHOOK_PLACEHOLDER";

export function CtaForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Paldies! Demo saņemsi 24h laikā. 🚀");
      reset();
    } catch {
      toast.error("Kļūda. Lūdzu mēģini vēlreiz.");
    }
  };

  return (
    <section id="cta" className="py-24 md:py-32 bg-card">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl text-foreground">
          Saņem demo savam uzņēmumam
        </h2>
        <p className="mt-4 mb-10 text-muted-foreground text-lg">
          Nosūti mums uzņēmuma nosaukumu — 24h laikā redzēsi, kā tava jaunā mājaslapa izskatās.
        </p>
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? "Sūta..." : "Saņemt bezmaksas demo →"}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          ✓ Bez maksas &nbsp; ✓ Bez saistībām &nbsp; ✓ 24h atbilde
        </p>
      </div>
    </section>
  );
}
