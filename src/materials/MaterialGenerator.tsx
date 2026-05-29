import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { MATERIALS, SIZES } from './materialData';
import type { MaterialItem } from './materialData';
import { ManifestCard } from './templates/ManifestCard';
import { StatCard } from './templates/StatCard';
import { QuoteCard } from './templates/QuoteCard';
import { WarningCard } from './templates/WarningCard';

const MONO = "'Courier New', 'Courier', monospace";
const ACCENT = '#C8FF00';

type Filter = 'all' | 'ig' | 'fb' | '1x1' | '4x5' | '9x16';

function CardRenderer({ item, divRef }: { item: MaterialItem; divRef: (el: HTMLDivElement | null) => void }) {
  if (item.template === 'stat') return <StatCard item={item} divRef={divRef} />;
  if (item.template === 'quote') return <QuoteCard item={item} divRef={divRef} />;
  if (item.template === 'warning') return <WarningCard item={item} divRef={divRef} />;
  return <ManifestCard item={item} divRef={divRef} />;
}

export function MaterialGenerator() {
  const [filter, setFilter] = useState<Filter>('all');
  const refs = useRef<(HTMLDivElement | null)[]>(Array(MATERIALS.length).fill(null));

  const filtered = MATERIALS.filter(m => {
    if (filter === 'ig') return m.platform === 'ig' || m.platform === 'both';
    if (filter === 'fb') return m.platform === 'fb' || m.platform === 'both';
    if (filter === '1x1' || filter === '4x5' || filter === '9x16') return m.size === filter;
    return true;
  });

  const exportItem = async (item: MaterialItem, _idx: number) => {
    const el = refs.current[item.id - 1];
    if (!el) return;
    const { w, h } = SIZES[item.size];
    const dataUrl = await toPng(el, { width: w, height: h, pixelRatio: 1 });
    const a = document.createElement('a');
    a.download = `rankly-material-${item.id}-${item.template}.png`;
    a.href = dataUrl;
    a.click();
  };

  const exportAll = async () => {
    for (const item of filtered) {
      await exportItem(item, item.id - 1);
      await new Promise(r => setTimeout(r, 500));
    }
  };

  const FILTERS: { label: string; value: Filter }[] = [
    { label: 'VISI', value: 'all' },
    { label: 'IG', value: 'ig' },
    { label: 'FB', value: 'fb' },
    { label: '1×1', value: '1x1' },
    { label: '4×5', value: '4x5' },
    { label: '9×16', value: '9x16' },
  ];

  const platformLabel = (p: string) => p === 'both' ? 'IG+FB' : p.toUpperCase();

  return (
    <div style={{ background: '#1A1A1A', minHeight: '100vh', padding: 40, fontFamily: MONO, color: '#E8E8E8' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
        <h1 style={{ margin: 0, fontSize: 15, color: ACCENT, letterSpacing: '0.2em', fontWeight: 'normal' }}>
          RANKLY / MATERIĀLU ĢENERATORS
        </h1>
        <button onClick={exportAll} style={{ background: ACCENT, color: '#0A0A0A', border: 'none', padding: '10px 24px', fontFamily: MONO, fontSize: 13, cursor: 'pointer', letterSpacing: '0.1em' }}>
          Eksportēt visus →
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: '1px solid #2D2D2D' }}>
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)} style={{ background: 'none', border: 'none', borderBottom: filter === f.value ? `2px solid ${ACCENT}` : '2px solid transparent', marginBottom: -1, padding: '10px 20px', fontFamily: MONO, fontSize: 12, color: filter === f.value ? ACCENT : '#6B6B6B', cursor: 'pointer', letterSpacing: '0.1em' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {filtered.map(item => {
          const { w, h } = SIZES[item.size];
          const scale = 270 / w;
          const previewH = h * scale;

          return (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Preview */}
              <div style={{ width: 270, height: previewH, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <CardRenderer item={item} divRef={el => { refs.current[item.id - 1] = el; }} />
                </div>
              </div>
              {/* Meta */}
              <div style={{ fontSize: 11, color: '#4A4A4A', lineHeight: 1.8 }}>
                <span style={{ color: '#6B6B6B' }}>{item.template}</span>
                {' · '}
                <span style={{ color: ACCENT }}>{platformLabel(item.platform)}</span>
                {' · '}
                {item.size}
              </div>
              <button onClick={() => exportItem(item, item.id - 1)} style={{ background: 'none', border: '1px solid #2D2D2D', color: '#6B6B6B', padding: '8px 16px', fontFamily: MONO, fontSize: 11, cursor: 'pointer', textAlign: 'left', letterSpacing: '0.05em' }}>
                ↓ Lejupielādēt PNG
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
