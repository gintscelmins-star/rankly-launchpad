import React from 'react';
import type { ProfileVariant } from '../profileData';

const SIZE = 800;
const CENTER = SIZE / 2;

export function ProfileCard({
  variant,
  divRef,
}: {
  variant: ProfileVariant;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const { bg, circle, content } = variant;
  const r = CENTER - circle.offset - circle.strokeWidth / 2;

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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* SVG aplis */}
      {circle.show && (
        <svg style={{ position: 'absolute', inset: 0 }} width={SIZE} height={SIZE}>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke={circle.color}
            strokeWidth={circle.strokeWidth}
          />
        </svg>
      )}

      {/* Teksts */}
      {content.type === 'wordmark' && (
        <div
          style={{
            fontFamily: content.fontFamily,
            fontSize: content.fontSize,
            fontWeight: content.fontWeight,
            color: content.color,
            letterSpacing: content.letterSpacing,
            lineHeight: 1,
          }}
        >
          {content.text}
        </div>
      )}

      {content.type === 'wordmark-accent' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              fontFamily: content.fontFamily,
              fontSize: content.fontSize,
              fontWeight: content.fontWeight,
              color: content.color,
              letterSpacing: content.letterSpacing,
              lineHeight: 1,
            }}
          >
            {content.text}
          </div>
          {'accentLine' in content && content.accentLine && (
            <div
              style={{
                width: content.accentLine.width,
                height: content.accentLine.height,
                background: content.accentLine.color,
                marginTop: content.accentLine.marginTop,
              }}
            />
          )}
        </div>
      )}

      {content.type === 'monogram' && (
        <div
          style={{
            fontFamily: content.fontFamily,
            fontSize: content.fontSize,
            fontWeight: content.fontWeight,
            color: content.color,
            letterSpacing: content.letterSpacing,
            lineHeight: 1,
          }}
        >
          {content.text}
        </div>
      )}
    </div>
  );
}
