import { useState } from "react";
import { VIDEOS } from "./videoData";
import { VideoPlayer } from "./VideoPlayer";
import { VIDEO } from "./videoStyles";

export function VideoGenerator() {
  const [activeId, setActiveId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  const activeVideo = VIDEOS.find((v) => v.id === activeId)!;

  const switchTab = (id: number) => {
    setActiveId(id);
    setIsPlaying(false);
    setPlayerKey((k) => k + 1);
  };

  const reset = () => {
    setIsPlaying(false);
    setPlayerKey((k) => k + 1);
  };

  const SCALE = 0.5;
  const previewPx = VIDEO.width * SCALE;

  return (
    <div
      style={{
        background: "#1A1A1A",
        minHeight: "100vh",
        padding: 40,
        fontFamily: VIDEO.fonts.mono,
        color: "#E8E8E8",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 36,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 15,
            color: VIDEO.colors.accent,
            letterSpacing: "0.2em",
            fontWeight: "normal",
          }}
        >
          RANKLY / IG VIDEO ĢENERATORS
        </h1>
        <span style={{ fontSize: 12, color: VIDEO.colors.muted }}>9 × 30 sek × 1080×1080px</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #2D2D2D", marginBottom: 32 }}>
        {VIDEOS.map((v) => (
          <button
            key={v.id}
            onClick={() => switchTab(v.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom:
                activeId === v.id ? `2px solid ${VIDEO.colors.accent}` : "2px solid transparent",
              marginBottom: -1,
              padding: "10px 18px",
              fontFamily: VIDEO.fonts.mono,
              fontSize: 13,
              color: activeId === v.id ? VIDEO.colors.accent : VIDEO.colors.muted,
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {v.id}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        {/* Preview */}
        <div
          style={{
            width: previewPx,
            height: previewPx,
            flexShrink: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: VIDEO.width,
              height: VIDEO.height,
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
          >
            <VideoPlayer
              key={`${activeId}-${playerKey}`}
              videoData={activeVideo}
              isPlaying={isPlaying}
            />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 4 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              style={{
                background: isPlaying ? "#2D2D2D" : VIDEO.colors.accent,
                color: isPlaying ? VIDEO.colors.accent : "#0A0A0A",
                border: "none",
                padding: "12px 28px",
                fontFamily: VIDEO.fonts.mono,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
            </button>
            <button
              onClick={reset}
              style={{
                background: "none",
                color: VIDEO.colors.muted,
                border: "1px solid #2D2D2D",
                padding: "12px 20px",
                fontFamily: VIDEO.fonts.mono,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              RESET
            </button>
          </div>

          <div style={{ fontSize: 12, color: VIDEO.colors.muted, lineHeight: 1.9 }}>
            <div>Video {activeId} / 9</div>
            <div style={{ color: "#3A3A3A" }}>Thumbnail: {activeVideo.thumbnail}</div>
          </div>

          <div style={{ borderTop: "1px solid #2D2D2D", paddingTop: 20 }}>
            <div
              style={{ fontSize: 11, color: "#4A4A4A", letterSpacing: "0.15em", marginBottom: 12 }}
            >
              SCREEN RECORDING
            </div>
            <div style={{ fontSize: 12, color: VIDEO.colors.muted, lineHeight: 2.1 }}>
              1. Atver šo lapu full screen (F11)
              <br />
              2. OBS vai Windows Game Bar (Win+G)
              <br />
              3. Record 1080×1080px reģionu
              <br />
              4. PLAY → ieraksti 30 sek
              <br />
              5. Saglabā kā MP4
            </div>
          </div>

          <div style={{ borderTop: "1px solid #2D2D2D", paddingTop: 20 }}>
            <div
              style={{ fontSize: 11, color: "#4A4A4A", letterSpacing: "0.15em", marginBottom: 10 }}
            >
              IG SECĪBA
            </div>
            <div style={{ fontSize: 13, color: VIDEO.colors.muted, letterSpacing: "0.05em" }}>
              9→8→7→6→5→4→3→2→1
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #2D2D2D",
              paddingTop: 20,
              fontSize: 11,
              color: "#3A3A3A",
              lineHeight: 1.8,
            }}
          >
            Thumbnails: public/thumbnails/
            <br />
            Eksportē no /mozaika → LE CERCLE ROUGE
          </div>
        </div>
      </div>
    </div>
  );
}
