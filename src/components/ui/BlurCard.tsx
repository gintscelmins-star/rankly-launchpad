interface BlurCardProps {
  title: string;
  content: string;
}

export function BlurCard({ title, content }: BlurCardProps) {
  return (
    <div className="relative rounded-2xl border border-hairline bg-card p-6 overflow-hidden">
      <h3 className="font-display font-bold text-lg text-foreground mb-4">{title}</h3>
      <div className="relative">
        <p
          className="text-muted-foreground leading-relaxed text-sm"
          style={{ filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}
        >
          {content}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              fontFamily: "'Special Elite', 'Courier New', serif",
              color: "#CC0000",
              border: "3px solid #CC0000",
              padding: "4px 12px",
              transform: "rotate(-12deg)",
              display: "inline-block",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              opacity: 0.85,
            }}
          >
            KONFIDENCIĀLI
          </span>
        </div>
      </div>
    </div>
  );
}
