const { resolve } = require('path')
const { readdir } = require('fs').promises

/**
 *
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function getFilesRecursive(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFilesRecursive(res) : res
    }),
  )
  return Array.prototype.concat(...files)
}

module.exports = getFilesRecursive
