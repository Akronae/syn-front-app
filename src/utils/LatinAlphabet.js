import ArrayUtils from './ArrayUtils'
import StringUtils from './StringUtils'

export default class LatinAlphabet
{
    static VOWELS = ['a', 'e', 'i', 'o', 'u', 'y']
    static CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']

    /**
     * @param  {...string} letters
     * @returns {boolean} 
     */
    static isVowel (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l && LatinAlphabet.VOWELS.includes(StringUtils.removeAccents(l.toLowerCase())))
    }
     /**
      * @param  {...string} letters 
      * @returns {boolean} 
      */
    static isConsonant (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l && LatinAlphabet.CONSONANTS.includes(StringUtils.removeAccents(l.toLowerCase())))
    }
}