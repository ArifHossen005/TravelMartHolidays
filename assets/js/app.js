'use strict';

/* ============================================================
   app.js — Main app logic
   Fix: global overflow manager, scroll never gets stuck
   ============================================================ */

(function () {

  const PKG_INITIAL = 10;
  let apCurrentFilter = 'All';
  let apShowingAll = false;
  let apFilteredList = [];

  /* ---------- Global overflow manager ----------
     Track HOW MANY overlays are open.
     Only restore scroll when ALL are closed.
  ------------------------------------------------ */
  let overlayCount = 0;

  function lockScroll() {
    overlayCount++;
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    overlayCount = Math.max(0, overlayCount - 1);
    if (overlayCount === 0) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  // Expose so gallery.js lightbox can use the same manager
  window.TMScroll = { lockScroll, unlockScroll };

  /* ---------- Build Card ---------- */
  function buildPackageCard(pkg) {
    return `
      <article class="pkg-card" data-id="${pkg.id}" data-badge="${pkg.badge}">
        <div class="pkg-image">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" />
          <span class="pkg-badge">${pkg.badge}</span>
        </div>
        <div class="pkg-body">
          <h3 class="pkg-title">${pkg.title}</h3>
          <p class="pkg-desc">${pkg.description}</p>
          <div class="pkg-meta">
            <span>🗓 ${pkg.duration}</span>
            <span>💰 ${pkg.price}</span>
            <span>👥 Group</span>
          </div>
          <div class="pkg-actions">
            <button class="pkg-btn" data-pkg-id="${pkg.id}">View Details →</button>
          </div>
        </div>
      </article>
    `;
  }

  function bindCardClicks(container) {
    container.querySelectorAll('.pkg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPackageModal(parseInt(btn.dataset.pkgId, 10));
      });
    });
  }

  /* ---------- Home: 4 featured ---------- */
  function renderHomePackages() {
    const grid = document.getElementById('packagesGrid');
    if (!grid || typeof TM_ALL_PACKAGES === 'undefined') return;
    const featured = TM_ALL_PACKAGES.filter(p => p.featured).slice(0, 4);
    grid.innerHTML = featured.map(buildPackageCard).join('');
    bindCardClicks(grid);
  }

  /* ---------- All-packages page ---------- */
  function renderAllPackages(filter) {
    apCurrentFilter = filter || 'All';
    apShowingAll = false;

    if (apCurrentFilter === 'Umrah')     apFilteredList = [...TM_PACKAGES.umrah];
    else if (apCurrentFilter === 'Tour') apFilteredList = [...TM_PACKAGES.tour];
    else                                 apFilteredList = [...TM_ALL_PACKAGES];

    applyPackageVisibility();

    document.querySelectorAll('#allPackagesFilters .filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === apCurrentFilter);
    });
  }

  function applyPackageVisibility() {
    const grid = document.getElementById('allPackagesGrid');
    if (!grid) return;

    const limit   = apShowingAll ? Infinity : PKG_INITIAL;
    const visible = apFilteredList.slice(0, limit);
    const hidden  = apFilteredList.slice(limit);

    grid.innerHTML = visible.map(buildPackageCard).join('');
    bindCardClicks(grid);

    let wrap = document.getElementById('pkgViewMoreWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'pkgViewMoreWrap';
      wrap.style.cssText = 'text-align:center;margin-top:2rem;';
      grid.parentNode.insertBefore(wrap, grid.nextSibling);
    }

    if (hidden.length > 0 && !apShowingAll) {
      wrap.innerHTML = `<button class="btn btn-gold" id="pkgViewMoreBtn">View More Packages (${hidden.length} more) →</button>`;
      document.getElementById('pkgViewMoreBtn').addEventListener('click', () => {
        apShowingAll = true;
        applyPackageVisibility();
      });
    } else {
      wrap.innerHTML = '';
    }
  }

  /* ---------- Package Modal ---------- */
  function openPackageModal(id) {
    const pkg = TM_ALL_PACKAGES.find(p => p.id === id);
    const modal = document.getElementById('packageModal');
    const body  = document.getElementById('packageModalBody');
    if (!pkg || !modal || !body) return;

    const isAllPkg = location.pathname.includes('all-packages');

    body.innerHTML = `
      <div class="pm-hero">
        <img src="${pkg.image}" alt="${pkg.title}" />
        <span class="pkg-badge">${pkg.badge}</span>
      </div>
      <h2 class="pm-title">${pkg.title}</h2>
      <div class="pm-meta">
        <span>🗓 ${pkg.duration}</span>
        <span>💰 ${pkg.price}</span>
        <span>👥 Group Friendly</span>
      </div>
      <p>${pkg.description}</p>
      <div class="pm-section itinerary">
        <h4>📍 Day-by-day Itinerary</h4>
        <ul>${pkg.itinerary.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>
      <div class="pm-section inclusions">
        <h4>What's Included</h4>
        <ul>${pkg.inclusions.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="pm-section exclusions">
        <h4>Not Included</h4>
        <ul>${pkg.exclusions.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="pm-cta">
        <a href="${isAllPkg ? './index.html#contact' : '#contact'}" class="btn btn-gold" id="pmEnquireBtn">Enquire Now →</a>
        <button class="btn btn-ghost" id="pmCloseBtn">Close</button>
      </div>
    `;

    openModal(modal);

    document.getElementById('pmCloseBtn').addEventListener('click', () => closeModal(modal));
    const enquireBtn = document.getElementById('pmEnquireBtn');
    if (enquireBtn) {
      enquireBtn.addEventListener('click', () => closeModal(modal));
    }
  }

  /* ---------- Modal helpers ---------- */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function closeModal(modal) {
    if (!modal) return;
    if (!modal.classList.contains('is-open')) return; // prevent double-unlock
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }

  function initModalHandlers() {
    document.querySelectorAll('.modal').forEach(modal => {
      // Click backdrop
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
      // Static × buttons (not dynamically injected ones)
      modal.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          closeModal(modal);
        });
      });
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.is-open').forEach(m => closeModal(m));
      }
    });
  }

  /* ---------- All Stories Modal ---------- */
  function initAllStoriesButton() {
    const btn   = document.getElementById('openAllStories');
    const modal = document.getElementById('allStoriesModal');
    if (btn && modal) btn.addEventListener('click', () => openModal(modal));
  }

  /* ---------- All-packages filter tabs ---------- */
  function initAllPackagesFilters() {
    const filterBar = document.getElementById('allPackagesFilters');
    if (!filterBar) return;

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => renderAllPackages(btn.dataset.filter));
    });

    const hash = location.hash.replace('#', '');
    let initial = 'All';
    if (hash === 'umrah') initial = 'Umrah';
    else if (hash === 'tour') initial = 'Tour';
    renderAllPackages(initial);
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHomePackages();
    initModalHandlers();
    initAllStoriesButton();
    initAllPackagesFilters();
  });

  window.TMApp = { openPackageModal, renderHomePackages, renderAllPackages, openModal, closeModal };

})();
