import { Composition } from 'remotion';
import { VideoComposition } from './VideoComposition';
import { VIDEOS } from '../video/videoData';

export const RemotionRoot = () => (
  <>
    {VIDEOS.map((video) => (
      <Composition
        key={video.id}
        id={`Video${video.id}`}
        component={VideoComposition}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ videoId: video.id }}
      />
    ))}
  </>
);
