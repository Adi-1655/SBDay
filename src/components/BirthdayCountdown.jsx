import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';
import { triggerCelebration, triggerHeartBurst } from '../utils/confetti';
import { sound } from '../utils/audio';

export default function BirthdayCountdown({ config }) {
  const targetDay = config?.birthday?.day ?? 23;
  const targetMonth = config?.birthday?.month ?? 11; // November (11)

  // Preview toggle to easily experience the Nov 23 birthday celebration mode
  const [isPreviewBirthday, setIsPreviewBirthday] = useState(false);

  // Time remaining calculation function
  const calculateTimeRemaining = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthIndex = targetMonth - 1; // 0-indexed month (10 for November)

    // Check if today is the birthday (all day: Nov 23 from 00:00:00 to 23:59:59)
    const isTodayBirthday = now.getMonth() === monthIndex && now.getDate() === targetDay;

    if (isTodayBirthday) {
      return {
        isBirthday: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Target birthday at 00:00:00 of the current year
    let targetDate = new Date(currentYear, monthIndex, targetDay, 0, 0, 0, 0);

    // If Nov 23 of the current year has already passed (e.g. today is Nov 24 to Dec 31)
    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(currentYear + 1, monthIndex, targetDay, 0, 0, 0, 0);
    }

    const diff = Math.max(0, targetDate.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      isBirthday: false,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining);

  useEffect(() => {
    // Recalculate every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDay, targetMonth]);

  const isCelebrationActive = timeLeft.isBirthday || isPreviewBirthday;

  // Trigger celebration confetti & audio when celebration is active
  useEffect(() => {
    if (isCelebrationActive) {
      triggerCelebration();
      const burstTimeout = setTimeout(() => {
        triggerHeartBurst();
      }, 400);

      try {
        sound.playChime();
      } catch {}

      return () => clearTimeout(burstTimeout);
    }
  }, [isCelebrationActive]);

  const pad = (num) => String(num).padStart(2, '0');

  const countdownUnits = [
    { label: 'DAYS', value: pad(timeLeft.days) },
    { label: 'HOURS', value: pad(timeLeft.hours) },
    { label: 'MINUTES', value: pad(timeLeft.minutes) },
    { label: 'SECONDS', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto my-1 select-none">
      <AnimatePresence mode="wait">
        {isCelebrationActive ? (
          /* ================= ON THE ACTUAL BIRTHDAY (23 NOVEMBER) ================= */
          <motion.div
            key="birthday-celebration"
            initial={{ scale: 0.9, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="w-full bg-gradient-to-r from-pink-50 via-white to-pink-50 border-2 border-pink-300 rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-col items-center relative overflow-hidden"
          >
            {/* Ambient celebration glow */}
            <div className="absolute inset-0 bg-radial from-pink-200/40 via-amber-100/20 to-transparent pointer-events-none" />

            {/* Floating celebration icons */}
            <div className="flex items-center gap-1.5 text-[#FF3B78] mb-0.5 z-10">
              <PartyPopper className="w-4 h-4 text-amber-500 animate-bounce" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              <Heart className="w-4 h-4 fill-[#FF3B78] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              <PartyPopper className="w-4 h-4 text-amber-500 animate-bounce" />
            </div>

            {/* Main Celebration Heading */}
            <h2 className="font-script text-xl sm:text-2xl font-bold text-[#FF3B78] drop-shadow-xs animate-pulse-glow z-10 leading-tight">
              {config?.birthday?.celebrationTitle || "IT'S YOUR SPECIAL DAY! 🎉"}
            </h2>

            {/* Sub-celebration message */}
            <p className="text-[11px] sm:text-xs font-semibold text-[#8B1538] text-center leading-snug mt-0.5 z-10">
              {config?.birthday?.celebrationSubtitle ||
                "Finally, the day we've all been waiting for! Happy Birthday! ❤️"}
            </p>

            {/* Test toggle button */}
            <button
              onClick={() => setIsPreviewBirthday(false)}
              className="mt-1 text-[9px] text-pink-500/80 hover:text-[#FF3B78] underline cursor-pointer z-10"
              title="Return to countdown view"
            >
              (Preview Mode Active • Back to Countdown ⏳)
            </button>
          </motion.div>
        ) : (
          /* ================= LIVE BIRTHDAY COUNTDOWN ================= */
          <motion.div
            key="countdown-boxes"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="w-full flex flex-col items-center"
          >
            {/* Countdown Heading */}
            <div className="flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-[#8B1538] tracking-tight">
                {config?.birthday?.countdownHeading || "Someone Special's Day Is Almost Here! ❤️"}
              </span>
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            </div>

            {/* 4 Animated Boxes (DAYS : HOURS : MINUTES : SECONDS) */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full">
              {countdownUnits.map((unit, idx) => (
                <React.Fragment key={unit.label}>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: idx * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="flex-1 max-w-[62px] sm:max-w-[70px] bg-[#FFFDF9]/95 backdrop-blur-xs rounded-xl sm:rounded-2xl py-1 px-1 sm:py-1.5 sm:px-1.5 border border-pink-200/90 shadow-xs flex flex-col items-center justify-center transition-all hover:border-pink-300 hover:shadow-sm"
                  >
                    <span className="font-bold text-base sm:text-xl text-[#8B1538] tabular-nums leading-none tracking-tight drop-shadow-2xs">
                      {unit.value}
                    </span>
                    <span className="text-[7.5px] sm:text-[8.5px] font-bold text-[#FF3B78] uppercase tracking-wider mt-0.5 leading-none">
                      {unit.label}
                    </span>
                  </motion.div>

                  {idx < countdownUnits.length - 1 && (
                    <span className="text-xs sm:text-sm font-bold text-[#FF3B78] animate-pulse px-0.5 select-none leading-none">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Optional Test/Preview button to see celebration */}
            <button
              onClick={() => setIsPreviewBirthday(true)}
              className="mt-1 text-[9px] text-pink-400/80 hover:text-[#FF3B78] underline cursor-pointer"
              title="Preview the celebration screen that appears on 23 November"
            >
              Preview 23 Nov Celebration 🎉
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
