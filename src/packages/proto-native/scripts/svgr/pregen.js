const fs = require('fs')
const getFilesRecursive = require('../shared/get-files-recursive')

const dest = process.argv[2]
if (!dest) throw new Error('usage: node pregen.js <dest>')
;(async () => {
  await deleteEmptyFiles(dest)
  await sanitizeFilePaths(dest)
})()

async function deleteEmptyFiles(dir) {
  const files = await getFilesRecursive(dir)
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    if (content == '') {
      console.error(`❌ Deleting empty file: ${file}`)
      fs.unlinkSync(file)
    }
  }
}

async function sanitizeFilePaths(dir) {
  const files = await getFilesRecursive(dir)
  for (const file of files) {
    for (const part of file.split('/')) {
      if (
        part.includes("'") ||
        part.includes(',') ||
        part.includes(' ') ||
        part.includes('=')
      ) {
        console.error(`⚠️ Sanitizing path part: ${part}`)
        const sanitized = part.replaceAll(/'|,| |=/gm, '-')
        const old = file.substring(0, file.indexOf(part) + part.length)
        const nw = file.substring(0, file.indexOf(part)) + sanitized
        fs.renameSync(old, nw)
        sanitizeFilePaths(dir)
        return
      }
    }
  }
}
