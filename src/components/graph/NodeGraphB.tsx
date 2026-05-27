import { useEffect, useRef } from "react"

interface Particle {
  x1: number; y1: number
  x2: number; y2: number
  progress: number
  speed: number
  radius: number
  alpha: number
  color: string
  type: "chaos" | "kick" | "snare" | "hihat" | "out"
}

const BASE_NODES = [
  { id: "ads",    label: "GOOGLE ADS",    sx: 0.18, sy: 0.18 },
  { id: "crm",    label: "CRM",           sx: 0.82, sy: 0.18 },
  { id: "ai",     label: "AI AUTO",       sx: 0.18, sy: 0.72 },
  { id: "ga4",    label: "ANALYTICS GA4", sx: 0.82, sy: 0.72 },
  { id: "ux",     label: "UX / TEST",     sx: 0.50, sy: 0.10 },
  { id: "seo",    label: "SATURA OPT.",   sx: 0.50, sy: 0.88 },
  { id: "rankly", label: "RANKLY",        sx: 0.50, sy: 0.50 },
  { id: "out",    label: "JAUNI KLIENTI", sx: 0.50, sy: 0.50 },
]

const SATELLITES = ["ads", "crm", "ai", "ga4", "ux", "seo"]
const KICK  = [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0]
const SNARE = [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]
const HIHAT = [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0]
const FRAMES_PER_16TH = 7
const CHAOS_FRAMES  = 300
const RANKLY_FRAMES = 480

export function NodeGraphB() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Non-null aliases so closures see non-nullable types
    const cvs = canvas as HTMLCanvasElement
    const c   = ctx    as CanvasRenderingContext2D

    const resize = () => {
      cvs.width  = cvs.offsetWidth
      cvs.height = cvs.offsetHeight
    }
    const obs = new ResizeObserver(resize)
    obs.observe(cvs)
    resize()

    let animFrame = 0
    let frameCount = 0
    let phase = 0
    let phaseFrames = 0
    const particles: Particle[] = []
    let firstFrame = true

    // ── Helpers ────────────────────────────────────────────────

    function nodePos(id: string, ph: number, pf: number) {
      const w = cvs.width
      const h = cvs.height
      const n = BASE_NODES.find((x) => x.id === id)!
      if (id === "out") {
        if (ph === 0) return { x: 0.50 * w, y: 0.50 * h }
        const t = Math.min(1, pf / 60)
        return { x: 0.50 * w, y: (0.50 + t * 0.38) * h }
      }
      return { x: n.sx * w, y: n.sy * h }
    }

    function rand(lo: number, hi: number) { return lo + Math.random() * (hi - lo) }

    // ── Spawners ───────────────────────────────────────────────

    function spawnChaos() {
      const srcs = [...SATELLITES]
      const src  = srcs[Math.floor(Math.random() * srcs.length)]
      const toOut = Math.random() < 0.12
      const tgts  = srcs.filter((s) => s !== src)
      const tgt   = toOut ? "out" : tgts[Math.floor(Math.random() * tgts.length)]
      const s = nodePos(src, 0, 0)
      const t = nodePos(tgt, 0, 0)
      const hue = 60 + Math.random() * 200
      particles.push({
        x1: s.x, y1: s.y, x2: t.x, y2: t.y,
        progress: 0,
        speed:  toOut ? rand(0.006, 0.012) : rand(0.004, 0.018),
        radius: toOut ? rand(1.0, 1.8)     : rand(0.8, 2.5),
        alpha:  rand(0.5, 1.0),
        color:  toOut ? "#ff3300" : `hsl(${hue}, 50%, 50%)`,
        type:   toOut ? "out" : "chaos",
      })
    }

    function spawnKick(pf: number) {
      const s = nodePos("rankly", 1, pf)
      const t = nodePos("out",    1, pf)
      particles.push({ x1: s.x, y1: s.y, x2: t.x, y2: t.y, progress: 0, speed: 0.025, radius: 4.0, alpha: 0.9, color: "#c8ff00", type: "kick" })
    }

    function spawnSnare(pf: number) {
      const src = SATELLITES[Math.floor(Math.random() * SATELLITES.length)]
      const s = nodePos(src,     1, pf)
      const t = nodePos("rankly",1, pf)
      particles.push({ x1: s.x, y1: s.y, x2: t.x, y2: t.y, progress: 0, speed: 0.020, radius: 2.5, alpha: 0.7, color: "#c8ff00", type: "snare" })
    }

    function spawnHihat(pf: number) {
      const srcs = SATELLITES
      const src  = srcs[Math.floor(Math.random() * srcs.length)]
      const tgts = srcs.filter((s) => s !== src)
      const tgt  = tgts[Math.floor(Math.random() * tgts.length)]
      const s = nodePos(src, 1, pf)
      const t = nodePos(tgt, 1, pf)
      particles.push({ x1: s.x, y1: s.y, x2: t.x, y2: t.y, progress: 0, speed: 0.035, radius: 1.2, alpha: 0.5, color: "#6aaa00", type: "hihat" })
    }

    // ── Node drawing ───────────────────────────────────────────

    function drawNode(id: string, ph: number, pf: number) {
      if (id === "rankly" && ph === 0) return
      const { x, y } = nodePos(id, ph, pf)

      if (id === "rankly") {
        const pulse = 0.5 + 0.5 * Math.sin(frameCount * 0.18)
        c.beginPath(); c.arc(x, y, 42 + pulse * 6, 0, Math.PI * 2)
        c.strokeStyle = `rgba(200,255,0,${(0.4 + pulse * 0.3).toFixed(2)})`; c.lineWidth = 1.5; c.stroke()
        c.beginPath(); c.arc(x, y, 38, 0, Math.PI * 2)
        c.fillStyle = `rgba(200,255,0,${(0.08 + pulse * 0.05).toFixed(2)})`; c.fill()
        c.strokeStyle = `rgba(200,255,0,${(0.6 + pulse * 0.2).toFixed(2)})`; c.lineWidth = 1; c.stroke()
        c.fillStyle = "#c8ff00"; c.font = "bold 14px 'Courier New',monospace"; c.textAlign = "center"
        c.fillText("RANKLY", x, y - 4)
        c.font = "9px 'Courier New',monospace"; c.fillStyle = "rgba(200,255,0,0.6)"
        c.fillText("ORCHESTRATOR", x, y + 11)

      } else if (id === "out") {
        const pulse2 = ph === 1 ? 0.5 + 0.5 * Math.sin(frameCount * 0.12) : 0
        const op = (ph === 1 ? 0.6 + pulse2 * 0.4 : 0.3).toFixed(2)
        c.beginPath(); c.arc(x, y, 24, 0, Math.PI * 2)
        c.fillStyle = "rgba(200,255,0,0.05)"; c.fill()
        c.strokeStyle = `rgba(200,255,0,${op})`; c.lineWidth = 1; c.stroke()
        c.fillStyle = `rgba(200,255,0,${op})`; c.font = "500 8px 'Courier New',monospace"
        c.textAlign = "center"; c.fillText("JAUNI KLIENTI", x, y + 1)

      } else {
        const n = BASE_NODES.find((b) => b.id === id)!
        c.beginPath(); c.arc(x, y, 20, 0, Math.PI * 2)
        c.fillStyle   = ph === 1 ? "rgba(200,255,0,0.08)" : "rgba(255,100,0,0.06)"; c.fill()
        c.strokeStyle = ph === 1 ? "rgba(200,255,0,0.3)"  : "rgba(255,100,0,0.2)"
        c.lineWidth = 0.5; c.stroke()
        c.fillStyle = ph === 1 ? "#c8ff00" : "#ff6600"
        c.font = "500 8px 'Courier New',monospace"; c.textAlign = "center"
        c.fillText(n.label, x, y + 1)
      }
    }

    // ── Render loop ────────────────────────────────────────────

    const render = () => {
      animFrame = requestAnimationFrame(render)
      const w = cvs.width
      const h = cvs.height
      if (w === 0 || h === 0) return

      if (firstFrame) {
        c.fillStyle = "#0a0a0a"; c.fillRect(0, 0, w, h); firstFrame = false
      } else {
        c.fillStyle = "rgba(10,10,10,0.15)"; c.fillRect(0, 0, w, h)
      }

      frameCount++; phaseFrames++

      if (phase === 0 && phaseFrames >= CHAOS_FRAMES) {
        phase = 1; phaseFrames = 0; particles.length = 0
      }
      if (phase === 1 && phaseFrames >= RANKLY_FRAMES) {
        phase = 0; phaseFrames = 0; particles.length = 0; firstFrame = true
      }

      // Spawn
      if (phase === 0) {
        if (frameCount % 8 === 0 || Math.random() < 0.1) spawnChaos()
      } else {
        if (frameCount % FRAMES_PER_16TH === 0) {
          const ni = Math.floor(frameCount / FRAMES_PER_16TH) % 16
          if (KICK[ni])  spawnKick(phaseFrames)
          if (SNARE[ni]) spawnSnare(phaseFrames)
          if (HIHAT[ni]) spawnHihat(phaseFrames)
        }
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed
        if (p.progress >= 1) { particles.splice(i, 1); continue }
        const px = p.x1 + (p.x2 - p.x1) * p.progress
        const py = p.y1 + (p.y2 - p.y1) * p.progress
        let a = p.alpha
        if (p.progress < 0.1)  a *= p.progress / 0.1
        if (p.progress > 0.85) a *= (1 - p.progress) / 0.15
        c.beginPath(); c.arc(px, py, p.radius, 0, Math.PI * 2)
        c.fillStyle = p.color; c.globalAlpha = a; c.fill(); c.globalAlpha = 1
      }

      // Draw nodes
      const ids = phase === 0
        ? BASE_NODES.filter((n) => n.id !== "rankly").map((n) => n.id)
        : BASE_NODES.map((n) => n.id)
      for (const id of ids) drawNode(id, phase, phaseFrames)
    }

    render()

    return () => { cancelAnimationFrame(animFrame); obs.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", backgroundColor: "#0a0a0a", display: "block" }}
    />
  )
}
