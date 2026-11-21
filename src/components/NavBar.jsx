import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Music, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function NavBar({
  currentStage,
  maxUnlockedStage,
  onNavigateStage,
  onReset,
  totalStages = 7,
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isPlayingMusic, setIsPlayingMusic] = useState(sound.isPlayingMusic);
  const [volume, setVolume] = useState(sound.volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const toggleSoundMute = () => {
    sound.playClick();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const toggleBgMusic = () => {
    sound.playClick();
    const playing = sound.toggleMusic();
    setIsPlayingMusic(playing);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const handleBack = () => {
    if (currentStage > 1) {
      sound.playClick();
      onNavigateStage(currentStage - 1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-6 pt-[max(0.6rem,env(safe-area-inset-top))] pb-2 flex items-center justify-between backdrop-blur-md bg-pink-100/75 border-b border-pink-200/60 shadow-2xs transition-all">
      <div className="flex items-center gap-1.5 shrink-0">
        {currentStage > 1 ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 border border-pink-200 text-[#8B1538] text-xs font-semibold shadow-2xs hover:bg-pink-50 transition-colors"
            title="Go to previous surprise"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF3B78]" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
        ) : (
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#8B1538]/80 bg-white/70 px-2.5 py-1 rounded-full border border-pink-200/70">
            <Sparkles className="w-3 h-3 text-[#FF3B78] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden xs:inline">Birthday Gift</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 bg-white/90 px-2.5 sm:px-3.5 py-1 rounded-full border border-pink-200 shadow-2xs">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#8B1538] mr-0.5">
          {currentStage}/{totalStages}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalStages }).map((_, idx) => {
            const stageNum = idx + 1;
            const isUnlocked = stageNum <= maxUnlockedStage;
            const isCurrent = stageNum === currentStage;

            return (
              <button
                key={stageNum}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playClick();
                    onNavigateStage(stageNum);
                  }
                }}
                title={isUnlocked ? `Surprise ${stageNum}` : `Locked surprise`}
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isCurrent
                    ? 'w-5 h-5 sm:w-6 sm:h-6 bg-[#FF3B78] text-white shadow-xs scale-105'
                    : isUnlocked
                    ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 bg-pink-300 hover:bg-pink-400 text-transparent cursor-pointer'
                    : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-pink-200/60 cursor-not-allowed opacity-50'
                }`}
              >
                {isCurrent ? (
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white animate-pulse" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleBgMusic}
          className={`p-1.5 sm:p-2 rounded-full border transition-all ${
            isPlayingMusic
              ? 'bg-[#FF3B78] text-white border-pink-400 shadow-2xs ring-2 ring-pink-300/50'
              : 'bg-white/90 text-[#8B1538] border-pink-200 hover:bg-pink-50'
          }`}
          title={isPlayingMusic ? 'Pause Music' : 'Play Birthday Music'}
        >
          <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
        </motion.button>

        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVolumeSlider((prev) => !prev)}
            className={`p-1.5 sm:p-2 rounded-full border transition-all ${
              isMuted
                ? 'bg-rose-100 text-rose-500 border-rose-200'
                : 'bg-white/90 text-[#8B1538] border-pink-200 hover:bg-pink-50'
            }`}
            title="Audio settings"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF3B78]" />}
          </motion.button>

          <AnimatePresence>
            {showVolumeSlider && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 p-3 bg-white rounded-2xl shadow-xl border border-pink-200 flex flex-col gap-2.5 w-44 sm:w-48 z-50"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#8B1538]">
                  <span>Volume</span>
                  <button
                    onClick={toggleSoundMute}
                    className="text-[10px] text-[#FF3B78] underline hover:text-pink-700"
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#FF3B78] cursor-pointer"
                />
                <button
                  onClick={toggleBgMusic}
                  className="w-full py-1 text-[11px] rounded-lg bg-pink-50 hover:bg-pink-100 text-[#8B1538] font-medium border border-pink-200 flex items-center justify-center gap-1.5"
                >
                  <Music className="w-3 h-3 text-[#FF3B78]" />
                  <span>{isPlayingMusic ? 'Music Playing' : 'Start Music'}</span>
                </button>
                <button
                  onClick={() => {
                    setShowVolumeSlider(false);
                    if (window.confirm('Restart the surprise journey from the beginning?')) {
                      sound.playClick();
                      onReset();
                    }
                  }}
                  className="w-full py-1 text-[11px] rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium border border-rose-200 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restart Journey</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
