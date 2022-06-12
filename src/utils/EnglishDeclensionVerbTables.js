import ObjectUtils from '@/utils/ObjectUtils'
import StringUtils from '@/utils/StringUtils'
import EnglishGrammar, { Moods, Numbers, Persons, Tenses, Voices } from '@/utils/EnglishGrammar'
import EnglishIrregularVerbs from './EnglishIrregularVerbs'
import { EnglishDeclensionVerbTable } from './EnglishDeclensionVerbTable'
import EnglishDeclension from './EnglishDeclension'
import EnglishWord from './EnglishWord'
import LatinAlphabet from './LatinAlphabet'

export default class EnglishDeclensionVerbTables
{
    static BASIC = new EnglishDeclensionVerbTable
    ({
        present: new Moods
        ({
            participle: ['ing'],
            infinitive: ['']
        }),
        past: new Moods
        ({
            indicative: new Numbers
            ({
                singular: new Persons({ first: new Voices({ active: ['ed'], passive: ['ed'] }) })
            }),
            continuous: new Numbers
            ({
                singular: new Persons({ first: new Voices({ active: [''] }) })
            }),

            participle: ['ed'],
            infinitive: ['']
        })
    })

    /**
     * 
     * @param {EnglishDeclensionVerbTables} table
     * @param {string} radical 
     * @returns {EnglishDeclensionVerbTable}
     */
    static conjugateTable (table, radical)
    {
        radical = radical.replace('to ', StringUtils.EMPTY)
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            var rad = radical
            const decl = EnglishDeclension.fromString(declension) 
                        
            if (radical.endsWith('get'))
            {
                if (decl.tense == EnglishGrammar.TENSES.PAST)
                {
                    rad = StringUtils.replaceLast(radical, 'get', 'got')
                    ending = ''
                }
                if (decl.voice == EnglishGrammar.VOICES.PASSIVE)
                {
                    ending = 'ten'
                }
            }


            var aux = StringUtils.EMPTY
            if (decl.voice == EnglishGrammar.VOICES.PASSIVE || decl.mood == EnglishGrammar.MOODS.CONTINUOUS)
            {
                if (decl.tense == EnglishGrammar.TENSES.PRESENT) aux = decl.number == EnglishGrammar.NUMBERS.SINGULAR ? 'is' : 'are'
                if (decl.tense == EnglishGrammar.TENSES.PAST)
                {
                    aux = (decl.number == EnglishGrammar.NUMBERS.PLURAL || decl.person == EnglishGrammar.PERSONS.SECOND) ? 'were' : 'was'
                }
            }

            if (decl.mood == EnglishGrammar.MOODS.CONTINUOUS)
            {
                if (radical == 'be') rad = StringUtils.EMPTY
            }
            
            if (rad.endsWith('e') && (StringUtils.startsWithSome(ending, ...LatinAlphabet.VOWELS)))
            {
                const radSyllabes = EnglishWord.getSyllables(rad)
                if (radSyllabes.length > 1 && !EnglishWord.isConsonant(radSyllabes[radSyllabes.length - 2].split('').pop()))
                {
                    rad = StringUtils.replaceLast(rad, 'e', StringUtils.EMPTY)
                }
            }
            
            var conjugated = ObjectUtils.get(EnglishIrregularVerbs.DICTIONARY[radical], declension) || rad + ending
            conjugated = StringUtils.deleteAny(conjugated, '[', ']')

            if (conjugated.endsWith('inded')) conjugated = StringUtils.replaceLast(conjugated, 'inded', 'ound')
            if (conjugated.endsWith('ded')) conjugated = StringUtils.replaceLast(conjugated, 'ded', 'd')
            // if (conjugated.endsWith('ted')) conjugated = StringUtils.replaceLast(conjugated, 'ted', 't')

            const to = decl.mood == EnglishGrammar.MOODS.INFINITIVE ? 'to ' : StringUtils.EMPTY
            flatTable[declension] = `${to} ${aux} ${conjugated}`.trim()
        })
        console.log(ObjectUtils.buildObjectFromPathes(flatTable), flatTable)
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}