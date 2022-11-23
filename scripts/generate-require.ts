import { resolve, relative } from 'path'
import { promises as fs } from 'fs'

async function toArray(generator: AsyncGenerator<string>) {
  const array = []
  for await (const item of generator) {
    array.push(item)
  }
  return array
}

async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

function toObj(map: Record<string, any>, separator: string = '.') {
    const obj = {}
    for (const [key, value] of Object.entries(map)) {
        const keys = key.split(separator)
        let current: Record<string, any> = obj
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (i === keys.length - 1) {
                current[key] = value
            } else {
                current[key] = current[key] || {}
                current = current[key]
            }
        }
    }
    return obj
}

async function main() {
  const texts = './src/assets/text'
  let files = await toArray(getFiles(texts))
  files = files.map(f => relative(texts, f))
  const reqs = Object.fromEntries(files.map(f => [f, `require('./${f}')`]))
  const done = JSON.stringify(toObj(reqs, '/'), null, 2)
  console.log(done)
}
main()
