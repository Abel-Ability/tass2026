import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const TRACKS = ["/audio/jingle_1.mp3", "/audio/jingle_2.mp3"];

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const trackIndexRef = useRef(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = false;
      audio.volume = 1;
      audio.preload = "auto";
      audio.src = TRACKS[0];
      audio.addEventListener("ended", () => {
        trackIndexRef.current = (trackIndexRef.current + 1) % TRACKS.length;
        audio.src = TRACKS[trackIndexRef.current];
        audio.play().catch(() => {});
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const start = useCallback(() => {
    const audio = ensureAudio();
    trackIndexRef.current = 0;
    audio.src = TRACKS[0];
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, [ensureAudio]);

  const toggleMuted = useCallback(() => {
    const audio = ensureAudio();
    setMuted((prev) => {
      audio.muted = !prev;
      return !prev;
    });
  }, [ensureAudio]);

  useEffect(() => {
    const startOnInteraction = () => {
      start();
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    document.addEventListener("pointerdown", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    return () => {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [start]);

  return (
    <AudioContext.Provider value={{ muted, playing, toggleMuted, start }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}