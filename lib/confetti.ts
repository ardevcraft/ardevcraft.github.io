export function launchEmojiConfetti(emoji = '🎉') {
  if (typeof document === 'undefined') return;

  const container = document.createElement('div');
  container.className = 'confetti-layer';
  document.body.appendChild(container);

  const particles = Array.from({ length: 24 }, (_, index) => {
    const particle = document.createElement('span');
    particle.className = 'confetti-particle';
    particle.textContent = emoji;
    particle.style.setProperty('--x', `${Math.random() * 100}vw`);
    particle.style.setProperty('--delay', `${Math.random() * 0.25}s`);
    particle.style.setProperty('--duration', `${1.7 + Math.random() * 1.3}s`);
    particle.style.setProperty('--rotate', `${(index % 2 === 0 ? 1 : -1) * (180 + Math.random() * 540)}deg`);
    return particle;
  });

  particles.forEach((particle) => container.appendChild(particle));
  window.setTimeout(() => container.remove(), 3400);
}
