
export interface Service {
  id: string
  number: string
  title: string
  subItems?: SubItem[]
  disabled?: boolean
  responsavel?: {
    nome: string
    cargo: string
    foto: string
    mensagem: string
  }
  politicaQualidade?: {
    titulo: string
    descricao: string
  }
}

export interface SubItem {
  id: string
  number: string
  title: string
}

export const services: Service[] = [
  {
    id: "normas-tecnicas",
    number: "01",
    title: "Normalização",
    subItems: [
      { id: "venda-normas", number: "01", title: "Venda de Normas" },
      { id: "consulta-publica", number: "02", title: "Projectos em Consulta Pública" }
    ],
  },
  {
    id: "rotulos",
    number: "02",
    title: "Avaliação da Conformidade",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
  {
    id: "certificacao",
    number: "03",
    title: "Certificação",
    disabled: true,
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ],
  },
  {
    id: "acreditacao",
    number: "04",
    title: "Acreditação",
    disabled: true,
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
   {
    id: "regulamentos",
    number: "05",
    title: "Regulamentos Técnicos",
    disabled: true,
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
    {
    id: "registo-cadastro",
    number: "06",
    title: "Registo e Cadastro",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Ver Requisitos" }
    ]
  },
  {
    id: "metrologia",
    number: "07",
    title: "Metrologia",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ],
  },

  // {
  //   id: "importacao",
  //   number: "04",
  //   title: "Validação, Verificação e Certificação de Produtos a Importar",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ]
  // },
  // {
  //   id: "formacao",
  //   number: "05",
  //   title: "Formação e Qualificação em Qualidade",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Curso" }
  //   ]
  // },
  // {
  //   id: "rotulos",
  //   number: "06",
  //   title: "Conformidade de Rótulos e Embalagens",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ]
  // },
  // {
  //   id: "regulamentos",
  //   number: "07",
  //   title: "Regulamentos Técnicos",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ]
  // },
  // {
  //   id: "premio-qualidade",
  //   number: "08",
  //   title: "Prémio Nacional da Qualidade",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ]
  // }
]
