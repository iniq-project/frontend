export function generateRupe(amount?: number) {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(100000 + Math.random() * 899999)
  const reference = `RUPE-${year}-${randomNum}`

  return { reference, amount: amount ?? 0 }
}
