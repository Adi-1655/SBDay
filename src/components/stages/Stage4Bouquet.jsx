import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Check, Lock } from 'lucide-react';
import { sound } from '../../utils/audio';
import { triggerRoseShower } from '../../utils/confetti';

export default function Stage4Bouquet({ config, onNext }) {
  const messages = config.stage4.messages;
  const [openedCardIds, setOpenedCardIds] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const isAllOpened = openedCardIds.length === messages.length;

  const handleCardClick = (msg) => {
    sound.playClick();
    setSelectedMessage(msg);

    if (!openedCardIds.includes(msg.id)) {
      const updated = [...openedCardIds, msg.id];
      setOpenedCardIds(updated);

      if (updated.length === messages.length) {
        setTimeout(() => {
          triggerRoseShower();
          sound.playChime();
        }, 300);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-full py-1 sm:py-2 px-2 sm:px-3 max-w-sm sm:max-w-md mx-auto text-center relative z-10 w-full overflow-hidden min-h-0">
      {/* 1. Heading */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="my-0.5"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FF3B78] font-bold bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-200">
          A Gift of Love 💐
        </span>
        <h2 className="font-script text-2xl sm:text-3xl font-bold text-[#8B1538] mt-0.5">
          {config.stage4.heading}
        </h2>
      </motion.div>

      {/* 2. Progress pill indicator */}
      <div className="flex items-center gap-1.5 my-0.5 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs transition-all bg-white/85 border-pink-200 text-[#8B1538]">
        {isAllOpened ? (
          <span className="flex items-center gap-1 text-[#FF3B78] font-bold">
            <Sparkles className="w-3 h-3" />
            All 5 love notes opened! 🌹
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 text-pink-500" />
            <span>Tap each rose note:</span>
            <span className="font-bold text-[#FF3B78]">
              {openedCardIds.length} / {messages.length}
            </span>
          </span>
        )}
      </div>

      {/* 3. TAPPED MESSAGE BOX (UPSIDE: Instant One-Screen View on Mobile) */}
      <div className="w-full max-w-xs min-h-[42px] flex items-center justify-center my-0.5 z-20">
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              className="w-full bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-pink-300 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-left min-w-0">
                <span className="text-lg shrink-0">{selectedMessage.icon}</span>
                <span className="font-handwriting text-sm sm:text-base text-[#8B1538] font-bold leading-tight break-words">
                  "{selectedMessage.text}"
                </span>
              </div>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse shrink-0 ml-1.5" />
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] sm:text-[11px] text-[#8B1538]/70 font-medium italic bg-white/70 px-3 py-0.5 rounded-full border border-pink-200"
            >
              ✨ Tap any rose note below to read ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Center Rose Bouquet Illustration (Responsively scaled for mobile) */}
      <div className="relative w-full max-w-[150px] sm:max-w-[190px] h-[105px] sm:h-[140px] flex items-center justify-center my-0.5 shrink min-h-0">
        <div className="absolute inset-0 bg-radial from-rose-200/50 via-pink-100/30 to-transparent rounded-full blur-xl -z-10" />

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-28 h-36 sm:w-38 sm:h-48 relative flex items-center justify-center"
        >
          <svg viewBox="0 0 300 360" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="roseRedM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF1744" />
                <stop offset="60%" stopColor="#D50000" />
                <stop offset="100%" stopColor="#880E4F" />
              </linearGradient>
              <linearGradient id="rosePinkM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4081" />
                <stop offset="100%" stopColor="#C2185B" />
              </linearGradient>
              <linearGradient id="leafGreenM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#66BB6A" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
              <linearGradient id="wrapPaperM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3E0" />
                <stop offset="50%" stopColor="#FFE0B2" />
                <stop offset="100%" stopColor="#FFCC80" />
              </linearGradient>
              <linearGradient id="goldRibbonM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#FFD54F" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>

            <path d="M 90 190 L 150 330 L 210 190 Z" fill="url(#wrapPaperM)" stroke="#D7CCC8" strokeWidth="2" />
            <path d="M 50 140 Q 100 170 150 175 Q 80 230 150 330 Q 50 200 50 140 Z" fill="#FFE0B2" opacity="0.9" />
            <path d="M 250 140 Q 200 170 150 175 Q 220 230 150 330 Q 250 200 250 140 Z" fill="#FFCC80" opacity="0.9" />

            <g transform="translate(150, 240)">
              <ellipse cx="0" cy="0" rx="14" ry="7" fill="url(#goldRibbonM)" />
              <path d="M 0 0 C -25 -25 -35 5 -10 3 Z" fill="url(#goldRibbonM)" stroke="#FF8F00" strokeWidth="1" />
              <path d="M 0 0 C 25 -25 35 5 10 3 Z" fill="url(#goldRibbonM)" stroke="#FF8F00" strokeWidth="1" />
              <path d="M -5 3 Q -20 35 -15 55" stroke="#FFA000" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 5 3 Q 20 35 15 55" stroke="#FFA000" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>

            <g>
              <ellipse cx="80" cy="110" rx="22" ry="12" fill="url(#leafGreenM)" transform="rotate(-35 80 110)" />
              <ellipse cx="220" cy="110" rx="22" ry="12" fill="url(#leafGreenM)" transform="rotate(35 220 110)" />
              <ellipse cx="110" cy="70" rx="20" ry="10" fill="url(#leafGreenM)" transform="rotate(-50 110 70)" />
              <ellipse cx="190" cy="70" rx="20" ry="10" fill="url(#leafGreenM)" transform="rotate(50 190 70)" />
              <ellipse cx="150" cy="40" rx="18" ry="9" fill="url(#leafGreenM)" transform="rotate(-15 150 40)" />
            </g>

            <g transform="translate(150, 110)">
              <circle cx="0" cy="0" r="32" fill="url(#roseRedM)" />
              <path d="M -22 -10 C -15 -28 15 -28 22 -10 C 28 8 10 24 0 24 C -10 24 -28 8 -22 -10 Z" fill="#D50000" opacity="0.8" />
              <path d="M -16 -6 C -10 -20 10 -20 16 -6 C 20 6 6 18 0 18 C -6 18 -20 6 -16 -6 Z" fill="#B71C1C" />
              <circle cx="0" cy="0" r="4" fill="#FF80AB" />
            </g>
            <g transform="translate(100, 105)">
              <circle cx="0" cy="0" r="28" fill="url(#roseRedM)" />
              <circle cx="0" cy="0" r="10" fill="#FF5252" />
            </g>
            <g transform="translate(200, 105)">
              <circle cx="0" cy="0" r="28" fill="url(#roseRedM)" />
              <circle cx="0" cy="0" r="10" fill="#FF5252" />
            </g>
            <g transform="translate(150, 60)">
              <circle cx="0" cy="0" r="26" fill="url(#rosePinkM)" />
              <circle cx="0" cy="0" r="8" fill="#FF4081" />
            </g>
            <g transform="translate(125, 145)">
              <circle cx="0" cy="0" r="22" fill="url(#roseRedM)" />
            </g>
            <g transform="translate(175, 145)">
              <circle cx="0" cy="0" r="22" fill="url(#roseRedM)" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* 5. Mobile-Friendly Rose Note Cards Container */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-wrap justify-center gap-1 my-0.5 px-1">
        {messages.map((msg) => {
          const isOpened = openedCardIds.includes(msg.id);
          const isSelected = selectedMessage?.id === msg.id;

          return (
            <motion.button
              key={msg.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleCardClick(msg)}
              className={`cursor-pointer px-2 py-1 rounded-lg border text-[11px] sm:text-xs font-semibold transition-all shadow-2xs flex items-center gap-1 ${
                isSelected
                  ? 'bg-[#FF3B78] text-white border-pink-400 ring-2 ring-pink-300 shadow-xs scale-105'
                  : isOpened
                  ? 'bg-rose-50/95 text-[#8B1538] border-pink-300'
                  : 'bg-white/95 text-[#8B1538] border-pink-200 hover:bg-pink-100/90 animate-pulse'
              }`}
            >
              <span>{msg.icon}</span>
              <span className="truncate max-w-[130px] sm:max-w-none">{msg.text}</span>
              {isOpened && (
                <Check className="w-3 h-3 text-emerald-500 font-bold ml-0.5 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 6. Gated NEXT Button */}
      <div className="w-full max-w-xs my-0.5">
        <AnimatePresence>
          {isAllOpened ? (
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <p className="text-[10px] text-[#FF3B78] font-bold mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                All love notes collected ❤️
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 border border-white/60 animate-pulse-glow cursor-pointer"
              >
                <span>{config.stage4.nextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#8B1538]/70 font-semibold bg-white/70 px-3 py-0.5 rounded-full border border-pink-200"
            >
              🔒 Tap remaining {messages.length - openedCardIds.length} rose note(s) to unlock next surprise!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
