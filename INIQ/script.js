/* INIQ — interactions: mobile nav, language toggle, active link, scroll state */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');
  function openNav() { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeNav() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---- Language toggle (visual; content stays PT in this template) ---- */
  var langBtns = document.querySelectorAll('.lang button');
  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      langBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      document.documentElement.setAttribute('lang', btn.dataset.lang);
    });
  });

  /* ---- Active nav link on scroll ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---- Reveal-on-scroll (subtle) ---- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.svc, .pillar, .news, .event, .norm__feature, .partner');
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, Math.min(i * 40, 160));
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  }
})();
