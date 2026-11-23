const menuButton = document.querySelector('.menu-toggle');
const topbar = document.querySelector('.topbar');
menuButton?.addEventListener('click', () => {
  const open = topbar.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  topbar.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
// Subtle pointer parallax for the exploded assembly; respects reduced-motion settings.
const art = document.querySelector('.hero-art');
const svg = document.querySelector('.exploded');
if (art && svg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    svg.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
  });
  art.addEventListener('pointerleave', () => { svg.style.transform = ''; });
}

// Pause the exploded assembly briefly on hover so the component layers are easier to inspect.
const assembly = document.querySelectorAll('.assembly');
const assemblyStage = document.querySelector('.hero-art');
assemblyStage?.addEventListener('pointerenter', () => assembly.forEach(part => part.style.animationPlayState = 'paused'));
assemblyStage?.addEventListener('pointerleave', () => assembly.forEach(part => part.style.animationPlayState = 'running'));
