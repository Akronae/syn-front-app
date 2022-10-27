import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDeclensionVerbTables from './GreekDeclensionVerbTables'
import EnglishDeclensionVerbTables from './EnglishDeclensionVerbTables'

class EnglishDictionaryEntry
{
    /**
     * @type {EnglishDeclensionVerbTables.Table}
     */
    declensionVerbTable

    constructor ({ declensionVerbTable = null } = {})
    {
        this.declensionVerbTable = declensionVerbTable
    }
}

export default class EnglishDictionary
{
    /**
     * @type {EnglishDictionaryEntry}
     */
    // @ts-ignore
    static Entry = EnglishDictionaryEntry

    static DICTIONARY =
    {
        'get': new EnglishDictionaryEntry({ declensionVerbTable: EnglishDeclensionVerbTables.BASIC }),
        'beget': new EnglishDictionaryEntry({ declensionVerbTable: EnglishDeclensionVerbTables.BASIC }),
    }

    /**
     * @param {string} lemma 
     * @returns {EnglishDictionaryEntry}
     */
    static get (lemma)
    {
        return this.DICTIONARY[lemma]
    }
}