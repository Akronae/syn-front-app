import StringUtils from '@/utils/StringUtils'
import ArrayUtils from './ArrayUtils'
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
        if (!part) return []
        /** @type {import('./GreekGrammar').ACCENTS[]} */
        const accents = []
        for (let i = 0; i < part.length; i++)
        {
            if (StringUtils.includesSome(part[i], ...GreekAlphabet.DASIA)) accents.push(GreekGrammar.ACCENTS.DASIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.OXIA)) accents.push(GreekGrammar.ACCENTS.OXIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.PSILI)) accents.push(GreekGrammar.ACCENTS.PSILI)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.VARIA)) accents.push(GreekGrammar.ACCENTS.VARIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.PERISPOMENI)) accents.push(GreekGrammar.ACCENTS.PERISPOMENI)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.DASIA_OXIA)) accents.push(GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.OXIA)
            else if (StringUtils.includesSome(part[i], ...GreekAlphabet.PSILI_OXIA)) accents.push(GreekGrammar.ACCENTS.PSILI, GreekGrammar.ACCENTS.OXIA)
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
        part = part.replace('ύ', 'ῦ')

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
            var changed = StringUtils.EMPTY
            const targetAccents = [...this.getAccents(p[i]), ...accents]
            const letter = StringUtils.removeAccents(p[i])

            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.DASIA], {ignoreOrder: true})) changed = GreekAlphabet.DASIA.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.OXIA], {ignoreOrder: true})) changed = GreekAlphabet.OXIA.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.PSILI], {ignoreOrder: true})) changed = GreekAlphabet.PSILI.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.VARIA], {ignoreOrder: true})) changed = GreekAlphabet.VARIA.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.PERISPOMENI], {ignoreOrder: true})) changed = GreekAlphabet.PERISPOMENI.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.OXIA], {ignoreOrder: true})) changed = GreekAlphabet.DASIA_OXIA.find(l => StringUtils.removeAccents(l) == letter)
            if (ArrayUtils.areEqual(targetAccents, [GreekGrammar.ACCENTS.PSILI, GreekGrammar.ACCENTS.OXIA], {ignoreOrder: true})) changed = GreekAlphabet.PSILI_OXIA.find(l => StringUtils.removeAccents(l) == letter)

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
            if (GreekAlphabet.isVowel(p[i]) && StringUtils.equalsSome(p[i+1], 'υ', 'ι'))
            {
                p[i+1] = this.accentuate(p[i+1], this.getAccents(p[i]))
                p[i] = StringUtils.removeAccents(p[i])
            }
        }

        return p.join('')
    }

    /**
     * 
     * @param {string} part 
     * @param {import('./GreekGrammar').ACCENTS[]} accents
     * @returns {string} 
     */
    static removeAccents (part, accents)
    {
        var p = part.split('')
        let i = 0
        
        while (true)
        {
            var changed = StringUtils.EMPTY
            const targetAccents = ArrayUtils.removeAll(this.getAccents(p[i]), ...accents) 
    
            changed = this.accentuate(StringUtils.removeAccents(p[i]), targetAccents)
    
            if (changed != p[i] || !p[i])
            {
                p[i] = changed
                break
            }
            i++
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
    
    /**
     * @param {string} word 
     * @returns {string[]}
     */
    static getSyllables (word)
    {
        const syllables = []
        while (word.length > 0)
        {
            const nextVowelIndex = word.indexOf(GreekAlphabet.getFirstVowel(word)) + GreekAlphabet.getFirstVowel(word).length
            if (nextVowelIndex <= 0) break
            syllables.push(word.substring(0, nextVowelIndex))
            word = word.substring(nextVowelIndex)
        }
        syllables[syllables.length - 1] += word
        
        return syllables
    }
}