import React from 'react';
import type { MaterialItem } from '../materialData';
import { SIZES } from '../materialData';

const MONO = "'Courier New', 'Courier', monospace";
const SANS = "'Helvetica Neue', 'Arial', sans-serif";

export function ManifestCard({ item, divRef }: { item: MaterialItem; divRef: (el: HTMLDivElement | null) => void }) {
  const { w, h } = SIZES[item.size];
  const { overline, headline, subline, accent, footer } = item.content;
  const lines = headline.split('\n');

  return (
    <div ref={divRef} style={{ width: w, height: h, background: item.bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 100, boxSizing: 'border-box' }}>
      {overline && (
        <div style={{ fontFamily: MONO, fontSize: 12, color: '#4A4A4A', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 24 }}>
          {overline}
        </div>
      )}
      <div style={{ fontFamily: SANS, fontSize: 72, fontWeight: 700, color: '#E8E8E8', lineHeight: 1.1, marginBottom: accent || subline ? 40 : 0 }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      {accent && (
        <div style={{ fontFamily: SANS, fontSize: 40, color: '#C8FF00', marginTop: 24, lineHeight: 1.2 }}>{accent}</div>
      )}
      {subline && (
        <div style={{ fontFamily: MONO, fontSize: 22, color: '#6B6B6B', marginTop: 20, lineHeight: 1.6 }}>{subline}</div>
      )}
      {footer && (
        <div style={{ position: 'absolute', bottom: 60, left: 100, fontFamily: MONO, fontSize: 16, color: '#2D2D2D', letterSpacing: '0.1em' }}>{footer}</div>
      )}
    </div>
  );
}
