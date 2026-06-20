/* ============================================================
   INIQ — CMS content store (shared by public site + admin)
   Single source of truth, persisted in localStorage.
   Seeds from the built-in defaults on first load.
   Backend note: swap loadState()/saveState() for API calls
   (GET /content, PUT /content) keeping the same shape.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'iniq_cms_v1';

  /* ---------------- SEED DATA ---------------- */
  var SEED = {
    news: [
      { id: 1, slug: 'consulta-publica-12-projectos-norma', titulo: 'INIQ abre consulta pública de 12 novos projectos de norma', cat: 'Normalização', data: '2026-06-02', img: 'assets/cover-normalizacao.jpg',
        resumo: 'Empresas e cidadãos podem contribuir até ao final do mês para os projectos de norma em discussão pública, em áreas como construção, alimentar e gestão.',
        corpo: [
          'O Instituto Nacional das Infra-Estruturas da Qualidade (INIQ) abriu hoje um novo período de consulta pública que abrange doze projectos de norma técnica, em sectores estratégicos para a economia nacional.',
          'A iniciativa insere-se no compromisso do Instituto com a transparência e a participação alargada na elaboração das normas angolanas. Qualquer interessado — empresa, instituição, técnico ou cidadão — pode submeter contribuições estruturadas dentro do prazo definido para cada projecto.',
          'As contribuições recebidas são analisadas pelas Comissões Técnicas responsáveis e o seu tratamento é publicado em relatório anexo à versão final de cada norma.',
          'Os projectos em consulta podem ser consultados na área de Normas Técnicas do portal, onde está igualmente disponível o formulário de submissão de contribuições.'
        ] },
      { id: 2, slug: 'metrologia-reforca-calibracao', titulo: 'Laboratório Nacional de Metrologia reforça capacidade de calibração', cat: 'Metrologia', data: '2026-05-28', img: 'assets/cover-metrologia.jpg',
        resumo: 'Novos padrões de referência elevam a rastreabilidade das medições no país a referências internacionais, beneficiando a indústria e o comércio.',
        corpo: [
          'O Laboratório Nacional de Metrologia do INIQ reforçou a sua capacidade técnica com a aquisição de novos padrões de referência, ampliando a oferta de serviços de calibração disponíveis para a indústria nacional.',
          'Com esta evolução, o Instituto passa a assegurar a rastreabilidade de um maior número de grandezas ao Sistema Internacional de Unidades (SI), um requisito essencial para a fiabilidade das medições.',
          'A metrologia é uma componente silenciosa mas decisiva da qualidade: garante que uma medição feita em Luanda é coerente e reconhecida em qualquer parte do mundo.'
        ] },
      { id: 3, slug: 'forum-iniq-cplp-luanda', titulo: 'Angola acolhe reunião do Fórum das IE da Qualidade da CPLP', cat: 'CPLP', data: '2026-05-19', img: 'assets/cover-cplp.jpg',
        resumo: 'O encontro reúne os institutos lusófonos para a harmonização de normas, metrologia e acreditação no espaço da CPLP.',
        corpo: [
          'Luanda recebe a reunião do Fórum das Infra-Estruturas da Qualidade da CPLP (FIQ-CPLP), que junta representantes dos institutos da qualidade dos países de língua portuguesa.',
          'Em agenda estão a harmonização de normas, o reconhecimento mútuo de certificados e a cooperação em metrologia e acreditação, com vista a facilitar o comércio entre os Estados-membros.',
          'A participação do INIQ no Fórum reforça o posicionamento de Angola na cooperação técnica internacional.'
        ] },
      { id: 4, slug: 'premio-nacional-qualidade-2026', titulo: 'Prémio Nacional da Qualidade 2026 abre candidaturas', cat: 'Qualidade', data: '2026-05-12', img: 'assets/cover-qualidade.jpg',
        resumo: 'Organizações de todos os sectores podem candidatar-se ao reconhecimento máximo da excelência em gestão da qualidade em Angola.',
        corpo: [
          'Estão abertas as candidaturas ao Prémio Nacional da Qualidade 2026, a distinção que reconhece as organizações angolanas que se destacam pelas boas práticas de gestão.',
          'O prémio avalia as candidaturas segundo critérios de liderança, estratégia, processos, pessoas e resultados.',
          'A cerimónia de entrega decorrerá durante a Semana Nacional da Qualidade.'
        ] },
      { id: 5, slug: 'rotulagem-produtos-alimentares', titulo: 'Novas regras de rotulagem de produtos alimentares em discussão', cat: 'Normalização', data: '2026-05-05', img: 'assets/cover-seguranca.jpg',
        resumo: 'O projecto de norma sobre rotulagem de géneros alimentícios pré-embalados está em consulta pública até 30 de Junho.',
        corpo: [
          'O projecto de norma sobre a rotulagem de produtos alimentares pré-embalados encontra-se em consulta pública, definindo requisitos de informação obrigatória, declaração nutricional e identificação de alergénios.',
          'A medida visa reforçar a protecção e a informação do consumidor.',
          'As empresas do sector agro-alimentar são especialmente convidadas a contribuir.'
        ] },
      { id: 6, slug: 'formacao-120-auditores', titulo: 'INIQ forma 120 auditores internos da qualidade', cat: 'Formação', data: '2026-04-27', img: 'assets/cover-qualidade.jpg',
        resumo: 'Mais uma edição do programa de capacitação certificou dezenas de profissionais em auditoria de sistemas de gestão da qualidade.',
        corpo: [
          'O INIQ concluiu mais uma edição do curso de Auditor Interno da Qualidade, certificando 120 profissionais de empresas e instituições.',
          'A formação capacita os participantes para planear e conduzir auditorias internas segundo a ISO 9001.',
          'Os programas de formação do Instituto estão disponíveis em modalidade presencial, online e híbrida.'
        ] },
      { id: 7, slug: 'protocolo-institutos-cplp', titulo: 'INIQ assina protocolo de cooperação com institutos da CPLP', cat: 'CPLP', data: '2026-04-15', img: 'assets/cover-cplp.jpg',
        resumo: 'O acordo prevê a partilha de normas, formação conjunta e reconhecimento de certificados entre os países lusófonos.',
        corpo: [
          'O Instituto assinou um protocolo de cooperação técnica com congéneres da CPLP.',
          'A cooperação no espaço lusófono é uma prioridade estratégica, por aproximar mercados que partilham a língua.'
        ] },
      { id: 8, slug: 'jornada-portas-abertas', titulo: 'Sede do INIQ recebe jornada de portas abertas', cat: 'Qualidade', data: '2026-04-03', img: 'assets/cover-sede.jpg',
        resumo: 'O Instituto abriu as portas a estudantes e empresas para dar a conhecer o trabalho das suas direcções técnicas.',
        corpo: [
          'A sede do INIQ, no Edifício Palácio do Vidro, recebeu uma jornada de portas abertas dirigida a estudantes, empresas e público em geral.',
          'Os visitantes conheceram de perto o trabalho das direcções de normalização, metrologia e avaliação da conformidade.'
        ] }
    ],

    events: [
      { id: 1, slug: 'semana-nacional-qualidade-2026', titulo: 'Semana Nacional da Qualidade 2026', tipo: 'Conferência', data: '2026-06-17', horaIni: '08h30', horaFim: '17h00', local: 'Centro de Convenções de Talatona', cidade: 'Luanda', img: 'assets/cover-qualidade.jpg', inscricao: true, preco: 'Entrada gratuita · inscrição obrigatória',
        resumo: 'O maior encontro anual dedicado à qualidade em Angola, reunindo instituições, empresas e especialistas em torno da normalização, metrologia e avaliação da conformidade.',
        corpo: [
          'A Semana Nacional da Qualidade é o principal evento do calendário do INIQ, um espaço de reflexão e partilha sobre o papel da qualidade no desenvolvimento económico do país.',
          'Durante três dias, decorrem conferências, painéis temáticos, sessões de demonstração e a cerimónia de entrega do Prémio Nacional da Qualidade.',
          'A participação é gratuita, mas sujeita a inscrição prévia por limitação de lugares.'
        ],
        programa: [ { h: '08h30', t: 'Recepção e credenciamento' }, { h: '09h30', t: 'Sessão de abertura' }, { h: '10h30', t: 'Painel — A qualidade na diversificação da economia' }, { h: '14h00', t: 'Sessões técnicas paralelas' }, { h: '16h30', t: 'Cerimónia do Prémio Nacional da Qualidade' } ] },
      { id: 2, slug: 'workshop-regulamentos-importacao', titulo: 'Workshop — Aplicação de Regulamentos Técnicos na Importação', tipo: 'Formação', data: '2026-07-03', horaIni: '09h00', horaFim: '13h00', local: 'Sede do INIQ — Palácio do Vidro', cidade: 'Luanda', img: 'assets/cover-seguranca.jpg', inscricao: true, preco: '15 000 AOA por participante',
        resumo: 'Sessão prática dirigida a importadores e despachantes sobre a aplicação dos regulamentos técnicos e a certificação de produtos destinados à importação.',
        corpo: [
          'Este workshop aborda, de forma prática, os requisitos de conformidade aplicáveis aos produtos importados e os procedimentos de validação, verificação e certificação junto do INIQ.',
          'Destina-se a importadores, despachantes oficiais, gestores de qualidade e técnicos das áreas de comércio externo.',
          'No final, os participantes recebem um certificado de participação emitido pelo Instituto.'
        ],
        programa: [ { h: '09h00', t: 'Enquadramento legal e regulamentos aplicáveis' }, { h: '10h30', t: 'Procedimentos de certificação de importação' }, { h: '11h30', t: 'Casos práticos e esclarecimento de dúvidas' }, { h: '12h45', t: 'Encerramento e entrega de certificados' } ] },
      { id: 3, slug: 'cerimonia-premio-nacional-qualidade', titulo: 'Cerimónia do Prémio Nacional da Qualidade', tipo: 'Cerimónia', data: '2026-07-22', horaIni: '18h00', horaFim: '20h30', local: 'Auditório — Palácio do Vidro', cidade: 'Luanda', img: 'assets/cover-qualidade.jpg', inscricao: true, preco: 'Por convite',
        resumo: 'Cerimónia solene de entrega do Prémio Nacional da Qualidade às organizações distinguidas pela excelência da sua gestão.',
        corpo: [
          'A cerimónia do Prémio Nacional da Qualidade reconhece publicamente as organizações angolanas que se destacam pelas suas práticas de gestão.',
          'O evento reúne os finalistas, o júri, representantes do Governo e convidados do tecido empresarial nacional.'
        ],
        programa: [ { h: '18h00', t: 'Recepção dos convidados' }, { h: '18h30', t: 'Sessão de abertura' }, { h: '19h00', t: 'Entrega dos prémios por categoria' }, { h: '20h00', t: 'Encerramento' } ] },
      { id: 4, slug: 'jornada-metrologia-industria', titulo: 'Jornada de Metrologia para a Indústria', tipo: 'Conferência', data: '2026-08-14', horaIni: '09h00', horaFim: '16h00', local: 'Hotel de Convenções', cidade: 'Benguela', img: 'assets/cover-metrologia.jpg', inscricao: true, preco: 'Entrada gratuita · inscrição obrigatória',
        resumo: 'Encontro técnico sobre rastreabilidade metrológica, calibração e o impacto das medições fiáveis na competitividade industrial.',
        corpo: [
          'A Jornada de Metrologia leva à região de Benguela o debate sobre a importância das medições rigorosas para a indústria.',
          'Inclui demonstrações do Laboratório Nacional de Metrologia.'
        ],
        programa: [ { h: '09h00', t: 'Abertura e enquadramento' }, { h: '10h00', t: 'Rastreabilidade e o Sistema Internacional de Unidades' }, { h: '14h00', t: 'Demonstrações de calibração' } ] },
      { id: 5, slug: 'formacao-auditores-iso-9001', titulo: 'Formação de Auditores Internos ISO 9001', tipo: 'Formação', data: '2026-09-08', horaIni: '08h30', horaFim: '17h30', local: 'Centro de Formação do INIQ', cidade: 'Luanda', img: 'assets/cover-qualidade.jpg', inscricao: true, preco: '45 000 AOA · 3 dias',
        resumo: 'Curso intensivo de três dias para capacitar auditores internos de sistemas de gestão da qualidade segundo a norma ISO 9001.',
        corpo: [
          'Programa intensivo que prepara os participantes para planear, conduzir e reportar auditorias internas.',
          'A formação combina enquadramento teórico com exercícios práticos e confere certificação do INIQ.'
        ],
        programa: [ { h: 'Dia 1', t: 'Fundamentos da ISO 9001 e princípios de auditoria' }, { h: 'Dia 2', t: 'Planeamento e condução de auditorias' }, { h: 'Dia 3', t: 'Relato, seguimento e exame final' } ] },
      { id: 6, slug: 'forum-iniq-cplp-luanda-2026', titulo: 'Reunião do Fórum das IE da Qualidade da CPLP', tipo: 'Conferência', data: '2026-05-19', horaIni: '09h00', horaFim: '17h00', local: 'Sede do INIQ — Palácio do Vidro', cidade: 'Luanda', img: 'assets/cover-cplp.jpg', inscricao: false, preco: 'Evento institucional',
        resumo: 'Encontro dos institutos da qualidade dos países da CPLP para harmonização de normas, metrologia e acreditação.',
        corpo: [
          'Angola acolheu a reunião do Fórum das Infra-Estruturas da Qualidade da CPLP, que reuniu representantes dos institutos lusófonos.',
          'Em agenda estiveram a harmonização de normas e a cooperação técnica entre os Estados-membros.'
        ],
        programa: [] }
    ],

    courses: [
      { id: 'qua-9001', titulo: 'Auditor Interno da Qualidade ISO 9001', area: 'Qualidade', nivel: 'Avançado', duracao: '24 horas', modalidade: 'Presencial', inicio: '14 Jul 2026', preco: 85000, rating: 4.9, formador: 'Eng.ª Marta Quissanga', formadorRole: 'Auditora Líder IRCA',
        desc: 'Forme-se como auditor interno de sistemas de gestão da qualidade segundo a ISO 9001:2015.',
        modulos: ['Fundamentos da ISO 9001:2015', 'Abordagem por processos e risco', 'Técnicas de auditoria interna', 'Gestão de não-conformidades', 'Relatório e seguimento de auditoria'],
        lessons: [
          { titulo: 'Apresentação do curso e objectivos', duracao: '6:12', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: true },
          { titulo: 'A norma ISO 9001:2015 — estrutura', duracao: '14:30', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: false },
          { titulo: 'Planeamento de uma auditoria interna', duracao: '18:05', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: false }
        ] },
      { id: 'met-cal', titulo: 'Fundamentos de Metrologia e Calibração', area: 'Metrologia', nivel: 'Intermédio', duracao: '16 horas', modalidade: 'Online', inicio: '02 Jul 2026', preco: 45000, rating: 4.7, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
        desc: 'Conceitos essenciais de metrologia, incerteza de medição e rastreabilidade ao SI.',
        modulos: ['Sistema Internacional de Unidades (SI)', 'Rastreabilidade metrológica', 'Incerteza de medição', 'Boas práticas de calibração', 'Interpretação de certificados'],
        lessons: [
          { titulo: 'Introdução à metrologia', duracao: '8:40', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: true },
          { titulo: 'O Sistema Internacional de Unidades', duracao: '12:15', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: false }
        ] },
      { id: 'nor-int', titulo: 'Interpretação e Aplicação de Normas Técnicas', area: 'Normalização', nivel: 'Iniciante', duracao: '8 horas', modalidade: 'Online', inicio: '23 Jun 2026', preco: 28000, rating: 4.6, formador: 'Dra. Inês Cabral', formadorRole: 'Gestora de Normalização',
        desc: 'Aprenda a ler, interpretar e aplicar normas técnicas nos processos da sua organização.',
        modulos: ['O que é uma norma técnica', 'Estrutura e tipos de normas', 'Como aplicar requisitos normativos', 'Catálogo nacional de normas'],
        lessons: [ { titulo: 'O que é uma norma técnica', duracao: '7:20', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: true } ] },
      { id: 'ali-haccp', titulo: 'Segurança Alimentar e Sistema HACCP', area: 'Segurança Alimentar', nivel: 'Intermédio', duracao: '20 horas', modalidade: 'Híbrido', inicio: '09 Jul 2026', preco: 65000, rating: 4.8, formador: 'Eng.º Paulo Tchindandi', formadorRole: 'Consultor de Segurança Alimentar',
        desc: 'Implemente o sistema HACCP e garanta a segurança dos géneros alimentícios.',
        modulos: ['Perigos e análise de risco', 'Os 7 princípios HACCP', 'Pré-requisitos e boas práticas', 'Plano HACCP na prática', 'Verificação e registos'],
        lessons: [ { titulo: 'Perigos e análise de risco', duracao: '11:00', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', gratis: true } ] },
      { id: 'qua-tqm', titulo: 'Gestão da Qualidade Total (TQM)', area: 'Qualidade', nivel: 'Avançado', duracao: '32 horas', modalidade: 'Presencial', inicio: '21 Jul 2026', preco: 95000, rating: 4.9, formador: 'Eng.ª Marta Quissanga', formadorRole: 'Auditora Líder IRCA',
        desc: 'Estratégias de melhoria contínua e excelência organizacional baseadas em TQM.',
        modulos: ['Princípios da Qualidade Total', 'Ferramentas da qualidade', 'Ciclo PDCA e melhoria contínua', 'Indicadores e KPI', 'Cultura da qualidade'],
        lessons: [] },
      { id: 'nor-rot', titulo: 'Boas Práticas de Rotulagem e Embalagem', area: 'Normalização', nivel: 'Iniciante', duracao: '12 horas', modalidade: 'Online', inicio: '30 Jun 2026', preco: 35000, rating: 4.5, formador: 'Dra. Inês Cabral', formadorRole: 'Gestora de Normalização',
        desc: 'Requisitos legais e normativos para a rotulagem e embalagem de produtos.',
        modulos: ['Requisitos de rotulagem obrigatória', 'Informação ao consumidor', 'Embalagem e conformidade', 'Casos práticos'],
        lessons: [] },
      { id: 'qua-17025', titulo: 'Acreditação de Laboratórios ISO/IEC 17025', area: 'Qualidade', nivel: 'Avançado', duracao: '24 horas', modalidade: 'Presencial', inicio: '28 Jul 2026', preco: 88000, rating: 4.8, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
        desc: 'Prepare o seu laboratório para a acreditação segundo a ISO/IEC 17025.',
        modulos: ['Requisitos de gestão e técnicos', 'Validação de métodos', 'Estimativa de incerteza', 'Auditoria interna do laboratório', 'Processo de acreditação'],
        lessons: [] },
      { id: 'met-legal', titulo: 'Metrologia Legal para Operadores', area: 'Metrologia', nivel: 'Intermédio', duracao: '16 horas', modalidade: 'Híbrido', inicio: '16 Jul 2026', preco: 52000, rating: 4.6, formador: 'Dr. António Bengui', formadorRole: 'Especialista em Metrologia',
        desc: 'Controlo metrológico legal de instrumentos: verificação, selagem e obrigações.',
        modulos: ['Enquadramento da metrologia legal', 'Instrumentos sujeitos a controlo', 'Verificação inicial e periódica', 'Obrigações dos operadores'],
        lessons: [] }
    ]
  };

  /* ---------------- STORE ---------------- */
  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        // ensure all collections exist (forward-compat)
        ['news', 'events', 'courses'].forEach(function (k) { if (!Array.isArray(parsed[k])) parsed[k] = deepClone(SEED[k]); });
        return parsed;
      }
    } catch (e) { /* corrupt — reseed */ }
    var seeded = deepClone(SEED);
    saveState(seeded);
    return seeded;
  }
  function saveState(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var state = loadState();

  function nextNumericId(arr) {
    return arr.reduce(function (m, x) { return Math.max(m, Number(x.id) || 0); }, 0) + 1;
  }
  function slugify(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  }

  var INIQ_CMS = {
    KEY: KEY,
    list: function (type) { return deepClone(state[type] || []); },
    get: function (type, id) {
      var found = (state[type] || []).find(function (x) { return String(x.id) === String(id); });
      return found ? deepClone(found) : null;
    },
    save: function (type, item) {
      item = deepClone(item);
      var arr = state[type] || (state[type] = []);
      if (item.id === undefined || item.id === null || item.id === '') {
        if (type === 'courses') item.id = (slugify(item.area).slice(0, 3) || 'cur') + '-' + Date.now().toString(36);
        else item.id = nextNumericId(arr);
        if ('slug' in item && !item.slug) item.slug = slugify(item.titulo);
        arr.unshift(item);
      } else {
        var idx = arr.findIndex(function (x) { return String(x.id) === String(item.id); });
        if (idx > -1) arr[idx] = item; else arr.unshift(item);
      }
      saveState(state);
      return item;
    },
    remove: function (type, id) {
      var arr = state[type] || [];
      var idx = arr.findIndex(function (x) { return String(x.id) === String(id); });
      if (idx > -1) { arr.splice(idx, 1); saveState(state); return true; }
      return false;
    },
    reset: function () { state = deepClone(SEED); saveState(state); return state; },
    slugify: slugify,
    SEED: SEED
  };

  window.INIQ_CMS = INIQ_CMS;

  /* ---------------- PUBLIC GLOBALS (backward-compatible) ---------------- */
  window.NEWS = INIQ_CMS.list('news');
  window.EVENTS = INIQ_CMS.list('events');
  window.COURSES = INIQ_CMS.list('courses');

  window.NEWS_UTIL = {
    fmtDate: function (iso) {
      var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      var d = new Date(iso + 'T00:00:00');
      return d.getDate() + ' ' + meses[d.getMonth()] + ' ' + d.getFullYear();
    },
    byId: function (id) { return window.NEWS.find(function (n) { return String(n.id) === String(id); }); }
  };

  window.EVENTS_UTIL = {
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    mesesLongo: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    hoje: '2026-06-10',
    parse: function (iso) { return new Date(iso + 'T00:00:00'); },
    dia: function (iso) { return this.parse(iso).getDate(); },
    mesAbrev: function (iso) { return this.meses[this.parse(iso).getMonth()]; },
    dataLonga: function (iso) { var d = this.parse(iso); return d.getDate() + ' de ' + this.mesesLongo[d.getMonth()] + ' de ' + d.getFullYear(); },
    isPast: function (iso) { return iso < this.hoje; },
    byId: function (id) { return window.EVENTS.find(function (e) { return String(e.id) === String(id); }); }
  };

  /* ---------------- VIDEO EMBED HELPER ---------------- */
  window.INIQ_VIDEO = {
    embed: function (url) {
      if (!url) return null;
      var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
      if (yt) return { type: 'iframe', src: 'https://www.youtube.com/embed/' + yt[1] + '?rel=0' };
      var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vm) return { type: 'iframe', src: 'https://player.vimeo.com/video/' + vm[1] };
      if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: 'video', src: url };
      return { type: 'iframe', src: url };
    }
  };
})();
