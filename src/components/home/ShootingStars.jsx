import React from "react";

const shootingStars = [
  { top: "8%", right: "4%", width: 150, delay: "0s", duration: "16s" },
  { top: "18%", right: "26%", width: 110, delay: "2.2s", duration: "19s" },
  { top: "4%", right: "48%", width: 170, delay: "5.4s", duration: "17s" },
  { top: "30%", right: "12%", width: 100, delay: "8.1s", duration: "21s" },
  { top: "12%", right: "64%", width: 130, delay: "11.6s", duration: "18s" },
  { top: "38%", right: "38%", width: 120, delay: "14.3s", duration: "20s" },
];

export default function ShootingStars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {shootingStars.map((star) => (
        <span
          key={`${star.top}-${star.right}`}
          className="shooting-star"
          style={{
            top: star.top,
            right: star.right,
            width: `${star.width}px`,
            "--star-delay": star.delay,
            "--star-duration": star.duration,
          }}
        />
      ))}
    </div>
  );
}
