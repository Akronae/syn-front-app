const fs = require('fs');

function getEnvFilePaths(envName) {
  return [
    '.env',
    `.env.local`,
    `.env.${envName}`,
    `.env.${envName}.local`,
  ]
}

function plugin(api, options) {

  const envs = {}
  Object.assign(envs, process.env);
  for (const path of getEnvFilePaths(api.env())) {
    if (!fs.existsSync(path)) continue
    console.log('Loading env file:', path)
    const data = fs.readFileSync(path, 'utf8');
    api.cache.using(() => data);
    const toObj = Object.fromEntries(data.split('\n').map(line => line.split('=')));
    Object.assign(envs, toObj);
  }

  return {
    visitor: {
      MemberExpression(path) {
        if (path.get('object').matchesPattern('process.env')) {
          const key = path.toComputedKey()
          if (api.types.isStringLiteral(key)) {
            const value = envs[key.value]
            if (value !== undefined) {
              path.replaceWith(api.types.valueToNode(value))
            }
          }
        }
      },
    }
  }
};

module.exports = plugin