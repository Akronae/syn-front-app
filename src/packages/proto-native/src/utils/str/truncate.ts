export function truncate(
  s: string | undefined,
  length: number,
  from: 'start' | 'middle' | 'end',
  omission = `...`,
) {
  if (!s) return s
  if (s.length <= length) return s
  switch (from) {
  case `start`:
    return omission + s.slice(s.length - length + omission.length)
  case `middle`:
    return (
      s.slice(0, length / 2) +
        omission +
        s.slice(s.length - length / 2 + omission.length)
    )
  case `end`:
    return s.slice(0, length - omission.length) + omission
  }
}
