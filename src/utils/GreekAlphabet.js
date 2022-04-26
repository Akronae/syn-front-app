import StringUtils from '@/utils/StringUtils'
import ArrayUtils from './ArrayUtils'

export default class GreekAlphabet
{
    static VOWELS = ['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω', 'ου', 'ει']
    static CONSONANTS = ['β', 'γ', 'δ', 'ζ', 'θ', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ']
    static OXIA = ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ']
    static VARIA = ['ὰ', 'ὲ', 'ὴ', 'ὶ', 'ὸ', 'ὺ', 'ὼ']
    static PSILI = ['ἀ', 'ἐ', 'ἠ', 'ἰ', 'ὀ', 'ὐ', 'ὠ']
    static DASIA = ['ἁ', 'ἑ', 'ἡ', 'ἱ', 'ὁ', 'ὑ', 'ὡ']
    static PERISPOMENI = ['ᾶ', 'ῆ', 'ῖ', 'ῦ', 'ῶ']
    static DASIA_OXIA = ['ἅ', 'ἕ', 'ἥ', 'ἵ', 'ὅ', 'ὕ', 'ὥ']
    static PSILI_OXIA = ['ἄ', 'ἔ', 'ἤ', 'ἴ', 'ὄ', 'ὔ', 'ὤ']

    /**
     * @param  {...string} letters
     * @returns {boolean} 
     */
    static isVowel (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l && GreekAlphabet.VOWELS.includes(StringUtils.removeAccents(l.toLowerCase())))
    }
    
    /**
     * @param  {...string} letters 
     * @returns {boolean} 
     */
    static isConsonant (...letters)
    {
        if (ArrayUtils.isEmpty(letters)) return false
        return letters.every(l => l && GreekAlphabet.CONSONANTS.includes(StringUtils.removeAccents(l.toLowerCase())))
    }

    /**
     * @param  {string} str 
     * @returns {boolean} 
     */
    static endsWithVowel (str)
    {
        if (!str) return false
        return StringUtils.endsWithSome(StringUtils.removeAccents(str), ...GreekAlphabet.VOWELS)
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

    static sanitizeLetters (letters)
    {
        return letters.replace(/ά/gm, 'ά').replace(/έ/gm, 'έ').replace(/ή/gm, 'ή').replace(/ί/gm, 'ί').replace(/ό/gm, 'ό').replace(/ύ/gm, 'ύ').replace(/ώ/gm, 'ώ')
    }
}