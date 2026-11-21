import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles, Camera, Upload, RotateCcw, Lock, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function Stage5Moments({ config, onNext }) {
  const fileInputRef = useRef(null);
  const defaultPhotos = config.stage5.photos;

  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('birthday_custom_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch { }
    return defaultPhotos;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedIndices, setViewedIndices] = useState(() => new Set([0]));
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [hasCustomPhotos, setHasCustomPhotos] = useState(() => {
    return Boolean(localStorage.getItem('birthday_custom_photos'));
  });

  const isAllViewed = viewedIndices.size >= photos.length;

  const markCurrentIndexViewed = (idx) => {
    setViewedIndices((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === photos.length && prev.size < photos.length) {
        setTimeout(() => {
          sound.playChime();
        }, 300);
      }
      return next;
    });
  };

  const handlePrev = () => {
    sound.playClick();
    const nextIdx = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIdx);
    markCurrentIndexViewed(nextIdx);
  };

  const handleNext = () => {
    sound.playClick();
    const nextIdx = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIdx);
    markCurrentIndexViewed(nextIdx);
  };

  const handleImageError = (id) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    sound.playChime();
    const readers = files.slice(0, 5).map((file, i) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            id: i + 1,
            url: event.target.result,
            caption: defaultPhotos[i]?.caption || `Special Memory #${i + 1} ❤️`,
            date: defaultPhotos[i]?.date || 'Cherished Moment',
            rotation: (i % 2 === 0 ? 1 : -1) * (2 + (i % 3)),
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newPhotos) => {
      setPhotos(newPhotos);
      setCurrentIndex(0);
      setViewedIndices(new Set([0]));
      setHasCustomPhotos(true);
      setImageErrorMap({});
      try {
        localStorage.setItem('birthday_custom_photos', JSON.stringify(newPhotos));
      } catch (err) {
        console.warn('LocalStorage quota exceeded for base64 images; displaying in-session.');
      }
    });
  };

  const handleResetPhotos = () => {
    sound.playClick();
    setPhotos(defaultPhotos);
    setCurrentIndex(0);
    setViewedIndices(new Set([0]));
    setHasCustomPhotos(false);
    setImageErrorMap({});
    try {
      localStorage.removeItem('birthday_custom_photos');
    } catch { }
  };

  const currentPhoto = photos[currentIndex] || defaultPhotos[0];

  const getPhotoSrc = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const base = import.meta.env.BASE_URL || '/';
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return base.endsWith('/') ? `${base}${cleanUrl}` : `${base}/${cleanUrl}`;
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-full py-1 sm:py-2 px-2 sm:px-3 max-w-sm sm:max-w-md mx-auto text-center relative z-10 w-full overflow-hidden min-h-0">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* 1. Heading */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="my-0.5"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FF3B78] font-bold bg-pink-100/90 px-2.5 py-0.5 rounded-full border border-pink-200">
          Spotlight on You 📷
        </span>
        <h2 className="font-script text-2xl sm:text-3xl font-bold text-[#8B1538] mt-0.5">
          {config.stage5.heading}
        </h2>
        <p className="text-[10px] sm:text-[11px] text-[#8B1538]/70 font-medium mt-0.5">
          {config.stage5.subtitle}
        </p>
      </motion.div>

      {/* 2. Top Controls Row */}
      <div className="flex items-center gap-1.5 my-0.5 text-[10px] sm:text-[11px]">
        <div className="flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs transition-all bg-white/85 border-pink-200 text-[#8B1538]">
          {isAllViewed ? (
            <span className="flex items-center gap-1 text-[#FF3B78] font-bold">
              <Check className="w-3 h-3 text-emerald-500" />
              All {photos.length} pictures viewed! 💖
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-pink-500" />
              <span>Viewed:</span>
              <span className="text-[#FF3B78] font-bold">
                {viewedIndices.size} / {photos.length}
              </span>
            </span>
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 font-bold text-[#FF3B78] bg-white/90 hover:bg-pink-50 px-2 py-0.5 rounded-full border border-pink-300 shadow-2xs transition-colors cursor-pointer"
          title="Select photos from your device"
        >
          <Upload className="w-3 h-3" />
          <span>Upload</span>
        </button>

        {hasCustomPhotos && (
          <button
            onClick={handleResetPhotos}
            className="flex items-center gap-1 font-medium text-[#8B1538]/80 bg-white/80 hover:bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200 transition-colors cursor-pointer"
            title="Reset to default photos"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 3. Polaroid Card Area with Drag Gesture (Pan-X Only, No Vertical Drag) */}
      <div className="relative w-full max-w-[245px] sm:max-w-[285px] flex items-center justify-center my-0.5 select-none allow-pan-x shrink min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id || currentIndex}
            initial={{ scale: 0.9, opacity: 0, x: 40, rotate: (currentPhoto.rotation || 0) + 2 }}
            animate={{ scale: 1, opacity: 1, x: 0, rotate: currentPhoto.rotation || 0 }}
            exit={{ scale: 0.9, opacity: 0, x: -40, rotate: (currentPhoto.rotation || 0) - 2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            style={{ touchAction: 'pan-x' }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -60 || offset.x < -40) {
                handleNext();
              } else if (swipe > 60 || offset.x > 40) {
                handlePrev();
              }
            }}
            className="w-full bg-[#FFFDF9] rounded-2xl p-2 sm:p-3 shadow-lg border border-pink-200/80 flex flex-col items-center cursor-grab active:cursor-grabbing relative overflow-hidden"
          >
            {/* Scrapbook Tape Accent */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-pink-200/75 backdrop-blur-xs border border-pink-300/60 rotate-1 shadow-2xs rounded-xs pointer-events-none" />

            {/* Photo Frame Container (Sized for single-screen mobile height) */}
            <div className="w-full h-34 sm:h-44 rounded-lg overflow-hidden bg-pink-50 border border-pink-100 relative flex items-center justify-center shadow-inner shrink-0">
              {imageErrorMap[currentPhoto.id] ? (
                <div className="flex flex-col items-center justify-center p-3 text-center text-pink-400">
                  <Camera className="w-8 h-8 mb-1 stroke-1" />
                  <span className="font-handwriting text-lg text-[#8B1538]">Sweet Memory</span>
                  <span className="text-[10px] text-pink-400 mt-0.5">A cherished moment with you ❤️</span>
                </div>
              ) : (
                <img
                  src={getPhotoSrc(currentPhoto.url)}
                  alt={currentPhoto.caption}
                  onError={() => handleImageError(currentPhoto.id)}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />
              )}

              <div className="absolute top-1.5 right-1.5 bg-white/80 backdrop-blur-xs p-1 rounded-full shadow-2xs">
                <Heart className="w-3 h-3 text-[#FF3B78] fill-[#FF3B78]" />
              </div>
            </div>

            {/* Polaroid Handwritten Caption Area (Never Overflows) */}
            <div className="w-full mt-1.5 sm:mt-2 px-1 text-center flex flex-col items-center justify-center">
              <p className="font-handwriting text-sm sm:text-base font-bold text-[#8B1538] leading-tight break-words whitespace-normal text-center w-full max-w-full">
                "{currentPhoto.caption}"
              </p>
              {currentPhoto.date && (
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-pink-500 uppercase mt-0.5 break-words">
                  {currentPhoto.date}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Navigation Arrows & Index Row */}
      <div className="flex items-center gap-3 my-0.5">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handlePrev}
          className="p-1.5 rounded-full bg-white text-[#8B1538] border border-pink-200 shadow-2xs hover:bg-pink-50 active:bg-pink-100 transition-colors cursor-pointer"
          title="Previous Photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        <span className="text-[10px] sm:text-[11px] font-semibold text-[#8B1538]/75">
          Swipe or tap arrows ({currentIndex + 1}/{photos.length})
        </span>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleNext}
          className="p-1.5 rounded-full bg-white text-[#8B1538] border border-pink-200 shadow-2xs hover:bg-pink-50 active:bg-pink-100 transition-colors cursor-pointer"
          title="Next Photo"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* 5. Gated Next Surprise Button */}
      <div className="w-full max-w-xs my-0.5">
        <AnimatePresence>
          {isAllViewed ? (
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <p className="text-[10px] text-[#FF3B78] font-bold mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Event Completed! Ready for the letter 💌
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[#FF3B78] to-[#FF6B9B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-400/50 flex items-center justify-center gap-1.5 border border-white/60 animate-pulse-glow cursor-pointer"
              >
                <span>{config.stage5.nextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#8B1538]/70 font-semibold bg-white/70 px-3 py-0.5 rounded-full border border-pink-200"
            >
              🔒 View all {photos.length} pictures to unlock next surprise! ({photos.length - viewedIndices.size} left)
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
