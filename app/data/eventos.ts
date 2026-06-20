export interface Evento {
  id: number
  slug: string
  titulo: string
  tipo: string
  data: string
  horaIni: string
  horaFim: string
  local: string
  cidade: string
  img: string
  inscricao: boolean
  preco: string
  resumo: string
  corpo: string[]
  programa: Array<{ h: string; t: string }>
}

export const eventos: Evento[] = [
  {
    id: 1,
    slug: 'semana-nacional-qualidade-2026',
    titulo: 'Semana Nacional da Qualidade 2026',
    tipo: 'Conferência',
    data: '2026-06-17',
    horaIni: '08h30',
    horaFim: '17h00',
    local: 'Centro de Convenções de Talatona',
    cidade: 'Luanda',
    img: 'assets/cover-qualidade.jpg',
    inscricao: true,
    preco: 'Entrada gratuita · inscrição obrigatória',
    resumo: 'O maior encontro anual dedicado à qualidade em Angola, reunindo instituições, empresas e especialistas em torno da normalização, metrologia e avaliação da conformidade.',
    corpo: [
      'A Semana Nacional da Qualidade é o principal evento do calendário do INIQ, um espaço de reflexão e partilha sobre o papel da qualidade no desenvolvimento económico do país.',
      'Durante três dias, decorrem conferências, painéis temáticos, sessões de demonstração e a cerimónia de entrega do Prémio Nacional da Qualidade. O programa reúne oradores nacionais e internacionais, representantes do sector empresarial e da administração pública.',
      'A participação é gratuita, mas sujeita a inscrição prévia por limitação de lugares. As organizações interessadas em expor ou patrocinar devem contactar a Direcção-Geral do Instituto.'
    ],
    programa: [
      { h: '08h30', t: 'Recepção e credenciamento' },
      { h: '09h30', t: 'Sessão de abertura' },
      { h: '10h30', t: 'Painel — A qualidade na diversificação da economia' },
      { h: '14h00', t: 'Sessões técnicas paralelas' },
      { h: '16h30', t: 'Cerimónia do Prémio Nacional da Qualidade' }
    ]
  },
  {
    id: 2,
    slug: 'workshop-regulamentos-importacao',
    titulo: 'Workshop — Aplicação de Regulamentos Técnicos na Importação',
    tipo: 'Formação',
    data: '2026-07-03',
    horaIni: '09h00',
    horaFim: '13h00',
    local: 'Sede do INIQ — Palácio do Vidro',
    cidade: 'Luanda',
    img: 'assets/cover-seguranca.jpg',
    inscricao: true,
    preco: '15 000 AOA por participante',
    resumo: 'Sessão prática dirigida a importadores e despachantes sobre a aplicação dos regulamentos técnicos e a certificação de produtos destinados à importação.',
    corpo: [
      'Este workshop aborda, de forma prática, os requisitos de conformidade aplicáveis aos produtos importados e os procedimentos de validação, verificação e certificação junto do INIQ.',
      'Destina-se a importadores, despachantes oficiais, gestores de qualidade e técnicos das áreas de comércio externo que pretendam dominar o enquadramento regulamentar em vigor.',
      'No final, os participantes recebem um certificado de participação emitido pelo Instituto.'
    ],
    programa: [
      { h: '09h00', t: 'Enquadramento legal e regulamentos aplicáveis' },
      { h: '10h30', t: 'Procedimentos de certificação de importação' },
      { h: '11h30', t: 'Casos práticos e esclarecimento de dúvidas' },
      { h: '12h45', t: 'Encerramento e entrega de certificados' }
    ]
  },
  {
    id: 3,
    slug: 'cerimonia-premio-nacional-qualidade',
    titulo: 'Cerimónia do Prémio Nacional da Qualidade',
    tipo: 'Cerimónia',
    data: '2026-07-22',
    horaIni: '18h00',
    horaFim: '20h30',
    local: 'Auditório — Palácio do Vidro',
    cidade: 'Luanda',
    img: 'assets/cover-qualidade.jpg',
    inscricao: true,
    preco: 'Por convite',
    resumo: 'Cerimónia solene de entrega do Prémio Nacional da Qualidade às organizações distinguidas pela excelência da sua gestão.',
    corpo: [
      'A cerimónia do Prémio Nacional da Qualidade reconhece publicamente as organizações angolanas que se destacam pelas boas práticas de gestão e cultura de melhoria contínua.',
      'O evento reúne os finalistas, o júri, representantes do Governo e convidados do tecido empresarial nacional.'
    ],
    programa: [
      { h: '18h00', t: 'Recepção dos convidados' },
      { h: '18h30', t: 'Sessão de abertura' },
      { h: '19h00', t: 'Entrega dos prémios por categoria' },
      { h: '20h00', t: 'Encerramento' }
    ]
  },
  {
    id: 4,
    slug: 'jornada-metrologia-industria',
    titulo: 'Jornada de Metrologia para a Indústria',
    tipo: 'Conferência',
    data: '2026-08-14',
    horaIni: '09h00',
    horaFim: '16h00',
    local: 'Hotel de Convenções',
    cidade: 'Benguela',
    img: 'assets/cover-metrologia.jpg',
    inscricao: true,
    preco: 'Entrada gratuita · inscrição obrigatória',
    resumo: 'Encontro técnico sobre rastreabilidade metrológica, calibração e o impacto das medições fiáveis na competitividade industrial.',
    corpo: [
      'A Jornada de Metrologia leva à região de Benguela o debate sobre a importância das medições rigorosas para a indústria, o comércio e a proteção do consumidor.',
      'Inclui demonstrações do Laboratório Nacional de Metrologia e sessões sobre os serviços de calibração disponíveis para as empresas.'
    ],
    programa: [
      { h: '09h00', t: 'Abertura e enquadramento' },
      { h: '10h00', t: 'Rastreabilidade e o Sistema Internacional de Unidades' },
      { h: '14h00', t: 'Demonstrações de calibração' }
    ]
  },
  {
    id: 5,
    slug: 'formacao-auditores-iso-9001',
    titulo: 'Formação de Auditores Internos ISO 9001',
    tipo: 'Formação',
    data: '2026-09-08',
    horaIni: '08h30',
    horaFim: '17h30',
    local: 'Centro de Formação do INIQ',
    cidade: 'Luanda',
    img: 'assets/cover-qualidade.jpg',
    inscricao: true,
    preco: '45 000 AOA · 3 dias',
    resumo: 'Curso intensivo de três dias para capacitar auditores internos de sistemas de gestão da qualidade segundo a norma ISO 9001.',
    corpo: [
      'Programa intensivo que prepara os participantes para planear, conduzir e reportar auditorias internas a sistemas de gestão da qualidade.',
      'A formação combina enquadramento teórico com exercícios práticos e simulações de auditoria, e confere certificação do INIQ.'
    ],
    programa: [
      { h: 'Dia 1', t: 'Fundamentos da ISO 9001 e princípios de auditoria' },
      { h: 'Dia 2', t: 'Planeamento e condução de auditorias' },
      { h: 'Dia 3', t: 'Relato, seguimento e exame final' }
    ]
  },
  {
    id: 6,
    slug: 'forum-iniq-cplp-luanda-2026',
    titulo: 'Reunião do Fórum das IE da Qualidade da CPLP',
    tipo: 'Conferência',
    data: '2026-05-19',
    horaIni: '09h00',
    horaFim: '17h00',
    local: 'Sede do INIQ — Palácio do Vidro',
    cidade: 'Luanda',
    img: 'assets/cover-cplp.jpg',
    inscricao: false,
    preco: 'Evento institucional',
    resumo: 'Encontro dos institutos da qualidade dos países da CPLP para harmonização de normas, metrologia e acreditação.',
    corpo: [
      'Angola acolheu a reunião do Fórum das Infra-Estruturas da Qualidade da CPLP, que reuniu representantes dos institutos lusófonos.',
      'Em agenda estavam a harmonização de normas, o reconhecimento mútuo de certificados e a cooperação técnica entre os Estados-membros.'
    ],
    programa: []
  }
]

export const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
export const mesesLongo = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const hoje = '2026-06-09'

export function parseData(iso: string) {
  return new Date(iso + 'T00:00:00')
}

export function getDia(iso: string) {
  return parseData(iso).getDate()
}

export function getMesAbrev(iso: string) {
  return meses[parseData(iso).getMonth()]
}

export function getDataLonga(iso: string) {
  const d = parseData(iso)
  return d.getDate() + ' de ' + mesesLongo[d.getMonth()] + ' de ' + d.getFullYear()
}

export function isPast(iso: string) {
  return iso < hoje
}

export function getEventoById(id: string | number) {
  return eventos.find(e => String(e.id) === String(id))
}
