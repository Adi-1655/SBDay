import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects({ activeStage }) {
  const floatingElements = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + 2) % 96}%`,
      size: 14 + (i % 5) * 6,
      duration: 10 + (i % 6) * 3,
      delay: (i * 0.7) % 7,
      type: i % 4 === 0 ? 'sparkle' : i % 3 === 0 ? 'star' : i % 2 === 0 ? 'rose' : 'heart',
      opacity: 0.25 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />

      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute select-none"
          style={{
            left: el.left,
            bottom: '-40px',
            fontSize: `${el.size}px`,
            opacity: el.opacity,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, (el.id % 2 === 0 ? 25 : -25), 0],
            rotate: [0, el.id % 2 === 0 ? 45 : -45, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {el.type === 'heart' && (
            <svg
              className="w-5 h-5 text-pink-400 fill-pink-300 drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {el.type === 'star' && (
            <span className="text-amber-300/80 filter drop-shadow">✨</span>
          )}

          {el.type === 'rose' && activeStage >= 4 && (
            <span className="text-rose-400/70 text-sm">🌸</span>
          )}

          {el.type === 'sparkle' && (
            <span className="text-pink-300/80">💖</span>
          )}
        </motion.div>
      ))}

      {activeStage === 4 && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              className="absolute text-rose-500/60 select-none text-lg"
              style={{
                left: `${(i * 8.5) % 95}%`,
                top: '-30px',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (i % 2 === 0 ? 40 : -40), 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 7 + (i % 4) * 2,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🥀
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
