/**
 * Portfolio — navigation and restrained micro-interactions
 */
(function () {
  'use strict';

  var nav = document.getElementById('main-nav');
  var navLinks = document.querySelectorAll('#navMenu .nav-link');
  var sections = document.querySelectorAll('main section[id]');
  var yearEl = document.getElementById('year');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function updateActiveLink() {
    if (!nav || !sections.length) return;

    var scrollPos = window.scrollY + nav.offsetHeight + 80;
    var current = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  function initMobileNav() {
    var collapse = document.getElementById('navMenu');
    if (!collapse) return;

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && collapse.classList.contains('show')) {
          var toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      });
    });
  }

  function initRevealAnimations() {
    if (prefersReducedMotion) return;

    var revealSections = Array.prototype.slice.call(document.querySelectorAll('main .section:not(#hero)'));
    var revealItems = Array.prototype.slice.call(document.querySelectorAll('.skill-card, .project-card, #contact a.card, #projects > .container > .card'));
    var revealTargets = revealSections.concat(revealItems);

    if (!revealTargets.length) return;

    revealSections.forEach(function (section) {
      section.classList.add('reveal-section');
    });

    revealItems.forEach(function (item, index) {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', Math.min(index % 4, 3) * 45 + 'ms');
    });

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach(function (target) {
        target.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    revealTargets.forEach(function (target) {
      observer.observe(target);
    });
  }


  function init() {
    updateActiveLink();
    initMobileNav();
    initRevealAnimations();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
