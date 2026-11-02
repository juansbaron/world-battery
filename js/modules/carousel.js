export function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  const counter = carousel.querySelector('[data-current-slide]');
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  if (!slides.length) return;

  let activeIndex = 0;
  let timer;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.setAttribute('aria-label', `${slideIndex + 1} de ${slides.length}`);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, '0');
  }

  function pause() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function play() {
    pause();
    timer = window.setInterval(() => showSlide(activeIndex + 1), 3000);
  }

  previous?.addEventListener('click', () => { showSlide(activeIndex - 1); play(); });
  next?.addEventListener('click', () => { showSlide(activeIndex + 1); play(); });
  dots.forEach((dot) => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.goTo));
    play();
  }));

  carousel.addEventListener('pointerenter', pause);
  carousel.addEventListener('pointerleave', play);
  carousel.addEventListener('focusin', pause);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) play();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else play();
  });

  showSlide(activeIndex);
  play();
}
