export interface TipologiaRegistro {
  id: string
  title: string
}

export interface RegulamentoAcervo {
  code: string
  title: string
  areaTecnica: string
  estado: "em vigor" | "revogado"
  price: number
}

export interface RegulamentoConsulta {
  code: string
  title: string
  areaTecnica: string
  description: string
  deadline: string
}

export interface RegulamentoEquivalente {
  code: string
  title: string
  areaTecnica: string
  paisOrigem: string
  organismoOrigem: string
  estado: "em vigor" | "revogado"
}

export const tipologiasRegistro: TipologiaRegistro[] = [
  { id: "laboratorios-ensaios-testes", title: "Laboratórios de Ensaios/Testes" },
  { id: "clinicas", title: "Clínicas" },
  { id: "laboratorios-calibracao", title: "Laboratórios de Calibração" },
  { id: "organismos-inspecao", title: "Organismos de Inspeção" },
  { id: "organismos-certificacao", title: "Organismos de Certificação" },
  { id: "especialistas-qualidade", title: "Especialistas na Área da Qualidade" },
  {
    id: "organismos-auditoria-formacao-consultoria",
    title: "Organismos de Auditoria, Formação e Consultoria nas Áreas da Qualidade",
  },
]

export const acervoNacional: RegulamentoAcervo[] = [
  {
    code: "RT 001:2024",
    title: "Regulamento Técnico sobre Rotulagem de Géneros Alimentícios",
    areaTecnica: "Alimentar",
    estado: "em vigor",
    price: 9500,
  },
  {
    code: "RT 014:2023",
    title: "Regulamento Técnico sobre Segurança de Instalações Eléctricas de Baixa Tensão",
    areaTecnica: "Energia",
    estado: "em vigor",
    price: 14000,
  },
  {
    code: "RT 022:2025",
    title: "Regulamento Técnico sobre Materiais de Construção Civil",
    areaTecnica: "Construção",
    estado: "em vigor",
    price: 12500,
  },
  {
    code: "RT 007:2022",
    title: "Regulamento Técnico sobre Emissões de Veículos Automóveis",
    areaTecnica: "Ambiente",
    estado: "em vigor",
    price: 16800,
  },
  {
    code: "RT 003:2018",
    title: "Regulamento Técnico sobre Rotulagem de Géneros Alimentícios (versão descontinuada)",
    areaTecnica: "Alimentar",
    estado: "revogado",
    price: 7200,
  },
  {
    code: "RT 011:2019",
    title: "Regulamento Técnico sobre Brinquedos e Artigos Infantis",
    areaTecnica: "Gestão",
    estado: "em vigor",
    price: 8300,
  },
  {
    code: "RT 018:2017",
    title: "Regulamento Técnico sobre Instalações de Gás Doméstico (versão anterior)",
    areaTecnica: "Petróleo",
    estado: "revogado",
    price: 15400,
  },
  {
    code: "RT 026:2025",
    title: "Regulamento Técnico sobre Equipamentos de Protecção Individual",
    areaTecnica: "Gestão",
    estado: "em vigor",
    price: 10200,
  },
]

export const consultaPublicaRegulamentos: RegulamentoConsulta[] = [
  {
    code: "prRT 031:2026",
    title: "Regulamento Técnico sobre Eficiência Energética de Electrodomésticos",
    areaTecnica: "Energia",
    description:
      "Estabelece os requisitos mínimos de eficiência energética e a rotulagem obrigatória para electrodomésticos comercializados em Angola.",
    deadline: "20 Ago 2026",
  },
  {
    code: "prRT 033:2026",
    title: "Regulamento Técnico sobre Águas Engarrafadas",
    areaTecnica: "Alimentar",
    description:
      "Define os requisitos de qualidade, envase e rotulagem para águas engarrafadas destinadas ao consumo humano.",
    deadline: "05 Set 2026",
  },
  {
    code: "prRT 035:2026",
    title: "Regulamento Técnico sobre Estruturas Metálicas na Construção",
    areaTecnica: "Construção",
    description:
      "Estabelece requisitos de segurança estrutural e métodos de ensaio para estruturas metálicas usadas na construção civil.",
    deadline: "18 Jul 2026",
  },
]

export const regulamentosEquivalentes: RegulamentoEquivalente[] = [
  {
    code: "RT 001:2024",
    title: "Regulamento Técnico sobre Rotulagem de Géneros Alimentícios",
    areaTecnica: "Alimentar",
    paisOrigem: "Portugal",
    organismoOrigem: "IPQ — Instituto Português da Qualidade",
    estado: "em vigor",
  },
  {
    code: "RT 014:2023",
    title: "Regulamento Técnico sobre Segurança de Instalações Eléctricas de Baixa Tensão",
    areaTecnica: "Energia",
    paisOrigem: "Brasil",
    organismoOrigem: "INMETRO",
    estado: "em vigor",
  },
  {
    code: "RT 007:2022",
    title: "Regulamento Técnico sobre Emissões de Veículos Automóveis",
    areaTecnica: "Ambiente",
    paisOrigem: "União Europeia",
    organismoOrigem: "Comissão Europeia",
    estado: "em vigor",
  },
  {
    code: "RT 018:2017",
    title: "Regulamento Técnico sobre Instalações de Gás Doméstico (versão anterior)",
    areaTecnica: "Petróleo",
    paisOrigem: "África do Sul",
    organismoOrigem: "SABS — South African Bureau of Standards",
    estado: "revogado",
  },
]
