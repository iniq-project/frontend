/* INIQ — Eventos: render listagem + detalhe (consome window.EVENTS) */
(function () {
  'use strict';
  var U = window.EVENTS_UTIL, EVENTS = window.EVENTS || [];

  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>';
  var CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 9h18M8 3v4M16 3v4"></path></svg>';
  var TICKET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"></path></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';

  /* ---------- LISTAGEM ---------- */
  var grid = document.getElementById('evGrid');
  if (grid) {
    var featEl = document.getElementById('evFeatured');
    var emptyEl = document.getElementById('evEmpty');
    var tabsEl = document.getElementById('evTabs');
    var mode = 'proximos';

    var upcoming = EVENTS.filter(function (e) { return !U.isPast(e.data); }).sort(function (a, b) { return a.data.localeCompare(b.data); });
    var past = EVENTS.filter(function (e) { return U.isPast(e.data); }).sort(function (a, b) { return b.data.localeCompare(a.data); });

    // counts
    var cu = document.getElementById('countProx'), cp = document.getElementById('countPass');
    if (cu) cu.textContent = upcoming.length;
    if (cp) cp.textContent = past.length;

    function cardHTML(e) {
      return '' +
        '<a class="ev-card' + (U.isPast(e.data) ? ' past' : '') + '" href="evento.html?id=' + e.id + '">' +
          '<div class="ev-card__cal"><span class="d">' + U.dia(e.data) + '</span><span class="m">' + U.mesAbrev(e.data) + '</span></div>' +
          '<div class="ev-card__body">' +
            '<span class="ev-card__type">' + e.tipo + '</span>' +
            '<h3>' + e.titulo + '</h3>' +
            '<span class="ev-card__loc">' + PIN + e.local + ' · ' + e.cidade + '</span>' +
          '</div>' +
        '</a>';
    }

    function renderFeatured(e) {
      featEl.innerHTML = '' +
        '<a class="ev-feat" href="evento.html?id=' + e.id + '">' +
          '<div class="ev-feat__img"><img src="' + e.img + '" alt="' + e.tipo + '">' +
            '<span class="ev-feat__type">' + e.tipo + '</span>' +
            '<div class="ev-feat__cal"><div class="d">' + U.dia(e.data) + '</div><span class="m">' + U.mesAbrev(e.data) + '</span></div>' +
          '</div>' +
          '<div class="ev-feat__body">' +
            '<span class="eyebrow">Próximo destaque</span>' +
            '<h2>' + e.titulo + '</h2>' +
            '<p>' + e.resumo + '</p>' +
            '<div class="ev-feat__meta">' +
              '<div class="row">' + CAL + U.dataLonga(e.data) + '</div>' +
              '<div class="row">' + CLOCK + e.horaIni + ' — ' + e.horaFim + '</div>' +
              '<div class="row">' + PIN + e.local + ' · ' + e.cidade + '</div>' +
            '</div>' +
            '<div class="ev-feat__actions">' +
              '<span class="btn btn--primary">Ver evento ' + ARROW + '</span>' +
            '</div>' +
          '</div>' +
        '</a>';
    }

    function render() {
      var list = mode === 'proximos' ? upcoming : past;
      if (!list.length) { featEl.innerHTML = ''; grid.innerHTML = ''; emptyEl.style.display = 'block'; return; }
      emptyEl.style.display = 'none';
      if (mode === 'proximos') {
        renderFeatured(list[0]);
        grid.innerHTML = list.slice(1).map(cardHTML).join('');
      } else {
        featEl.innerHTML = '';
        grid.innerHTML = list.map(cardHTML).join('');
      }
    }

    if (tabsEl) {
      tabsEl.addEventListener('click', function (ev) {
        var b = ev.target.closest('button'); if (!b) return;
        tabsEl.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        mode = b.dataset.mode;
        render();
      });
    }
    render();
  }

  /* ---------- DETALHE ---------- */
  var root = document.getElementById('evDetail');
  if (root) {
    var params = new URLSearchParams(location.search);
    var e = U.byId(params.get('id')) || EVENTS[0];
    if (!e) return;
    document.title = e.titulo + ' — INIQ';
    function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
    set('evType', e.tipo);
    set('evTitle', e.titulo);
    set('evBreadcrumb', e.titulo);
    set('evDateMeta', U.dataLonga(e.data));
    set('evTimeMeta', e.horaIni + ' — ' + e.horaFim);
    set('evLocMeta', e.local + ' · ' + e.cidade);
    var bg = document.getElementById('evBg'); if (bg) { bg.src = e.img; bg.alt = e.tipo; }
    document.getElementById('evBody').innerHTML = e.corpo.map(function (p) { return '<p>' + p + '</p>'; }).join('');

    // programa
    var prog = document.getElementById('evPrograma');
    if (prog) {
      if (e.programa && e.programa.length) {
        prog.innerHTML = '<h3>Programa</h3>' + e.programa.map(function (r) {
          return '<div class="evd-prog__row"><div class="evd-prog__h">' + r.h + '</div><div class="evd-prog__t">' + r.t + '</div></div>';
        }).join('');
      } else { prog.style.display = 'none'; }
    }

    // sidebar card
    set('evCardDate', U.dataLonga(e.data));
    set('evCardTime', e.horaIni + ' — ' + e.horaFim);
    set('evCardLoc', e.local);
    set('evCardCity', e.cidade);
    set('evCardPrice', e.preco);
    var cta = document.getElementById('evCardCta');
    if (cta) {
      if (U.isPast(e.data)) {
        cta.innerHTML = '<span class="btn btn--ghost" style="width:100%;justify-content:center;">Evento já realizado</span>';
      } else if (e.inscricao) {
        cta.innerHTML = '<a href="contactos.html" class="btn btn--green">Inscrever-me ' + ARROW + '</a><div class="evd-note">Inscrição sujeita a confirmação por e-mail.</div>';
      } else {
        cta.innerHTML = '<span class="btn btn--ghost" style="width:100%;justify-content:center;">Evento institucional</span>';
      }
    }
  }
})();
