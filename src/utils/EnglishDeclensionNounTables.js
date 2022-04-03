import ObjectUtils from '@/utils/ObjectUtils'
import { Cases, Numbers } from '@/utils/EnglishGrammar'

/**
 * @type {Numbers<Cases<string[]>>}
 */
export class EnglishDeclensionNounTable extends Numbers
{
}

export default class EnglishDeclensionNounTables
{
    /**
     * @type {EnglishDeclensionNounTables}
     */
    static BASIC = new EnglishDeclensionNounTable
    ({
        singular: new Cases({ nominative: [''] }),
        plural: new Cases({ nominative: ['s'] })
    })

    /**
     * 
     * @param {EnglishDeclensionNounTables} table
     * @param {string} radical 
     * @returns {EnglishDeclensionNounTable}
     */
    static conjugateTable (table, radical)
    {
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            flatTable[declension] = radical + ending
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}