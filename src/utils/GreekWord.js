import StringUtils from '@/utils/StringUtils'

export default class GreekWord
{
    static isVowel (letter)
    {
        const vowels = ['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω']

        return vowels.includes(StringUtils.removeAccents(letter[0].toLowerCase()))
    }
    
    static getSyllables (word)
    {
        const syllables = []
        let syllable = ''
        for (var i = 0; i < word.length; i++)
        {
            const letter = word[i]
            syllable += letter

            if (this.isVowel(letter))
            {
                if (!(i > 0 && this.isVowel(word[i - 1])))
                {
                    syllables.push(syllable)
                    syllable = ''
                }
            }

        }
        if (syllable)
        {
            if (syllable.split('').every(letter => !this.isVowel(letter)))
            {
                syllables[syllables.length - 1] += syllable
            }
            else syllables.push(syllable)
        }

        return syllables
    }
}