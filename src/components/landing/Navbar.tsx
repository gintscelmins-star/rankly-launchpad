import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Mājaslapa", href: "#majaslapa" },
  { label: "Lead Gen", href: "#leadgen" },
  { label: "AI", href: "#ai" },
  { label: "Nelasīt", href: "/nelasit" },
  { label: "Kontakti", href: "#kontakti" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false)
    if (href.startsWith("/")) {
      e.preventDefault()
      window.location.href = href
    }
    // Hash links: let browser handle natively — scroll-behavior: smooth + scroll-margin-top does the rest
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-black text-xl tracking-tight text-foreground">
          RANKLY<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakti"
            onClick={(e) => handleNavClick("#kontakti", e)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            Saņemt demo →
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground transition-colors hover:text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-hairline bg-background/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-hairline">
              <a
                href="#kontakti"
                onClick={(e) => handleNavClick("#kontakti", e)}
                className="block py-2 text-sm font-bold text-primary"
              >
                Saņemt demo →
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
