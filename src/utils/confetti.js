import confetti from 'canvas-confetti';

const pastelColors = ['#FF3B78', '#FF80AB', '#FF4081', '#FFD166', '#06D6A0', '#118AB2', '#FFF0F5', '#F8BBD0'];

export const triggerCelebration = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: pastelColors,
    disableForReducedMotion: true,
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: pastelColors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: pastelColors,
    });
  }, 250);
};

export const triggerHeartBurst = () => {
  const end = Date.now() + 1.2 * 1000;
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FF3B78', '#FF80AB', '#FFB6C1', '#F48FB1'],
      shapes: ['circle'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FF3B78', '#FF80AB', '#FFB6C1', '#F48FB1'],
      shapes: ['circle'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export const triggerBalloonBurst = (x, y) => {
  confetti({
    particleCount: 35,
    spread: 60,
    startVelocity: 25,
    origin: {
      x: x ? x / window.innerWidth : 0.5,
      y: y ? y / window.innerHeight : 0.5,
    },
    colors: ['#FF3B78', '#FFD166', '#48CAE4', '#9D4EDD', '#F72585'],
  });
};

export const triggerRoseShower = () => {
  confetti({
    particleCount: 60,
    spread: 100,
    origin: { y: 0.4 },
    colors: ['#E63946', '#FF4D6D', '#FF758F', '#FFB3C1', '#C9184A'],
    ticks: 200,
    gravity: 0.6,
  });
};
