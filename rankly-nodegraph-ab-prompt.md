# Claude Code — Rankly NodeGraph A/B Variants

## KONTEKSTS

Strādājam uz rankly-launchpad (Vite + React + TypeScript + Tailwind).
Mērķis: izveidot divas NodeGraph komponentes hero sekcijā — A/B testam.
Variants A = simetrisks statisks grafiks.
Variants B = animēts signālu plūsmas grafiks (Personal Jesus ritms).

---

## STEP 1 — IZLASI PIRMS RAKSTĪT

1. Izlasi esošo `src/components/sections/Hero.tsx`
2. Izlasi `tailwind.config.ts` — saglabā krāsu shēmu
3. Pārbaudi vai `framer-motion` ir `package.json` — ja ir, drīkst izmantot
4. Tikai tad raksti kodu

---

## STEP 2 — FAILU STRUKTŪRA

```
src/
  components/
    graph/
      NodeGraphA.tsx       (simetrisks, SVG-based)
      NodeGraphB.tsx       (animēts Canvas-based)
      NodeGraphWrapper.tsx (A/B switcher)
    sections/
      Hero.tsx             (atjaunināt — ielikt NodeGraphWrapper)
```

---

## STEP 3 — VARIANTS A: NodeGraphA.tsx

### Apraksts

SVG-based simetrisks grafiks. Rankly centrā augšā.
5 satelītu nodes savienoti ar Rankly.
"Jauni klienti" apakšā kā iznākums.
Pulss animācija uz connector līnijām (CSS keyframes).

### Nodes un pozīcijas (SVG viewBox="0 0 400 320"):

```
RANKLY (centrs augšā):   cx=200, cy=70,  r=42
Mājaslapa (kreisi):      cx=80,  cy=160, r=28
Google Ads (labā):       cx=320, cy=160, r=28
CRM (kreisi apakšā):     cx=110, cy=255, r=28
AI Auto (labā apakšā):   cx=290, cy=255, r=28
Analytics GA4 (vidus):   cx=200, cy=175, r=24
Jauni klienti (apakšā):  cx=200, cy=295, r=26
```

### Savienojumi:

```
Mājaslapa    → RANKLY
Google Ads   → RANKLY
CRM          → RANKLY
AI Auto      → RANKLY
Analytics GA4→ RANKLY
RANKLY       → Jauni klienti
```

### Krāsas (atbilstoši esošajai Tailwind paletei):

```typescript
const nodeColors = {
  rankly:    { fill: '#c8ff00', stroke: '#a3cc00', text: '#0a0a0a' },
  majaslapa: { fill: esošais primary vai accent krāsa, text: '#fff' },
  ads:       { fill: esošais secondary krāsa, text: '#fff' },
  crm:       { fill: esošais accent krāsa, text: '#fff' },
  ai:        { fill: esošais muted krāsa, text: '#fff' },
  ga4:       { fill: esošais surface krāsa, text: '#fff' },
  out:       { fill: 'transparent', stroke: '#c8ff00', text: '#c8ff00' },
}
// Ja nav šādas krāsas — izmanto Tailwind zinc/slate toņus atbilstoši dizainam
```

### Animācija — pulss uz līnijām:

```css
/* CSS keyframe — dots ceļojošs pa connector */
@keyframes pulse-travel {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

/* Katrai līnijai: */
.connector-pulse {
  stroke-dasharray: 4 8;
  animation: pulse-travel 2s linear infinite;
}

/* Dažādi delays katrai līnijai (0s, 0.3s, 0.6s, 0.9s, 1.2s, 1.5s) */
```

### TypeScript komponente struktūra:

```typescript
const NodeGraphA: React.FC = () => {
  return (
    <svg
      viewBox="0 0 400 320"
      className="w-full h-full"
      aria-label="Rankly sistēmas grafiks"
    >
      <defs>
        {/* arrowhead marker */}
        {/* CSS animācijas */}
      </defs>

      {/* Connector līnijas (zem nodes) */}
      {/* Pulse animācijas uz connectoriem */}
      {/* Nodes */}
      {/* Labels */}
    </svg>
  );
};
```

---

## STEP 4 — VARIANTS B: NodeGraphB.tsx

### Apraksts

Canvas-based animācija. Divas fāzes:

- **Fāze 1 (Haoss):** ~5 sekundes. Signāli plūst haotiski starp visiem nodes.
  Dažāds ātrums, biezums, virziens. Uz "Jauni klienti" iet reti, mazi, sarkani.
- **Fāze 2 (Rankly):** RANKLY parādās centrā. Signāli iet ritmiskā tempā.
  Personal Jesus ritms (vizuāls, nav audio):
  Kick: beats 1,3 — lieli zaļi impulsi uz Jauni klienti
  Snare: beats 2,4 — vidēji impulsi no nodes uz Rankly
  Hi-hat: 8th notes — mazi ātrāki signāli starp nodes
  Uz "Jauni klienti" iet biezāki, lielāka diametra, zaļi, sakārtotā ritmā.
- **Loop:** Pēc fāzes 2 (~8 sek) — atgriežas fāzē 1, atkārtojas.

### Nodes pozīcijas (procentos no canvas izmēra):

```typescript
const NODES = [
  { id: "ads", label: "Google Ads", sx: 0.18, sy: 0.18 },
  { id: "crm", label: "CRM", sx: 0.82, sy: 0.18 },
  { id: "ai", label: "AI Auto", sx: 0.18, sy: 0.72 },
  { id: "ga4", label: "Analytics GA4", sx: 0.82, sy: 0.72 },
  { id: "ux", label: "UX / Test", sx: 0.5, sy: 0.1 },
  { id: "seo", label: "Satura opt.", sx: 0.5, sy: 0.9 },
  { id: "rankly", label: "RANKLY", sx: 0.5, sy: 0.5 },
  { id: "out", label: "Jauni klienti", sx: 0.5, sy: 0.5 },
];
// 'rankly' un 'out' mainīgas pozīcijas:
// Fāzē 1: 'out' = sx:0.50, sy:0.50 (centrā)
// Fāzē 2: 'rankly' = sx:0.50, sy:0.50; 'out' = sx:0.50, sy:0.88
```

### Personal Jesus ritms (BPM ~126, vizuāls):

```typescript
// Ritma pattern (16th notes, 1 = hit, 0 = pauze):
const KICK = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]; // beats 1,3
const SNARE = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; // beats 2,4
const HIHAT = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]; // 8th notes

// Frame rate: ~60fps, BPM 126 = 2.1 beats/sec
// 1 beat = ~28.5 frames
// 16th note = ~7 frames
const FRAMES_PER_16TH = 7;

// Katru frame pārbaudi:
// frameCount % FRAMES_PER_16TH === 0 → noteIndex++
// noteIndex % 16 → pārbaudi KICK/SNARE/HIHAT
```

### Signālu tipi:

```typescript
interface Particle {
  x1: number;
  y1: number; // sākums
  x2: number;
  y2: number; // gals
  progress: number; // 0→1
  speed: number; // progress/frame
  radius: number; // pikseļu
  alpha: number; // 0-1
  color: string; // hex
  type: "chaos" | "kick" | "snare" | "hihat" | "out";
}

// Chaos fāze:
// speed: 0.004–0.018 (random, lēni un ātri)
// radius: 0.8–2.5 (random)
// color: random hsl(60-260, 50%, 50%) — nesakārtoti
// uz 'out': sarkani #ff3300, r=1.0-1.8

// Rankly fāze:
// KICK → rankly→out: speed=0.025, r=4.0, color=#c8ff00, alpha=0.9
// SNARE → nodes→rankly: speed=0.020, r=2.5, color=#c8ff00, alpha=0.7
// HIHAT → nodes→nodes: speed=0.035, r=1.2, color=#6aaa00, alpha=0.5
```

### Canvas render loop:

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let animFrame: number;
  let frameCount = 0;
  let phase = 0; // 0=chaos, 1=rankly
  let phaseFrames = 0;
  const CHAOS_FRAMES = 300; // ~5 sek
  const RANKLY_FRAMES = 480; // ~8 sek

  const render = () => {
    // Trail effect (ne pilns clear):
    ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    frameCount++;
    phaseFrames++;

    // Fāzes pāreja
    if (phase === 0 && phaseFrames > CHAOS_FRAMES) {
      phase = 1;
      phaseFrames = 0;
      // Iztīri particles, parādi Rankly
    }
    if (phase === 1 && phaseFrames > RANKLY_FRAMES) {
      phase = 0;
      phaseFrames = 0;
      // Loops atpakaļ uz chaos
    }

    // Spawn particles
    // Draw nodes
    // Draw particles
    // Rankly glow (fāzē 2)

    animFrame = requestAnimationFrame(render);
  };

  render();
  return () => cancelAnimationFrame(animFrame);
}, []);
```

### Rankly orchestrator vizuāls (fāzē 2):

```typescript
// Pulsējošs aplis ap RANKLY:
const pulse = 0.5 + 0.5 * Math.sin(frameCount * 0.18);
ctx.beginPath();
ctx.arc(rx, ry, 42 + pulse * 6, 0, Math.PI * 2);
ctx.strokeStyle = `rgba(200, 255, 0, ${0.4 + pulse * 0.3})`;
ctx.lineWidth = 1.5;
ctx.stroke();

// Teksts:
ctx.fillStyle = "#c8ff00";
ctx.font = "bold 14px 'Courier New', monospace";
ctx.textAlign = "center";
ctx.fillText("RANKLY", rx, ry - 4);
ctx.font = "9px 'Courier New', monospace";
ctx.fillStyle = "rgba(200,255,0,0.6)";
ctx.fillText("ORCHESTRATOR", rx, ry + 11);
```

### Canvas resize:

```typescript
// ResizeObserver — canvas izmērs atbilst konteinera izmēram
useEffect(() => {
  const obs = new ResizeObserver(() => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
  obs.observe(canvas);
  return () => obs.disconnect();
}, []);
```

### Fona nodes (abās fāzēs):

```typescript
// Katrs node (izņemot rankly fāzē 2 un out):
ctx.beginPath();
ctx.arc(x, y, 20, 0, Math.PI * 2);
ctx.fillStyle = phase === 1 ? "rgba(200,255,0,0.08)" : "rgba(255,100,0,0.06)";
ctx.fill();
ctx.strokeStyle = phase === 1 ? "rgba(200,255,0,0.3)" : "rgba(255,100,0,0.2)";
ctx.lineWidth = 0.5;
ctx.stroke();
ctx.fillStyle = phase === 1 ? "#c8ff00" : "#ff6600";
ctx.font = "500 9px 'Courier New', monospace";
ctx.textAlign = "center";
ctx.fillText(node.label.toUpperCase(), x, y + 1);
```

---

## STEP 5 — NodeGraphWrapper.tsx

```typescript
// A/B switcher — URL param vai localStorage
// ?graph=a → NodeGraphA
// ?graph=b → NodeGraphB
// default → NodeGraphB (animētais)

const NodeGraphWrapper: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const variant = params.get('graph') || 'b';

  return variant === 'a' ? <NodeGraphA /> : <NodeGraphB />;
};
```

---

## STEP 6 — HERO.tsx ATJAUNINĀJUMS

Hero labajā pusē (45% platums) nomainīt esošo NodeGraph ar:

```tsx
<div className="relative w-full h-[380px] md:h-[460px]">
  <NodeGraphWrapper />
</div>
```

Canvas/SVG jāaizpilda šis konteiners pilnā izmērā.

---

## STEP 7 — FONA KRĀSA

NodeGraph B fons ir `#0a0a0a` (gandrīz melns).
Ja Hero fons nav melns — Canvas fona krāsai jāatbilst Hero fonam.
Pārbaudīt Hero komponentes fona krāsu un pielāgot:

```typescript
// Variants B canvas fons:
const BG_COLOR = "rgba(10, 10, 10, 0.15)"; // trail efektam
// Pirmā frame pilns fills:
ctx.fillStyle = "#0a0a0a"; // vai Hero fona hex
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

---

## QUALITY CHECKLIST

```
□ NodeGraphA renders pareizi SVG viewBox
□ NodeGraphA pulss animācija uz connectoriem
□ NodeGraphB canvas resize strādā (ResponsiveObserver)
□ NodeGraphB fāze 1 — haotisks, dažādi signāli
□ NodeGraphB fāze 2 — RANKLY parādās centrā
□ NodeGraphB Personal Jesus ritms jūtams vizuāli
□ NodeGraphB kick (beat 1,3) → lieli zaļi impulsi uz Jauni klienti
□ NodeGraphB snare (beat 2,4) → vidēji impulsi uz Rankly
□ NodeGraphB hihat (8th) → mazi ātrāki starp nodes
□ NodeGraphB loop — chaos → rankly → chaos
□ NodeGraphWrapper — ?graph=a un ?graph=b strādā
□ Hero layout nav bojāts (teksts kreisajā pusē paliek)
□ Mobile: canvas samazinās vai pazūd zem md breakpoint
□ Nav TypeScript errori
□ Nav konsoles errori
```

---

## SVARĪGI

1. Canvas NodeGraphB — `position: absolute; inset: 0; width: 100%; height: 100%`
2. NodeGraphA — SVG `width="100%" height="100%"` ar fiksētu viewBox
3. Fonta stils Canvas tekstam: `'Courier New', monospace` — tas ir apstiprināts
4. Krāsa `#c8ff00` (Rankly zaļš-dzeltens) — izmanto visur kur ir Rankly/aktīvs stāvoklis
5. Chaos fāzē — nav zaļa. Tikai fāzē 2 parādās zaļš.
6. NEKAD neizmanto `document.getElementById` — tikai `useRef`

---

**COMMIT:** `feat: add NodeGraph A/B variants — static symmetric and Personal Jesus signal flow`
