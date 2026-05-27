const NODES = [
  { id: "web", label: "Mājaslapa", x: 20, y: 22 },
  { id: "ads", label: "Google Ads", x: 70, y: 22 },
  { id: "crm", label: "CRM", x: 20, y: 58 },
  { id: "ai", label: "AI Auto", x: 70, y: 58 },
  { id: "result", label: "Jauni klienti ✓", x: 45, y: 84 },
] as const

const NODE_MAP: Record<string, { x: number; y: number }> = Object.fromEntries(
  NODES.map((n) => [n.id, { x: n.x, y: n.y }])
)

const EDGES = [
  { id: "e1", from: "web", to: "crm", delay: "0s", dur: "2.4s" },
  { id: "e2", from: "ads", to: "crm", delay: "0.7s", dur: "2.8s" },
  { id: "e3", from: "crm", to: "ai", delay: "1.3s", dur: "2.0s" },
  { id: "e4", from: "ai", to: "result", delay: "0.4s", dur: "2.2s" },
  { id: "e5", from: "web", to: "result", delay: "1.6s", dur: "3.0s" },
]

export function NodeGraph() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      aria-hidden="true"
      style={{ maxHeight: "380px" }}
    >
      <defs>
        <filter id="ng-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {EDGES.map((e) => {
          const s = NODE_MAP[e.from]
          const t = NODE_MAP[e.to]
          return (
            <path
              key={e.id + "-def"}
              id={e.id + "-path"}
              d={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
              fill="none"
            />
          )
        })}
      </defs>

      {/* Edge lines */}
      {EDGES.map((e) => {
        const s = NODE_MAP[e.from]
        const t = NODE_MAP[e.to]
        return (
          <line
            key={e.id}
            x1={s.x}
            y1={s.y}
            x2={t.x}
            y2={t.y}
            stroke="currentColor"
            strokeOpacity={0.18}
            strokeWidth={0.4}
            className="text-primary"
          />
        )
      })}

      {/* Animated dots along edges */}
      {EDGES.map((e) => (
        <circle
          key={e.id + "-dot"}
          r={1.4}
          fill="currentColor"
          className="text-primary"
        >
          <animateMotion dur={e.dur} begin={e.delay} repeatCount="indefinite">
            <mpath href={`#${e.id}-path`} />
          </animateMotion>
        </circle>
      ))}

      {/* Nodes */}
      {NODES.map((n) => (
        <g key={n.id} filter="url(#ng-glow)">
          {/* Outer glow ring */}
          <circle
            cx={n.x}
            cy={n.y}
            r={5}
            fill="currentColor"
            className="text-primary"
            fillOpacity={0.12}
            stroke="currentColor"
            strokeWidth={0.6}
            strokeOpacity={0.5}
          />
          {/* Inner dot */}
          <circle
            cx={n.x}
            cy={n.y}
            r={2}
            fill="currentColor"
            className="text-primary"
          />
        </g>
      ))}

      {/* Node labels */}
      {NODES.map((n) => {
        const isBottom = n.y > 70
        const labelY = isBottom ? n.y + 9 : n.y - 8
        return (
          <text
            key={n.id + "-label"}
            x={n.x}
            y={labelY}
            textAnchor="middle"
            fontSize="4"
            fill="currentColor"
            className="text-foreground"
            fillOpacity={0.65}
          >
            {n.label}
          </text>
        )
      })}
    </svg>
  )
}
