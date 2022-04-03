import ObjectUtils from '@/utils/ObjectUtils'
import StringUtils from '@/utils/StringUtils'
import DeclensionTable from '@/utils/DeclensionTable'
import { Moods, Numbers, Persons, Tenses } from '@/utils/EnglishGrammar'

/**
 * @type {Tenses<Moods<Numbers<Persons<string[]>>>>}
 */
export class EnglishDeclensionVerbTable extends Tenses
{
}

export default class EnglishDeclensionVerbTables extends DeclensionTable
{
    /**
     * @type {EnglishDeclensionVerbTables}
     */
    static BASIC = new EnglishDeclensionVerbTable
    ({
        past: new Moods
        ({
            indicative: new Numbers
            ({
                singular: new Persons({ first: ['ed'] })
            })
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
                if (declension.includes('perfect'))
                {
                    ending = 'ten'
                }

                rad = StringUtils.replaceLast(radical, 'get', 'got')
            }
            
            flatTable[declension] = rad + ending
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}