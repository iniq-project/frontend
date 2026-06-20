export interface Noticia {
  id: number
  slug: string
  titulo: string
  cat: string
  data: string
  img: string
  resumo: string
  corpo: string[]
}

export const noticias: Noticia[] = [
  {
    id: 1,
    slug: 'consulta-publica-12-projectos-norma',
    titulo: 'INIQ abre consulta pública de 12 novos projectos de norma',
    cat: 'Normalização',
    data: '2026-06-02',
    img: 'assets/cover-normalizacao.jpg',
    resumo: 'Empresas e cidadãos podem contribuir até ao final do mês para os projectos de norma em discussão pública, em áreas como construção, alimentar e gestão.',
    corpo: [
      'O Instituto Nacional das Infra-Estruturas da Qualidade (INIQ) abriu hoje um novo período de consulta pública que abrange doze projectos de norma técnica, em sectores estratégicos para a economia nacional.',
      'A iniciativa insere-se no compromisso do Instituto com a transparência e a participação alargada na elaboração das normas angolanas. Qualquer interessado — empresa, instituição, técnico ou cidadão — pode submeter contribuições estruturadas dentro do prazo definido para cada projecto.',
      'As contribuições recebidas são analisadas pelas Comissões Técnicas responsáveis e o seu tratamento é publicado em relatório anexo à versão final de cada norma. Esta abordagem garante que o resultado reflecte o consenso possível entre todas as partes interessadas.',
      'Os projectos em consulta podem ser consultados na área de Normas Técnicas do portal, onde está igualmente disponível o formulário de submissão de contribuições.'
    ]
  },
  {
    id: 2,
    slug: 'metrologia-reforca-calibracao',
    titulo: 'Laboratório Nacional de Metrologia reforça capacidade de calibração',
    cat: 'Metrologia',
    data: '2026-05-28',
    img: 'assets/cover-metrologia.jpg',
    resumo: 'Novos padrões de referência elevam a rastreabilidade das medições no país a referências internacionais, beneficiando a indústria e o comércio.',
    corpo: [
      'O Laboratório Nacional de Metrologia do INIQ reforçou a sua capacidade técnica com a aquisição de novos padrões de referência, ampliando a oferta de serviços de calibração disponíveis para a indústria nacional.',
      'Com esta evolução, o Instituto passa a assegurar a rastreabilidade de um maior número de grandezas ao Sistema Internacional de Unidades (SI), um requisito essencial para a fiabilidade das medições em laboratórios, fábricas e serviços.',
      'A metrologia é uma componente silenciosa mas decisiva da qualidade: garante que uma medição feita em Luanda é coerente e reconhecida em qualquer parte do mundo, sustentando o comércio justo e a competitividade das exportações.'
    ]
  },
  {
    id: 3,
    slug: 'forum-iniq-cplp-luanda',
    titulo: 'Angola acolhe reunião do Fórum das IE da Qualidade da CPLP',
    cat: 'CPLP',
    data: '2026-05-19',
    img: 'assets/cover-cplp.jpg',
    resumo: 'O encontro reúne os institutos lusófonos para a harmonização de normas, metrologia e acreditação no espaço da CPLP.',
    corpo: [
      'Luanda recebe a reunião do Fórum das Infra-Estruturas da Qualidade da CPLP (FIQ-CPLP), que junta representantes dos institutos da qualidade dos países de língua portuguesa.',
      'Em agenda estão a harmonização de normas, o reconhecimento mútuo de certificados e a cooperação em metrologia e acreditação, com vista a facilitar o comércio entre os Estados-membros.',
      'A participação do INIQ no Fórum reforça o posicionamento de Angola na cooperação técnica internacional e abre caminho a parcerias que beneficiam directamente as empresas nacionais.'
    ]
  },
  {
    id: 4,
    slug: 'premio-nacional-qualidade-2026',
    titulo: 'Prémio Nacional da Qualidade 2026 abre candidaturas',
    cat: 'Qualidade',
    data: '2026-05-12',
    img: 'assets/cover-qualidade.jpg',
    resumo: 'Organizações de todos os sectores podem candidatar-se ao reconhecimento máximo da excelência em gestão da qualidade em Angola.',
    corpo: [
      'Estão abertas as candidaturas ao Prémio Nacional da Qualidade 2026, a distinção que reconhece as organizações angolanas que se destacam pelas boas práticas de gestão e pela cultura de melhoria contínua.',
      'O prémio avalia as candidaturas segundo critérios de liderança, estratégia, processos, pessoas e resultados, com base em modelos de excelência reconhecidos internacionalmente.',
      'A cerimónia de entrega decorrerá durante a Semana Nacional da Qualidade, um dos principais eventos do calendário do Instituto.'
    ]
  },
  {
    id: 5,
    slug: 'rotulagem-produtos-alimentares',
    titulo: 'Novas regras de rotulagem de produtos alimentares em discussão',
    cat: 'Normalização',
    data: '2026-05-05',
    img: 'assets/cover-seguranca.jpg',
    resumo: 'O projecto de norma sobre rotulagem de géneros alimentícios pré-embalados está em consulta pública até 30 de Junho.',
    corpo: [
      'O projecto de norma sobre a rotulagem de produtos alimentares pré-embalados encontra-se em consulta pública, definindo requisitos de informação obrigatória, declaração nutricional e identificação de alergénios.',
      'A medida visa reforçar a protecção e a informação do consumidor, alinhando as práticas nacionais com as melhores referências internacionais.',
      'As empresas do sector agro-alimentar são especialmente convidadas a contribuir, dado o impacto directo da norma nos seus processos de embalagem e comercialização.'
    ]
  },
  {
    id: 6,
    slug: 'formacao-120-auditores',
    titulo: 'INIQ forma 120 auditores internos da qualidade',
    cat: 'Formação',
    data: '2026-04-27',
    img: 'assets/cover-qualidade.jpg',
    resumo: 'Mais uma edição do programa de capacitação certificou dezenas de profissionais em auditoria de sistemas de gestão da qualidade.',
    corpo: [
      'O INIQ concluiu mais uma edição do curso de Auditor Interno da Qualidade, certificando 120 profissionais de empresas e instituições de diferentes sectores.',
      'A formação capacita os participantes para planear e conduzir auditorias internas segundo a ISO 9001, contribuindo para a maturidade dos sistemas de gestão das suas organizações.',
      'Os programas de formação do Instituto estão disponíveis em modalidade presencial, online e híbrida, com inscrição e pagamento em linha.'
    ]
  },
  {
    id: 7,
    slug: 'protocolo-institutos-cplp',
    titulo: 'INIQ assina protocolo de cooperação com institutos da CPLP',
    cat: 'CPLP',
    data: '2026-04-15',
    img: 'assets/cover-cplp.jpg',
    resumo: 'O acordo prevê a partilha de normas, formação conjunta e reconhecimento de certificados entre os países lusófonos.',
    corpo: [
      'O Instituto assinou um protocolo de cooperação técnica com congéneres da CPLP, com vista à partilha de normas, à formação conjunta de quadros e ao reconhecimento mútuo de certificados.',
      'A cooperação no espaço lusófono é uma prioridade estratégica, por aproximar mercados que partilham a língua e enquadramentos regulatórios semelhantes.'
    ]
  },
  {
    id: 8,
    slug: 'jornada-portas-abertas',
    titulo: 'Sede do INIQ recebe jornada de portas abertas',
    cat: 'Qualidade',
    data: '2026-04-03',
    img: 'assets/cover-sede.jpg',
    resumo: 'O Instituto abriu as portas a estudantes e empresas para dar a conhecer o trabalho das suas direcções técnicas.',
    corpo: [
      'A sede do INIQ, no Edifício Palácio do Vidro, recebeu uma jornada de portas abertas dirigida a estudantes, empresas e público em geral.',
      'Os visitantes conheceram de perto o trabalho das direcções de normalização, metrologia e avaliação da conformidade, num esforço de aproximação do Instituto à sociedade.'
    ]
  }
]

export const mesesNoticias = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function fmtDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.getDate() + ' ' + mesesNoticias[d.getMonth()] + ' ' + d.getFullYear()
}

export function getNoticiaById(id: string | number) {
  return noticias.find(n => String(n.id) === String(id))
}
