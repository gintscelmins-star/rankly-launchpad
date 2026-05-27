export function NelasitLink() {
  return (
    <section
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid #141414",
        borderBottom: "1px solid #141414",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "#2D2D2D",
          marginBottom: "24px",
        }}
      >
        nelasīt
      </p>
      <a
        href="/nelasit"
        style={{
          display: "inline-block",
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: "13px",
          letterSpacing: "0.15em",
          color: "#6B6B6B",
          textDecoration: "none",
          border: "1px solid #2D2D2D",
          padding: "12px 32px",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#9A9A9A"
          ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "#4A4A4A"
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B6B"
          ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "#2D2D2D"
        }}
      >
        lasīt →
      </a>
    </section>
  )
}
