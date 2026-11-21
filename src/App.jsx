import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayData } from './config/birthdayData';
import BackgroundEffects from './components/BackgroundEffects';
import NavBar from './components/NavBar';
import Stage1Welcome from './components/stages/Stage1Welcome';
import Stage2Balloons from './components/stages/Stage2Balloons';
import Stage3Candle from './components/stages/Stage3Candle';
import Stage4Bouquet from './components/stages/Stage4Bouquet';
import Stage5Moments from './components/stages/Stage5Moments';
import Stage6Letter from './components/stages/Stage6Letter';
import Stage7Gift from './components/stages/Stage7Gift';

export default function App() {
  const TOTAL_STAGES = 7;

  // Always start fresh from the initial event (Stage 1)
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);

  // Clear any previous persisted stage state
  useEffect(() => {
    try {
      localStorage.removeItem('birthday_current_stage');
      localStorage.removeItem('birthday_max_unlocked');
    } catch {}
  }, []);

  // Prevent any vertical bounce / rubber-band scrolling on mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      // If the touch originates within an element that allows internal scrolling, permit it
      if (e.target.closest && e.target.closest('.allow-scroll')) {
        return;
      }
      // Otherwise prevent default page scrolling and rubber-band jitter
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleNextStage = () => {
    const next = currentStage + 1;
    if (next <= TOTAL_STAGES) {
      setCurrentStage(next);
      setMaxUnlockedStage((prev) => Math.max(prev, next));
    }
  };

  const handleNavigateStage = (stageNum) => {
    if (stageNum <= maxUnlockedStage && stageNum >= 1) {
      setCurrentStage(stageNum);
    }
  };

  const handleReset = () => {
    setCurrentStage(1);
    setMaxUnlockedStage(1);
    try {
      localStorage.removeItem('birthday_current_stage');
      localStorage.removeItem('birthday_max_unlocked');
    } catch {}
  };

  const pageVariants = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.98 },
  };

  return (
    <div className="h-full w-full fixed inset-0 overflow-hidden flex flex-col justify-between select-none touch-none">
      <BackgroundEffects activeStage={currentStage} />

      <NavBar
        currentStage={currentStage}
        maxUnlockedStage={maxUnlockedStage}
        onNavigateStage={handleNavigateStage}
        onReset={handleReset}
        totalStages={TOTAL_STAGES}
      />

      {/* Main container: strictly flex-1, locked to viewport, zero scroll bounce */}
      <main className="flex-1 w-full pt-[max(3.2rem,calc(2.8rem+env(safe-area-inset-top,0px)))] pb-[max(0.2rem,env(safe-area-inset-bottom,0px))] px-2 sm:px-4 flex items-center justify-center overflow-hidden relative z-10 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full flex flex-col items-center justify-center overflow-hidden min-h-0"
          >
            {currentStage === 1 && (
              <Stage1Welcome
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 2 && (
              <Stage2Balloons
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 3 && (
              <Stage3Candle
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 4 && (
              <Stage4Bouquet
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 5 && (
              <Stage5Moments
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 6 && (
              <Stage6Letter
                config={birthdayData}
                onNext={handleNextStage}
              />
            )}
            {currentStage === 7 && (
              <Stage7Gift
                config={birthdayData}
                onReplay={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="w-full py-0.5 text-center text-[10px] font-semibold text-[#8B1538]/50 relative z-10 pointer-events-none shrink-0">
        <span>Handcrafted with 💖 for {birthdayData.recipient.name}</span>
      </footer>
    </div>
  );
}
