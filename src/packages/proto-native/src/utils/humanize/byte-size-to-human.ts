export function byteSizeToHuman(size: number, decimals = 2): string {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))

  return `${parseFloat((size / Math.pow(1024, i)).toFixed(decimals)) * 1} ${
    [`B`, `kB`, `MB`, `GB`, `TB`][i]
  }`
}
