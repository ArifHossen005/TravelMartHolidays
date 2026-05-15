'use strict';

(function () {

  const INITIAL_SHOW = 15;
  let currentFilter = 'All';
  let lightboxIndex = 0;
  let filteredItems = [];
  let showingAll = false;

  function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid || typeof TM_GALLERY === 'undefined') return;

    grid.innerHTML = TM_GALLERY.map(item => `
      <div class="gallery-item collapsed" data-category="${item.category}" data-id="${item.id}">
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
        <div class="gallery-overlay">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
          <button class="gallery-zoom" aria-label="Open ${item.title}">🔍</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => openLightbox(parseInt(el.dataset.id, 10)));
    });

    filterGallery('All');
  }

  function filterGallery(category) {
    currentFilter = category;
    showingAll = false;
    filteredItems = [];

    document.querySelectorAll('.gallery-item').forEach(item => {
      const matches = category === 'All' || item.dataset.category === category;
      if (matches) {
        filteredItems.push(parseInt(item.dataset.id, 10));
        item.classList.remove('hidden');
        item.classList.add('collapsed');
      } else {
        item.classList.add('hidden');
        item.classList.add('collapsed');
      }
    });

    applyVisibility();

    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
  }

  function applyVisibility() {
    const items = document.querySelectorAll('.gallery-item:not(.hidden)');
    const limit = showingAll ? Infinity : INITIAL_SHOW;
    let shown = 0;

    items.forEach(item => {
      if (shown < limit) {
        item.classList.remove('collapsed');
        shown++;
      } else {
        item.classList.add('collapsed');
      }
    });

    const wrap = document.getElementById('galleryViewMoreWrap');
    if (wrap) {
      wrap.style.display = (filteredItems.length > INITIAL_SHOW && !showingAll) ? 'block' : 'none';
    }
  }

  function openLightbox(id) {
    lightboxIndex = filteredItems.indexOf(id);
    if (lightboxIndex === -1) lightboxIndex = 0;
    showLightboxItem();

    const lb = document.getElementById('lightbox');
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');

    // Use global scroll manager
    if (window.TMScroll) window.TMScroll.lockScroll();
    else document.body.style.overflow = 'hidden';
  }

  function showLightboxItem() {
    const id = filteredItems[lightboxIndex];
    const item = TM_GALLERY.find(g => g.id === id);
    if (!item) return;
    document.getElementById('lbImage').src = item.src;
    document.getElementById('lbImage').alt = item.title;
    document.getElementById('lbTitle').textContent = item.title;
    document.getElementById('lbDesc').textContent = item.desc;
  }

  function navigateLightbox(direction) {
    if (!filteredItems.length) return;
    lightboxIndex = (lightboxIndex + direction + filteredItems.length) % filteredItems.length;
    showLightboxItem();
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');

    if (window.TMScroll) window.TMScroll.unlockScroll();
    else document.body.style.overflow = '';
  }

  function initControls() {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => filterGallery(btn.dataset.filter));
    });

    const viewMoreBtn = document.getElementById('galleryViewMoreBtn');
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener('click', () => {
        showingAll = true;
        applyVisibility();
      });
    }

    const lbClose = document.getElementById('lbClose');
    const lbPrev  = document.getElementById('lbPrev');
    const lbNext  = document.getElementById('lbNext');
    const lb      = document.getElementById('lightbox');

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lbNext)  lbNext.addEventListener('click', () => navigateLightbox(1));
    if (lb)      lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
      if (!lb || !lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')          closeLightbox();
      else if (e.key === 'ArrowLeft')  navigateLightbox(-1);
      else if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    initControls();
  });

  window.TMGallery = { filterGallery, openLightbox, navigateLightbox, closeLightbox };

})();
