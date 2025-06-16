import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, poster, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    // Initialize player
    const player = videojs(
      videoElement,
      {
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        poster: poster || '',
        sources: [
          {
            src,
            type: 'video/mp4',
          },
        ],
      },
      () => {
        if (onReady) onReady(player);
      }
    );

    playerRef.current = player;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
      }
    };
  }, [src, poster]);

  return (
    <div data-vjs-player className="w-full">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default VideoPlayer;
