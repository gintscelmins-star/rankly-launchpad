const NODES = [
  { id: "rankly",    label: "RANKLY",       cx: 200, cy: 70,  r: 42 },
  { id: "majaslapa", label: "Mājaslapa",    cx: 80,  cy: 160, r: 28 },
  { id: "ads",       label: "Google Ads",   cx: 320, cy: 160, r: 28 },
  { id: "crm",       label: "CRM",          cx: 110, cy: 255, r: 28 },
  { id: "ai",        label: "AI Auto",      cx: 290, cy: 255, r: 28 },
  { id: "ga4",       label: "Analytics",    cx: 200, cy: 175, r: 24 },
  { id: "out",       label: "Jauni klienti",cx: 200, cy: 295, r: 26 },
] as const

type NodeId = typeof NODES[number]["id"]

const COLORS: Record<NodeId, { fill: string; stroke: string; text: string }> = {
  rankly:    { fill: "#c8ff00", stroke: "#a3cc00", text: "#0a0a0a" },
  majaslapa: { fill: "#2D2D2D", stroke: "#4A4A4A", text: "#9A9A9A" },
  ads:       { fill: "#2D2D2D", stroke: "#4A4A4A", text: "#9A9A9A" },
  crm:       { fill: "#2D2D2D", stroke: "#4A4A4A", text: "#9A9A9A" },
  ai:        { fill: "#2D2D2D", stroke: "#4A4A4A", text: "#9A9A9A" },
  ga4:       { fill: "#1A1A1A", stroke: "#3A3A3A", text: "#6B6B6B" },
  out:       { fill: "transparent", stroke: "#c8ff00", text: "#c8ff00" },
}

const EDGES: { from: NodeId; to: NodeId; delay: string }[] = [
  { from: "majaslapa", to: "rankly", delay: "0s"   },
  { from: "ads",       to: "rankly", delay: "0.3s" },
  { from: "crm",       to: "rankly", delay: "0.6s" },
  { from: "ai",        to: "rankly", delay: "0.9s" },
  { from: "ga4",       to: "rankly", delay: "1.2s" },
  { from: "rankly",    to: "out",    delay: "1.5s" },
]

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<
  NodeId,
  typeof NODES[number]
>

function edgePts(from: typeof NODES[number], to: typeof NODES[number]) {
  const dx = to.cx - from.cx
  const dy = to.cy - from.cy
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: from.cx + ux * from.r,
    y1: from.cy + uy * from.r,
    x2: to.cx - ux * (to.r + 4),
    y2: to.cy - uy * (to.r + 4),
  }
}

const PULSE_CSS = `
@keyframes pulse-travel {
  0%   { stroke-dashoffset: 100; opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.6; }
  100% { stroke-dashoffset: 0;   opacity: 0; }
}
.ng-pulse {
  stroke-dasharray: 4 8;
  animation: pulse-travel 2s linear infinite;
}
`

export function NodeGraphA() {
  return (
    <>
      <style>{PULSE_CSS}</style>
      <svg
        viewBox="0 0 400 320"
        width="100%"
        height="100%"
        aria-label="Rankly sistēmas grafiks"
        style={{ display: "block" }}
      >
        <defs>
          <marker id="nga-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#4A4A4A" />
          </marker>
          <marker id="nga-arrow-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#c8ff00" opacity="0.7" />
          </marker>
        </defs>

        {/* Static connector lines */}
        {EDGES.map((e) => {
          const pts = edgePts(nodeMap[e.from], nodeMap[e.to])
          const isGreen = e.to === "out"
          return (
            <line
              key={`${e.from}-${e.to}-base`}
              x1={pts.x1} y1={pts.y1}
              x2={pts.x2} y2={pts.y2}
              stroke={isGreen ? "#c8ff00" : "#2D2D2D"}
              strokeWidth={isGreen ? 1 : 0.8}
              strokeOpacity={isGreen ? 0.45 : 0.6}
              markerEnd={isGreen ? "url(#nga-arrow-g)" : "url(#nga-arrow)"}
            />
          )
        })}

        {/* Animated pulse lines */}
        {EDGES.map((e) => {
          const pts = edgePts(nodeMap[e.from], nodeMap[e.to])
          const isGreen = e.to === "out"
          return (
            <line
              key={`${e.from}-${e.to}-pulse`}
              className="ng-pulse"
              x1={pts.x1} y1={pts.y1}
              x2={pts.x2} y2={pts.y2}
              stroke={isGreen ? "#c8ff00" : "#6B6B6B"}
              strokeWidth={isGreen ? 2 : 1.2}
              strokeLinecap="round"
              style={{ animationDelay: e.delay }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((n) => {
          const c = COLORS[n.id]
          const isRankly = n.id === "rankly"
          const lines = n.label.split(" ")
          return (
            <g key={n.id}>
              <circle
                cx={n.cx} cy={n.cy} r={n.r}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1}
              />
              {lines.length === 1 ? (
                <text
                  x={n.cx} y={n.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={c.text}
                  fontSize={isRankly ? 12 : 8}
                  fontWeight={isRankly ? "700" : "500"}
                  fontFamily="'Courier New', monospace"
                  letterSpacing={isRankly ? "0.1em" : "0"}
                >
                  {n.label}
                </text>
              ) : (
                <>
                  <text
                    x={n.cx} y={n.cy - 5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={c.text}
                    fontSize={7}
                    fontWeight="500"
                    fontFamily="'Courier New', monospace"
                  >
                    {lines[0]}
                  </text>
                  <text
                    x={n.cx} y={n.cy + 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={c.text}
                    fontSize={7}
                    fontWeight="500"
                    fontFamily="'Courier New', monospace"
                  >
                    {lines[1]}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </svg>
    </>
  )
}
