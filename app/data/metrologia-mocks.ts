export interface ServicoMetrologia {
  id: string
  title: string
  fee: number
  requiresFichaTecnica?: boolean
}

export interface OperacaoControloLegal {
  id: string
  title: string
  description: string
  servicoId: string
}

export interface CooperacaoInternacional {
  id: string
  nomeCompleto: string
  sigla: string
  tipoParticipacao: string
  link: string
}

export const servicosMetrologia: ServicoMetrologia[] = [
  {
    id: "aprovacao-modelos",
    title: "Aprovação de modelos de Instrumentos de Medição",
    fee: 150000,
  },
  {
    id: "bombas-combustivel",
    title: "Verificação Metrológica de bombas de combustíveis",
    fee: 45000,
  },
  {
    id: "balancas-comerciais",
    title: "Verificação metrológica de balanças comerciais",
    fee: 18000,
    requiresFichaTecnica: true,
  },
  {
    id: "parques-estacionamento",
    title: "Verificação metrológica de Sistemas de Gestão de parques de estacionamento",
    fee: 60000,
  },
]

// Mapeamento operação -> serviço assumido como placeholder 1:1; o próprio JIRA
// indica que esta correspondência ainda precisa de confirmação do INIQ.
export const operacoesControloLegal: OperacaoControloLegal[] = [
  {
    id: "op-aprovacao-modelos",
    title: "Aprovação de Modelos",
    description:
      "Antes da comercialização, a pedido do fabricante ou importador do instrumento de medição.",
    servicoId: "aprovacao-modelos",
  },
  {
    id: "op-primeira-verificacao",
    title: "Primeira Verificação",
    description: "Realizada em instrumentos novos ou reparados, antes da sua entrada em serviço.",
    servicoId: "bombas-combustivel",
  },
  {
    id: "op-verificacao-periodica",
    title: "Verificação Periódica",
    description:
      "A pedido do utilizador do instrumento, para confirmar que se mantém dentro das tolerâncias regulamentares.",
    servicoId: "balancas-comerciais",
  },
  {
    id: "op-verificacao-extraordinaria",
    title: "Verificação Extraordinária",
    description:
      "Para confirmar que o instrumento continua nas condições regulamentares, por exemplo após reparação ou reclamação.",
    servicoId: "parques-estacionamento",
  },
]

export const cooperacoesInternacionais: CooperacaoInternacional[] = [
  {
    id: "sadcmel",
    nomeCompleto: "Plataforma de Cooperação em Metrologia Legal",
    sigla: "SADCMEL",
    tipoParticipacao: "Membro Ordinário",
    link: "https://www.sadc.int/pillars/standards-quality-infrastructure",
  },
  {
    id: "sadcmet",
    nomeCompleto: "Plataforma de Cooperação em Metrologia da Rastreabilidade",
    sigla: "SADCMET",
    tipoParticipacao: "Membro Ordinário",
    link: "https://www.sadc.int/pillars/standards-quality-infrastructure",
  },
  {
    id: "oiml",
    nomeCompleto: "Organização Internacional de Metrologia Legal",
    sigla: "OIML",
    tipoParticipacao: "Membro Correspondente",
    link: "https://www.oiml.org",
  },
]

export const leiTaxasDownloadInfo = {
  title: "Lei n.º 17/02, de 13 de Dezembro",
  description:
    "Diploma legal que estabelece os emolumentos aplicáveis aos serviços de metrologia legal em Angola.",
  buttonText: "Descarregar documento (PDF)",
  unavailableCaption: "Documento geríável pelo INIQ — download indisponível nesta demonstração.",
}
