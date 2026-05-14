// ============================================
//  PÂTISSERIE ROYALE — slider.js
//  Hero carousel / auto-slider
// ============================================

(function () {
  const slider    = document.getElementById('heroSlider');
  if (!slider) return;

  const slides    = slider.querySelectorAll('.slide');
  const dotsWrap  = document.getElementById('sliderDots');
  const btnLeft   = document.getElementById('sliderLeft');
  const btnRight  = document.getElementById('sliderRight');

  let current   = 0;
  let autoTimer = null;
  const DELAY   = 5000;

  // ─── BUILD DOTS ───
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  // ─── GO TO SLIDE ───
  function goTo(n) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  // ─── PREV / NEXT ───
  btnLeft.addEventListener('click',  () => { goTo(current - 1); resetTimer(); });
  btnRight.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // ─── AUTO-PLAY ───
  function startTimer() {
    autoTimer = setInterval(() => goTo(current + 1), DELAY);
  }
  function resetTimer() {
    clearInterval(autoTimer);
    startTimer();
  }
  startTimer();

  // ─── TOUCH SWIPE ───
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  });

  // ─── KEYBOARD ───
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });
})();
