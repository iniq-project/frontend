/* INIQ — Formação e Certificação: catálogo de cursos + inscrição/pagamento
   NOTE: COURSES is the data structure that the backend will populate.
   Replace the array below with a fetch() to the courses API when integrating. */
(function () {
  'use strict';

  var COURSES = (window.COURSES && window.COURSES.length) ? window.COURSES : [
    {
      id: 'qua-9001', titulo: 'Auditor Interno da Qualidade ISO 9001',
      area: 'Qualidade', nivel: 'Avançado', duracao: '24 horas', modalidade: 'Presencial',
      inicio: '14 Jul 2026', preco: 85000, rating: 4.9, formador: 'Eng.ª Marta Quissanga', formadorRole: 'Auditora Líder IRCA',
      desc: 'Forme-se como auditor interno de sistemas de gestão da qualidade segundo a ISO 9001:2015.',
      modulos: ['Fundamentos da ISO 9001:2015', 'Abordagem por processos e risco', 'Técnicas de auditoria interna', 'Gestão de não-conformidades', 'Relatório e seguimento de auditoria']
    },
    {
      id: 'met-cal', titulo: 'Fundamentos de Metrologia e Calibração',
      area: 'Metrologia', nivel: 'Intermédio', duracao: '16 horas', modalidade: 'Online',
      inicio: '02 Jul 2026', preco: 45000, rating: 4.7, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
      desc: 'Conceitos essenciais de metrologia, incerteza de medição e rastreabilidade ao SI.',
      modulos: ['Sistema Internacional de Unidades (SI)', 'Rastreabilidade metrológica', 'Incerteza de medição', 'Boas práticas de calibração', 'Interpretação de certificados']
    },
    {
      id: 'nor-int', titulo: 'Interpretação e Aplicação de Normas Técnicas',
      area: 'Normalização', nivel: 'Iniciante', duracao: '8 horas', modalidade: 'Online',
      inicio: '23 Jun 2026', preco: 28000, rating: 4.6, formador: 'Dra. Inês Cabral', formadorRole: 'Gestora de Normalização',
      desc: 'Aprenda a ler, interpretar e aplicar normas técnicas nos processos da sua organização.',
      modulos: ['O que é uma norma técnica', 'Estrutura e tipos de normas', 'Como aplicar requisitos normativos', 'Catálogo nacional de normas']
    },
    {
      id: 'ali-haccp', titulo: 'Segurança Alimentar e Sistema HACCP',
      area: 'Segurança Alimentar', nivel: 'Intermédio', duracao: '20 horas', modalidade: 'Híbrido',
      inicio: '09 Jul 2026', preco: 65000, rating: 4.8, formador: 'Eng.º Paulo Tchindandi', formadorRole: 'Consultor de Segurança Alimentar',
      desc: 'Implemente o sistema HACCP e garanta a segurança dos géneros alimentícios.',
      modulos: ['Perigos e análise de risco', 'Os 7 princípios HACCP', 'Pré-requisitos e boas práticas', 'Plano HACCP na prática', 'Verificação e registos']
    },
    {
      id: 'qua-tqm', titulo: 'Gestão da Qualidade Total (TQM)',
      area: 'Qualidade', nivel: 'Avançado', duracao: '32 horas', modalidade: 'Presencial',
      inicio: '21 Jul 2026', preco: 95000, rating: 4.9, formador: 'Eng.ª Marta Quissanga', formadorRole: 'Auditora Líder IRCA',
      desc: 'Estratégias de melhoria contínua e excelência organizacional baseadas em TQM.',
      modulos: ['Princípios da Qualidade Total', 'Ferramentas da qualidade', 'Ciclo PDCA e melhoria contínua', 'Indicadores e KPI', 'Cultura da qualidade']
    },
    {
      id: 'nor-rot', titulo: 'Boas Práticas de Rotulagem e Embalagem',
      area: 'Normalização', nivel: 'Iniciante', duracao: '12 horas', modalidade: 'Online',
      inicio: '30 Jun 2026', preco: 35000, rating: 4.5, formador: 'Dra. Inês Cabral', formadorRole: 'Gestora de Normalização',
      desc: 'Requisitos legais e normativos para a rotulagem e embalagem de produtos.',
      modulos: ['Requisitos de rotulagem obrigatória', 'Informação ao consumidor', 'Embalagem e conformidade', 'Casos práticos']
    },
    {
      id: 'qua-17025', titulo: 'Acreditação de Laboratórios ISO/IEC 17025',
      area: 'Qualidade', nivel: 'Avançado', duracao: '24 horas', modalidade: 'Presencial',
      inicio: '28 Jul 2026', preco: 88000, rating: 4.8, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
      desc: 'Prepare o seu laboratório para a acreditação segundo a ISO/IEC 17025.',
      modulos: ['Requisitos de gestão e técnicos', 'Validação de métodos', 'Estimativa de incerteza', 'Auditoria interna do laboratório', 'Processo de acreditação']
    },
    {
      id: 'met-legal', titulo: 'Metrologia Legal para Operadores',
      area: 'Metrologia', nivel: 'Intermédio', duracao: '16 horas', modalidade: 'Híbrido',
      inicio: '16 Jul 2026', preco: 52000, rating: 4.6, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
      desc: 'Controlo metrológico legal de instrumentos: verificação, selagem e obrigações.',
      modulos: ['Enquadramento da metrologia legal', 'Instrumentos sujeitos a controlo', 'Verificação inicial e periódica', 'Obrigações dos operadores']
    }
  ];

  function fmt(n){ return n.toLocaleString('pt-PT'); }
  var AREA_COVER = {
    'Qualidade': 'assets/cover-qualidade.jpg',
    'Metrologia': 'assets/cover-metrologia.jpg',
    'Normalização': 'assets/cover-normalizacao.jpg',
    'Segurança Alimentar': 'assets/cover-seguranca.jpg'
  };
  function coverFor(area){ return AREA_COVER[area] || 'assets/cover-qualidade.jpg'; }
  function initials(name){ return name.replace(/^(Eng\.ª|Eng\.º|Dr\.|Dra\.)\s*/,'').split(' ').slice(0,2).map(function(w){return w[0];}).join('').toUpperCase(); }

  var grid = document.getElementById('courseGrid');
  var search = document.getElementById('courseSearch');
  var filter = document.getElementById('courseFilter');
  var statCursos = document.getElementById('statCursos');
  var activeArea = 'todos';

  if (statCursos) statCursos.textContent = COURSES.length;

  function render(){
    var q = (search.value || '').trim().toLowerCase();
    var list = COURSES.filter(function(c){
      var ma = activeArea === 'todos' || c.area === activeArea;
      var mq = !q || c.titulo.toLowerCase().indexOf(q) > -1 || c.area.toLowerCase().indexOf(q) > -1 || c.desc.toLowerCase().indexOf(q) > -1;
      return ma && mq;
    });
    if (!list.length){
      grid.innerHTML = '<div class="courses-empty">Nenhum curso corresponde à pesquisa.</div>';
      return;
    }
    grid.innerHTML = list.map(function(c){
      return '' +
      '<article class="course" data-id="'+c.id+'">' +
        '<div class="course__thumb">' +
          '<img class="course__img" src="'+coverFor(c.area)+'" alt="'+c.area+'">' +
          '<span class="course__cat">'+c.area+'</span>' +
          '<span class="course__level level--'+c.nivel+'">'+c.nivel+'</span>' +
        '</div>' +
        '<div class="course__body">' +
          '<h3>'+c.titulo+'</h3>' +
          '<p class="course__desc">'+c.desc+'</p>' +
          '<div class="course__meta">' +
            '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'+c.duracao+'</span>' +
            '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8"/></svg>'+c.modalidade+'</span>' +
            '<span class="course__rating"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.9 1-5.8L3.5 9.2l5.9-.9L12 3Z"/></svg>'+c.rating.toFixed(1)+'</span>' +
          '</div>' +
          '<div class="course__foot">' +
            '<div class="course__price"><span class="v">'+fmt(c.preco)+'</span> <span class="u">AOA</span></div>' +
            '<button class="btn btn--primary" data-open="'+c.id+'">Ver curso</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  if (search) search.addEventListener('input', render);
  if (filter) filter.addEventListener('click', function(e){
    var chip = e.target.closest('.chip'); if (!chip) return;
    filter.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    activeArea = chip.dataset.area;
    render();
  });
  render();

  /* ---------- Modal ---------- */
  var modal = document.getElementById('courseModal');
  var cdView = document.getElementById('cdView');
  var enrollView = document.getElementById('enrollView');
  var enrollSuccess = document.getElementById('enrollSuccess');
  var current = null;
  var lastFocus = null;

  function showView(which){
    cdView.classList.toggle('show', which === 'cd');
    cdView.style.display = which === 'cd' ? '' : 'none';
    enrollView.style.display = which === 'enroll' ? '' : 'none';
    enrollSuccess.style.display = which === 'success' ? '' : 'none';
    var panel = modal.querySelector('.modal__panel');
    if (panel) panel.scrollTop = 0;
  }

  function openCourse(id){
    var c = COURSES.find(function(x){ return x.id === id; });
    if (!c) return;
    current = c;
    lastFocus = document.activeElement;
    document.getElementById('cdThumb').src = coverFor(c.area);
    document.getElementById('cdThumb').alt = c.area + ' · ' + c.titulo;
    document.getElementById('cdCat').textContent = c.area;
    var lvl = document.getElementById('cdLevel'); lvl.textContent = c.nivel;
    document.getElementById('cdTitle').textContent = c.titulo;
    document.getElementById('cdDesc').textContent = c.desc;
    document.getElementById('cdDur').textContent = c.duracao;
    document.getElementById('cdMod').textContent = c.modalidade;
    document.getElementById('cdStart').textContent = c.inicio;
    document.getElementById('cdPrice').textContent = fmt(c.preco);
    document.getElementById('cdIns').textContent = c.formador;
    document.getElementById('cdInsRole').textContent = c.formadorRole;
    document.getElementById('cdInsAv').textContent = initials(c.formador);
    document.getElementById('cdModules').innerHTML = c.modulos.map(function(m,i){
      return '<li><span class="n">'+String(i+1).padStart(2,'0')+'</span> '+m+'</li>';
    }).join('');
    renderLessons(c);
    showView('cd');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', function(e){
    var openBtn = e.target.closest('[data-open]');
    if (openBtn){ openCourse(openBtn.dataset.open); return; }
    var card = e.target.closest('.course');
    if (card && !e.target.closest('button')){ openCourse(card.dataset.id); return; }
    if (e.target.closest('[data-modal-close]')){ closeModal(); }
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // detail -> enrollment
  document.getElementById('cdEnrollBtn').addEventListener('click', function(){
    if (!current) return;
    document.getElementById('enrollTitle').textContent = 'Inscrição — ' + current.titulo;
    document.getElementById('enrollCourse').textContent = current.area + ' · ' + current.duracao + ' · ' + current.modalidade;
    document.getElementById('enrollPrice').textContent = fmt(current.preco);
    showView('enroll');
  });
  document.getElementById('enrollBack').addEventListener('click', function(){ showView('cd'); });

  // payment visual selection
  document.querySelectorAll('#enrollForm .pay-opt input').forEach(function(i){
    i.addEventListener('change', function(){
      document.querySelectorAll('#enrollForm .pay-opt').forEach(function(opt){
        opt.classList.toggle('sel', opt.querySelector('input').checked);
      });
    });
  });

  function genMatricula(){
    return 'INIQ-FOR-' + Math.floor(10000 + Math.random()*89999);
  }

  function renderLessons(c){
    var block = document.getElementById('cdVideoBlock');
    var playerEl = document.getElementById('cdPlayer');
    var listEl = document.getElementById('cdLessons');
    var lessons = (c.lessons || []).filter(function(l){ return l && l.titulo; });
    if (!block || !lessons.length){ if (block) block.style.display = 'none'; return; }
    block.style.display = '';

    function play(i){
      var l = lessons[i];
      listEl.querySelectorAll('li').forEach(function(li,idx){ li.classList.toggle('is-playing', idx===i); });
      var em = window.INIQ_VIDEO ? window.INIQ_VIDEO.embed(l.videoUrl) : null;
      if (!em){ playerEl.innerHTML = '<div class="cd__player-empty">Vídeo indisponível</div>'; return; }
      if (em.type === 'video'){
        playerEl.innerHTML = '<video src="'+em.src+'" controls playsinline style="width:100%;height:100%;background:#000;"></video>';
      } else {
        playerEl.innerHTML = '<iframe src="'+em.src+'" title="'+l.titulo+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      }
    }

    listEl.innerHTML = lessons.map(function(l,i){
      var lock = l.gratis
        ? '<span class="cd__lesson-free">Prévia</span>'
        : '<span class="cd__lesson-lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg></span>';
      return '<li data-i="'+i+'"'+(l.gratis?' class="playable"':'')+'>' +
        '<span class="cd__lesson-ico"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></span>' +
        '<span class="cd__lesson-title">'+l.titulo+'</span>' +
        '<span class="cd__lesson-dur">'+(l.duracao||'')+'</span>' + lock +
      '</li>';
    }).join('');

    listEl.querySelectorAll('li').forEach(function(li){
      li.addEventListener('click', function(){
        var i = Number(li.dataset.i);
        if (lessons[i].gratis){ play(i); }
        else {
          playerEl.innerHTML = '<div class="cd__player-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:34px;height:34px;margin-bottom:10px;"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg><div>Inscreva-se para aceder a esta aula</div></div>';
          listEl.querySelectorAll('li').forEach(function(x){ x.classList.remove('is-playing'); });
        }
      });
    });

    // autoplay first free lesson preview
    var firstFree = lessons.findIndex(function(l){ return l.gratis; });
    if (firstFree > -1) play(firstFree);
    else playerEl.innerHTML = '<div class="cd__player-empty">Aulas disponíveis após inscrição</div>';
  }


  document.getElementById('enrollForm').addEventListener('submit', function(e){
    e.preventDefault();
    var form = e.target;
    var req = form.querySelectorAll('[required]');
    var ok = true;
    req.forEach(function(f){ if(!f.value.trim()){ f.style.borderColor='#c0392b'; ok=false; } else { f.style.borderColor=''; } });
    if (!ok) return;
    document.getElementById('enrollRef').textContent = 'MATRÍCULA: ' + genMatricula();
    showView('success');
  });
})();
