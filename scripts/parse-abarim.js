const axios = require('axios');
const jsdom = require("jsdom");
const fs = require("fs");
const {JSDOM} = jsdom

async function parsedChapter (url)
{
    const body = (await axios.get(url.finalUrl)).data
    const dom = new JSDOM(body);
    const verses = Array.from(dom.window.document.querySelectorAll('[id*="Byz-AVerse"]'))
    const versesParsed = verses.map((v, i) =>
    {
        const verseNumber = i + 1
        const words = Array.from(v.querySelectorAll(`[id*="AVerse-${verseNumber}-W"]`))
        const verseTranslated = dom.window.document.querySelector(`[id="KJV-AVerse-${verseNumber}"]`).textContent
        const wordsParsed = words.map(word =>
        {
            const greek = word.querySelector('.cellB.HebFs').textContent
            const english = word.querySelector('.cellB.blueF').textContent
            const parsing = word.querySelector('.cellB.greenF').innerHTML.replace(/<br>/gm, '\n')
            return {greek, english, parsing}
        })
        return {book: url.book, chapter: url.chapter, verseNumber,  wordsParsed, verseTranslated}
    })
    const data = {book: url.book,  versesParsed}
    return data
}

const TO_CHAPTER = 28

const url =
{
    baseUrl: 'https://www.abarim-publications.com/Interlinear-New-Testament',
    book: 'Matthew',
    chapter: 1,
    get finalUrl () { return `${this.baseUrl}/${this.book}/${this.book}-${this.chapter}-parsed.html` }
}

;(async () =>
{
    const data = {matthew: {}}
    for (let index = 1; index < 2; index++)
    {
        url.chapter = index
        data.matthew[index] = await parsedChapter(url)
    }
    fs.writeFileSync(`abarim.json`, JSON.stringify(data, null, 2))
})()