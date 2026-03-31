/* ══════════════════════════════════════
   PARALLAX SUTIL — HEROES
   Desktop: parallax suave con rAF + GPU
   Mobile:  imagen estática (sin tiriteo)
   ══════════════════════════════════════ */

(function () {

  const INTENSITY = 0.45;
  const MOBILE_BREAKPOINT = 768;

  /* ── Detección de móvil ── */
  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT ||
           ('ontouchstart' in window && window.innerWidth < 1024);
  }

  /* ── Recoge los heroes con imagen ── */
  function getHeroes() {
    return document.querySelectorAll(
      '.rest-hero .rest-hero-img img, .store-hero .rest-hero-img img, .scanner-hero .rest-hero-img img'
    );
  }

  /* ── Resetea estilos al cambiar a móvil ── */
  function resetImages() {
    getHeroes().forEach(img => {
      img.style.transform  = '';
      img.style.willChange = '';
      img.style.transition = '';
    });
  }

  /* ── Aplica transform a una imagen ── */
  function applyParallax(img) {
    const hero = img.closest('.rest-hero');
    if (!hero) return;

    const rect     = hero.getBoundingClientRect();
    const heroTop  = rect.top;
    const heroH    = rect.height;
    const winH     = window.innerHeight;

    if (heroTop > winH || heroTop + heroH < 0) return;

    const progress = -heroTop / (winH + heroH);
    const offset   = (progress - 0.3) * heroH * INTENSITY;

    /* translate3d fuerza compositing en GPU → sin jitter */
    img.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  }

  /* ── Loop con requestAnimationFrame ── */
  let rafId = null;
  let scheduled = false;

  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    rafId = requestAnimationFrame(() => {
      if (!isMobile()) {
        getHeroes().forEach(applyParallax);
      }
      scheduled = false;
    });
  }

  /* ── Inicializa estilos base ── */
  function initImages() {
    getHeroes().forEach(img => {
      img.style.height     = '115%';
      img.style.top        = '-7.5%';
      img.style.position   = 'absolute';
      img.style.width      = '100%';
      img.style.objectFit  = 'cover';

      if (!isMobile()) {
        img.style.willChange = 'transform';
        /* Sin transition: el rAF ya suaviza, la transition causa el tiriteo */
        img.style.transition = 'none';
      }
    });
  }

  /* ── Al cambiar tamaño de ventana ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isMobile()) {
        resetImages();
        initImages();
      } else {
        initImages();
        onScroll();
      }
    }, 150);
  }, { passive: true });

  /* ── Init ── */
  function init() {
    initImages();

    if (!isMobile()) {
      window.addEventListener('scroll', onScroll, { passive: true });

      const appPages = document.querySelector('.app-pages');
      if (appPages) {
        appPages.addEventListener('scroll', onScroll, { passive: true });
      }

      /* Primer frame */
      onScroll();
    }
    /* En móvil: no se registra ningún listener, la imagen queda estática */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
