import { useEffect, useRef, useState } from "react";
import { VIDEO } from "./videoStyles";
import type { VideoData, VideoFrame } from "./videoData";

interface VideoPlayerProps {
  videoData: VideoData;
  isPlaying: boolean;
}

function AnimatedText({ frame, frameKey }: { frame: VideoFrame; frameKey: string }) {
  const lines = frame.text.split("\n");
  return (
    <div
      key={frameKey}
      style={{
        fontFamily: frame.font === "mono" ? VIDEO.fonts.mono : VIDEO.fonts.sans,
        fontSize: frame.fontSize,
        color: frame.color,
        textAlign: frame.align,
        lineHeight: 1.15,
        letterSpacing: frame.fontSize > 80 ? "-0.02em" : "0",
        animation: "videoSlideUp 0.5s ease forwards",
        width: "100%",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ minHeight: "1em" }}>
          {line || " "}
        </div>
      ))}
    </div>
  );
}

export function VideoPlayer({ videoData, isPlaying }: VideoPlayerProps) {
  const [currentSec, setCurrentSec] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCurrentSec(0);
  }, [videoData.id]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSec((prev) => {
          const next = +(prev + 0.1).toFixed(1);
          if (next >= VIDEO.duration) {
            clearInterval(intervalRef.current!);
            return VIDEO.duration;
          }
          return next;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, videoData.id]);

  // Thumbnail opacity: 0-3s fade in, 3-5s hold, 5-7s fade out
  let thumbnailOpacity = 0;
  if (currentSec < 3) thumbnailOpacity = currentSec / 3;
  else if (currentSec < 5) thumbnailOpacity = 1;
  else if (currentSec < 7) thumbnailOpacity = 1 - (currentSec - 5) / 2;

  // Fade to black overlay 28-30s
  const fadeToBlackOpacity = currentSec >= 28 ? (currentSec - 28) / 2 : 0;

  // Active frame
  const activeFrame: VideoFrame | undefined = videoData.frames.find(
    (f) => currentSec >= f.startSec && currentSec < f.endSec,
  );

  const displaySec = Math.floor(currentSec);
  const mm = String(Math.floor(displaySec / 60)).padStart(2, "0");
  const ss = String(displaySec % 60).padStart(2, "0");

  const justifyMap = { left: "flex-start", center: "center", right: "flex-end" } as const;
  const justify = activeFrame ? justifyMap[activeFrame.align] : "flex-start";
  const padLeft = activeFrame?.align === "left" ? 80 : 0;
  const padRight = activeFrame?.align === "right" ? 80 : 0;

  return (
    <div
      style={{
        width: VIDEO.width,
        height: VIDEO.height,
        position: "relative",
        background: VIDEO.colors.bg,
        overflow: "hidden",
      }}
    >
      {/* Thumbnail */}
      <img
        src={`/thumbnails/${videoData.thumbnail}`}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: thumbnailOpacity,
          transition: "opacity 0.1s",
        }}
      />

      {/* Fade to black */}
      {fadeToBlackOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0A0A0A",
            opacity: fadeToBlackOpacity,
          }}
        />
      )}

      {/* Text */}
      {activeFrame && thumbnailOpacity < 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: justify,
            paddingLeft: padLeft,
            paddingRight: padRight,
            paddingTop: 80,
            paddingBottom: 80,
            boxSizing: "border-box",
          }}
        >
          <AnimatedText frame={activeFrame} frameKey={`${videoData.id}-${activeFrame.startSec}`} />
        </div>
      )}

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#1A1A1A",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(currentSec / VIDEO.duration) * 100}%`,
            background: VIDEO.colors.accent,
          }}
        />
      </div>

      {/* Timer */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 12,
          fontFamily: VIDEO.fonts.mono,
          fontSize: 18,
          color: "#2D2D2D",
          letterSpacing: "0.1em",
        }}
      >
        {mm}:{ss}
      </div>
    </div>
  );
}
