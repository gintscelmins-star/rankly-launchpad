import React from 'react';
import { tileNum } from './mozaikaStyles';

const wrapperBase: React.CSSProperties = {
  background: '#0A0A0A',
  width: 1080,
  height: 1080,
  padding: 80,
  boxSizing: 'border-box',
  fontFamily: "'Courier New', monospace",
  color: '#6B6B6B',
  fontSize: 20,
  lineHeight: 1.8,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
};

const tileLabel = (col: number, row: number): React.CSSProperties => ({
  position: 'absolute',
  bottom: 60,
  right: 60,
  fontSize: 11,
  color: '#2D2D2D',
  fontFamily: "'Courier New', monospace",
});

export function MozaikaTileA({
  col,
  row,
  divRef,
}: {
  col: number;
  row: number;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const num = tileNum(col, row);
  const numStr = String(num).padStart(2, '0');

  // Tile 1 (col=0, row=2)
  if (col === 0 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#4A4A4A', letterSpacing: '0.2em', marginBottom: 16 }}>
            nelasīt
          </div>
          <div style={{ height: 1, background: '#2D2D2D', marginBottom: 24 }} />
          <div>
            {'Žana Pjēra Melvila kino ērā\nAlens Delons radīja tēlu,\nkas operē ārpus morāles\nun emocijām.'
              .split('\n')
              .map((line, i) => (
                <div key={i}>{line}</div>
              ))}
          </div>
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 2 (col=1, row=2)
  if (col === 1 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          {'Ne nonchalant —\npatiess, tīrs tukšums.\nAmor fati —\nbez nožēlas, bez eiforijas.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 3 (col=2, row=2)
  if (col === 2 && row === 2) {
    return (
      <div ref={divRef} style={{ ...wrapperBase, fontSize: 22 }}>
        <div>
          {'Emocijas ir mainīgais,\nkas rada kļūdas\nun iznīcina sistēmas.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 4 (col=0, row=1)
  if (col === 0 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          {'Nelasīt.\n\nJa tu šeit meklēji\nmanus pakalpojumus,\nšo sadaļu vari\ndroši aizvērt.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 5 (col=1, row=1) — RANKLY wordmark
  if (col === 1 && row === 1) {
    return (
      <div ref={divRef} style={{ ...wrapperBase, justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, color: '#4A4A4A', fontFamily: "'Courier New', monospace" }}>
          nelasīt / 05
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 700,
              fontSize: 72,
              color: '#E8E8E8',
              letterSpacing: '0.05em',
            }}
          >
            RANKLY
          </div>
          <div style={{ width: 200, height: 1, background: '#C8FF00', margin: '16px 0' }} />
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 18, color: '#6B6B6B' }}>
            sistema. svira. izpilde.
          </div>
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 6 (col=2, row=1)
  if (col === 2 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          {'Pamats:\nKoka zobeni\nun izgriezti tauki.\n\nMusasi ieradās uz dueli\nar koka zobenu.\nUzvarēja.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 7 (col=0, row=0)
  if (col === 0 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          {'Mērķis:\nAsimetriskā svira.\n\nPārdodot savu laiku,\nbrīvību nenopirksi.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 8 (col=1, row=0)
  if (col === 1 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          {'Metode:\nSterilitāte.\n\nTirgus krīt —\ntas ir fakts.\nFaktiem nav\nemocionāla svara.'
            .split('\n')
            .map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Tile 9 (col=2, row=0)
  if (col === 2 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        <div>
          <div>Sistēma.</div>
          <div>Svira.</div>
          <div>Izpilde.</div>
          <div style={{ marginTop: 8 }}>&nbsp;</div>
          <div style={{ color: '#C8FF00' }}>rankly.lv</div>
        </div>
        <div style={tileLabel(col, row)}>{numStr}</div>
      </div>
    );
  }

  // Fallback (should never hit)
  return <div ref={divRef} style={wrapperBase} />;
}
