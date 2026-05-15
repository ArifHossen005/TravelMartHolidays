'use strict';

/* ============================================================
   carousel.js — Touch-enabled testimonial carousel
   Fixed: uses carousel-track-wrapper for proper overflow hidden
   ============================================================ */

(function () {

  let currentSlide = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5000;
  let touchStartX = 0;
  let touchEndX = 0;

  function getTotal() {
    return document.querySelectorAll('#carouselTrack .testimonial-card').length;
  }

  function buildTestimonialCard(t) {
    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    return `
      <div class="testimonial-card">
        <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy" />
        <div class="testimonial-stars" aria-label="${t.rating} out of 5 stars">${stars}</div>
        <p class="testimonial-quote">${t.quote}</p>
        <div class="testimonial-name">${t.name}</div>
        <div class="testimonial-pkg">${t.package}</div>
        <div class="testimonial-country">${t.country}</div>
      </div>
    `;
  }

  function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const allGrid = document.getElementById('allStoriesGrid');

    if (!track || typeof TM_TESTIMONIALS === 'undefined') return;

    track.innerHTML = TM_TESTIMONIALS.map(t => buildTestimonialCard(t)).join('');

    if (dotsContainer) {
      dotsContainer.innerHTML = TM_TESTIMONIALS.map((_, i) =>
        `<button class="car-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
      ).join('');

      dotsContainer.querySelectorAll('.car-dot').forEach(dot => {
        dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slide, 10)));
      });
    }

    if (allGrid) {
      allGrid.innerHTML = TM_TESTIMONIALS.map(t => buildTestimonialCard(t)).join('');
    }
  }

  function goToSlide(idx) {
    const total = getTotal();
    if (!total) return;
    currentSlide = (idx + total) % total;

    const track = document.getElementById('carouselTrack');
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    document.querySelectorAll('.car-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }

  function initTouch() {
    const wrapper = document.querySelector('.carousel-track-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) >= 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoplay();
    }, { passive: true });
  }

  function initControls() {
    const prevBtn = document.getElementById('carPrev');
    const nextBtn = document.getElementById('carNext');
    const carousel = document.getElementById('testimonialCarousel');

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }

    document.addEventListener('keydown', (e) => {
      if (!carousel) return;
      if (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA') return;
      const rect = carousel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    initTouch();
    initControls();
    startAutoplay();
  });

  window.TMCarousel = { goToSlide, nextSlide, prevSlide };

})();
