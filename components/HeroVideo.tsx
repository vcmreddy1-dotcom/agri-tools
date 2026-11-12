"use client";

import React, { useRef, useEffect } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry playback on user interaction if browser policy requires it
        });
      }
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover object-center bg-stone-900"
    >
      <source src="/videos/hero-machinery.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

