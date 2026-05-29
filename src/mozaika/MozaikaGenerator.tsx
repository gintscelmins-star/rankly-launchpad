import { useRef, useState } from 'react';
import { MozaikaTileA } from './MozaikaA';
import { MozaikaTileB } from './MozaikaB';
import { MozaikaTileC } from './MozaikaC';
import { exportTile } from './mozaikaExport';
import { tileNum } from './mozaikaStyles';

type Tab = 'nelasit' | 'cercle' | 'sistema';

const TABS: { id: Tab; label: string }[] = [
  { id: 'nelasit', label: 'NELASĪT' },
  { id: 'cercle',  label: 'LE CERCLE ROUGE' },
  { id: 'sistema', label: 'SISTĒMA' },
];

const MOZ_NAMES: Record<Tab, string> = {
  nelasit: 'nelasit',
  cercle:  'cercle',
  sistema: 'sistema',
};

// Grid order: rows 0,1,2 top to bottom; cols 0,1,2 left to right
// flat index i = row * 3 + col
const GRID: { col: number; row: number }[] = [];
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    GRID.push({ col, row });
  }
}

async function handleExportAll(
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  mozName: string
) {
  for (let row = 2; row >= 0; row--) {
    for (let col = 2; col >= 0; col--) {
      const i = row * 3 + col;
      const el = refs.current[i];
      if (el) {
        const num = tileNum(col, row);
        await exportTile(el, mozName, num);
        await new Promise(r => setTimeout(r, 600));
      }
    }
  }
}

export function MozaikaGenerator() {
  const [activeTab, setActiveTab] = useState<Tab>('nelasit');

  const refsA = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null));
  const refsB = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null));
  const refsC = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null));

  const getActiveRefs = () => {
    if (activeTab === 'nelasit') return refsA;
    if (activeTab === 'cercle')  return refsB;
    return refsC;
  };

  const renderTile = (col: number, row: number, tab: Tab) => {
    const i = row * 3 + col;
    const makeRef = (
      refs: React.MutableRefObject<(HTMLDivElement | null)[]>
    ) => (el: HTMLDivElement | null) => {
      refs.current[i] = el;
    };

    if (tab === 'nelasit') return <MozaikaTileA col={col} row={row} divRef={makeRef(refsA)} />;
    if (tab === 'cercle')  return <MozaikaTileB col={col} row={row} divRef={makeRef(refsB)} />;
    return <MozaikaTileC col={col} row={row} divRef={makeRef(refsC)} />;
  };

  const mozName = MOZ_NAMES[activeTab];

  return (
    <div
      style={{
        background: '#1A1A1A',
        minHeight: '100vh',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <h1
          style={{
            fontFamily: "'Courier New', monospace",
            color: '#C8FF00',
            fontSize: 20,
            letterSpacing: '0.2em',
            margin: 0,
          }}
        >
          RANKLY / IG MOZAĪKU ĢENERATORS
        </h1>
        <button
          onClick={() => handleExportAll(getActiveRefs(), mozName)}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: '#C8FF00',
            background: 'transparent',
            border: '1px solid #C8FF00',
            padding: '8px 20px',
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          Eksportēt visus 9 →
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              color: activeTab === tab.id ? '#C8FF00' : '#6B6B6B',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #C8FF00' : '2px solid transparent',
              paddingBottom: 8,
              cursor: 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3x3 preview grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 360px)',
          gap: 4,
          background: '#0A0A0A',
          width: 'fit-content',
        }}
      >
        {GRID.map(({ col, row }) => {
          const num = tileNum(col, row);
          const numStr = String(num).padStart(2, '0');

          return (
            <div key={`${col}-${row}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 360,
                  height: 360,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const refs = getActiveRefs();
                  const i = row * 3 + col;
                  const el = refs.current[i];
                  if (el) exportTile(el, mozName, num);
                }}
              >
                <div
                  style={{
                    width: 1080,
                    height: 1080,
                    transform: 'scale(0.3333) translateZ(0)',
                    transformOrigin: 'top left',
                  }}
                >
                  {renderTile(col, row, activeTab)}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  color: '#4A4A4A',
                  marginTop: 4,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const refs = getActiveRefs();
                  const i = row * 3 + col;
                  const el = refs.current[i];
                  if (el) exportTile(el, mozName, num);
                }}
              >
                {'↓'} {numStr}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          fontFamily: "'Courier New', monospace",
          fontSize: 12,
          color: '#6B6B6B',
        }}
      >
        IG publicēšanas secība: 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2 → 1
      </div>
    </div>
  );
}
