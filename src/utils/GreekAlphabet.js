import StringUtils from '@/utils/StringUtils'

export default class GreekAlphabet
{
    static VOWELS = ['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω']
    static CONSONANTS = ['β', 'γ', 'δ', 'ζ', 'θ', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ']
    static TONOS = ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ']

    static isVowel (letter)
    {
        return GreekAlphabet.VOWELS.includes(StringUtils.removeAccents(letter[0].toLowerCase()))
    }
    static isConsonant (letter)
    {
        return GreekAlphabet.CONSONANTS.includes(StringUtils.removeAccents(letter[0].toLowerCase()))
    }

    static sanitizeLetters (letters)
    {
        return letters.replace(/ί/gm, 'ί').replace(/ώ/gm, 'ώ')
    }
}