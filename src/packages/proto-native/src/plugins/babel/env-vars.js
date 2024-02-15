/* eslint-disable */

const fs = require(`fs`)
const { exec } = require('child_process')

function getEnvFilePaths(envName) {
  return [`.env`, `.env.local`, `.env.${envName}`, `.env.${envName}.local`]
}

function plugin(api, options) {
  const envs = {}

  const envsFromFiles = {}
  for (const path of getEnvFilePaths(api.env())) {
    if (!fs.existsSync(path)) continue
    console.log(`Loading env file:`, path)
    const data = fs.readFileSync(path, `utf8`)
    api.cache.using(() => data)
    const toObj = Object.fromEntries(
      data.split(`\n`).map((line) => line.split(`=`)),
    )
    Object.assign(envsFromFiles, toObj)
  }
  Object.assign(envs, envsFromFiles)
  Object.assign(envs, process.env)

  return {
    visitor: {
      MemberExpression(path) {
        if (path.get(`object`).matchesPattern(`process.env`)) {
          const key = path.toComputedKey()
          if (api.types.isStringLiteral(key)) {
            const value = envs[key.value]
            if (value !== undefined) {
              path.replaceWith(api.types.valueToNode(value))
            }
          }
        }
      },
    },
  }
}

module.exports = plugin
