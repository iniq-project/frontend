export type DocumentsType =
  | 'OFICIO'
  | 'RELATORIO_TECNICO'
  | 'DOCUMENTOS_TECNICOS'
  | 'CVS'
  | 'CERTIDAO_COMERCIAL'
  | 'ALVARA'
  | 'NIF'
  | 'APRESENTACAO_ORGANIZACAO'
  | 'FATURA_COMERCIAL'
  | 'CERTIFICADO_ORIGEM'
  | 'TESTE_ENSAIO'
  | 'ESPECIFICACOES_TECNICAS'
  | 'DOCUMENTO_TRANSPORTE'
  | 'NOTA_ENTREGA'
  | 'CERTIFICADO_TECNICO'

export type ServiceType =
  | 'REGISTO_CADASTRO'
  | 'ACREDITACAO'
  | 'CERTIFICACAO'
  | 'NORMALIZACAO'
  | 'VERIFICACAO_METROLOGICA'

export type DocumentRequirement = {
  types: DocumentsType[]
  label: string
  allRequired?: boolean
  pdfOnly?: boolean
}

export const SERVICE_DOCUMENT_REQUIREMENTS: Partial<
  Record<ServiceType, DocumentRequirement[]>
> = {
  REGISTO_CADASTRO: [
    { types: ['OFICIO'], label: 'Doc. 1 — Ofício dirigido ao INIQ' },
    {
      types: ['RELATORIO_TECNICO'],
      label: 'Doc. 2 — Relatório de Análise Técnica e Diagnóstico',
    },
    {
      types: ['DOCUMENTOS_TECNICOS'],
      label:
        'Doc. 3 — Formulários preenchidos + documentos de identificação + CV do técnico responsável',
    },
    {
      types: ['CERTIDAO_COMERCIAL', 'ALVARA', 'NIF'],
      label: 'Doc. 4 — Cópias da documentação legal',
      allRequired: true,
    },
    {
      types: ['APRESENTACAO_ORGANIZACAO'],
      label: 'Doc. 5 — Apresentação da organização',
    },
  ],
}

const DOCUMENT_TYPE_LABELS: Partial<Record<DocumentsType, string>> = {
  CERTIDAO_COMERCIAL: 'Doc. 4a — Certidão de Registo Comercial',
  ALVARA: 'Doc. 4b — Alvará Comercial',
  NIF: 'Doc. 4c — NIF',
}

export function flattenDocumentSlots(
  serviceType: ServiceType,
): Array<{ type: DocumentsType; label: string; pdfOnly?: boolean }> {
  const requirements = SERVICE_DOCUMENT_REQUIREMENTS[serviceType]
  if (!requirements) return []

  const slots: Array<{ type: DocumentsType; label: string; pdfOnly?: boolean }> = []

  for (const req of requirements) {
    if (req.allRequired) {
      for (const type of req.types) {
        slots.push({
          type,
          label: DOCUMENT_TYPE_LABELS[type] ?? `${req.label} (${type})`,
          pdfOnly: req.pdfOnly,
        })
      }
    } else {
      const type = req.types[0]
      if (type) {
        slots.push({ type, label: req.label, pdfOnly: req.pdfOnly })
      }
    }
  }

  return slots
}
