import React from "react";

const W = 1640;
const H = 624;
const MONO = "'Courier New', 'Courier', monospace";
const SANS = "'Helvetica Neue', Arial, sans-serif";

interface Props {
  layout: "split" | "centered" | "cercle";
  divRef: (el: HTMLDivElement | null) => void;
}

export function FBCoverCard({ layout, divRef }: Props) {
  const base: React.CSSProperties = {
    width: W,
    height: H,
    background: "#0A0A0A",
    position: "relative",
    overflow: "hidden",
  };

  if (layout === "split") {
    return (
      <div ref={divRef} style={base}>
        {/* SVG dekorācijas */}
        <svg style={{ position: "absolute", inset: 0 }} width={W} height={H}>
          <circle cx={1480} cy={312} r={260} fill="none" stroke="#CC0000" strokeWidth={8} />
        </svg>
        {/* Teksts kreisajā */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 0,
            bottom: 0,
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              color: "#4A4A4A",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            RANKLY
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 72,
              fontWeight: 700,
              color: "#E8E8E8",
              lineHeight: 1.1,
            }}
          >
            <div>Tu vari pelnīt</div>
            <div>vairāk. Šodien.</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 20, color: "#6B6B6B" }}>
            Mājaslapa · Lead Gen · AI · no €50/mēn
          </div>
        </div>
        {/* rankly.lv apļa centrā */}
        <div
          style={{
            position: "absolute",
            left: 1480 - 50,
            top: 312 - 12,
            fontFamily: MONO,
            fontSize: 18,
            color: "#C8FF00",
          }}
        >
          rankly.lv
        </div>
      </div>
    );
  }

  if (layout === "centered") {
    return (
      <div ref={divRef} style={base}>
        <svg style={{ position: "absolute", inset: 0 }} width={W} height={H}>
          {/* Sarkana horizontāla līnija apakšā */}
          <line x1={0} y1={580} x2={W} y2={580} stroke="#CC0000" strokeWidth={4} />
          {/* Mazs aplis kreisajā */}
          <circle cx={-100} cy={312} r={200} fill="none" stroke="#CC0000" strokeWidth={6} />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 96,
              fontWeight: 700,
              color: "#E8E8E8",
              lineHeight: 1,
            }}
          >
            Sistēma. Ne tikai lapa.
          </div>
          <div style={{ fontFamily: MONO, fontSize: 28, color: "#C8FF00" }}>rankly.lv</div>
        </div>
      </div>
    );
  }

  // cercle
  return (
    <div ref={divRef} style={base}>
      <svg style={{ position: "absolute", inset: 0 }} width={W} height={H}>
        <circle cx={820} cy={624} r={500} fill="none" stroke="#CC0000" strokeWidth={8} />
        <text
          x={820}
          y={200}
          textAnchor="middle"
          fontFamily={SANS}
          fontSize={48}
          fontWeight={700}
          fill="#E8E8E8"
          letterSpacing="0.2em"
        >
          RANKLY
        </text>
        <text
          x={820}
          y={260}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={20}
          fill="#6B6B6B"
          letterSpacing="0.1em"
        >
          sistema. svira. izpilde.
        </text>
        <text x={820} y={540} textAnchor="middle" fontFamily={MONO} fontSize={18} fill="#C8FF00">
          rankly.lv
        </text>
      </svg>
    </div>
  );
}
