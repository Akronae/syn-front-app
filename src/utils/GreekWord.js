import StringUtils from '@/utils/StringUtils'
import GreekAlphabet from './GreekAlphabet'

export default class GreekWord
{
    static augment (part)
    {
        part = part.replace('ος', 'ός')
        part = part.replace('ους', 'οὺς')
        part = part.replace('ου', 'οῦ')
        part = part.replace('ῳ', 'ῷ')
        part = part.replace('ον', 'όν')
        part = part.replace('ε', 'έ')
        part = part.replace('ά', 'η')

        return part
    }
    
    static getSyllables (word)
    {
        const syllables = []
        let syllable = ''
        for (var i = 0; i < word.length; i++)
        {
            const letter = word[i]
            syllable += letter

            if (GreekAlphabet.isVowel(letter))
            {
                if (!(i > 0 && GreekAlphabet.isVowel(word[i - 1])))
                {
                    syllables.push(syllable)
                    syllable = ''
                }
            }

        }
        if (syllable)
        {
            if (syllable.split('').every(letter => !GreekAlphabet.isVowel(letter)))
            {
                syllables[syllables.length - 1] += syllable
            }
            else syllables.push(syllable)
        }

        return syllables
    }
}