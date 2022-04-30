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
            const letter = part[i].toLocaleLowerCase()
            const entry = Array.from(GreekAlphabet.ACCENTUATED.entries()).find(([k, v]) => v.includes(letter))
            if (entry) accents.push(...entry[0])
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
    static accentuate (part, accents, {fromEnd = false} = {})
    {
        var p = part.split('')
        let i = 0

        if (fromEnd) p = p.reverse()
        
        while (true)
        {
            var changed = StringUtils.EMPTY
            const targetAccents = [...this.getAccents(p[i]), ...accents]
            const letter = StringUtils.removeAccents(p[i])
            const targetAccentsLetters = GreekAlphabet.ACCENTUATED.get(targetAccents)
            if (targetAccentsLetters)
                changed = targetAccentsLetters.find(l => StringUtils.removeAccents(l) == letter)

            if (changed || !p[i])
            {
                p[i] = changed
                break
            }
            i++
        }

        if (fromEnd) p = p.reverse()

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

    /**
     * 
     * @param {string} word
     * @param {number} shift 
     * @param {Object} options 
     * @param {import('./GreekGrammar').ACCENTS[]} [options.except] 
     * @returns 
     */
    static shiftAccent (word, shift, {except = []} = {})
    {
        const isReversed = shift < 0
        shift = Math.abs(shift)
        var syllables = this.getSyllables(word)
        if (isReversed) syllables = syllables.reverse()
        for (let i = 0; i < syllables.length && shift; i++)
        {
            if (StringUtils.hasAccents(syllables[i]) && syllables[i + 1])
            {
                const accents = this.getAccents(syllables[i]).filter(a => !except.includes(a))
                syllables[i + 1] = this.accentuate(syllables[i + 1], accents)
                syllables[i] = this.removeAccents(syllables[i], accents)
                shift--
            }
        }
        if (isReversed) syllables = syllables.reverse()
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