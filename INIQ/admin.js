/* ============================================================
   INIQ — Admin CMS logic
   Auth (demo) + routing + CRUD for news / events / courses.
   Persists through window.INIQ_CMS (cms-store.js).
   ============================================================ */
(function () {
  'use strict';
  var CMS = window.INIQ_CMS;
  var AUTH_KEY = 'iniq_admin_auth';
  // Demo credentials — replace with real auth on the backend.
  var CRED = { user: 'admin', pass: 'iniq2026' };

  var COVERS = [
    { v: 'assets/cover-qualidade.jpg', t: 'Qualidade' },
    { v: 'assets/cover-metrologia.jpg', t: 'Metrologia' },
    { v: 'assets/cover-normalizacao.jpg', t: 'Normalização' },
    { v: 'assets/cover-seguranca.jpg', t: 'Segurança Alimentar' },
    { v: 'assets/cover-cplp.jpg', t: 'CPLP / Internacional' },
    { v: 'assets/cover-sede.jpg', t: 'Sede / Institucional' }
  ];
  var NEWS_CATS = ['Normalização', 'Metrologia', 'Qualidade', 'Formação', 'CPLP'];
  var EVENT_TYPES = ['Conferência', 'Formação', 'Cerimónia', 'Workshop'];
  var AREAS = ['Qualidade', 'Metrologia', 'Normalização', 'Segurança Alimentar'];
  var NIVEIS = ['Iniciante', 'Intermédio', 'Avançado'];
  var MODALIDADES = ['Presencial', 'Online', 'Híbrido'];

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return (s == null ? '' : String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function opts(list, sel) { return list.map(function (o) { var v = (typeof o === 'string') ? o : o.v, t = (typeof o === 'string') ? o : o.t; return '<option value="' + esc(v) + '"' + (String(v) === String(sel) ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join(''); }
  function fmtPrice(n) { return Number(n || 0).toLocaleString('pt-PT'); }

  var ICN = {
    dash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h13v16H6a2 2 0 0 1-2-2V4Z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h6M8 12h6M8 16h4"/></svg>',
    ev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
    course: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 10-10-5L2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  /* ---------- AUTH ---------- */
  function isAuthed() { return sessionStorage.getItem(AUTH_KEY) === '1'; }
  function showApp() { $('#login').style.display = 'none'; $('#app').classList.add('show'); route('dashboard'); }
  function showLogin() { $('#app').classList.remove('show'); $('#login').style.display = 'grid'; }

  $('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var u = $('#lgUser').value.trim(), p = $('#lgPass').value;
    if (u === CRED.user && p === CRED.pass) {
      sessionStorage.setItem(AUTH_KEY, '1');
      $('#lgErr').textContent = '';
      showApp();
    } else {
      $('#lgErr').textContent = 'Credenciais inválidas. Tente novamente.';
    }
  });
  $('#logoutBtn').addEventListener('click', function () { sessionStorage.removeItem(AUTH_KEY); showLogin(); });

  /* ---------- toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.innerHTML = ICN.check + '<span>' + esc(msg) + '</span>';
    t.classList.add('show'); clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- ROUTING ---------- */
  var TITLES = { dashboard: 'Painel', news: 'Notícias', events: 'Eventos', courses: 'Cursos' };
  function setNavActive(view) {
    $$('.sidebar__nav button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.view === view); });
  }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function route(view, arg) {
    if (view !== 'dashboard') setNavActive(view); else setNavActive('dashboard');
    $('#crumb').textContent = TITLES[view] || '';
    $('#viewTitle').textContent = TITLES[view] || '';
    var c = $('#content'); c.innerHTML = '';
    if (view === 'dashboard') renderDashboard(c);
    else if (view === 'news') renderList(c, 'news');
    else if (view === 'events') renderList(c, 'events');
    else if (view === 'courses') renderList(c, 'courses');
    else if (view === 'edit') renderEditor(c, arg.type, arg.id);
    updateCounts();
    window.scrollTo(0, 0);
  }

  $$('.sidebar__nav button').forEach(function (b) {
    b.addEventListener('click', function () { route(b.dataset.view); $('#sidebar').classList.remove('open'); });
  });
  $('#adminBurger').addEventListener('click', function () { $('#sidebar').classList.toggle('open'); });

  function updateCounts() {
    $('#cNews').textContent = CMS.list('news').length;
    $('#cEvents').textContent = CMS.list('events').length;
    $('#cCourses').textContent = CMS.list('courses').length;
  }

  /* ---------- DASHBOARD ---------- */
  function renderDashboard(c) {
    var news = CMS.list('news'), events = CMS.list('events'), courses = CMS.list('courses');
    var cards = el('div', { class: 'cards' });
    [['news', ICN.news, news.length, 'Notícias publicadas'], ['events', ICN.ev, events.length, 'Eventos na agenda'], ['courses', ICN.course, courses.length, 'Cursos com vídeo']].forEach(function (x) {
      var card = el('div', { class: 'card' },
        '<div class="card__ico">' + x[1] + '</div><div class="k">' + x[2] + '</div><div class="l">' + x[3] + '</div>' +
        '<a class="more" data-go="' + x[0] + '">Gerir ' + ICN.plus + '</a>');
      cards.appendChild(card);
    });
    c.appendChild(cards);

    // recent news
    var p1 = el('div', { class: 'panel' });
    p1.appendChild(el('div', { class: 'panel__head' }, '<h3>Notícias recentes</h3><button class="btn btn--primary btn--sm" data-new="news">' + ICN.plus + 'Nova notícia</button>'));
    var l1 = el('div', { class: 'list' });
    news.slice(0, 4).forEach(function (n) { l1.appendChild(newsRow(n)); });
    p1.appendChild(l1); c.appendChild(p1);

    c.appendChild(el('div', { style: 'height:20px' }));

    var p2 = el('div', { class: 'panel' });
    p2.appendChild(el('div', { class: 'panel__head' }, '<h3>Próximos eventos</h3><button class="btn btn--primary btn--sm" data-new="events">' + ICN.plus + 'Novo evento</button>'));
    var l2 = el('div', { class: 'list' });
    events.slice(0, 4).forEach(function (e) { l2.appendChild(eventRow(e)); });
    p2.appendChild(l2); c.appendChild(p2);

    c.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]'); if (go) route(go.dataset.go);
    });
  }

  /* ---------- LIST ---------- */
  function renderList(c, type) {
    var items = CMS.list(type);
    var labels = { news: ['Nova notícia', 'Sem notícias ainda.'], events: ['Novo evento', 'Sem eventos ainda.'], courses: ['Novo curso', 'Sem cursos ainda.'] };
    var panel = el('div', { class: 'panel' });
    panel.appendChild(el('div', { class: 'panel__head' },
      '<h3>' + TITLES[type] + ' <span class="mono" style="color:#93a3b1;font-size:13px;">(' + items.length + ')</span></h3>' +
      '<button class="btn btn--primary btn--sm" data-new="' + type + '">' + ICN.plus + labels[type][0] + '</button>'));
    var list = el('div', { class: 'list' });
    if (!items.length) list.appendChild(el('div', { class: 'list__empty' }, labels[type][1]));
    else items.forEach(function (it) { list.appendChild(type === 'news' ? newsRow(it) : type === 'events' ? eventRow(it) : courseRow(it)); });
    panel.appendChild(list); c.appendChild(panel);
  }

  function rowActions(type, id, viewHref) {
    var v = viewHref ? '<a class="icon-btn" href="' + viewHref + '" target="_blank" title="Ver no site">' + ICN.eye + '</a>' : '';
    return '<div class="list__actions">' + v +
      '<button class="icon-btn" data-edit="' + type + ':' + id + '" title="Editar">' + ICN.edit + '</button>' +
      '<button class="icon-btn danger" data-del="' + type + ':' + id + '" title="Eliminar">' + ICN.del + '</button></div>';
  }
  function newsRow(n) {
    var r = el('div', { class: 'list__row' });
    r.innerHTML = '<img class="list__thumb" src="' + esc(n.img) + '" alt="">' +
      '<div><div class="list__title">' + esc(n.titulo) + '</div><div class="list__sub"><span class="list__badge">' + esc(n.cat) + '</span><span>' + esc(window.NEWS_UTIL.fmtDate(n.data)) + '</span></div></div>' +
      '<span></span>' + rowActions('news', n.id, 'noticia.html?id=' + n.id);
    return r;
  }
  function eventRow(e) {
    var r = el('div', { class: 'list__row' });
    r.innerHTML = '<img class="list__thumb" src="' + esc(e.img) + '" alt="">' +
      '<div><div class="list__title">' + esc(e.titulo) + '</div><div class="list__sub"><span class="list__badge">' + esc(e.tipo) + '</span><span>' + esc(window.EVENTS_UTIL.dataLonga(e.data)) + '</span><span>' + esc(e.cidade) + '</span></div></div>' +
      '<span></span>' + rowActions('events', e.id, 'evento.html?id=' + e.id);
    return r;
  }
  function courseRow(c) {
    var r = el('div', { class: 'list__row' });
    var nl = (c.lessons || []).filter(function (l) { return l && l.titulo; }).length;
    r.innerHTML = '<div class="list__thumb" style="display:grid;place-items:center;color:#0e6cb0;">' + ICN.course + '</div>' +
      '<div><div class="list__title">' + esc(c.titulo) + '</div><div class="list__sub"><span class="list__badge">' + esc(c.area) + '</span><span>' + esc(c.modalidade) + '</span><span>' + nl + ' vídeo(s)</span><span>' + fmtPrice(c.preco) + ' AOA</span></div></div>' +
      '<span></span>' + rowActions('courses', c.id, 'formacao.html');
    return r;
  }

  // delegate edit/delete/new clicks
  document.addEventListener('click', function (e) {
    var ed = e.target.closest('[data-edit]'); if (ed) { var a = ed.dataset.edit.split(':'); route('edit', { type: a[0], id: a[1] }); return; }
    var nw = e.target.closest('[data-new]'); if (nw) { route('edit', { type: nw.dataset.new, id: null }); return; }
    var dl = e.target.closest('[data-del]'); if (dl) {
      var b = dl.dataset.del.split(':');
      if (confirm('Eliminar este item? Esta acção não pode ser anulada.')) { CMS.remove(b[0], b[1]); toast('Item eliminado.'); route(b[0]); }
    }
  });

  /* ---------- EDITORS ---------- */
  function field(label, inner, req) {
    return '<div class="field"><label>' + esc(label) + (req ? ' <span class="req">*</span>' : '') + '</label>' + inner + '</div>';
  }
  function imgPicker(val) {
    return '<div class="field"><label>Imagem</label><div class="imgpick">' +
      '<img class="imgpick__prev" id="imgPrev" src="' + esc(val || COVERS[0].v) + '" alt="">' +
      '<div class="imgpick__ctrl">' +
      '<select id="f_img_preset">' + opts(COVERS, val) + '<option value="__url">URL personalizado…</option></select>' +
      '<input type="url" id="f_img_url" placeholder="https://…/imagem.jpg" style="margin-top:8px;display:none;" value="">' +
      '<div class="hint">Escolha uma imagem do banco ou cole um URL.</div>' +
      '</div></div></div>';
  }
  function wireImgPicker(initial) {
    var preset = $('#f_img_preset'), url = $('#f_img_url'), prev = $('#imgPrev');
    var presetVals = COVERS.map(function (c) { return c.v; });
    if (initial && presetVals.indexOf(initial) === -1) { preset.value = '__url'; url.style.display = 'block'; url.value = initial; prev.src = initial; }
    preset.addEventListener('change', function () {
      if (preset.value === '__url') { url.style.display = 'block'; url.focus(); if (url.value) prev.src = url.value; }
      else { url.style.display = 'none'; prev.src = preset.value; }
    });
    url.addEventListener('input', function () { if (url.value) prev.src = url.value; });
  }
  function getImg() { var p = $('#f_img_preset'); return p.value === '__url' ? ($('#f_img_url').value.trim() || COVERS[0].v) : p.value; }

  function editorShell(title, bodyHTML, viewHref) {
    var v = viewHref ? '<a class="btn btn--ghost btn--sm" href="' + viewHref + '" target="_blank">' + ICN.eye + 'Pré-visualizar</a>' : '';
    return '<div class="editor"><div class="editor__top"><h3>' + esc(title) + '</h3>' + v + '</div>' +
      '<form id="editorForm" novalidate>' + bodyHTML +
      '<div class="editor__foot"><button type="button" class="btn btn--ghost" id="cancelBtn">Cancelar</button>' +
      '<button type="submit" class="btn btn--green">' + ICN.check + 'Guardar</button></div></form></div>';
  }

  function renderEditor(c, type, id) {
    var item = id ? CMS.get(type, id) : null;
    if (type === 'news') renderNewsEditor(c, item);
    else if (type === 'events') renderEventEditor(c, item);
    else if (type === 'courses') renderCourseEditor(c, item);
  }

  /* ----- NEWS EDITOR ----- */
  function renderNewsEditor(c, n) {
    n = n || {};
    var body =
      field('Título', '<input type="text" id="f_titulo" value="' + esc(n.titulo) + '" required>', true) +
      '<div class="grid2">' +
        field('Categoria', '<select id="f_cat">' + opts(NEWS_CATS, n.cat) + '</select>', true) +
        field('Data', '<input type="date" id="f_data" value="' + esc(n.data || '2026-06-10') + '" required>', true) +
      '</div>' +
      imgPicker(n.img) +
      field('Resumo', '<textarea id="f_resumo" style="min-height:70px;" required>' + esc(n.resumo) + '</textarea>', true) +
      field('Corpo do artigo', '<textarea id="f_corpo" style="min-height:200px;">' + esc((n.corpo || []).join('\n\n')) + '</textarea>') +
      '<div class="hint" style="margin-top:-10px;margin-bottom:16px;">Separe os parágrafos com uma linha em branco.</div>';
    c.innerHTML = editorShell(n.id ? 'Editar notícia' : 'Nova notícia', body, n.id ? 'noticia.html?id=' + n.id : '');
    wireImgPicker(n.img);
    bindEditor(function () {
      var titulo = $('#f_titulo').value.trim();
      if (!titulo) { $('#f_titulo').focus(); return null; }
      return {
        id: n.id, slug: n.slug || '', titulo: titulo, cat: $('#f_cat').value, data: $('#f_data').value,
        img: getImg(), resumo: $('#f_resumo').value.trim(),
        corpo: $('#f_corpo').value.split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean)
      };
    }, 'news');
  }

  /* ----- EVENT EDITOR ----- */
  function renderEventEditor(c, e) {
    e = e || { inscricao: true };
    var body =
      field('Título', '<input type="text" id="f_titulo" value="' + esc(e.titulo) + '" required>', true) +
      '<div class="grid2">' +
        field('Tipo', '<select id="f_tipo">' + opts(EVENT_TYPES, e.tipo) + '</select>', true) +
        field('Data', '<input type="date" id="f_data" value="' + esc(e.data || '2026-07-01') + '" required>', true) +
      '</div>' +
      '<div class="grid2">' +
        field('Hora de início', '<input type="text" id="f_hi" value="' + esc(e.horaIni || '09h00') + '" placeholder="09h00">') +
        field('Hora de fim', '<input type="text" id="f_hf" value="' + esc(e.horaFim || '13h00') + '" placeholder="13h00">') +
      '</div>' +
      '<div class="grid2">' +
        field('Local', '<input type="text" id="f_local" value="' + esc(e.local) + '" required>', true) +
        field('Cidade', '<input type="text" id="f_cidade" value="' + esc(e.cidade || 'Luanda') + '">') +
      '</div>' +
      imgPicker(e.img) +
      field('Inscrição / Preço', '<input type="text" id="f_preco" value="' + esc(e.preco) + '" placeholder="Ex.: Entrada gratuita · inscrição obrigatória">') +
      '<div class="field"><label class="toggle"><input type="checkbox" id="f_insc"' + (e.inscricao ? ' checked' : '') + '><span class="toggle__track"></span><span class="toggle__label">Aceitar inscrições neste evento</span></label></div>' +
      field('Resumo', '<textarea id="f_resumo" style="min-height:70px;" required>' + esc(e.resumo) + '</textarea>', true) +
      field('Descrição', '<textarea id="f_corpo" style="min-height:140px;">' + esc((e.corpo || []).join('\n\n')) + '</textarea>') +
      '<div class="field"><label>Programa</label><div class="rep" id="repProg"></div>' +
      '<button type="button" class="add-row" id="addProg">' + ICN.plus + 'Adicionar ponto do programa</button></div>';
    c.innerHTML = editorShell(e.id ? 'Editar evento' : 'Novo evento', body, e.id ? 'evento.html?id=' + e.id : '');
    wireImgPicker(e.img);

    var repProg = $('#repProg');
    function progRow(h, t) {
      var row = el('div', { class: 'rep__row' });
      row.innerHTML = '<input type="text" class="pg-h" style="max-width:120px;" placeholder="09h00 / Dia 1" value="' + esc(h) + '">' +
        '<input type="text" class="pg-t" placeholder="Descrição do ponto" value="' + esc(t) + '">' +
        '<button type="button" class="icon-btn danger rep__del" title="Remover">' + ICN.del + '</button>';
      row.querySelector('.rep__del').addEventListener('click', function () { row.remove(); });
      return row;
    }
    (e.programa && e.programa.length ? e.programa : []).forEach(function (p) { repProg.appendChild(progRow(p.h, p.t)); });
    $('#addProg').addEventListener('click', function () { repProg.appendChild(progRow('', '')); });

    bindEditor(function () {
      var titulo = $('#f_titulo').value.trim();
      if (!titulo) { $('#f_titulo').focus(); return null; }
      var prog = $$('#repProg .rep__row').map(function (r) { return { h: r.querySelector('.pg-h').value.trim(), t: r.querySelector('.pg-t').value.trim() }; }).filter(function (p) { return p.h || p.t; });
      return {
        id: e.id, slug: e.slug || '', titulo: titulo, tipo: $('#f_tipo').value, data: $('#f_data').value,
        horaIni: $('#f_hi').value.trim(), horaFim: $('#f_hf').value.trim(), local: $('#f_local').value.trim(),
        cidade: $('#f_cidade').value.trim(), img: getImg(), inscricao: $('#f_insc').checked,
        preco: $('#f_preco').value.trim(), resumo: $('#f_resumo').value.trim(),
        corpo: $('#f_corpo').value.split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean),
        programa: prog
      };
    }, 'events');
  }

  /* ----- COURSE EDITOR (with video lessons) ----- */
  function renderCourseEditor(c, k) {
    k = k || {};
    var body =
      field('Título', '<input type="text" id="f_titulo" value="' + esc(k.titulo) + '" required>', true) +
      '<div class="grid3">' +
        field('Área', '<select id="f_area">' + opts(AREAS, k.area) + '</select>', true) +
        field('Nível', '<select id="f_nivel">' + opts(NIVEIS, k.nivel) + '</select>') +
        field('Modalidade', '<select id="f_mod">' + opts(MODALIDADES, k.modalidade) + '</select>') +
      '</div>' +
      '<div class="grid3">' +
        field('Duração', '<input type="text" id="f_dur" value="' + esc(k.duracao || '16 horas') + '">') +
        field('Início', '<input type="text" id="f_inicio" value="' + esc(k.inicio || '01 Jul 2026') + '">') +
        field('Preço (AOA)', '<input type="number" id="f_preco" value="' + esc(k.preco || 0) + '" min="0">') +
      '</div>' +
      '<div class="grid2">' +
        field('Formador', '<input type="text" id="f_form" value="' + esc(k.formador) + '">') +
        field('Cargo do formador', '<input type="text" id="f_formrole" value="' + esc(k.formadorRole) + '">') +
      '</div>' +
      field('Descrição', '<textarea id="f_desc" style="min-height:80px;" required>' + esc(k.desc) + '</textarea>', true) +
      field('Programa (módulos)', '<textarea id="f_modulos" style="min-height:110px;">' + esc((k.modulos || []).join('\n')) + '</textarea>') +
      '<div class="hint" style="margin-top:-10px;margin-bottom:16px;">Um módulo por linha.</div>' +
      '<div class="field"><label>Aulas em vídeo</label><div class="rep" id="repLessons"></div>' +
      '<button type="button" class="add-row" id="addLesson">' + ICN.plus + 'Adicionar aula em vídeo</button></div>';
    c.innerHTML = editorShell(k.id ? 'Editar curso' : 'Novo curso', body, 'formacao.html');

    var rep = $('#repLessons');
    function lessonRow(l) {
      l = l || {};
      var row = el('div', { class: 'lesson-row' });
      row.innerHTML =
        '<div class="lr-head"><b>Aula</b><button type="button" class="icon-btn danger ls-del" title="Remover">' + ICN.del + '</button></div>' +
        '<input type="text" class="ls-t" placeholder="Título da aula" value="' + esc(l.titulo) + '">' +
        '<div class="grid2"><input type="url" class="ls-u" placeholder="URL do vídeo (YouTube, Vimeo ou .mp4)" value="' + esc(l.videoUrl) + '">' +
        '<input type="text" class="ls-d" placeholder="Duração (ex.: 12:30)" value="' + esc(l.duracao) + '"></div>' +
        '<label class="toggle"><input type="checkbox" class="ls-free"' + (l.gratis ? ' checked' : '') + '><span class="toggle__track"></span><span class="toggle__label">Prévia gratuita (visível sem inscrição)</span></label>';
      row.querySelector('.ls-del').addEventListener('click', function () { row.remove(); });
      return row;
    }
    (k.lessons || []).forEach(function (l) { rep.appendChild(lessonRow(l)); });
    $('#addLesson').addEventListener('click', function () { rep.appendChild(lessonRow({})); });

    bindEditor(function () {
      var titulo = $('#f_titulo').value.trim();
      if (!titulo) { $('#f_titulo').focus(); return null; }
      var lessons = $$('#repLessons .lesson-row').map(function (r) {
        return { titulo: r.querySelector('.ls-t').value.trim(), videoUrl: r.querySelector('.ls-u').value.trim(), duracao: r.querySelector('.ls-d').value.trim(), gratis: r.querySelector('.ls-free').checked };
      }).filter(function (l) { return l.titulo; });
      return {
        id: k.id, titulo: titulo, area: $('#f_area').value, nivel: $('#f_nivel').value, modalidade: $('#f_mod').value,
        duracao: $('#f_dur').value.trim(), inicio: $('#f_inicio').value.trim(), preco: Number($('#f_preco').value) || 0,
        rating: k.rating || 4.7, formador: $('#f_form').value.trim(), formadorRole: $('#f_formrole').value.trim(),
        desc: $('#f_desc').value.trim(),
        modulos: $('#f_modulos').value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean),
        lessons: lessons
      };
    }, 'courses');
  }

  function bindEditor(collect, type) {
    $('#cancelBtn').addEventListener('click', function () { route(type); });
    $('#editorForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var data = collect();
      if (!data) return;
      CMS.save(type, data);
      toast(data.id ? 'Alterações guardadas.' : 'Publicado com sucesso.');
      route(type);
    });
  }

  /* ---------- BOOT ---------- */
  $('#yr').textContent = new Date().getFullYear();
  if (isAuthed()) showApp(); else showLogin();
})();
