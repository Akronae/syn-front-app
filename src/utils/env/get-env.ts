const envVars = {
  BACK_URL: process.env.BACK_URL,
}

export function getEnv(env: keyof typeof envVars): string {
  const res = envVars[env]
  if (!res) {
    throw new Error(`Missing env '${env}'`)
  }

  return res
}
