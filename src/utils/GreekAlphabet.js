import StringUtils from '@/utils/StringUtils'
import ArrayKeyedMap from './ArrayKeyedMap'
import ArrayUtils from './ArrayUtils'
import GreekGrammar from './GreekGrammar'

export default class GreekAlphabet
{
    static VOWELS = ['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω', 'ου', 'ει', 'αυ', 'αι']
    static CONSONANTS = ['β', 'γ', 'δ', 'ζ', 'θ', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ']

    static ACCENTUATED = new ArrayKeyedMap
    ([
        [[GreekGrammar.ACCENTS.OXIA], ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ']],
        [[GreekGrammar.ACCENTS.VARIA], ['ὰ', 'ὲ', 'ὴ', 'ὶ', 'ὸ', 'ὺ', 'ὼ']],
        [[GreekGrammar.ACCENTS.PSILI], ['ἀ', 'ἐ', 'ἠ', 'ἰ', 'ὀ', 'ὐ', 'ὠ']],
        [[GreekGrammar.ACCENTS.DASIA], ['ἁ', 'ἑ', 'ἡ', 'ἱ', 'ὁ', 'ὑ', 'ὡ']],
        [[GreekGrammar.ACCENTS.YPOGEGRAMMENI], ['ᾳ', 'ῃ', 'ῳ']],
        [[GreekGrammar.ACCENTS.PERISPOMENI], ['ᾶ', 'ῆ', 'ῖ', 'ῦ', 'ῶ']],
        [[GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.OXIA], ['ἅ', 'ἕ', 'ἥ', 'ἵ', 'ὅ', 'ὕ', 'ὥ']],
        [[GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.PERISPOMENI], ['ἇ', 'ἧ', 'ἷ', 'ὗ', 'ὧ']],
        [[GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.PERISPOMENI, GreekGrammar.ACCENTS.YPOGEGRAMMENI], ['ᾇ', 'ᾗ', 'ᾧ']],
        [[GreekGrammar.ACCENTS.PSILI, GreekGrammar.ACCENTS.OXIA],  ['ἄ', 'ἔ', 'ἤ', 'ἴ', 'ὄ', 'ὔ', 'ὤ']],
    ])

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
     * @param  {string} str 
     * @returns {boolean} 
     */
    static endsWithConsonant (str)
    {
        if (!str) return false
        return StringUtils.endsWithSome(StringUtils.removeAccents(str), ...GreekAlphabet.CONSONANTS)
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
        // transforms "Unicode/Greek and Coptic (U+0370 to U+03FF)" to "Unicode/Greek Extended (U+1F00 to U+1FFF)"
        return letters.replace(/ά/gm, 'ά').replace(/έ/gm, 'έ').replace(/ή/gm, 'ή').replace(/ί/gm, 'ί').replace(/ό/gm, 'ό').replace(/ύ/gm, 'ύ').replace(/ώ/gm, 'ώ')
    }
}