import React from "react";
import type { MaterialItem } from "../materialData";
import { SIZES } from "../materialData";

const MONO = "'Courier New', 'Courier', monospace";
const SANS = "'Helvetica Neue', 'Arial', sans-serif";

export function StatCard({
  item,
  divRef,
}: {
  item: MaterialItem;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const { w, h } = SIZES[item.size];
  const { overline, headline, subline, accent, footer } = item.content;

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
        alignItems: "flex-start",
        padding: 100,
        boxSizing: "border-box",
      }}
    >
      {overline && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 14,
            color: "#6B6B6B",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {overline}
        </div>
      )}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 180,
          fontWeight: 700,
          color: "#E8E8E8",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {headline}
      </div>
      {subline && (
        <div style={{ fontFamily: MONO, fontSize: 26, color: "#4A4A4A", marginTop: 20 }}>
          {subline}
        </div>
      )}
      {accent && (
        <div style={{ fontFamily: SANS, fontSize: 32, color: "#C8FF00", marginTop: 16 }}>
          {accent}
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
