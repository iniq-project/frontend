/* INIQ — Normas Técnicas: tabs, catalog, request/contribution modal */
(function () {
  'use strict';

  /* ---------- Catalog data ---------- */
  var NORMAS = [
    { code: 'NA 0042:2025', title: 'Águas de consumo humano — Requisitos de qualidade', sector: 'Ambiente', price: 12500 },
    { code: 'NA 0309:2024', title: 'Cimento Portland — Especificações e ensaios', sector: 'Construção', price: 15000 },
    { code: 'NA 0756:2023', title: 'Segurança de brinquedos — Requisitos gerais', sector: 'Gestão', price: 9800 },
    { code: 'NA 0118:2025', title: 'Rotulagem geral de géneros alimentícios', sector: 'Alimentar', price: 11000 },
    { code: 'NA 0501:2024', title: 'Betão — Especificação, desempenho e conformidade', sector: 'Construção', price: 16500 },
    { code: 'NA 0677:2023', title: 'Óleos alimentares — Métodos de amostragem', sector: 'Alimentar', price: 8500 },
    { code: 'NA 0205:2025', title: 'Sistemas de gestão da qualidade — Requisitos', sector: 'Gestão', price: 18000 },
    { code: 'NA 0880:2024', title: 'Qualidade do ar ambiente — Métodos de medição', sector: 'Ambiente', price: 13200 },
    { code: 'NA 0444:2023', title: 'Água potável — Parâmetros microbiológicos', sector: 'Ambiente', price: 10500 },
    { code: 'NA 0367:2025', title: 'Aço para betão armado — Varões nervurados', sector: 'Construção', price: 14000 }
  ];

  function fmt(n) { return n.toLocaleString('pt-PT'); }

  var catalogEl = document.getElementById('catalog');
  var emptyEl = document.getElementById('catalogEmpty');
  var searchEl = document.getElementById('catalogSearch');
  var filterEl = document.getElementById('catalogFilter');
  var activeSector = 'todos';

  function renderCatalog() {
    if (!catalogEl) return;
    var q = (searchEl.value || '').trim().toLowerCase();
    var rows = NORMAS.filter(function (n) {
      var matchSector = activeSector === 'todos' || n.sector === activeSector;
      var matchQ = !q || n.code.toLowerCase().indexOf(q) > -1 || n.title.toLowerCase().indexOf(q) > -1;
      return matchSector && matchQ;
    });
    catalogEl.innerHTML = rows.map(function (n) {
      return '' +
        '<div class="catalog__row">' +
          '<div class="catalog__info">' +
            '<div class="code">' + n.code + ' <span class="badge badge--sector">' + n.sector + '</span></div>' +
            '<div class="title">' + n.title + '</div>' +
          '</div>' +
          '<div class="catalog__price"><div class="v">' + fmt(n.price) + ' <span class="u">AOA</span></div></div>' +
          '<button class="btn btn--primary" data-req-code="' + n.code + '" data-req-title="' + n.title.replace(/"/g, '&quot;') + '" data-req-price="' + n.price + '">Solicitar</button>' +
        '</div>';
    }).join('');
    emptyEl.style.display = rows.length ? 'none' : 'block';
  }

  if (searchEl) searchEl.addEventListener('input', renderCatalog);
  if (filterEl) {
    filterEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      filterEl.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      activeSector = chip.dataset.sector;
      renderCatalog();
    });
  }
  renderCatalog();

  /* ---------- Tabs ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  function activateTab(id, scroll) {
    tabBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.tab === id); });
    panels.forEach(function (p) { p.classList.toggle('is-active', p.id === id); });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    if (scroll) {
      var bar = document.querySelector('.tabs-bar');
      var y = bar ? bar.getBoundingClientRect().bottom + window.scrollY - 80 : 0;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }
  tabBtns.forEach(function (b) {
    b.addEventListener('click', function () { activateTab(b.dataset.tab, false); });
  });
  // deep link via hash on load
  var validTabs = ['comissoes', 'venda', 'consulta'];
  var hash = (location.hash || '').replace('#', '');
  if (validTabs.indexOf(hash) > -1) activateTab(hash, false);
  // links that jump to a tab (e.g. Catálogo de Normas button)
  document.querySelectorAll('[data-tab-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = a.dataset.tabLink;
      if (a.getAttribute('href') && a.getAttribute('href').indexOf('normas-tecnicas.html') === 0) return; // cross-page nav
      e.preventDefault();
      activateTab(target, true);
    });
  });
  // honor ?tab or hash coming from other pages already handled; also handle direct hash to #venda from button
  if (location.hash === '#venda') activateTab('venda', false);

  /* ---------- Modal ---------- */
  var modal = document.getElementById('reqModal');
  var modalEyebrow = document.getElementById('modalEyebrow');
  var modalTitle = document.getElementById('modalTitle');
  var modalRef = document.getElementById('modalRef');
  var formWrap = document.getElementById('formWrap');
  var successState = document.getElementById('successState');
  var contribField = document.getElementById('contribField');
  var payField = document.getElementById('payField');
  var submitBtn = document.getElementById('submitBtn');
  var form = document.getElementById('reqForm');
  var lastFocus = null;

  function openModal(mode, ref) {
    lastFocus = document.activeElement;
    form.reset();
    formWrap.classList.remove('hide');
    successState.classList.remove('show');
    syncPaySelection();
    if (mode === 'contrib') {
      modalEyebrow.textContent = 'Consulta Pública';
      modalTitle.textContent = 'Submeter Contribuição';
      contribField.style.display = '';
      payField.style.display = 'none';
      submitBtn.childNodes[0].nodeValue = 'Enviar contribuição ';
    } else {
      modalEyebrow.textContent = 'Venda de Normas';
      modalTitle.textContent = 'Solicitar Norma';
      contribField.style.display = 'none';
      payField.style.display = '';
      submitBtn.childNodes[0].nodeValue = 'Submeter pedido ';
    }
    modalRef.textContent = ref || '';
    modal.dataset.mode = mode;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('f-nome').focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  // open from "Solicitar" (catalog) and "Contribuir" (consulta)
  document.addEventListener('click', function (e) {
    var solic = e.target.closest('[data-req-code]');
    if (solic) {
      openModal('venda', solic.dataset.reqCode + ' — ' + solic.dataset.reqTitle);
      return;
    }
    var contrib = e.target.closest('[data-contrib]');
    if (contrib) {
      openModal('contrib', contrib.dataset.contrib);
      return;
    }
    if (e.target.closest('[data-modal-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // payment option visual selection
  function syncPaySelection() {
    document.querySelectorAll('.pay-opt').forEach(function (opt) {
      var input = opt.querySelector('input');
      opt.classList.toggle('sel', input.checked);
    });
  }
  document.querySelectorAll('.pay-opt input').forEach(function (i) {
    i.addEventListener('change', syncPaySelection);
  });

  // generate a reference like INIQ-2026-04821
  function genRef() {
    var n = Math.floor(10000 + Math.random() * 89999);
    return 'INIQ-2026-' + n;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // basic validation
      var required = form.querySelectorAll('[required]');
      var ok = true;
      required.forEach(function (f) {
        if (!f.value.trim()) { f.style.borderColor = '#c0392b'; ok = false; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) return;

      var ref = genRef();
      document.getElementById('orderRef').textContent = 'REF: ' + ref;
      var isContrib = modal.dataset.mode === 'contrib';
      document.getElementById('successTitle').textContent = isContrib ? 'Contribuição enviada com sucesso' : 'Pedido submetido com sucesso';
      var pay = (form.querySelector('input[name="pagamento"]:checked') || {}).value || 'Referência Multicaixa';
      document.getElementById('successMsg').textContent = isContrib
        ? 'A sua contribuição foi registada e será analisada pela Comissão Técnica responsável. Receberá por e-mail o resultado do tratamento.'
        : 'Receberá por e-mail os dados de pagamento (' + pay + '). Após confirmação, a norma fica imediatamente disponível na sua área reservada.';
      formWrap.classList.add('hide');
      successState.classList.add('show');
      var panel = document.querySelector('.modal__panel');
      if (panel) panel.scrollTop = 0;
    });
  }
})();
