import { useCurrentFrame } from 'remotion';
import type { VideoFrame } from '../../video/videoData';

interface Props {
  frames: VideoFrame[];
  startFrame: number;
}

export const TextAnimation = ({ frames, startFrame }: Props) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;
  if (relFrame < 0) return null;

  let elapsed = 0;
  let activeFrameData: VideoFrame | null = null;
  let charsToShow = 0;

  for (const f of frames) {
    const durationFrames = (f.endSec - f.startSec) * 30;
    const pauseFrames = 20;
    if (relFrame < elapsed + durationFrames) {
      activeFrameData = f;
      charsToShow = Math.min((relFrame - elapsed) * 3, f.text.length);
      break;
    }
    elapsed += durationFrames + pauseFrames;
  }

  if (!activeFrameData) return null;

  const visibleText = activeFrameData.text.slice(0, charsToShow);
  const lines = visibleText.split('\n');
  const isTyping = charsToShow < activeFrameData.text.length;
  const justifyMap = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

  return (
    <div style={{
      position: 'absolute', inset: 0, padding: 80,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      alignItems: justifyMap[activeFrameData.align],
      fontFamily: activeFrameData.font === 'mono' ? "'Courier New', monospace" : "'Helvetica Neue', sans-serif",
      fontSize: activeFrameData.fontSize,
      color: activeFrameData.color,
      textAlign: activeFrameData.align,
      lineHeight: 1.2,
      letterSpacing: activeFrameData.fontSize > 80 ? '-0.02em' : '0',
    }}>
      {lines.map((line, i) => (
        <div key={i}>
          {line}
          {i === lines.length - 1 && isTyping && (
            <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0, color: '#C8FF00' }}>|</span>
          )}
        </div>
      ))}
    </div>
  );
};
