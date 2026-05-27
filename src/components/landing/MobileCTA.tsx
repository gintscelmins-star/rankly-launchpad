export function MobileCTA() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById("kontakti")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex" style={{ height: "56px" }}>
      <a
        href="#kontakti"
        onClick={scrollToContact}
        className="flex-1 flex items-center justify-center font-bold text-primary-foreground text-sm bg-primary"
      >
        Demo 24h →
      </a>
      <a
        href="https://wa.me/37129320325"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center font-bold text-white text-sm"
        style={{ backgroundColor: "#25D366" }}
      >
        WhatsApp →
      </a>
    </div>
  )
}
