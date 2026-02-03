import { useEffect, useState } from "react";
import "./HeartConfetti.css";

export default function HeartConfetti({ trigger }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const newHearts = Array.from({ length: 20 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
    }));

    setHearts(newHearts);

    const timer = setTimeout(() => setHearts([]), 2000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="confetti-container">
      {hearts.map(h => (
        <div
          key={h.id}
          className="confetti-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
}
