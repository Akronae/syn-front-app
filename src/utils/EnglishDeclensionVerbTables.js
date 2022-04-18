import ObjectUtils from '@/utils/ObjectUtils'
import StringUtils from '@/utils/StringUtils'
import EnglishGrammar, { Moods, Numbers, Persons, Tenses, Voices } from '@/utils/EnglishGrammar'
import EnglishIrregularVerbs from './EnglishIrregularVerbs'
import { EnglishDeclensionVerbTable } from './EnglishDeclensionVerbTable'
import EnglishDeclension from './EnglishDeclension'

export default class EnglishDeclensionVerbTables
{
    static BASIC = new EnglishDeclensionVerbTable
    ({
        present: new Moods
        ({
            participle: ['ing']
        }),
        past: new Moods
        ({
            indicative: new Numbers
            ({
                singular: new Persons({ first: new Voices({ active: ['ed'] }) })
            }),
            continuous: new Numbers
            ({
                singular: new Persons({ first: new Voices({ active: [''] }) })
            }),

            participle: ['ed']
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
            
            if (StringUtils.endsWithSome(radical, 't', 'd')) ending = StringUtils.EMPTY
            
            if (radical.endsWith('get'))
            {
                if (decl.voice == EnglishGrammar.VOICES.PASSIVE)
                {
                    ending = 'ten'
                }

                rad = StringUtils.replaceLast(radical, 'get', 'got')
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
            
            if (rad.endsWith('e') && ending && ending.startsWith('e')) ending = ending.replace('e', StringUtils.EMPTY)
            var conjugated = ObjectUtils.get(EnglishIrregularVerbs.DICTIONARY[radical], declension) || rad + ending
            flatTable[declension] = `${aux} ${conjugated}`.trim()
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}