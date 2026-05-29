import { interpolate, useCurrentFrame } from 'remotion';

export const RedCircleDraw = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const circumference = 2 * Math.PI * 480;
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0 }}>
      <circle
        cx={540} cy={540} r={480}
        fill="none"
        stroke="#CC0000"
        strokeWidth={8}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 540 540)"
      />
    </svg>
  );
};
