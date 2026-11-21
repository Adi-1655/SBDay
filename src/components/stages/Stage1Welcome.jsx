import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { triggerCelebration } from '../../utils/confetti';
import { sound } from '../../utils/audio';
import BirthdayCountdown from '../BirthdayCountdown';

export default function Stage1Welcome({ config, onNext }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const funnyNoResponses = config.stage1.noButtonResponses || [
    "No? Are you sure? 🥺",
    "Wait, think again! 🙈",
    "Wrong button cutie! 💖",
    "You know you want to see it! 🥰",
    "Resistance is cute but futile! 😜",
  ];

  const currentNoText =
    noClicks === 0
      ? "Not sure yet 🙈"
      : funnyNoResponses[(noClicks - 1) % funnyNoResponses.length];

  const handleNoClick = () => {
    sound.playClick();
    setNoClicks((prev) => prev + 1);

    const randomX = (Math.random() - 0.5) * 70;
    const randomY = (Math.random() - 0.5) * 30;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    sound.playChime();
    triggerCelebration();

    if (!sound.isPlayingMusic && config.music.autoPlayOnInteraction) {
      sound.startBackgroundMusic();
    }

    setTimeout(() => {
      onNext();
    }, 550);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-full py-1 sm:py-3 px-2 sm:px-4 max-w-sm sm:max-w-md mx-auto text-center relative z-10 w-full overflow-hidden min-h-0">
      {/* 1. Emoji ticker bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs flex justify-between items-center px-3 my-0.5"
      >
        {['🌸', '⭐', '🎈', '💖', '🎂', '🎉', '✨'].map((item, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
            className="text-sm sm:text-base select-none"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      {/* 2. Title Section */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative my-0.5 w-full px-2"
      >
        <span className="inline-block text-[10px] sm:text-xs tracking-widest uppercase font-bold text-[#FF3B78] bg-pink-100/90 px-3 py-0.5 rounded-full border border-pink-200 shadow-2xs mb-1">
          Special Day Edition 🎂
        </span>
        <h1 className="font-script text-2xl sm:text-4xl font-bold text-[#8B1538] leading-tight drop-shadow-xs">
          {config.stage1.titlePrefix}
          <br />
          <span className="text-[#FF3B78] underline decoration-pink-300 decoration-wavy decoration-2">
            {config.recipient.name}!
          </span>
        </h1>
      </motion.div>

      {/* Birthday Live Countdown Section */}
      <BirthdayCountdown config={config} />

      {/* 3. Center Cartoon Characters SVG (Responsively scaled so it never overflows) */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-[155px] sm:max-w-[210px] max-h-[110px] sm:max-h-[160px] my-0.5 relative shrink min-h-0 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-pink-200/50 rounded-full blur-xl -z-10 scale-90" />

        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto max-h-[110px] sm:max-h-[160px] drop-shadow-md object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 60 Q 200 110 380 60"
            fill="none"
            stroke="#FFB6C1"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          <polygon points="50,65 65,95 80,68" fill="#FF3B78" />
          <polygon points="110,75 125,105 140,79" fill="#FFD166" />
          <polygon points="170,83 185,115 200,85" fill="#48CAE4" />
          <polygon points="230,83 245,115 260,84" fill="#9D4EDD" />
          <polygon points="290,75 305,105 320,77" fill="#06D6A0" />
          <polygon points="340,65 355,95 370,67" fill="#FF4081" />

          {/* Character 1 (Left Bunny) */}
          <g transform="translate(60, 110)">
            <ellipse cx="40" cy="20" rx="14" ry="26" fill="#FFF0F5" stroke="#FF80AB" strokeWidth="3" transform="rotate(-15 40 20)" />
            <ellipse cx="40" cy="20" rx="7" ry="16" fill="#FFB6C1" transform="rotate(-15 40 20)" />
            <ellipse cx="80" cy="20" rx="14" ry="26" fill="#FFF0F5" stroke="#FF80AB" strokeWidth="3" transform="rotate(15 80 20)" />
            <ellipse cx="80" cy="20" rx="7" ry="16" fill="#FFB6C1" transform="rotate(15 80 20)" />
            <polygon points="60,8 48,45 72,45" fill="#FF3B78" />
            <circle cx="60" cy="8" r="6" fill="#FFD166" />
            <circle cx="54" cy="28" r="3" fill="#FFF" />
            <circle cx="65" cy="38" r="3" fill="#FFF" />
            <circle cx="60" cy="65" r="42" fill="#FFF9FB" stroke="#FF80AB" strokeWidth="3.5" />
            <ellipse cx="38" cy="72" rx="7" ry="4.5" fill="#FF80AB" opacity="0.6" />
            <ellipse cx="82" cy="72" rx="7" ry="4.5" fill="#FF80AB" opacity="0.6" />
            <path d="M 42 62 Q 48 55 54 62" fill="none" stroke="#8B1538" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 66 62 Q 72 55 78 62" fill="none" stroke="#8B1538" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="57,69 63,69 60,73" fill="#FF3B78" />
            <path d="M 60 73 Q 60 79 55 80 M 60 73 Q 60 79 65 80" fill="none" stroke="#8B1538" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="60" cy="120" rx="36" ry="32" fill="#FFF0F5" stroke="#FF80AB" strokeWidth="3.5" />
            <path d="M 80 115 Q 110 115 125 125" fill="none" stroke="#FF80AB" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* Character 2 (Right Bear) */}
          <g transform="translate(220, 110)">
            <ellipse cx="40" cy="22" rx="14" ry="24" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="3" transform="rotate(-15 40 22)" />
            <ellipse cx="40" cy="22" rx="7" ry="14" fill="#FFE0B2" transform="rotate(-15 40 22)" />
            <ellipse cx="80" cy="22" rx="14" ry="24" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="3" transform="rotate(15 80 22)" />
            <ellipse cx="80" cy="22" rx="7" ry="14" fill="#FFE0B2" transform="rotate(15 80 22)" />
            <polygon points="60,10 48,46 72,46" fill="#48CAE4" />
            <circle cx="60" cy="10" r="6" fill="#FF3B78" />
            <circle cx="60" cy="65" r="42" fill="#FFF8E1" stroke="#FFB74D" strokeWidth="3.5" />
            <ellipse cx="38" cy="72" rx="7" ry="4.5" fill="#FF8A80" opacity="0.6" />
            <ellipse cx="82" cy="72" rx="7" ry="4.5" fill="#FF8A80" opacity="0.6" />
            <circle cx="48" cy="60" r="3.5" fill="#5D4037" />
            <circle cx="72" cy="60" r="3.5" fill="#5D4037" />
            <ellipse cx="60" cy="68" rx="4" ry="3" fill="#D84315" />
            <path d="M 54 74 Q 57 77 60 74 Q 63 77 66 74" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="60" cy="120" rx="36" ry="32" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="3.5" />
            <path d="M 40 115 Q 10 115 -5 125" fill="none" stroke="#FFB74D" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* Center Cake */}
          <g transform="translate(150, 165)">
            <ellipse cx="50" cy="92" rx="55" ry="10" fill="#E0E0E0" />
            <rect x="42" y="92" width="16" height="14" fill="#BDBDBD" />
            <ellipse cx="50" cy="106" rx="30" ry="6" fill="#9E9E9E" />
            <rect x="12" y="55" width="76" height="35" rx="5" fill="#FFF0F5" stroke="#F48FB1" strokeWidth="2" />
            <path d="M 12 60 Q 22 72 30 60 Q 38 74 48 60 Q 58 75 68 60 Q 78 72 88 60 L 88 55 L 12 55 Z" fill="#FF4081" />
            <circle cx="28" cy="75" r="2.5" fill="#FFD166" />
            <circle cx="45" cy="80" r="2.5" fill="#48CAE4" />
            <circle cx="65" cy="74" r="2.5" fill="#06D6A0" />
            <rect x="24" y="28" width="52" height="28" rx="4" fill="#FFFFFF" stroke="#F48FB1" strokeWidth="2" />
            <path d="M 24 34 Q 32 44 40 34 Q 48 46 56 34 Q 66 45 76 34 L 76 28 L 24 28 Z" fill="#FF80AB" />
            <rect x="47" y="10" width="6" height="18" fill="#FFD166" rx="2" />
            <line x1="50" y1="10" x2="50" y2="6" stroke="#424242" strokeWidth="1.5" />
            <g className="animate-flame" style={{ transformOrigin: '50px 6px' }}>
              <ellipse cx="50" cy="2" rx="4.5" ry="7" fill="#FF9800" />
              <ellipse cx="50" cy="3" rx="2.5" ry="4.5" fill="#FFEB3B" />
              <circle cx="50" cy="4" r="1.5" fill="#FFFFFF" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* 4. Subtitle Card */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-[#8B1538] text-[11px] sm:text-sm font-medium max-w-xs mb-1 py-1 px-3.5 leading-relaxed bg-white/80 backdrop-blur-xs rounded-xl border border-pink-200/80 shadow-2xs"
      >
        "{config.stage1.subtitle}"
      </motion.p>

      {/* 5. Gated Interactive Buttons Section */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full flex flex-col items-center gap-1.5 relative max-w-xs my-0.5"
      >
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleYesClick}
          className="w-full py-2.5 sm:py-3.5 px-5 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-2 border border-white/80 animate-pulse-glow cursor-pointer"
        >
          <PartyPopper className="w-4 h-4 text-yellow-200 animate-bounce" />
          <span>{config.stage1.yesButtonText}</span>
        </motion.button>

        <motion.button
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
          onClick={handleNoClick}
          className="px-3.5 py-1 rounded-full bg-pink-100/90 text-pink-700/80 text-[11px] sm:text-xs font-semibold border border-pink-200/90 transition-all cursor-pointer shadow-2xs"
        >
          {currentNoText}
        </motion.button>

        {noClicks > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-[#FF3B78] font-bold"
          >
            Hehe, you know you want to! Click YES 🌸
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
