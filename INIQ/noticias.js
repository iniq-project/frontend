/* INIQ — Notícias: render listagem + artigo (consome window.NEWS) */
(function () {
  'use strict';
  var U = window.NEWS_UTIL, NEWS = window.NEWS || [];

  /* ---------- LISTAGEM ---------- */
  var grid = document.getElementById('newsGrid');
  if (grid) {
    var featuredEl = document.getElementById('newsFeatured');
    var filterEl = document.getElementById('newsFilter');
    var emptyEl = document.getElementById('newsEmpty');
    var activeCat = 'todas';

    var sorted = NEWS.slice().sort(function (a, b) { return b.data.localeCompare(a.data); });

    function cardHTML(n) {
      return '' +
        '<a class="news" href="noticia.html?id=' + n.id + '">' +
          '<img class="news__img" src="' + n.img + '" alt="' + n.cat + '">' +
          '<div class="news__body">' +
            '<div class="news__meta"><span class="news__cat">' + n.cat + '</span><span>· ' + U.fmtDate(n.data) + '</span></div>' +
            '<h3>' + n.titulo + '</h3>' +
            '<p>' + n.resumo + '</p>' +
            '<span class="link-arrow">Ler mais' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>' +
            '</span>' +
          '</div>' +
        '</a>';
    }

    function renderFeatured(n) {
      featuredEl.innerHTML = '' +
        '<a class="feat-news" href="noticia.html?id=' + n.id + '">' +
          '<div class="feat-news__img"><img src="' + n.img + '" alt="' + n.cat + '"><span class="feat-news__tag">' + n.cat + '</span></div>' +
          '<div class="feat-news__body">' +
            '<span class="eyebrow">Em destaque</span>' +
            '<h2>' + n.titulo + '</h2>' +
            '<p>' + n.resumo + '</p>' +
            '<div class="feat-news__meta">' + U.fmtDate(n.data) + '</div>' +
          '</div>' +
        '</a>';
    }

    function render() {
      var list = sorted.filter(function (n) { return activeCat === 'todas' || n.cat === activeCat; });
      if (!list.length) { featuredEl.innerHTML = ''; grid.innerHTML = ''; emptyEl.style.display = 'block'; return; }
      emptyEl.style.display = 'none';
      renderFeatured(list[0]);
      grid.innerHTML = list.slice(1).map(cardHTML).join('');
    }

    if (filterEl) {
      filterEl.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip'); if (!chip) return;
        filterEl.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        activeCat = chip.dataset.cat;
        render();
      });
    }
    render();
  }

  /* ---------- ARTIGO ---------- */
  var root = document.getElementById('articleRoot');
  if (root) {
    var params = new URLSearchParams(location.search);
    var n = U.byId(params.get('id')) || NEWS[0];
    if (!n) return;
    document.title = n.titulo + ' — INIQ';
    document.getElementById('aCat').textContent = n.cat;
    document.getElementById('aTitle').textContent = n.titulo;
    document.getElementById('aDate').textContent = U.fmtDate(n.data);
    document.getElementById('aHero').src = n.img;
    document.getElementById('aHero').alt = n.cat;
    document.getElementById('aBody').innerHTML = n.corpo.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    document.getElementById('aBreadcrumbTitle').textContent = n.titulo;

    // related: same category, else latest
    var rel = NEWS.filter(function (x) { return x.id !== n.id && x.cat === n.cat; });
    if (rel.length < 3) {
      NEWS.forEach(function (x) { if (x.id !== n.id && rel.indexOf(x) === -1) rel.push(x); });
    }
    rel = rel.slice(0, 3);
    var relGrid = document.getElementById('relatedGrid');
    if (relGrid) {
      relGrid.innerHTML = rel.map(function (x) {
        return '' +
          '<a class="news" href="noticia.html?id=' + x.id + '">' +
            '<img class="news__img" src="' + x.img + '" alt="' + x.cat + '">' +
            '<div class="news__body">' +
              '<div class="news__meta"><span class="news__cat">' + x.cat + '</span><span>· ' + U.fmtDate(x.data) + '</span></div>' +
              '<h3>' + x.titulo + '</h3>' +
            '</div>' +
          '</a>';
      }).join('');
    }
  }
})();
