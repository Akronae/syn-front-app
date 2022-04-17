import StringUtils from '@/utils/StringUtils'
import ArrayUtils from './ArrayUtils'

export default class GreekAlphabet
{
    static VOWELS = ['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω']
    static CONSONANTS = ['β', 'γ', 'δ', 'ζ', 'θ', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ']
    static OXIA = ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ']
    static VARIA = ['ὰ', 'ὲ', 'ὴ', 'ὶ', 'ὸ', 'ὺ', 'ὼ']
    static PSILI = ['ἀ', 'ἐ', 'ἠ', 'ἰ', 'ὀ', 'ὐ', 'ὠ']
    static DASIA = ['ἁ', 'ἑ', 'ἡ', 'ἱ', 'ὁ', 'ὑ', 'ὡ']
    static PERISPOMENI = ['ᾶ', 'ῆ', 'ῖ', 'ῦ', 'ῶ']

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

    static sanitizeLetters (letters)
    {
        return letters.replace(/ά/gm, 'ά').replace(/έ/gm, 'έ').replace(/ή/gm, 'ή').replace(/ί/gm, 'ί').replace(/ό/gm, 'ό').replace(/ύ/gm, 'ύ').replace(/ώ/gm, 'ώ')
    }
}