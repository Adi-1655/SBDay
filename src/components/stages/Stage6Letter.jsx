import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function Stage6Letter({ config, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const letter = config.stage6.letter;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    sound.playRustle();
    setIsOpen(true);
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
          Personal Letter 💌
        </span>
        <h2 className="font-script text-2xl sm:text-4xl font-bold text-[#8B1538] mt-0.5">
          {config.stage6.heading}
        </h2>
        <p className="text-[10px] sm:text-xs text-[#8B1538]/70 font-medium mt-0.5">
          {isOpen ? 'From the bottom of my heart' : config.stage6.subtitle}
        </p>
      </motion.div>

      {/* 2. Interactive Letter Area (Closed Envelope vs Opened Scrollable Letter) */}
      <div className="relative w-full max-w-xs sm:max-w-md flex flex-col items-center justify-center my-0.5 shrink min-h-0">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -10 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenEnvelope}
              className="w-full max-w-[240px] sm:max-w-[280px] h-44 sm:h-50 bg-gradient-to-b from-[#FFF5F7] to-[#FCE4EC] rounded-2xl border-2 border-pink-300 shadow-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group select-none my-1"
            >
              <div className="absolute top-0 left-0 right-0 h-22 sm:h-26 bg-[#FFE4E9] border-b-2 border-pink-300 transform -skew-y-2 origin-top-left" />
              <div className="absolute top-0 left-0 right-0 h-22 sm:h-26 bg-[#FFD6DF] border-b-2 border-pink-300 transform skew-y-2 origin-top-right" />

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF1744] to-[#C2185B] border-3 border-amber-300 shadow-md flex items-center justify-center text-white"
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow" />
              </motion.div>

              <div className="z-10 mt-2 text-center">
                <span className="font-handwriting text-lg sm:text-xl font-bold text-[#8B1538]">
                  {config.stage6.envelopeText}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-pink-500 font-semibold uppercase tracking-wider mt-0.5">
                  Tap wax seal to open
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-letter"
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ touchAction: 'pan-y' }}
              className="w-full max-h-[44dvh] overflow-y-auto overscroll-contain allow-scroll mobile-scroll bg-[#FFFDF9] rounded-2xl p-3 sm:p-5 shadow-lg border border-pink-200 text-left relative my-0.5"
            >
              <div className="absolute top-2.5 right-2.5 text-pink-300 text-base select-none">
                💌
              </div>

              <motion.h3
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="font-script text-xl sm:text-2xl font-bold text-[#FF3B78] mb-2"
              >
                {letter.salutation.replace('[NAME]', config.recipient.name)}
              </motion.h3>

              <div className="space-y-2 text-[#8B1538] text-xs sm:text-sm leading-relaxed font-normal">
                {letter.body.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="break-words whitespace-pre-line"
                  >
                    {paragraph.replace('[NAME]', config.recipient.name)}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + letter.body.length * 0.1 }}
                className="mt-3 pt-2.5 border-t border-pink-200/80 flex items-center justify-between"
              >
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#8B1538]">
                    {letter.closing}
                  </p>
                  <p className="font-handwriting text-base sm:text-lg font-bold text-[#FF3B78] mt-0.5">
                    {config.sender.name}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-[#FF3B78]">
                  <Heart className="w-3.5 h-3.5 fill-[#FF3B78]" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Gated Next Surprise Button */}
      <div className="w-full max-w-xs my-0.5">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <p className="text-[10px] text-[#FF3B78] font-bold mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Event Completed! Heartfelt letter unlocked 💌
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 border border-white/60 animate-pulse-glow cursor-pointer"
              >
                <span>{config.stage6.nextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#8B1538]/70 font-semibold bg-white/70 px-3 py-0.5 rounded-full border border-pink-200"
            >
              🔒 Tap the wax seal to open the letter and unlock the final surprise!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
