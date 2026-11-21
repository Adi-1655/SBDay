import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';
import { triggerBalloonBurst, triggerCelebration } from '../../utils/confetti';

export default function Stage2Balloons({ config, onNext }) {
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const balloons = config.stage2.balloons;
  const isAllPopped = poppedBalloons.length === balloons.length;

  const handleBalloonClick = (e, balloon) => {
    if (poppedBalloons.includes(balloon.id)) return;

    sound.playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    triggerBalloonBurst(centerX, centerY);

    const updated = [...poppedBalloons, balloon.id];
    setPoppedBalloons(updated);

    if (updated.length === balloons.length) {
      setTimeout(() => {
        sound.playChime();
        triggerCelebration();
      }, 350);
    }
  };

  const handleNextClick = () => {
    sound.playClick();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-full py-1 sm:py-3 px-2 sm:px-4 max-w-sm sm:max-w-md mx-auto text-center relative z-10 w-full overflow-hidden min-h-0">
      {/* 1. Header */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="my-0.5"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FF3B78] font-bold bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-200">
          Surprise Game 🎈
        </span>
        <h2 className="font-script text-2xl sm:text-4xl font-bold text-[#8B1538] mt-0.5">
          {config.stage2.heading}
        </h2>
        <p className="text-[11px] sm:text-xs text-[#8B1538]/80 font-medium mt-0.5">
          {config.stage2.subtitle}
        </p>
      </motion.div>

      {/* 2. Popped Count Pill */}
      <div className="flex items-center gap-1.5 my-0.5 text-[11px] sm:text-xs font-semibold text-[#8B1538] bg-white/80 px-3 py-0.5 rounded-full border border-pink-200 shadow-2xs">
        <span>Popped:</span>
        <span className="text-[#FF3B78] font-bold">
          {poppedBalloons.length} / {balloons.length}
        </span>
      </div>

      {/* 3. Single-row 4 Balloons Grid (Fits fully on mobile screens without vertical stacking) */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-xs sm:max-w-md my-1 items-end justify-items-center">
        {balloons.map((b, idx) => {
          const isPopped = poppedBalloons.includes(b.id);

          return (
            <div key={b.id} className="flex flex-col items-center w-full">
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  <motion.button
                    layout
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, -6, 0],
                      rotate: [0, idx % 2 === 0 ? 3 : -3, 0],
                    }}
                    exit={{
                      scale: [1, 1.2, 0],
                      opacity: [1, 0.8, 0],
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      scale: { duration: 0.4, delay: b.delay },
                      y: {
                        duration: 3 + (idx % 3) * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.3,
                      },
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.2,
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleBalloonClick(e, b)}
                    className="relative cursor-pointer group focus:outline-none"
                    title="Click to pop!"
                  >
                    <div className="relative w-16 h-22 sm:w-22 sm:h-30 flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 130"
                        className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all"
                      >
                        <defs>
                          <radialGradient id={`gloss-${b.id}`} cx="35%" cy="30%" r="60%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                          </radialGradient>
                        </defs>

                        <path
                          d="M 50 5 C 18 5 8 38 12 68 C 16 94 40 108 48 114 L 46 120 L 54 120 L 52 114 C 60 108 84 94 88 68 C 92 38 82 5 50 5 Z"
                          style={{ fill: b.glow }}
                        />
                        <path
                          d="M 50 5 C 18 5 8 38 12 68 C 16 94 40 108 48 114 L 46 120 L 54 120 L 52 114 C 60 108 84 94 88 68 C 92 38 82 5 50 5 Z"
                          fill={`url(#gloss-${b.id})`}
                        />
                        <path
                          d="M 50 120 Q 42 135 52 145 T 48 160"
                          fill="none"
                          stroke="#E0E0E0"
                          strokeWidth="2"
                        />
                      </svg>

                      <span className="absolute text-white/95 text-[10px] sm:text-xs font-bold pointer-events-none drop-shadow">
                        Tap!
                      </span>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-16 h-18 sm:w-22 sm:h-24 rounded-xl bg-white border-2 border-pink-300 shadow-md flex flex-col items-center justify-center p-1 transform rotate-1"
                  >
                    <span className="text-sm">✨</span>
                    <span className="font-handwriting text-sm sm:text-lg font-bold text-[#8B1538] mt-0.5">
                      {b.word}
                    </span>
                    <span className="text-[8px] text-pink-500 font-semibold uppercase tracking-wider">
                      #{b.id}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 4. Completion Card / Gated Next Button */}
      <div className="w-full max-w-xs sm:max-w-sm my-1">
        <AnimatePresence>
          {isAllPopped ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border-2 border-pink-300 shadow-lg flex flex-col items-center"
            >
              <div className="flex items-center gap-1.5 text-pink-500 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <Heart className="w-3.5 h-3.5 fill-pink-500" />
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <h3 className="font-script text-lg sm:text-2xl font-bold text-[#8B1538]">
                "{config.stage2.completeMessage}"
              </h3>

              <p className="text-[11px] sm:text-xs text-[#8B1538]/80 font-medium mt-0.5">
                {config.stage2.subMessage}
              </p>

              <p className="text-[10px] text-[#FF3B78] font-bold mt-1.5 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Event Completed! All balloons popped ✨
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNextClick}
                className="mt-1 w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 border border-white/60 animate-pulse-glow cursor-pointer"
              >
                <span>{config.stage2.nextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] sm:text-[11px] text-[#8B1538]/70 font-semibold bg-white/70 px-3 py-1 rounded-full border border-pink-200"
            >
              🔒 Pop remaining {balloons.length - poppedBalloons.length} balloon(s) to unlock the next surprise!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
