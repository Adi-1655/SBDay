import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';
import { triggerCelebration } from '../../utils/confetti';

export default function Stage3Candle({ config, onNext }) {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);

  const handleBlowOut = () => {
    if (isBlownOut) return;

    sound.playBlow();
    setIsBlownOut(true);
    setSmokeActive(true);

    setTimeout(() => {
      sound.playChime();
      triggerCelebration();
    }, 450);

    setTimeout(() => {
      setSmokeActive(false);
    }, 2500);
  };

  return (
    <div
      className={`h-full max-h-full flex flex-col items-center justify-between py-1 sm:py-3 px-2 sm:px-4 max-w-sm sm:max-w-md mx-auto text-center relative z-10 w-full overflow-hidden min-h-0 transition-colors duration-1000 ${
        isBlownOut ? 'bg-pink-100/30' : 'bg-slate-900/30 rounded-3xl p-3 shadow-xl backdrop-blur-xs'
      }`}
    >
      {!isBlownOut && (
        <div className="absolute inset-0 bg-radial from-amber-500/20 via-pink-900/30 to-black/40 rounded-3xl -z-10 pointer-events-none" />
      )}

      {/* 1. Heading */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="my-0.5"
      >
        <span
          className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border transition-all ${
            isBlownOut
              ? 'bg-pink-100 text-[#FF3B78] border-pink-200'
              : 'bg-amber-400/20 text-amber-200 border-amber-300/40'
          }`}
        >
          {isBlownOut ? 'Wish Granted! ✨' : 'Tradition 🕯️'}
        </span>
        <h2
          className={`font-script text-2xl sm:text-4xl font-bold mt-0.5 transition-colors ${
            isBlownOut ? 'text-[#8B1538]' : 'text-amber-100 drop-shadow-md'
          }`}
        >
          {config.stage3.heading}
        </h2>
        <p
          className={`text-[11px] sm:text-xs font-medium mt-0.5 transition-colors ${
            isBlownOut ? 'text-[#8B1538]/80' : 'text-amber-200/90'
          }`}
        >
          {isBlownOut
            ? 'Your wish has flown into the cosmos!'
            : config.stage3.instruction}
        </p>
      </motion.div>

      {/* 2. Realistic Birthday Candle Scene (Compact for vertical fit) */}
      <div
        onClick={!isBlownOut ? handleBlowOut : undefined}
        className={`relative w-36 h-48 sm:w-48 sm:h-60 flex flex-col items-center justify-end my-1 shrink min-h-0 ${
          !isBlownOut ? 'cursor-pointer group' : ''
        }`}
        title={!isBlownOut ? 'Tap to blow out the candle!' : ''}
      >
        {!isBlownOut && (
          <motion.div
            animate={{
              scale: [1, 1.15, 0.95, 1.08, 1],
              opacity: [0.6, 0.85, 0.55, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-2 w-32 h-32 bg-radial from-amber-300/70 via-orange-400/30 to-transparent rounded-full blur-xl pointer-events-none"
          />
        )}

        <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-xl overflow-visible">
          <ellipse cx="80" cy="205" rx="55" ry="12" fill="#E2E8F0" opacity="0.8" />
          <ellipse cx="80" cy="200" rx="45" ry="9" fill="#FFF0F5" stroke="#F48FB1" strokeWidth="2" />
          <rect
            x="64"
            y="90"
            width="32"
            height="110"
            rx="6"
            fill="#FFF5F7"
            stroke="#FFB6C1"
            strokeWidth="2.5"
          />
          <path d="M 64 110 L 96 125" stroke="#FF4081" strokeWidth="4" strokeLinecap="round" />
          <path d="M 64 135 L 96 150" stroke="#FF4081" strokeWidth="4" strokeLinecap="round" />
          <path d="M 64 160 L 96 175" stroke="#FF4081" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="80" cy="90" rx="16" ry="5" fill="#FFE4E9" stroke="#FF80AB" strokeWidth="1.5" />
          <path d="M 68 93 Q 66 115 69 116 Q 72 115 71 94" fill="#FFE4E9" />
          <path
            d="M 80 90 Q 78 78 82 72"
            fill="none"
            stroke={isBlownOut ? '#616161' : '#212121'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {!isBlownOut && (
            <g className="animate-flame group-hover:scale-110 transition-transform" style={{ transformOrigin: '80px 72px' }}>
              <path d="M 80 32 C 68 50 68 68 80 72 C 92 68 92 50 80 32 Z" fill="#FF9800" />
              <path d="M 80 40 C 72 54 72 68 80 71 C 88 68 88 54 80 40 Z" fill="#FFEB3B" />
              <path d="M 80 50 C 76 58 76 68 80 70 C 84 68 84 58 80 50 Z" fill="#FFFFFF" />
            </g>
          )}

          {isBlownOut && (
            <g>
              <circle cx="81" cy="70" r="3" fill="#BDBDBD" className="animate-smoke" style={{ animationDelay: '0.1s' }} />
              <circle cx="82" cy="65" r="4" fill="#9E9E9E" className="animate-smoke" style={{ animationDelay: '0.3s' }} />
              <circle cx="79" cy="58" r="6" fill="#757575" className="animate-smoke" style={{ animationDelay: '0.6s' }} />
              <circle cx="83" cy="50" r="8" fill="#616161" className="animate-smoke" style={{ animationDelay: '0.9s' }} />
            </g>
          )}
        </svg>

        {!isBlownOut && (
          <span className="text-[10px] font-semibold text-amber-200/80 mt-0.5 pointer-events-none">
            (Tap candle or button below)
          </span>
        )}
      </div>

      {/* 3. Blow Controls Section / Revealed Wish */}
      <div className="w-full max-w-xs sm:max-w-sm my-0.5">
        {!isBlownOut ? (
          <div className="w-full flex flex-col items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowOut}
              className="w-full py-2.5 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-[#FF3B78] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-400/50 flex items-center justify-center gap-2 border border-white/60 cursor-pointer animate-pulse-glow"
            >
              <Wind className="w-4 h-4 animate-pulse" />
              <span>Blow the Candle 💨</span>
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border-2 border-pink-300 shadow-xl flex flex-col items-center"
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#FF3B78] mb-1 shadow-2xs">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <h3 className="font-script text-lg sm:text-2xl font-bold text-[#8B1538]">
              {config.stage3.wishRevealedTitle}
            </h3>

            <p className="text-[11px] sm:text-xs text-[#8B1538]/85 font-medium mt-1 leading-snug">
              "{config.stage3.wishRevealedMessage}"
            </p>

            <p className="text-[10px] text-[#FF3B78] font-bold mt-1.5 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Event Completed! Candle blown & wish sent 🌟
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sound.playClick();
                onNext();
              }}
              className="mt-1 w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 border border-white/60 animate-pulse-glow cursor-pointer"
            >
              <span>{config.stage3.nextButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
