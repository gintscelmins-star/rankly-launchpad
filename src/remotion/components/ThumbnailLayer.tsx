import { Img, staticFile, useCurrentFrame } from 'remotion';

export const ThumbnailLayer = ({ thumbnailSrc }: { thumbnailSrc: string }) => {
  const frame = useCurrentFrame();
  const isVisible = (frame >= 45 && frame < 52) || (frame >= 58 && frame < 65);
  if (!isVisible) return null;
  return (
    <Img
      src={staticFile(`thumbnails/${thumbnailSrc}`)}
      style={{ position: 'absolute', inset: 0, width: 1080, height: 1080, objectFit: 'cover' }}
    />
  );
};
