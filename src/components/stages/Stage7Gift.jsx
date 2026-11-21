import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, PartyPopper } from 'lucide-react';
import { sound } from '../../utils/audio';
import { triggerCelebration, triggerHeartBurst } from '../../utils/confetti';

export default function Stage7Gift({ config, onReplay }) {
  const [isOpened, setIsOpened] = useState(false);
  const msg = config.stage7.revealedMessage;

  const handleOpenGift = () => {
    if (isOpened) return;

    sound.playFanfare();
    setIsOpened(true);
    triggerCelebration();

    setTimeout(() => {
      triggerHeartBurst();
    }, 400);
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
          The Grand Finale 🎁
        </span>
        <h2 className="font-script text-2xl sm:text-4xl font-bold text-[#8B1538] mt-0.5">
          {config.stage7.heading}
        </h2>
        <p className="text-[10px] sm:text-xs text-[#8B1538]/70 font-medium mt-0.5">
          {isOpened ? 'A final wish, wrapped with all my heart' : config.stage7.subtitle}
        </p>
      </motion.div>

      {/* 2. Interactive Gift Box / Finale Message */}
      <div className="relative w-full max-w-xs sm:max-w-md flex flex-col items-center justify-center my-0.5 shrink min-h-0">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed-gift"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -5, 0],
              }}
              transition={{
                y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpenGift}
              className="relative cursor-pointer flex flex-col items-center group select-none my-1"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 z-30 bg-[#FF3B78] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{config.stage7.boxBadge}</span>
              </motion.div>

              <div className="w-36 h-36 sm:w-46 sm:h-46 relative flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
                  <defs>
                    <linearGradient id="giftBodyM" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4081" />
                      <stop offset="60%" stopColor="#E91E63" />
                      <stop offset="100%" stopColor="#C2185B" />
                    </linearGradient>
                    <linearGradient id="giftLidM" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF80AB" />
                      <stop offset="100%" stopColor="#F50057" />
                    </linearGradient>
                    <linearGradient id="goldRibM" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="50%" stopColor="#FFD54F" />
                      <stop offset="100%" stopColor="#FFA000" />
                    </linearGradient>
                  </defs>

                  <rect x="35" y="75" width="130" height="105" rx="8" fill="url(#giftBodyM)" stroke="#AD1457" strokeWidth="2" />
                  <rect x="88" y="75" width="24" height="105" fill="url(#goldRibM)" />
                  <rect x="35" y="115" width="130" height="24" fill="url(#goldRibM)" />

                  <g className="group-hover:-translate-y-1.5 transition-transform duration-300">
                    <rect x="25" y="52" width="150" height="26" rx="6" fill="url(#giftLidM)" stroke="#880E4F" strokeWidth="2" />
                    <rect x="88" y="52" width="24" height="26" fill="url(#goldRibM)" />
                    <g transform="translate(100, 52)">
                      <path d="M 0 0 C -35 -35 -45 5 -5 -2 Z" fill="url(#goldRibM)" stroke="#FF8F00" strokeWidth="1.5" />
                      <path d="M 0 0 C 35 -35 45 5 5 -2 Z" fill="url(#goldRibM)" stroke="#FF8F00" strokeWidth="1.5" />
                      <ellipse cx="0" cy="0" rx="10" ry="7" fill="#FFA000" />
                    </g>
                  </g>
                </svg>
              </div>

              <span className="mt-1 text-[11px] sm:text-xs font-bold text-[#8B1538] group-hover:text-[#FF3B78] transition-colors">
                Tap to unwrap your surprise! ✨
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="opened-wish"
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="w-full bg-[#FFFDF9] rounded-2xl p-3.5 sm:p-5 shadow-lg border-2 border-pink-300 text-center relative overflow-hidden my-0.5"
            >
              <div className="flex justify-center items-center gap-1.5 mb-1">
                <PartyPopper className="w-4 h-4 text-amber-500 animate-bounce" />
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                <Sparkles className="w-4 h-4 text-[#FF3B78] animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <h3 className="font-script text-xl sm:text-3xl font-bold text-[#FF3B78] mb-1 leading-tight">
                {msg.title}
              </h3>

              <div className="space-y-1.5 my-2">
                <p className="font-cute text-base sm:text-xl text-[#8B1538]">
                  {msg.main}
                </p>
                <p className="text-[11px] sm:text-xs text-[#8B1538]/85 font-medium leading-relaxed max-w-xs mx-auto">
                  {msg.sub}
                </p>
                {msg.toast && (
                  <p className="font-handwriting text-base sm:text-xl text-[#FF3B78] font-bold">
                    {msg.toast}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-pink-200/80 mt-2">
                <p className="text-[10px] text-[#8B1538]/70 font-semibold mb-1.5">
                  Made with lots of love by {config.sender.name} ❤️
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    sound.playClick();
                    onReplay();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 mx-auto cursor-pointer border border-white/60"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{config.stage7.replayButtonText}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
