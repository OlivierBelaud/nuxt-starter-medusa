export const getPercentageDiff = (original?: number, calculated?: number) => {
  if (!original || !calculated) {
    return
  }
  const diff = original - calculated
  const percentageDiff = (diff / original) * 100

  return percentageDiff.toFixed()
}
