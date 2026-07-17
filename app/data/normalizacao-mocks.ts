export interface Norma {
  reference: string
  title: string
  categoria: string
  price: number
  ics: string
  ano: number
  comissaoTecnica: string
  estado: "em vigor" | "revogada"
}

export interface ComissaoTecnica {
  id: string
  nome: string
  sector: string
  presidente: string
  secretarioTecnico: string
  normaReferences: string[]
}

export interface ProjetoConsulta {
  code: string
  title: string
  sector: string
  description: string
  documento: string
  deadline: string
  progress: number
  urgent: boolean
}

export const normas: Norma[] = [
  {
    reference: "NA 0042:2025",
    title: "Águas de consumo humano — Requisitos de qualidade",
    categoria: "Ambiente",
    price: 12500,
    ics: "13.060.20",
    ano: 2025,
    comissaoTecnica: "CT 04 — Ambiente",
    estado: "em vigor",
  },
  {
    reference: "NA 0309:2024",
    title: "Cimento Portland — Especificações e ensaios",
    categoria: "Construção",
    price: 15000,
    ics: "91.100.10",
    ano: 2024,
    comissaoTecnica: "CT 02 — Construção Civil",
    estado: "em vigor",
  },
  {
    reference: "NA 0756:2023",
    title: "Segurança de brinquedos — Requisitos gerais",
    categoria: "Gestão",
    price: 9800,
    ics: "97.200.50",
    ano: 2023,
    comissaoTecnica: "CT 05 — Gestão da Qualidade",
    estado: "em vigor",
  },
  {
    reference: "NA 0128:2022",
    title: "Farinha de trigo — Requisitos e métodos de ensaio",
    categoria: "Alimentar",
    price: 8700,
    ics: "67.060",
    ano: 2022,
    comissaoTecnica: "CT 01 — Alimentos e Agricultura",
    estado: "em vigor",
  },
  {
    reference: "NA 0891:2021",
    title: "Gasolina automóvel — Especificações",
    categoria: "Petróleo",
    price: 21000,
    ics: "75.160.20",
    ano: 2021,
    comissaoTecnica: "CT 03 — Petróleo e Gás",
    estado: "em vigor",
  },
  {
    reference: "NA 0450:2025",
    title: "Blocos de betão para alvenaria — Requisitos",
    categoria: "Construção",
    price: 13200,
    ics: "91.100.30",
    ano: 2025,
    comissaoTecnica: "CT 02 — Construção Civil",
    estado: "em vigor",
  },
  {
    reference: "NA 0233:2020",
    title: "Óleos alimentares — Rotulagem e requisitos de qualidade",
    categoria: "Alimentar",
    price: 7600,
    ics: "67.200.10",
    ano: 2020,
    comissaoTecnica: "CT 01 — Alimentos e Agricultura",
    estado: "em vigor",
  },
  {
    reference: "NA 0067:2019",
    title: "Sistemas de gestão ambiental — Requisitos",
    categoria: "Ambiente",
    price: 18400,
    ics: "13.020.10",
    ano: 2019,
    comissaoTecnica: "CT 04 — Ambiente",
    estado: "em vigor",
  },
  {
    reference: "NA 1001:2024",
    title: "Sistemas de gestão da qualidade — Requisitos",
    categoria: "Gestão",
    price: 16900,
    ics: "03.120.10",
    ano: 2024,
    comissaoTecnica: "CT 05 — Gestão da Qualidade",
    estado: "em vigor",
  },
  {
    reference: "NA 0512:2023",
    title: "Gás Liquefeito de Petróleo (GLP) — Armazenamento e manuseamento",
    categoria: "Petróleo",
    price: 19500,
    ics: "75.160.30",
    ano: 2023,
    comissaoTecnica: "CT 03 — Petróleo e Gás",
    estado: "em vigor",
  },
  {
    reference: "NA 0015:2017",
    title: "Cimento Portland — Ensaios de resistência (revisão anterior)",
    categoria: "Construção",
    price: 14100,
    ics: "91.100.10",
    ano: 2017,
    comissaoTecnica: "CT 02 — Construção Civil",
    estado: "revogada",
  },
  {
    reference: "NA 0203:2016",
    title: "Conservas de peixe — Requisitos gerais (versão descontinuada)",
    categoria: "Alimentar",
    price: 6900,
    ics: "67.120.30",
    ano: 2016,
    comissaoTecnica: "CT 01 — Alimentos e Agricultura",
    estado: "revogada",
  },
  {
    reference: "NA 0044:2018",
    title: "Águas de consumo humano — Requisitos de qualidade (versão anterior)",
    categoria: "Ambiente",
    price: 11200,
    ics: "13.060.20",
    ano: 2018,
    comissaoTecnica: "CT 04 — Ambiente",
    estado: "revogada",
  },
  {
    reference: "NA 0980:2015",
    title: "Sistemas de gestão da qualidade — Requisitos (versão descontinuada)",
    categoria: "Gestão",
    price: 15300,
    ics: "03.120.10",
    ano: 2015,
    comissaoTecnica: "CT 05 — Gestão da Qualidade",
    estado: "revogada",
  },
  {
    reference: "NA 0334:2014",
    title: "Gasóleo — Especificações (versão descontinuada)",
    categoria: "Petróleo",
    price: 17800,
    ics: "75.160.20",
    ano: 2014,
    comissaoTecnica: "CT 03 — Petróleo e Gás",
    estado: "revogada",
  },
  {
    reference: "NA 0678:2022",
    title: "Rótulos de géneros alimentícios pré-embalados — Requisitos",
    categoria: "Alimentar",
    price: 8200,
    ics: "67.040",
    ano: 2022,
    comissaoTecnica: "CT 01 — Alimentos e Agricultura",
    estado: "em vigor",
  },
  {
    reference: "NA 0721:2021",
    title: "Agregados para betão — Requisitos e métodos de ensaio",
    categoria: "Construção",
    price: 12800,
    ics: "91.100.15",
    ano: 2021,
    comissaoTecnica: "CT 02 — Construção Civil",
    estado: "em vigor",
  },
  {
    reference: "NA 0389:2020",
    title: "Gestão de resíduos sólidos urbanos — Requisitos",
    categoria: "Ambiente",
    price: 10500,
    ics: "13.030.10",
    ano: 2020,
    comissaoTecnica: "CT 04 — Ambiente",
    estado: "em vigor",
  },
  {
    reference: "NA 1102:2025",
    title: "Auditorias de sistemas de gestão — Diretrizes",
    categoria: "Gestão",
    price: 14700,
    ics: "03.120.20",
    ano: 2025,
    comissaoTecnica: "CT 05 — Gestão da Qualidade",
    estado: "em vigor",
  },
  {
    reference: "NA 0605:2019",
    title: "Lubrificantes industriais — Classificação e requisitos",
    categoria: "Petróleo",
    price: 16200,
    ics: "75.100",
    ano: 2019,
    comissaoTecnica: "CT 03 — Petróleo e Gás",
    estado: "em vigor",
  },
  {
    reference: "NA 0812:2017",
    title: "Tijolos e blocos cerâmicos — Requisitos (versão descontinuada)",
    categoria: "Construção",
    price: 9300,
    ics: "91.100.25",
    ano: 2017,
    comissaoTecnica: "CT 02 — Construção Civil",
    estado: "revogada",
  },
  {
    reference: "NA 0290:2013",
    title: "Rótulos de géneros alimentícios — Requisitos (versão descontinuada)",
    categoria: "Alimentar",
    price: 5400,
    ics: "67.040",
    ano: 2013,
    comissaoTecnica: "CT 01 — Alimentos e Agricultura",
    estado: "revogada",
  },
  {
    reference: "NA 0955:2018",
    title: "Emissões atmosféricas industriais — Limites (versão anterior)",
    categoria: "Ambiente",
    price: 13600,
    ics: "13.040.20",
    ano: 2018,
    comissaoTecnica: "CT 04 — Ambiente",
    estado: "revogada",
  },
  {
    reference: "NA 0499:2024",
    title: "Vocabulário de gestão da qualidade — Fundamentos",
    categoria: "Gestão",
    price: 7100,
    ics: "01.040.03",
    ano: 2024,
    comissaoTecnica: "CT 05 — Gestão da Qualidade",
    estado: "em vigor",
  },
]

export const comissoesTecnicas: ComissaoTecnica[] = [
  {
    id: "ct-01",
    nome: "CT 01 — Alimentos e Agricultura",
    sector: "Alimentar",
    presidente: "Eng.ª Filomena Sacadura",
    secretarioTecnico: "Dr. Amável Chindungo",
    normaReferences: normas
      .filter((n) => n.comissaoTecnica === "CT 01 — Alimentos e Agricultura")
      .map((n) => n.reference),
  },
  {
    id: "ct-02",
    nome: "CT 02 — Construção Civil",
    sector: "Construção",
    presidente: "Eng.º Custódio Bumba",
    secretarioTecnico: "Eng.ª Domingas Xavier",
    normaReferences: normas
      .filter((n) => n.comissaoTecnica === "CT 02 — Construção Civil")
      .map((n) => n.reference),
  },
  {
    id: "ct-03",
    nome: "CT 03 — Petróleo e Gás",
    sector: "Petróleo",
    presidente: "Dr. Salvador Muteka",
    secretarioTecnico: "Eng.ª Belarmina Sozinho",
    normaReferences: normas
      .filter((n) => n.comissaoTecnica === "CT 03 — Petróleo e Gás")
      .map((n) => n.reference),
  },
  {
    id: "ct-04",
    nome: "CT 04 — Ambiente",
    sector: "Ambiente",
    presidente: "Eng.ª Isaltina Camboa",
    secretarioTecnico: "Dr. Osvaldo Sapalo",
    normaReferences: normas
      .filter((n) => n.comissaoTecnica === "CT 04 — Ambiente")
      .map((n) => n.reference),
  },
  {
    id: "ct-05",
    nome: "CT 05 — Gestão da Qualidade",
    sector: "Gestão",
    presidente: "Dra. Guilhermina Neblu",
    secretarioTecnico: "Eng.º Aparício Ditutala",
    normaReferences: normas
      .filter((n) => n.comissaoTecnica === "CT 05 — Gestão da Qualidade")
      .map((n) => n.reference),
  },
]

export const projetosConsulta: ProjetoConsulta[] = [
  {
    code: "prNA 1187:2026",
    title: "Rotulagem de produtos alimentares pré-embalados",
    sector: "Alimentar",
    description:
      "Requisitos de informação obrigatória, declaração nutricional e alergénios na rotulagem de géneros alimentícios.",
    documento:
      "Projecto de Norma prNA 1187:2026 — Rotulagem de produtos alimentares pré-embalados. Secção 1: Âmbito e campo de aplicação. Secção 2: Referências normativas. Secção 3: Termos e definições. Secção 4: Requisitos de informação obrigatória (denominação de venda, lista de ingredientes, quantidade líquida, prazo de validade, condições de conservação, identificação do operador). Secção 5: Declaração nutricional. Secção 6: Alergénios e substâncias que provocam intolerâncias. Secção 7: Requisitos de legibilidade e idioma.",
    deadline: "30 Jun 2026",
    progress: 62,
    urgent: false,
  },
  {
    code: "prNA 1402:2026",
    title: "Sistemas de gestão da qualidade — Fundamentos e vocabulário",
    sector: "Gestão",
    description:
      "Princípios, conceitos e terminologia de base para os sistemas de gestão da qualidade.",
    documento:
      "Projecto de Norma prNA 1402:2026 — Sistemas de gestão da qualidade — Fundamentos e vocabulário. Secção 1: Âmbito. Secção 2: Princípios fundamentais de gestão da qualidade (foco no cliente, liderança, comprometimento das pessoas, abordagem por processos, melhoria, tomada de decisão baseada em evidências, gestão de relacionamentos). Secção 3: Vocabulário e definições de termos técnicos usados nas normas da família de gestão da qualidade.",
    deadline: "15 Jul 2026",
    progress: 38,
    urgent: false,
  },
  {
    code: "prNA 0991:2026",
    title: "Blocos de betão para alvenaria — Requisitos",
    sector: "Construção",
    description:
      "Especificações dimensionais, resistência mecânica e métodos de ensaio para blocos de betão.",
    documento:
      "Projecto de Norma prNA 0991:2026 — Blocos de betão para alvenaria — Requisitos. Secção 1: Âmbito e campo de aplicação. Secção 2: Classificação dos blocos por densidade e uso. Secção 3: Requisitos dimensionais e tolerâncias. Secção 4: Requisitos de resistência mecânica à compressão. Secção 5: Métodos de ensaio e amostragem. Secção 6: Marcação e informação a fornecer.",
    deadline: "12 Jun 2026",
    progress: 88,
    urgent: true,
  },
]
