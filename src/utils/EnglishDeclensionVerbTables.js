import ObjectUtils from '@/utils/ObjectUtils'
import StringUtils from '@/utils/StringUtils'
import { Moods, Numbers, Persons, Tenses, Voices } from '@/utils/EnglishGrammar'
import EnglishIrregularVerbs from './EnglishIrregularVerbs'
import { EnglishDeclensionVerbTable } from './EnglishDeclensionVerbTable'

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
            if (!ending) return
            
            var rad = radical
            
            if (StringUtils.endsWithSome(radical, 't', 'd')) ending = StringUtils.EMPTY
            
            if (radical.endsWith('get'))
            {
                if (declension.includes('passive'))
                {
                    ending = 'ten'
                }

                rad = StringUtils.replaceLast(radical, 'get', 'got')
            }

            var aux = StringUtils.EMPTY
            if (declension.includes('passive'))
            {
                if (declension.includes('present')) aux = declension.includes('singular') ? 'is' : 'are'
                if (declension.includes('past')) aux = StringUtils.includesSome(declension, 'plural', 'second') ? 'were' : 'was'
            }
            
            var conjugated = ObjectUtils.get(EnglishIrregularVerbs.DICTIONARY[radical], declension) || rad + ending
            flatTable[declension] = `${aux} ${conjugated}`.trim()
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}