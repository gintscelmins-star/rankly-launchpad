import React from 'react';
import type { HighlightItem } from '../profileData';

const SIZE = 1080;
const C = SIZE / 2;
const R = 500;

export function HighlightCard({
  item,
  divRef,
}: {
  item: HighlightItem;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const { bg, icon, label, circle } = item;

  const circleEl = circle.show ? (
    circle.style === 'full' ? (
      <circle cx={C} cy={C} r={R} fill="none" stroke={circle.color} strokeWidth={circle.strokeWidth} />
    ) : (
      // partial — tikai apakšējā pusīte (arc no 180° līdz 360°)
      <path
        d={`M ${C - R},${C} A ${R},${R} 0 0,0 ${C + R},${C}`}
        fill="none"
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
      />
    )
  ) : null;

  return (
    <div
      ref={divRef}
      style={{
        width: SIZE,
        height: SIZE,
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* SVG aplis */}
      {circle.show && (
        <svg style={{ position: 'absolute', inset: 0 }} width={SIZE} height={SIZE}>
          {circleEl}
        </svg>
      )}

      {/* Ikona — augšējā daļa */}
      <div
        style={{
          fontFamily: icon.fontFamily,
          fontSize: icon.fontSize,
          fontWeight: icon.fontWeight ?? 400,
          color: icon.color,
          lineHeight: 1,
          marginBottom: 40,
        }}
      >
        {icon.text}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: label.fontFamily,
          fontSize: label.fontSize,
          color: label.color,
          letterSpacing: label.letterSpacing,
          lineHeight: 1,
        }}
      >
        {label.text}
      </div>
    </div>
  );
}
