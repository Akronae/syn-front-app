import axios from 'axios'
import jsdom from 'jsdom'
import fs from 'fs'
const { JSDOM } = jsdom

class ChapterPage {
  constructor(
    public collection: string,
    public book: string,
    public chapter: number,
    public baseUrl: string,
  ) {}
  get finalUrl() {
    return `${this.baseUrl}/${this.book}/${this.book}-${this.chapter}-parsed.html`
  }
}

async function parsedChapter(url: ChapterPage) {
  const body = (await axios.get(url.finalUrl)).data
  const dom = new JSDOM(body)
  const verses = Array.from(
    dom.window.document.querySelectorAll('[id*="Byz-AVerse"]'),
  )
  const versesParsed = verses.map((v, i) => {
    const verseNumber = i + 1
    const words = Array.from(
      v.querySelectorAll(`[id*="AVerse-${verseNumber}-W"]`),
    )
    const verseTranslated = dom.window.document.querySelector(
      `[id="KJV-AVerse-${verseNumber}"]`,
    )?.textContent
    const wordsParsed = words.map((word) => {
      const greek = word.querySelector('.cellB.HebFs')?.textContent
      const english = word.querySelector('.cellB.blueF')?.textContent
      const parsing = word
        .querySelector('.cellB.greenF')
        ?.innerHTML.replace(/<br>/gm, '\n')
      return { greek, english, parsing }
    })
    return {
      book: url.book,
      chapter: url.chapter,
      verseNumber,
      wordsParsed,
      verseTranslated,
    }
  })
  const data = { book: url.book, versesParsed }
  return data
}

const BOOKS_CHAPTERS = {
  Matthew: [1, 28],
  Mark: [1, 16],
  Luke: [1, 24],
  John: [1, 21],
  Acts: [1, 28],
  // Romans: [1, 16],
  // Corinthians1: [1, 16],
  // Corinthians2: [1, 13],
  // Galatians: [1, 6],
  // Ephesians: [1, 6],
  // Philippians: [1, 4],
  // Colossians: [1, 4],
  // Thessalonians1: [1, 5],
  // Thessalonians2: [1, 3],
  // Timothy1: [1, 6],
  // Timothy2: [1, 4],
  // Titus: [1, 3],
  // Philemon: [1, 1],
  // Hebrews: [1, 13],
  // James: [1, 5],
  // Peter1: [1, 5],
  // Peter2: [1, 3],
  // John1: [1, 5],
  // John2: [1, 1],
  // John3: [1, 1],
  // Jude: [1, 1],
  // Revelation: [1, 22]
}

;(async () => {
  const url = new ChapterPage(
    'NT',
    'Matthew',
    1,
    'https://www.abarim-publications.com/Interlinear-New-Testament',
  )
  const data: { [index: string]: number[] } = {}
  for (let [key, value] of Object.entries(BOOKS_CHAPTERS)) {
    for (let index = value[0]; index <= value[1]; index++) {
      console.log('parsing chapter', index, 'of', key)
      url.book = key
      url.chapter = index
      data[key] = data[key] || {}

      const dir = `src/assets/text/${url.collection}/${url.book}`
      const file = `${dir}/${url.chapter}.json`
      fs.mkdirSync(dir, { recursive: true })
      if (fs.existsSync(file)) continue
      fs.writeFileSync(file, JSON.stringify(await parsedChapter(url), null, 2))
    }
  }
})()
