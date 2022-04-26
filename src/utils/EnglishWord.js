import ArrayUtils from './ArrayUtils'
import LatinAlphabet from './LatinAlphabet'
import StringUtils from './StringUtils'

export default class EnglishWord
{
    static ENGLISH_VOWELS = ['ee', 'oo']
    static ENGLISH_CONSONANTS = []

    /**
     * @param  {...string} letters
     * @returns {boolean} 
     */
    static isVowel (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l
            && (LatinAlphabet.isVowel(l)
            || EnglishWord.ENGLISH_VOWELS.includes(StringUtils.removeAccents(l.toLowerCase()))))
    }

    /**
     * @param  {...string} letters
     * @returns {boolean} 
     */
    static isConsonant (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l
            && (LatinAlphabet.isConsonant(l)
            || EnglishWord.ENGLISH_CONSONANTS.includes(StringUtils.removeAccents(l.toLowerCase()))))
    }

    /**
     * @param  {...string} strs
     * @returns {string} 
     */
    static getFirstVowel (...strs)
    {
        if (ArrayUtils.isEmpty(strs)) return ''
        for (const str of strs)
        {
            let start = 0
            
            while (start < str.length)
            {
                let end = str.length

                while (end > start)
                {
                    const sub = str.substring(start, end)
                    if (this.isVowel(sub)) return sub
                    end -= 1
                }

                start += 1
            }
        }
        return StringUtils.EMPTY
    }

    static getSyllables (word)
    {
        const syllables = []
        while (word.length > 0)
        {
            const nextVowelIndex = word.indexOf(this.getFirstVowel(word)) + this.getFirstVowel(word).length
            if (nextVowelIndex <= 0) break
            syllables.push(word.substring(0, nextVowelIndex))
            word = word.substring(nextVowelIndex)
        }
        syllables[syllables.length - 1] += word
        
        return syllables
    }
}