import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

const EQ_BARS = [0, 1, 2, 3, 4];

export default function MuteButton() {
  const { playing, muted, toggleMuted } = useAudio();
  const active = playing && !muted;

  return (
    <button
      type="button"
      aria-label={muted ? "Unmute background music" : "Mute background music"}
      onClick={toggleMuted}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 cursor-pointer outline-none bg-transparent"
    >
      <span
        aria-hidden="true"
        className={`flex h-7 items-end gap-[3px] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-50"}`}
      >
        {EQ_BARS.map((_, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full bg-gold origin-bottom ${active ? "animate-eq h-full" : "h-[30%]"}`}
            style={
              active
                ? {
                    animationDelay: `${i * 0.13}s`,
                    animationDuration: `${0.65 + (i % 3) * 0.2}s`,
                  }
                : undefined
            }
          />
        ))}
      </span>
      <span className="text-gold transition-transform duration-200 group-hover:scale-110 group-active:scale-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </span>
    </button>
  );
}