import StringUtils from '@/utils/StringUtils'
import GreekAlphabet from './GreekAlphabet'
import GreekGrammar from './GreekGrammar'

export default class GreekWord
{
    /**
     * @param {string} part 
     * @returns {import('./GreekGrammar').ACCENTS[]}
     */
    static getAccents (part)
    {
        /** @type {import('./GreekGrammar').ACCENTS[]} */
        const accents = []
        for (let i = 0; i < part.length; i++)
        {
            if (StringUtils.includesSome(part[i], ...GreekAlphabet.DASIA)) accents.push(GreekGrammar.ACCENTS.DASIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.OXIA)) accents.push(GreekGrammar.ACCENTS.OXIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.PSILI)) accents.push(GreekGrammar.ACCENTS.PSILI)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.VARIA)) accents.push(GreekGrammar.ACCENTS.VARIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.PERISPOMENI)) accents.push(GreekGrammar.ACCENTS.PERISPOMENI)
        }
        return accents
    }

    static augment (part)
    {
        part = part.replace('ος', 'ός')
        part = part.replace('ον', 'όν')
        part = part.replace('ο', 'ό')
        part = part.replace('όυ', 'οῦ')
        part = part.replace('ῳ', 'ῷ')
        part = part.replace('η', 'ή')
        part = part.replace('ά', 'η')
        part = part.replace('ε', 'έ')

        return part
    }

    /**
     * 
     * @param {string} part 
     * @param {import('./GreekGrammar').ACCENTS[]} accents
     * @returns {string} 
     */
    static accentuate (part, accents)
    {
        var p = part.split('')
        let i = 0
        
        while (true)
        {
            var changed
            for (const accent of accents)
            {
                if (accent == GreekGrammar.ACCENTS.DASIA) changed = GreekAlphabet.DASIA.find(l => StringUtils.removeAccents(l) == StringUtils.removeAccents(p[i]))
                if (accent == GreekGrammar.ACCENTS.OXIA) changed = GreekAlphabet.OXIA.find(l => StringUtils.removeAccents(l) == StringUtils.removeAccents(p[i]))
                if (accent == GreekGrammar.ACCENTS.PSILI) changed = GreekAlphabet.PSILI.find(l => StringUtils.removeAccents(l) == StringUtils.removeAccents(p[i]))
                if (accent == GreekGrammar.ACCENTS.VARIA) changed = GreekAlphabet.VARIA.find(l => StringUtils.removeAccents(l) == StringUtils.removeAccents(p[i]))
                if (accent == GreekGrammar.ACCENTS.PERISPOMENI) changed = GreekAlphabet.PERISPOMENI.find(l => StringUtils.removeAccents(l) == StringUtils.removeAccents(p[i]))
            }

            if (changed || !p[i])
            {
                p[i] = changed
                break
            }
            i++
        }

        p = p.join('').replace(/όυ/gm, 'οῦ').split('')

        for (let i = 0; i < p.length; i++)
        {
            if (GreekAlphabet.isVowel(p[i]) && StringUtils.equalSome(p[i+1], 'υ', 'ι'))
            {
                p[i+1] = this.accentuate(p[i+1], this.getAccents(p[i]))
                p[i] = StringUtils.removeAccents(p[i])
            }
        }

        return p.join('')
    }

    static decrease (part)
    {
        return part
            .replace('έ', 'ε')
            .replace('ό', 'ο')
    }

    static shiftAccent (word, shift)
    {
        const syllables = this.getSyllables(word)
        for (let i = 0; i < syllables.length && shift; i++)
        {
            if (StringUtils.hasAccents(syllables[i]) && syllables[i + 1])
            {
                syllables[i + 1] = this.accentuate(syllables[i + 1], this.getAccents(syllables[i]))
                syllables[i] = StringUtils.removeAccents(syllables[i])
                shift--
            }
        }
        return syllables.join('')
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