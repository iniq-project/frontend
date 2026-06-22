
export interface Service {
  id: string
  number: string
  title: string
  subItems?: SubItem[]
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
    title: "Normas Técnicas & Normalização",
    subItems: [
      { id: "venda-normas", number: "01", title: "Venda de Normas" },
      { id: "consulta-publica", number: "02", title: "Projectos em Consulta Pública" }
    ],
    responsavel: {
      nome: "Dra. Inês Cabral",
      cargo: "Chefe do Departamento de Normalização",
      foto: "/perfis/04.jpg",
      mensagem: "“A normalização é o ponto de partida da qualidade. Construímos, com as comissões técnicas, as referências que dão confiança ao mercado.”"
    },
    politicaQualidade: {
      titulo: "Política de Qualidade para Normalização",
      descricao: "O INIQ compromete-se a coordenar e desenvolver o sistema nacional de normalização de Angola, garantindo a conformidade com as melhores práticas internacionais, promovendo a participação transparente de todas as partes interessadas, e garantindo que as normas angolanas apoiem a inovação, a competitividade empresarial e a proteção do consumidor, com foco na melhoria contínua e excelência."
    }
  },
  {
    id: "metrologia",
    number: "02",
    title: "Metrologia",
    subItems: [
      { id: "solicitar-servico", number: "01", title: "Solicitar Serviço" }
    ],
    responsavel: {
      nome: "Eng.º António Bengui",
      cargo: "Chefe do Departamento de Metrologia",
      foto: "/perfis/03.jpg",
      mensagem: "“Medições fiáveis são a base do comércio justo e da indústria. Asseguramos a rastreabilidade de cada medição ao Sistema Internacional de Unidades.”"
    },
    politicaQualidade: {
      titulo: "Política de Qualidade para Metrologia",
      descricao: "O INIQ compromete-se a garantir a fiabilidade e rastreabilidade das medições em Angola, alinhando-se com os padrões internacionais (BIPM, OIML) e promovendo a confiança no mercado, a proteção do consumidor e a competitividade industrial, com foco na melhoria contínua e excelência."
    }
  },
  {
    id: "acreditacao",
    number: "03",
    title: "Registo, Cadastro e Acreditação",
    subItems: []
  },
  {
    id: "importacao",
    number: "04",
    title: "Validação, Verificação e Certificação de Produtos a Importar",
    subItems: []
  },
  {
    id: "formacao",
    number: "05",
    title: "Formação e Qualificação em Qualidade",
    subItems: []
  },
  {
    id: "rotulos",
    number: "06",
    title: "Conformidade de Rótulos e Embalagens",
    subItems: []
  },
  {
    id: "regulamentos",
    number: "07",
    title: "Regulamentos Técnicos",
    subItems: []
  },
  {
    id: "premio-qualidade",
    number: "08",
    title: "Prémio Nacional da Qualidade",
    subItems: []
  }
]
