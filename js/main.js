/* ==========================================================================
   Navigation — scroll state & mobile toggle
   ========================================================================== */
(function () {
  'use strict';

  const header    = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  // Add/remove "scrolled" class so the nav background appears on scroll
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is pre-scrolled

  // Hamburger toggle
  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when any nav link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside it
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ==========================================================================
     Gallery Lightbox
     ========================================================================== */
  const galleryItems    = document.querySelectorAll('.gallery-item');
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Build an ordered list of image sources from the gallery
  const images = Array.from(galleryItems).map(function (item) {
    return {
      src: item.dataset.src,
      alt: item.querySelector('img').alt,
    };
  });

  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Return focus to the thumbnail that opened the lightbox
    var trigger = galleryItems[currentIndex];
    if (trigger) trigger.focus();
  }

  function renderLightbox() {
    var image = images[currentIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    renderLightbox();
  }

  // Attach click handlers to each thumbnail
  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  // Close when clicking the dark backdrop (not the image itself)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });

  /* ==========================================================================
     Smooth active-link highlighting (optional UX polish)
     ========================================================================== */
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var activeId = null;

    sections.forEach(function (section) {
      var top    = section.offsetTop - 80;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        activeId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        'nav-link--active',
        link.getAttribute('href') === '#' + activeId
      );
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}());
