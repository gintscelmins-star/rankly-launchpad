import React from "react";
import { tileNum } from "./mozaikaStyles";

interface NodeDef {
  id: string;
  label: string;
  gx: number;
  gy: number;
}

interface EdgeDef {
  from: string;
  to: string;
}

const NODES: NodeDef[] = [
  { id: "majaslapa", label: "MĀJASLAPA", gx: 810, gy: 810 },
  { id: "ads", label: "GOOGLE ADS", gx: 2430, gy: 810 },
  { id: "crm", label: "CRM", gx: 810, gy: 1620 },
  { id: "rankly", label: "RANKLY", gx: 1620, gy: 1620 },
  { id: "ai", label: "AI AUTO", gx: 2430, gy: 1620 },
  { id: "leadgen", label: "LEAD GEN", gx: 810, gy: 2430 },
  { id: "out", label: "JAUNI KLIENTI", gx: 1620, gy: 2970 },
  { id: "analytics", label: "ANALYTICS", gx: 2430, gy: 2430 },
];

const EDGE_PAIRS: [string, string][] = [
  ["majaslapa", "rankly"],
  ["ads", "rankly"],
  ["crm", "rankly"],
  ["ai", "rankly"],
  ["rankly", "leadgen"],
  ["rankly", "out"],
  ["analytics", "rankly"],
  ["leadgen", "out"],
  ["ai", "out"],
];

const EDGES: EdgeDef[] = EDGE_PAIRS.map(([from, to]) => ({ from, to }));

function getNode(id: string): NodeDef {
  return NODES.find((n) => n.id === id)!;
}

export function MozaikaTileC({
  col,
  row,
  divRef,
}: {
  col: number;
  row: number;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const offsetX = col * 1080;
  const offsetY = row * 1080;
  const num = tileNum(col, row);
  const numStr = String(num).padStart(2, "0");

  // Visible nodes: within tile bounds with 100px margin
  const visibleNodes = NODES.filter(
    (n) =>
      n.gx >= offsetX - 100 &&
      n.gx <= offsetX + 1180 &&
      n.gy >= offsetY - 100 &&
      n.gy <= offsetY + 1180,
  );

  return (
    <div
      ref={divRef}
      style={{
        background: "#0A0A0A",
        width: 1080,
        height: 1080,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1080}>
        {/* Draw all edges */}
        {EDGES.map((edge, i) => {
          const fromNode = getNode(edge.from);
          const toNode = getNode(edge.to);
          return (
            <line
              key={i}
              x1={fromNode.gx - offsetX}
              y1={fromNode.gy - offsetY}
              x2={toNode.gx - offsetX}
              y2={toNode.gy - offsetY}
              stroke="#1a3300"
              strokeWidth={1}
            />
          );
        })}

        {/* Draw visible nodes */}
        {visibleNodes.map((node) => {
          const isRankly = node.id === "rankly";
          const lx = node.gx - offsetX;
          const ly = node.gy - offsetY;
          const r = isRankly ? 60 : 36;
          const labelY = ly - (isRankly ? 75 : 50);
          const fontSize = isRankly ? 16 : 12;
          const strokeWidth = isRankly ? 2 : 1;

          return (
            <g key={node.id}>
              <circle
                cx={lx}
                cy={ly}
                r={r}
                fill="#0A0A0A"
                stroke="#C8FF00"
                strokeWidth={strokeWidth}
              />
              <text
                x={lx}
                y={labelY}
                textAnchor="middle"
                fill="#C8FF00"
                fontFamily="'Courier New', monospace"
                fontSize={fontSize}
                letterSpacing="0.15em"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tile number */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color: "#2D2D2D",
        }}
      >
        {numStr}
      </div>
    </div>
  );
}
