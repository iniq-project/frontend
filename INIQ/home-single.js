/* INIQ — single-page homepage: panel router, mobile menu, lang, contact form */
(function () {
  'use strict';

  var nav = document.querySelector('.hs-nav');
  var rail = document.querySelector('.hs-rail');
  var navBtns = Array.prototype.slice.call(document.querySelectorAll('.hs-nav button[data-panel]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.hs-panel'));

  function activate(id, push) {
    navBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.panel === id); });
    panels.forEach(function (p) { p.classList.toggle('is-active', p.id === 'panel-' + id); });
    var main = document.querySelector('.hs-main');
    if (main) main.scrollTop = 0;
    var active = document.getElementById('panel-' + id);
    if (active) active.scrollTop = 0;
    if (push && history.replaceState) history.replaceState(null, '', '#' + id);
    closeMobile();
  }

  navBtns.forEach(function (b) {
    b.addEventListener('click', function () { activate(b.dataset.panel, true); });
  });

  // in-panel links that jump to another panel
  document.addEventListener('click', function (e) {
    var jump = e.target.closest('[data-go-panel]');
    if (jump) { e.preventDefault(); activate(jump.getAttribute('data-go-panel'), true); }
  });

  // deep link on load
  var hash = (location.hash || '').replace('#', '');
  var valid = navBtns.map(function (b) { return b.dataset.panel; });
  activate(valid.indexOf(hash) > -1 ? hash : 'inicio', false);

  // keyboard up/down to move between panels (desktop)
  document.addEventListener('keydown', function (e) {
    if (e.target.matches('input, textarea, select')) return;
    var cur = navBtns.findIndex(function (b) { return b.classList.contains('is-active'); });
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); activate(navBtns[Math.min(cur + 1, navBtns.length - 1)].dataset.panel, true); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); activate(navBtns[Math.max(cur - 1, 0)].dataset.panel, true); }
  });

  // mobile menu toggle (right drawer)
  var toggle = document.querySelector('.hs-mtoggle');
  function openMobile() { if (rail) rail.classList.add('open'); document.body.classList.add('hs-menu-open'); }
  function closeMobile() { if (rail) rail.classList.remove('open'); document.body.classList.remove('hs-menu-open'); }
  if (toggle) toggle.addEventListener('click', function () {
    if (rail && rail.classList.contains('open')) closeMobile(); else openMobile();
  });

  // language toggle (visual)
  var langBtns = document.querySelectorAll('.hs-lang button');
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      langBtns.forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      document.documentElement.setAttribute('lang', b.dataset.lang);
    });
  });

  // contact form
  var form = document.getElementById('hsForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) { f.style.borderColor = '#c0392b'; ok = false; } else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      document.getElementById('hsSent').classList.add('show');
      form.reset();
    });
  }
})();
