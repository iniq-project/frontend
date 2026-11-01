export const IMPORTACAO_PROCESSOS = ["validacao", "verificacao", "certificacao"] as const

export type ImportacaoProcesso = (typeof IMPORTACAO_PROCESSOS)[number]

export function readImportacaoProcesso(value: unknown): ImportacaoProcesso | null {
  const raw = Array.isArray(value) ? value[0] : value
  if (typeof raw !== "string") return null
  return (IMPORTACAO_PROCESSOS as readonly string[]).includes(raw)
    ? (raw as ImportacaoProcesso)
    : null
}
