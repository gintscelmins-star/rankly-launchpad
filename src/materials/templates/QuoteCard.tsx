import React from "react";
import type { MaterialItem } from "../materialData";
import { SIZES } from "../materialData";

const MONO = "'Courier New', 'Courier', monospace";
const SANS = "'Helvetica Neue', 'Arial', sans-serif";

export function QuoteCard({
  item,
  divRef,
}: {
  item: MaterialItem;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const { w, h } = SIZES[item.size];
  const { overline, headline, subline, footer } = item.content;
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
      {overline && (
        <>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: "#CC0000",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {overline}
          </div>
          <div style={{ height: 1, background: "#CC0000", opacity: 0.4, marginBottom: 40 }} />
        </>
      )}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 56,
          fontWeight: 400,
          color: "#E8E8E8",
          lineHeight: 1.2,
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {subline && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 22,
            color: "#6B6B6B",
            marginTop: 32,
            lineHeight: 1.6,
          }}
        >
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
