import { useRef } from "react";
import { toPng } from "html-to-image";
import { PROFILE_VARIANTS, FB_COVER_VARIANTS, IG_HIGHLIGHTS, PROFILE_SIZES } from "./profileData";
import { ProfileCard } from "./templates/ProfileCard";
import { FBCoverCard } from "./templates/FBCoverCard";
import { HighlightCard } from "./templates/HighlightCard";

const MONO = "'Courier New', 'Courier', monospace";
const ACCENT = "#C8FF00";

async function exportEl(el: HTMLDivElement, filename: string, w: number, h: number) {
  const dataUrl = await toPng(el, { width: w, height: h, pixelRatio: 1 });
  const a = document.createElement("a");
  a.download = filename;
  a.href = dataUrl;
  a.click();
}

export function ProfileGenerator() {
  const profileRefs = useRef<(HTMLDivElement | null)[]>(Array(3).fill(null));
  const coverRefs = useRef<(HTMLDivElement | null)[]>(Array(3).fill(null));
  const hlRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  const exportAll = async () => {
    const { w: pw, h: ph } = PROFILE_SIZES.profile_master;
    for (let i = 0; i < PROFILE_VARIANTS.length; i++) {
      const el = profileRefs.current[i];
      if (el) await exportEl(el, `rankly-profile-${["a", "b", "c"][i]}.png`, pw, ph);
      await new Promise((r) => setTimeout(r, 400));
    }
    const { w: cw, h: ch } = PROFILE_SIZES.fb_cover;
    for (let i = 0; i < FB_COVER_VARIANTS.length; i++) {
      const el = coverRefs.current[i];
      if (el) await exportEl(el, `rankly-fb-cover-${["a", "b", "c"][i]}.png`, cw, ch);
      await new Promise((r) => setTimeout(r, 400));
    }
    const { w: hw, h: hh } = PROFILE_SIZES.ig_highlight_master;
    for (let i = 0; i < IG_HIGHLIGHTS.length; i++) {
      const el = hlRefs.current[i];
      if (el) await exportEl(el, `rankly-ig-highlight-${IG_HIGHLIGHTS[i].category}.png`, hw, hh);
      await new Promise((r) => setTimeout(r, 400));
    }
  };

  const sectionHeader = (title: string, sub: string) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, color: "#4A4A4A", letterSpacing: "0.25em", marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 12, color: "#3A3A3A" }}>{sub}</div>
    </div>
  );

  return (
    <div
      style={{
        background: "#1A1A1A",
        minHeight: "100vh",
        padding: 40,
        fontFamily: MONO,
        color: "#E8E8E8",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 48,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 15,
            color: ACCENT,
            letterSpacing: "0.2em",
            fontWeight: "normal",
          }}
        >
          RANKLY / PROFILA AKTĪVI
        </h1>
        <button
          onClick={exportAll}
          style={{
            background: ACCENT,
            color: "#0A0A0A",
            border: "none",
            padding: "10px 24px",
            fontFamily: MONO,
            fontSize: 13,
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          Eksportēt visu →
        </button>
      </div>

      {/* ── PROFILA FOTO ── */}
      {sectionHeader("PROFILA FOTO", "800×800px · FB + IG")}
      <div style={{ display: "flex", gap: 32, marginBottom: 56 }}>
        {PROFILE_VARIANTS.map((v, i) => {
          const { w, h } = PROFILE_SIZES.profile_master;
          const scale = 200 / w;
          return (
            <div key={v.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Preview apaļš */}
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: w,
                    height: h,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <ProfileCard
                    variant={v}
                    divRef={(el) => {
                      profileRefs.current[i] = el;
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#6B6B6B" }}>{v.name}</div>
              <button
                onClick={async () => {
                  const el = profileRefs.current[i];
                  if (el) await exportEl(el, `rankly-profile-${["a", "b", "c"][i]}.png`, w, h);
                }}
                style={{
                  background: "none",
                  border: "1px solid #2D2D2D",
                  color: "#6B6B6B",
                  padding: "7px 14px",
                  fontFamily: MONO,
                  fontSize: 11,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                ↓ PNG (800×800)
              </button>
            </div>
          );
        })}
      </div>

      {/* ── FB COVER ── */}
      {sectionHeader("FB COVER", "1640×624px · Safe zone: 80-1560px")}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 56 }}>
        {FB_COVER_VARIANTS.map((v, i) => {
          const { w, h } = PROFILE_SIZES.fb_cover;
          const scale = 410 / w;
          const previewH = h * scale;
          return (
            <div key={v.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Preview */}
              <div
                style={{ width: 410, height: previewH, overflow: "hidden", position: "relative" }}
              >
                <div
                  style={{
                    width: w,
                    height: h,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <FBCoverCard
                    layout={v.layout}
                    divRef={(el) => {
                      coverRefs.current[i] = el;
                    }}
                  />
                </div>
                {/* Safe zone indikatori */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 20,
                    bottom: 0,
                    width: 1,
                    background: "rgba(204,0,0,0.3)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 20,
                    bottom: 0,
                    width: 1,
                    background: "rgba(204,0,0,0.3)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#6B6B6B" }}>{v.name}</div>
              <button
                onClick={async () => {
                  const el = coverRefs.current[i];
                  if (el) await exportEl(el, `rankly-fb-cover-${["a", "b", "c"][i]}.png`, w, h);
                }}
                style={{
                  background: "none",
                  border: "1px solid #2D2D2D",
                  color: "#6B6B6B",
                  padding: "7px 14px",
                  fontFamily: MONO,
                  fontSize: 11,
                  cursor: "pointer",
                  textAlign: "left",
                  width: 200,
                }}
              >
                ↓ PNG (1640×624)
              </button>
            </div>
          );
        })}
      </div>

      {/* ── IG HIGHLIGHTS ── */}
      {sectionHeader("IG HIGHLIGHTS", "1080×1080px master · IG apgriež uz 161×161px apaļi")}
      <div style={{ display: "flex", gap: 24 }}>
        {IG_HIGHLIGHTS.map((hl, i) => {
          const { w, h } = PROFILE_SIZES.ig_highlight_master;
          const scale = 120 / w;
          return (
            <div
              key={hl.id}
              style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}
            >
              {/* Preview apaļš */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: w,
                    height: h,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <HighlightCard
                    item={hl}
                    divRef={(el) => {
                      hlRefs.current[i] = el;
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#6B6B6B", textAlign: "center" }}>{hl.name}</div>
              <button
                onClick={async () => {
                  const el = hlRefs.current[i];
                  if (el) await exportEl(el, `rankly-ig-highlight-${hl.category}.png`, w, h);
                }}
                style={{
                  background: "none",
                  border: "1px solid #2D2D2D",
                  color: "#6B6B6B",
                  padding: "6px 10px",
                  fontFamily: MONO,
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                ↓ PNG
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
