import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDeclensionVerbTables from './GreekDeclensionVerbTables'
import GreekArticles from './GreekArticles'
import GreekPersonalPronoun from './GreekPersonalPronoun'

class GreekDictionaryEntry
{
    /**
     * @type {import("@/utils/GreekGrammar").GENDERS}
     */
    gender
    /**
     * @type {GreekDeclensionNounTables.Table}
     */
    declensionNounTable
    /**
     * @type {GreekDeclensionVerbTables.Table}
     */
    declensionVerbTable
    /**
     * @type {import('./GreekArticles').GreekArticle}
     */
    articleTable
    /**
     * @type {GreekPersonalPronoun}
     */
    pronounTable
    /**
     * @type {import("@/utils/GreekGrammar").PARTS_OF_SPEECH}
     */
    pos
    /**
     * @type {string}
     */
    translation

    constructor ({gender = null, declensionNounTable = null, declensionVerbTable = null, articleTable = null, pronounTable = null, pos = null, translation = ''} = {})
    {
        this.gender = gender
        this.declensionNounTable = declensionNounTable
        this.declensionVerbTable = declensionVerbTable
        this.articleTable = articleTable
        this.pronounTable = pronounTable
        this.pos = pos
        this.translation = translation
    }
}

export default class GreekDictionary
{
    /**
     * @type {typeof GreekDictionaryEntry}
     */
    static Entry_Type = GreekDictionaryEntry
    static Entry = new GreekDictionaryEntry()

    static DICTIONARY =
    {
        'βίβλος': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'book' }),
        get 'βύβλος' () { return GreekDictionary.get('βίβλος') },
        'γένεσις': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.IS_EWS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'origin' }),
        get 'γέννησις' () { return GreekDictionary.get('γένεσις') },
        'ἰησοῦς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OUS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Jesus' }),
        'χρῑστός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Christ' }),
        get 'χριστός' () { return GreekDictionary.get('χρῑστός') },
        'υἱός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'son' }),
        'ἀβρααμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Abraham' }),
        get 'ἀβραὰμ' () { return GreekDictionary.get('ἀβρααμ') },
        'δαυεὶδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'David' }),
        'γεννάω': new GreekDictionaryEntry({ declensionVerbTable: GreekDeclensionVerbTables.W, pos: GreekGrammar.PARTS_OF_SPEECH.VERB, translation: 'to beget' }),
        'ὁ': new GreekDictionaryEntry({ articleTable: GreekArticles.DEFINITE, pos: GreekGrammar.PARTS_OF_SPEECH.ARTICLE, translation: 'the' }),
        'ἰσαὰκ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Isaac' }),
        'δὲ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'then' }),
        'ἰακὼβ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Jacob' }),
        'ἰούδας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Judas' }),
        'καὶ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'and' }),
        'ἀδελφός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'brother' }),
        'ἀδελφὸς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'brother' }),
        'ἐγώ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, pos: GreekGrammar.PARTS_OF_SPEECH.PRONOUN, pronounTable: GreekPersonalPronoun, translation: 'I' }),
        'φαρὲς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Phares' }),
        'θάμαρ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Thamar' }),
        'ζαρὰ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Zara' }),
        'ἐκ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PREPOSITION, translation: 'from' }),
        'ἑσρὼμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Esrom' }),
        'ἀρὰμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Haram' }),
        'ἀμιναδὰβ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Haminadab' }),
        'ναασσὼν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Naasson' }),
        'σαλμὼν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Salmon' }),
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