import React from "react";
import type { MaterialItem } from "../materialData";
import { SIZES } from "../materialData";

const MONO = "'Courier New', 'Courier', monospace";
const SANS = "'Helvetica Neue', 'Arial', sans-serif";

export function WarningCard({
  item,
  divRef,
}: {
  item: MaterialItem;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const { w, h } = SIZES[item.size];
  const { overline, headline, subline, accent, footer } = item.content;
  const lines = headline.split("\n");

  return (
    <div
      ref={divRef}
      style={{
        width: w,
        height: h,
        background: item.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 100,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "#C8FF00",
        }}
      />
      {overline && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: "#CC0000",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {overline}
        </div>
      )}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 60,
          fontWeight: 700,
          color: "#E8E8E8",
          lineHeight: 1.15,
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {accent && (
        <div style={{ fontFamily: SANS, fontSize: 40, color: "#C8FF00", marginTop: 28 }}>
          {accent}
        </div>
      )}
      {subline && (
        <div style={{ fontFamily: MONO, fontSize: 22, color: "#6B6B6B", marginTop: 20 }}>
          {subline}
        </div>
      )}
      {footer && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 100,
            fontFamily: MONO,
            fontSize: 16,
            color: "#2D2D2D",
            letterSpacing: "0.1em",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
