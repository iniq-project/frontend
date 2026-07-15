
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
    id: "normalizacao",
    number: "01",
    title: "Normalização",
    subItems: [
      { id: "comissao-tecnica", number: "01", title: "Comissão Técnica" },
      { id: "venda-normas", number: "02", title: "Venda de Normas" },
      { id: "consulta-publica", number: "03", title: "Projectos em Consulta Pública" },
      { id: "catalogo-livro", number: "04", title: "Catálogo Nacional de Normas" }
    ],
  },
  {
    id: "metrologia",
    number: "02",
    title: "Metrologia",
    subItems: [
      { id: "servicos", number: "01", title: "Serviços" },
      { id: "controlo-metrologico-legal", number: "02", title: "Controlo Metrológico Legal" },
      { id: "taxas-metrologia-legal", number: "03", title: "Taxas de Metrologia Legal" },
      { id: "cooperacao-regional-internacional", number: "04", title: "Cooperação Regional e Internacional" },
      { id: "metrologia-industrial", number: "05", title: "Metrologia Industrial" },
      { id: "metrologia-cientifica", number: "06", title: "Metrologia Científica" },
    ],
  },
  // {
  //   id: "avaliacao-da-conformidade",
  //   number: "02",
  //   title: "Avaliação da Conformidade",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Ver Requisitos" }
  //   ]
  // },
    {
    id: "registo-cadastro",
    number: "03",
    title: "Registo, Cadastro e Acreditação",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Ver Requisitos" },
    ]
  },
    {
    id: "importacao",
    number: "04",
    disabled: true,
    title: "Validação, Verificação e Certificação de Produtos e Serviços",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
{
    id: "formacao",
    number: "05",
    disabled: true,
    title: "Formação e Certificação de Especialistas para Qualidade",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Curso" }
    ]
  },

  {
    id: "rotulos",
    number: "06",
    disabled: true,
    title: "Validação e Certificação de Conformidade de Rótulos e Embalagens",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
   {
    id: "regulamentos",
    number: "07",
    title: "Regulamentos Técnicos",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
  {
    id: "premio-qualidade",
    number: "08",
    title: "Prémio Nacional da Qualidade",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
    {
    id: "eventos",
    number: "09",
    disabled: true,
    title: "Eventos",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  },
      {
    id: "forum",
    number: "10",
    disabled: true,
    title: "FIQ-CPLP / Fórum da I.E da Qualidade da CPLP",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ]
  }








  // {
  //   id: "certificacao",
  //   number: "03",
  //   title: "Certificação",
  //   disabled: true,
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ],
  // },
  // {
  //   id: "acreditacao",
  //   number: "04",
  //   title: "Acreditação",
  //   disabled: true,
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
  //   ]
  // },

  //   {
  //   id: "registo-cadastro",
  //   number: "06",
  //   title: "Registo e Cadastro",
  //   subItems: [
  //     { id: "solicitar-servico", number: "01", title: "Ver Requisitos" }
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
