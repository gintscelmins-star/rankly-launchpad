export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="font-display font-black text-xl text-foreground">
            RANKLY<span className="text-primary">.</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Latvijas B2B uzņēmumu digitālais partneris.
          </p>
        </div>
        <div className="md:text-right">
          <a
            href="#kontakti"
            className="inline-flex items-center gap-2 rounded-xl border border-primary text-primary px-6 py-3 font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Saņemt demo →
          </a>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="max-w-6xl mx-auto px-6 py-5 text-center text-xs text-[oklch(0.45_0_0)]">
          © 2026 Rankly<span className="text-primary">.</span> Visas tiesības aizsargātas.
        </p>
      </div>
    </footer>
  );
}
