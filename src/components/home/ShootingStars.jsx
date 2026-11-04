import React from "react";

const shootingStars = [
  // Right-to-left streaks
  { top: "6%", right: "3%", width: 260, angle: 148, delay: "0s", duration: "14s", travel: 420, height: 3, head: 6 },
  { top: "22%", right: "22%", width: 190, angle: 138, delay: "3.2s", duration: "18s", travel: 360, height: 2, head: 5 },
  { top: "2%", right: "46%", width: 300, angle: 156, delay: "6.8s", duration: "16s", travel: 460, height: 3, head: 7 },
  { top: "34%", right: "10%", width: 180, angle: 132, delay: "10.4s", duration: "21s", travel: 340, height: 2, head: 5 },
  { top: "14%", right: "68%", width: 240, angle: 150, delay: "13.1s", duration: "19s", travel: 400, height: 3, head: 6 },

  // Left-to-right streaks
  { top: "10%", left: "2%", width: 220, angle: 32, delay: "1.6s", duration: "17s", travel: 380, height: 2, head: 6 },
  { top: "28%", left: "18%", width: 280, angle: 22, delay: "5.2s", duration: "15s", travel: 440, height: 3, head: 7 },
  { top: "40%", left: "4%", width: 170, angle: 44, delay: "8.7s", duration: "20s", travel: 320, height: 2, head: 5 },
  { top: "18%", left: "42%", width: 210, angle: 36, delay: "12.4s", duration: "18s", travel: 360, height: 2, head: 6 },
  { top: "4%", left: "30%", width: 250, angle: 28, delay: "15.8s", duration: "16s", travel: 410, height: 3, head: 6 },

  // Steep and near-horizontal crossings
  { top: "2%", left: "56%", width: 230, angle: 112, delay: "4.1s", duration: "22s", travel: 380, height: 3, head: 6 },
  { top: "8%", left: "76%", width: 190, angle: 126, delay: "9.6s", duration: "20s", travel: 340, height: 2, head: 5 },
  { top: "24%", right: "2%", width: 320, angle: 174, delay: "7.3s", duration: "23s", travel: 480, height: 2, head: 6 },
  { top: "36%", left: "0%", width: 300, angle: 8, delay: "17.2s", duration: "24s", travel: 460, height: 2, head: 6 },
];

export default function ShootingStars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {shootingStars.map((star, index) => (
        <span
          key={index}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            width: `${star.width}px`,
            "--star-angle": `${star.angle}deg`,
            "--star-travel": `${star.travel}px`,
            "--star-height": `${star.height}px`,
            "--star-head": `${star.head}px`,
            "--star-delay": star.delay,
            "--star-duration": star.duration,
          }}
        />
      ))}
    </div>
  );
}
