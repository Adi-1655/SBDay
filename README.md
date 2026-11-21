# 🎂 Interactive Birthday Surprise Website 💖

A personalized digital birthday gift website built with React, Vite, Tailwind CSS, Framer Motion, and Web Audio API. Designed with a cute pastel-pink digital scrapbook theme, optimized for mobile devices (Instagram / WhatsApp sharing).

---

## ✨ Progressive 7-Stage Surprise Journey

The recipient experiences 7 surprises one by one. **No stage can be skipped until its event is completed:**

1. **Stage 1: Birthday Welcome Screen**
   - Elegant cursive heading with recipient's name.
   - Cute animated cartoon characters holding a glowing birthday cake.
   - Interactive primary YES button with confetti celebration.
   - Playful NO button that dodges humorously without blocking the user.
2. **Stage 2: Pop the Balloons**
   - 4 colorful floating balloons with gentle bobbing animations.
   - Interactive popping animations with soft pop sound effects and confetti.
   - Unlocks complete secret message ("You are so special! ❤️") after all 4 are popped.
3. **Stage 3: Make a Birthday Wish**
   - Darkened warm atmospheric setting with candle flicker.
   - **No microphone permissions needed!** Directly tap the candle or the "Blow the Candle 💨" button.
   - Flame extinguishing with rising smoke particles, wish confirmation, and confetti.
4. **Stage 4: Your Rose Bouquet**
   - Centerpiece illustrated rose bouquet tied with golden ribbon.
   - Mobile-safe responsive love notes with checkmarks when opened.
   - Falling rose petals in the background. Unlocks NEXT after all 5 are opened.
5. **Stage 5: Some Sweet Moments**
   - Scrapbook polaroid gallery with taped corners and tilted aesthetic angles.
   - Smooth horizontal touch swipe or arrow button navigation.
   - Automatically displays your 5 photos (`photo1.jpg` - `photo5.jpg`) from `public/images/`.
   - Also includes an in-browser "Upload" button to pick photos from your phone gallery.
   - Unlocks NEXT after all memories are explored.
6. **Stage 6: A Message From My Heart**
   - Center digital envelope sealed with a heart wax stamp.
   - Tap to open with paper rustle sound effect and smooth sliding letter reveal.
   - Mobile-scrollable parchment letter.
7. **Stage 7: One Last Thing (The Grand Finale)**
   - 3D-styled animated gift box with notification badge.
   - Unwraps with celebration fanfare and confetti shower.
   - Final personal birthday wish and "Replay the Surprise" button.

---

## 🎨 Personalization (`src/config/birthdayData.js`)

Edit [src/config/birthdayData.js](file:///d:/Surprise/src/config/birthdayData.js) to customize:
- `recipient.name`: Recipient's name.
- `sender.name`: Your name or signature.
- `stage6.letter`: Salutation, paragraphs, and signoff.
- `stage5.photos`: Captions and photo filenames (stored in `public/images/`).
- `stage4.messages`: Bouquet love cards.
- `stage7.revealedMessage`: Final surprise greeting.

---

## 🚀 Running the Project

```bash
# Start Vite development server
npm run dev

# Build production bundle
npm run build
```
