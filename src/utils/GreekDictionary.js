import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'

class GreekDictionaryEntry
{
    /**
     * @type {import("@/utils/GreekGrammar").GENDERS}
     */
    gender
    /**
     * @type {GreekDeclensionNounTables.Table}
     */
    declensionTable
    /**
     * @type {import("@/utils/GreekGrammar").PARTS_OF_SPEECH}
     */
    pos
    /**
     * @type {string}
     */
    translation

    constructor ({gender = null, declensionTable = new GreekDeclensionNounTables.Table_Type(), pos = null, translation = ''} = {})
    {
        this.gender = gender
        this.declensionTable = declensionTable
        this.pos = pos
        this.translation = translation
    }
}

export default class GreekDictionary
{
    /**
     * @type {GreekDictionaryEntry}
     */
    // @ts-ignore
    static Entry = GreekDictionaryEntry

    static DICTIONARY =
    {
        'βίβλος': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'book' }),
        get 'βύβλος' () { return GreekDictionary.get('βίβλος') },
        'γένεσις': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionTable: GreekDeclensionNounTables.IS_EWS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'birth' }),
        get 'γέννησις' () { return GreekDictionary.get('γένεσις') },
        'ἰησοῦς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionTable: GreekDeclensionNounTables.OUS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Jesus' }),
        'χρῑστός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Christ' }),
        get 'χριστός' () { return GreekDictionary.get('χρῑστός') },
        'υἱός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'son' }),
        'ἀβρααμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionTable: GreekDeclensionNounTables.INDECLINABLE, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Abraham' }),
        get 'ἀβραὰμ' () { return GreekDictionary.get('ἀβρααμ') },
        'δαυεὶδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionTable: GreekDeclensionNounTables.INDECLINABLE, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'David' }),
        'γεννάω': new GreekDictionaryEntry({ declensionTable: GreekDeclensionNounTables.INDECLINABLE, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'David' }),
    }

    /**
     * @param {string} lemma 
     * @returns {GreekDictionaryEntry}
     */
    static get (lemma)
    {
        return this.DICTIONARY[lemma]
    }
}