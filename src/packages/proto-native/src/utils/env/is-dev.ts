export function isDev() {
  return __DEV__ === true || process.env.NODE_ENV === `development`
}
