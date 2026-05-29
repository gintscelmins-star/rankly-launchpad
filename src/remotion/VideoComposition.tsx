import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { VIDEOS } from '../video/videoData';
import { RedCircleDraw } from './components/RedCircleDraw';
import { ThumbnailLayer } from './components/ThumbnailLayer';
import { TextAnimation } from './components/TextAnimation';

interface Props extends Record<string, unknown> { videoId: number; }

export const VideoComposition = ({ videoId }: Props) => {
  const frame = useCurrentFrame();
  const video = VIDEOS.find(v => v.id === videoId)!;

  const opacity = interpolate(frame, [870, 900], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#0A0A0A', opacity }}>
      {frame <= 75 && <RedCircleDraw />}
      <ThumbnailLayer thumbnailSrc={video.thumbnail} />
      <TextAnimation frames={video.frames} startFrame={75} />
    </AbsoluteFill>
  );
};
