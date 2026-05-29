import React from 'react';

const wrapperBase: React.CSSProperties = {
  background: '#0A0A0A',
  width: 1080,
  height: 1080,
  position: 'relative',
  overflow: 'hidden',
};

export function MozaikaTileB({
  col,
  row,
  divRef,
}: {
  col: number;
  row: number;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const localCx = 1620 - col * 1080;
  const localCy = 1620 - row * 1080;

  const circle = (
    <svg style={{ position: 'absolute', inset: 0 }} width={1080} height={1080}>
      <circle
        cx={localCx}
        cy={localCy}
        r={900}
        fill="none"
        stroke="#CC0000"
        strokeWidth="3"
      />
    </svg>
  );

  // Tile 1 (col=0, row=2): "LE"
  if (col === 0 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 60,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 120,
            color: '#E8E8E8',
            lineHeight: 1,
          }}
        >
          LE
        </div>
      </div>
    );
  }

  // Tile 2 (col=1, row=2): empty (circle dominates)
  if (col === 1 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
      </div>
    );
  }

  // Tile 3 (col=2, row=2): "ROUGE"
  if (col === 2 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 60,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 80,
            color: '#CC0000',
            lineHeight: 1,
          }}
        >
          ROUGE
        </div>
      </div>
    );
  }

  // Tile 4 (col=0, row=1): "CERCLE" vertical
  if (col === 0 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 60,
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 96,
            color: '#E8E8E8',
            lineHeight: 1,
          }}
        >
          CERCLE
        </div>
      </div>
    );
  }

  // Tile 5 (col=1, row=1): circle center
  if (col === 1 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            color: '#CC0000',
            whiteSpace: 'nowrap',
          }}
        >
          1970
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: '#4A4A4A',
            whiteSpace: 'nowrap',
          }}
        >
          Jean-Pierre Melville
        </div>
      </div>
    );
  }

  // Tile 6 (col=2, row=1): empty
  if (col === 2 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
      </div>
    );
  }

  // Tile 7 (col=0, row=0): RANKLY + sistema. svira.
  if (col === 0 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            color: '#C8FF00',
          }}
        >
          RANKLY
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 55,
            left: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: '#4A4A4A',
          }}
        >
          sistema. svira.
        </div>
      </div>
    );
  }

  // Tile 8 (col=1, row=0): empty (circle top)
  if (col === 1 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
      </div>
    );
  }

  // Tile 9 (col=2, row=0): rankly.lv
  if (col === 2 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 20,
            color: '#C8FF00',
          }}
        >
          rankly.lv
        </div>
      </div>
    );
  }

  // Fallback
  return <div ref={divRef} style={wrapperBase} />;
}
