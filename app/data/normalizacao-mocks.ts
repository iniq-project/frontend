export interface Norma {
  cmsId?: string
  reference: string
  title: string
  categoria: string
  price: number
  ics: string
  ano: number
  comissaoTecnica: string
  estado: "em vigor" | "revogada"
}
