/* INIQ — shared page shell: builds 3-column chrome around page content.
   Activated on <body class="shell-page" data-active=… data-eyebrow=… data-title=… data-intro=…>. */
(function () {
  'use strict';
  if (!document.body || !document.body.classList.contains('shell-page')) return;

  var ICN = {
    inicio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"></path><path d="M5 10v10h14V10"></path></svg>',
    'quem-somos': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-6 8-6s8 2 8 6"></path></svg>',
    servicos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>',
    normalizacao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"></path></svg>',
    noticias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h13v16H6a2 2 0 0 1-2-2V4Z"></path><path d="M17 8h3v10a2 2 0 0 1-2 2"></path><path d="M8 8h6M8 12h6M8 16h4"></path></svg>',
    eventos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 9h18M8 3v4M16 3v4"></path></svg>',
    contactos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path></svg>'
  };
  var MENU = [
    { k: 'inicio', l: 'Início', h: 'index.html' },
    { k: 'quem-somos', l: 'Quem Somos', h: 'quem-somos.html' },
    { k: 'servicos', l: 'Serviços', h: 'servicos.html' },
    { k: 'noticias', l: 'Notícias', h: 'noticias.html' },
    { k: 'eventos', l: 'Eventos', h: 'eventos.html' },
    { k: 'contactos', l: 'Contactos', h: 'contactos.html' }
  ];

  function run() {
    var body = document.body;
    var active = body.getAttribute('data-active') || '';
    var eyebrow = body.getAttribute('data-eyebrow') || '';
    var title = body.getAttribute('data-title') || document.title;
    var intro = body.getAttribute('data-intro') || '';
    var personImg = body.getAttribute('data-person-img') || '';
    var personName = body.getAttribute('data-person-name') || '';
    var personRole = body.getAttribute('data-person-role') || '';
    var personText = body.getAttribute('data-person-text') || '';
    var personHtml = personImg ?
      '<div class="hs-person">' +
        '<img class="hs-person__photo" src="' + personImg + '" alt="' + (personName || 'Responsável') + '">' +
        '<div class="hs-person__txt">' +
          (personName ? '<b>' + personName + '</b>' : '') +
          (personRole ? '<span class="role">' + personRole + '</span>' : '') +
          (personText ? '<p>' + personText + '</p>' : '') +
        '</div>' +
      '</div>' : '';

    // collect page content nodes (leave scripts + fixed overlays in place)
    var content = [];
    var keep = [];
    Array.prototype.slice.call(body.children).forEach(function (n) {
      var tag = n.tagName.toLowerCase();
      if (tag === 'script') { keep.push(n); return; }
      if (n.classList && (n.classList.contains('modal') || n.classList.contains('toast'))) { keep.push(n); return; }
      content.push(n);
    });

    // center content wrapper
    var shellContent = document.createElement('div');
    shellContent.className = 'shell-content';
    content.forEach(function (n) { shellContent.appendChild(n); });

    // build menu html
    var navHtml = MENU.map(function (m) {
      return '<a href="' + m.h + '"' + (m.k === active ? ' class="is-active"' : '') + '>' +
        '<span class="ico">' + (ICN[m.k] || '') + '</span><span class="lbl">' + m.l + '</span></a>';
    }).join('');

    var app = document.createElement('div');
    app.className = 'hs-app';
    app.innerHTML =
      '<aside class="hs-info">' +
        '<div class="hs-info__grid" aria-hidden="true"></div>' +
        '<div class="hs-info__brand">' +
          '<img class="iniq" src="assets/iniq-logo-t.png" alt="INIQ">' +
          '<span class="divider" aria-hidden="true"></span>' +
          '<img class="gov" src="assets/gov-mindcom-t.png" alt="Ministério da Indústria e Comércio">' +
        '</div>' +
        '<div class="hs-info__body">' +
          (eyebrow ? '<span class="hs-info__welcome">' + eyebrow + '</span>' : '') +
          '<h1>' + title + '</h1>' +
          (intro ? '<p class="lead">' + intro + '</p>' : '') +
          personHtml +
          '<a class="hs-info__back" href="index.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"></path></svg> Voltar ao início</a>' +
        '</div>' +
        '<div class="hs-info__foot">' +
          '<div class="hs-info__gov">República de Angola<br>Ministério da Indústria e Comércio</div>' +
          '<div class="hs-lang" role="group" aria-label="Idioma"><button class="is-active" data-lang="pt">PT</button><button data-lang="en">EN</button></div>' +
        '</div>' +
      '</aside>' +
      '<main class="hs-main" id="hsMain"></main>' +
      '<aside class="hs-rail">' +
        '<div class="hs-rail__title">Navegação</div>' +
        '<nav class="hs-nav" aria-label="Principal">' + navHtml + '</nav>' +
        '<div class="hs-rail__foot">' +
          '<a href="normas-tecnicas.html#venda" class="btn btn--primary">Catálogo de Normas</a>' +
          '<a href="admin.html" target="_blank" rel="noopener" class="reserved">Área Reservada</a>' +
        '</div>' +
      '</aside>';

    // mobile topbar
    var topbar = document.createElement('div');
    topbar.className = 'hs-topbar';
    topbar.innerHTML = '<img class="iniq" src="assets/iniq-logo-t.png" alt="INIQ">' +
      '<button class="hs-mtoggle" aria-label="Abrir menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"></path></svg></button>';

    // mount
    body.insertBefore(app, keep.length ? keep[0] : null);
    body.insertBefore(topbar, app);
    document.getElementById('hsMain').appendChild(shellContent);

    // interactions
    var rail = app.querySelector('.hs-rail');
    var toggle = topbar.querySelector('.hs-mtoggle');
    toggle.addEventListener('click', function () { rail.classList.toggle('open'); });

    var langBtns = app.querySelectorAll('.hs-lang button');
    langBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        langBtns.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        document.documentElement.setAttribute('lang', b.dataset.lang);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
