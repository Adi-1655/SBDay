/**
 * Centralized Personalization Configuration File
 * Customize all details for the birthday recipient right here!
 */

export const birthdayData = {
  // 1. Recipient & Sender Information
  recipient: {
    name: "Saiu", // Change to recipient's name
    nickname: "Princess",
    relation: "favorite person",
    pronoun: "she",
  },
  sender: {
    name: "Adi",
    signature: "Yours always ❤️",
  },

  // 2. Color Palette Theme
  theme: {
    primaryBg: "#FCE4EC",       // Light pastel pink
    secondaryBg: "#FFF0F5",     // Soft blush pink
    primaryText: "#8B1538",     // Dark wine red
    accent: "#FF3B78",          // Bright vibrant pink
    cardBg: "#FFFDF9",          // Warm cream white
    goldAccent: "#FFD166",
  },

  // 3. Birthday Date Configuration (Recurring Annual Birthday on 23 November)
  birthday: {
    day: 23,
    month: 11, // November (11)
    monthName: "November",
    countdownHeading: "Someone Special's Day Is Almost Here! ❤️",
    celebrationTitle: "IT'S YOUR SPECIAL DAY! 🎉",
    celebrationSubtitle: "Finally, the day we've all been waiting for! Happy Birthday! ❤️",
  },

  // 4. Stage 1: Welcome Screen
  stage1: {
    titlePrefix: "Happy Birthday,",
    subtitle: "Today is all about you. I've prepared something special!",
    yesButtonText: "Are you excited for what's next? ✨",
    noButtonResponses: [
      "No? Are you sure? 🥺",
      "Wait, think again! 🙈",
      "Wrong button cutie! 💖",
      "You know you want to see it! 🥰",
      "Resistance is cute but futile! 😜",
      "Just click the pink button! 🌸",
    ],
    floatingItems: ["🌸", "✨", "🎀", "💖", "🎂", "🎈", "⭐", "💐"],
  },

  // 4. Stage 2: Pop the Balloons
  stage2: {
    heading: "Pop all 4 balloons!",
    subtitle: "Tap each balloon to uncover the secret words!",
    balloons: [
      { id: 1, word: "You", color: "from-pink-400 to-rose-500", glow: "#fb7185", delay: 0 },
      { id: 2, word: "are", color: "from-purple-400 to-indigo-500", glow: "#c084fc", delay: 0.15 },
      { id: 3, word: "so", color: "from-amber-300 to-yellow-500", glow: "#fcd34d", delay: 0.3 },
      { id: 4, word: "special! ✨", color: "from-teal-300 to-emerald-400", glow: "#5eead4", delay: 0.45 },
    ],
    completeMessage: "You are so special! ❤️",
    subMessage: "Every little moment with you brings pure joy and smiles.",
    nextButtonText: "Make a Birthday Wish 🎂",
  },

  // 5. Stage 3: Make a Birthday Wish (No microphone permissions needed)
  stage3: {
    heading: "Blow the candle!",
    instruction: "Close your eyes & make a wish.",
    wishRevealedTitle: "✨ Wish Sent to the Stars! ✨",
    wishRevealedMessage:
      "May every wish you made in this moment blossom into reality this year. You deserve all the magic the universe has to offer! 🌟🕯️",
    nextButtonText: "Claim Your Flowers 🌹",
  },

  // 6. Stage 4: Your Rose Bouquet
  stage4: {
    heading: "Your Rose Bouquet 🌹",
    subtitle: "A thousand petals would still not be enough to celebrate you.",
    messages: [
      { id: 1, text: "Forever yours ❤️", icon: "💖" },
      { id: 2, text: "You make my world beautiful.", icon: "🌸" },
      { id: 3, text: "You are my sunshine ☀️", icon: "✨" },
      { id: 4, text: "Happy Birthday! 🎉", icon: "🎂" },
      { id: 5, text: "You are my favorite person.", icon: "🥰" },
    ],
    nextButtonText: "Look at the Prettiest Girl 📸 ✨",
  },

  // 7. Stage 5: Some Sweet Moments (Memory Photos)
  // Your 5 photos in public/images/ are mapped here!
  stage5: {
    heading: "Your Prettiest Moments 💖",
    subtitle: "(Swipe the cards to explore)",
    photos: [
      {
        id: 1,
        url: "/images/photo1.jpg",
        caption: "Warning: This smile causes instant butterflies! 🦋🥰",
        date: "Heart Stealer 💘",
        rotation: -3,
      },
      {
        id: 2,
        url: "/images/photo2.jpg",
        caption: "Holding a lily, yet still the prettiest flower in the frame! 💖🌺",
        date: "The Prettiest Bloom 🌸",
        rotation: 3,
      },
      {
        id: 3,
        url: "/images/photo3.jpg",
        caption: "Even a shy little smile from you is pure magic! ✨💕",
        date: "Effortlessly Cute 🥺",
        rotation: -2,
      },
      {
        id: 4,
        url: "/images/photo4.jpg",
        caption: "That laugh is literally my favorite sound in the universe! 😍💛",
        date: "Pure Sunshine ☀️",
        rotation: 4,
      },
      {
        id: 5,
        url: "/images/photo5.jpg",
        caption: "The sunset is gorgeous, but you're the real masterpiece here! 💖🌿",
        date: "Better Than the View 🌅",
        rotation: -1,
      },
    ],
    nextButtonText: "Read a Letter From Me 💌",
  },

  // 8. Stage 6: A Message From My Heart
  stage6: {
    heading: "A Message From My Heart",
    subtitle: "Tap the wax seal to open the letter",
    envelopeText: "For Saiu 💌",
    letter: {
      salutation: "Dear Saiu,",
      body: [
        "Happy Birthday to someone truly special! ❤️",
        "happiest birthday to my pretty girlieee 🎀💗🥹💕 honestly, you're such a cutie and i love your whole vibe, from your fashion sense to your little personality, everything is just so youuu😭🫶 you're one of those girls who are pretty inside and out, and i'm so glad i got to know you. i hope this new year of your life brings you so much happiness, love, success and all the little things that make you smile. may you always have reasons to be happy, people who genuinely love you and moments worth remembering. keep dressing pretty, taking cute pictures and being the lovely girl you areee🎀🤍 wishing you the sweetest birthday ever, pretty girl. enjoy your day to the fullest, you deserve all the good things in lifeee💋🎂💕 love youuuuu🫶✨️",
      ],
      closing: "With lots of love ❤️",
      signoff: "Yours always,",
    },
    nextButtonText: "One Last Surprise 🎁",
  },

  // 9. Stage 7: One Last Thing
  stage7: {
    heading: "One Last Thing...",
    subtitle: "Tap the gift to unwrap!",
    boxBadge: "Tap Me! 💝",
    revealedMessage: {
      title: "Lots of love for you ❤️",
      main: "Once again, Happy Birthday!",
      sub: "I hope your day is as special, radiant, and wonderful as you are.",
      toast: "May this year be your happiest chapter yet! 🥂✨",
    },
    replayButtonText: "Replay the Surprise 🔁",
  },

  // 10. Background Music Configuration
  music: {
    title: "Sweet Birthday Melody",
    autoPlayOnInteraction: true,
    defaultVolume: 0.6,
  },
};
