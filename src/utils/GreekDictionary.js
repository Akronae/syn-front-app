import GreekGrammar, { Cases } from '@/utils/GreekGrammar'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDeclensionVerbTables from './GreekDeclensionVerbTables'
import GreekArticles from './GreekArticles'
import GreekPersonalPronoun from './GreekPersonalPronoun'
import GreekPronouns, { GreekPronoun } from './GreekPronouns'
import EnglishPersonalPronoun from './EnglishPersonalPronoun'
import GreekDeclensionTableNoun from './GreekDeclensionTableNoun'
import EnglishPronouns, { EnglishPronoun } from './EnglishPronouns'

export class GreekDictionaryEntry
{
    /**
     * @type {import("@/utils/GreekGrammar").GENDERS}
     */
    gender
    /**
     * @type {GreekDeclensionTableNoun}
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
    personalPronounTable
    /**
     * @type {GreekPronoun}
     */
    pronounTable
    /**
     * @type {import("@/utils/GreekGrammar").PARTS_OF_SPEECH}
     */
    pos
    /**
     * @type {import('@/utils/GreekGrammar').Cases<string>|string|EnglishPersonalPronoun|EnglishPronoun}
     */
    translation

    /**
     * @param {Object} args
     * @param {string} [args.lemma]
     * @param {import('@/utils/GreekGrammar').GENDERS} [args.gender]
     * @param {GreekDeclensionTableNoun} [args.declensionNounTable]
     * @param {GreekDeclensionVerbTables.Table} [args.declensionVerbTable]
     * @param {import('./GreekArticles').GreekArticle} [args.articleTable]
     * @param {GreekPronoun} [args.pronounTable]
     * @param {GreekPersonalPronoun} [args.personalPronounTable]
     * @param {import('@/utils/GreekGrammar').PARTS_OF_SPEECH} [args.pos]
     * @param {import('@/utils/GreekGrammar').Cases<string>|string|EnglishPersonalPronoun|EnglishPronoun} [args.translation]
     */
    constructor ({gender = null, declensionNounTable = null, declensionVerbTable = null, articleTable = null, personalPronounTable = null, pronounTable = null, pos = null, translation = null} = {})
    {
        this.gender = gender
        this.declensionNounTable = declensionNounTable
        this.declensionVerbTable = declensionVerbTable
        this.articleTable = articleTable
        this.personalPronounTable = personalPronounTable
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
        'βίβλος': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'book' }),
        get 'βύβλος' () { return GreekDictionary.get('βίβλος') },
        'γένεσις': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.IS_EWS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'origin' }),
        get 'γέννησις' () { return GreekDictionary.get('γένεσις') },
        'ἰησοῦς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OUS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yesu' }),
        'χρῑστός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Christ' }),
        get 'χριστός' () { return GreekDictionary.get('χρῑστός') },
        'υἱός': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'son' }),
        'ἀβρααμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Abraham' }),
        get 'ἀβραὰμ' () { return GreekDictionary.get('ἀβρααμ') },
        'δαυὶδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.INDECLINABLE, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'David' }),
        'γεννάω': new GreekDictionaryEntry({ declensionVerbTable: GreekDeclensionVerbTables.W, pos: GreekGrammar.PARTS_OF_SPEECH.VERB, translation: 'to beget' }),
        'ὁ': new GreekDictionaryEntry({ articleTable: GreekArticles.DEFINITE, pos: GreekGrammar.PARTS_OF_SPEECH.ARTICLE, translation: 'the' }),
        'ἰσαὰκ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yishaq' }),
        'δὲ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'then' }),
        'ἰακὼβ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yaaqob' }),
        'ἰούδας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yehuda' }),
        'καὶ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'and' }),
        'ἀδελφὸς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.OS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'brother' }),
        'ἐγώ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, pos: GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN, personalPronounTable: GreekPersonalPronoun, translation: EnglishPersonalPronoun }),
        'φαρὲς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Phares' }),
        'θαμάρ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Thamar' }),
        'ζάρα': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Zerah' }),
        'ἐκ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PREPOSITION, translation: new Cases({ genitive: 'from' }) }),
        get 'ἐξ' () { return GreekDictionary.get('ἐκ') },
        'ἑσρὼμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Hezron' }),
        'ἀρὰμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Aram' }),
        'ἀμιναδὰβ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Amminadab' }),
        'ναασσὼν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Nahshon' }),
        'σαλμὼν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Salmon' }),
        'βοὲς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Boaz' }),
        get 'βόες' () { return GreekDictionary.get('βοὲς') },
        'ῥαχάβ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Rahab' }),
        'ἰωβὴδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.INDECLINABLE, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Obed' }),
        'ῥούθ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Rut' }),
        'ἰεσσαὶ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yishai' }),
        'βασιλεύς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.EUS_EWS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'king' }),
        'σολομὼν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.WN_WNOS, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Selomo' }),
        'οὐρίας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Urias' }),
        'ῥοβοὰμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Rehoboam' }),
        'ἀβιὰ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Abiyya' }),
        'ἀσὰφ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Asa' }),
        'ἰωσαφὰτ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yehosapat' }),
        'ἰωρὰμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Joram' }),
        'ὀζίας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Uzziah' }),
        'ἰωαθὰμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Joatham' }),
        'ἀχὰζ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Ahaz' }),
        'ἑζεκίας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Hezekiah' }),
        'μανασσῆς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.HS_H, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Manasse' }),
        'ἀμὼς': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Amos' }),
        'ἰωσίας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yosiyya' }),
        'ἰεχονίας': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.AS_OU, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Jechoniah' }),
        'ἐπί': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PREPOSITION, translation: new Cases({genitive: 'on', dative: 'afer', accusative: 'for'}) }),
        get 'ἐπὶ' () { return GreekDictionary.get('ἐπί') },
        'μετοικεσία': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.A_AS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'deportation' }),
        'βαβυλών': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.WN_WNOS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'Babylon' }),
        'μετὰ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PREPOSITION, translation: new Cases({genitive: 'with', dative: 'among', accusative: 'after'}) }),
        'σαλαθιὴλ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Shealtiel' }),
        'ζοροβαβὲλ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Zerubbabel' }),
        'ἀβιοὺδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Abiud' }),
        'ἐλιακὶμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Eliakim' }),
        'ἀζὼρ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Azor' }),
        'σαδὼκ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Zadok' }),
        'ἀχὶμ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Achim' }),
        'ἐλιοὺδ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Eliud' }),
        'ἐλεάζαρ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Elazar' }),
        'ματθὰν': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Matthan' }),
        'ἰωσὴφ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.SEMITIC_PROPER_NAME, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Yosep' }),
        'ἄνηρ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.MASCULINE, declensionNounTable: GreekDeclensionNounTables.S_OS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'man' }),
        'μαρία': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.A_AS, pos: GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, translation: 'Maryam' }),
        [GreekPronouns.RELATIVE.singular.masculine.nominative[0]]: new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PRONOUN, pronounTable: GreekPronouns.RELATIVE, translation: EnglishPronouns.RELATIVE }),
        'λέγω': new GreekDictionaryEntry({ declensionVerbTable: GreekDeclensionVerbTables.W, pos: GreekGrammar.PARTS_OF_SPEECH.VERB, translation: 'to say' }),
        'πᾶς': new GreekDictionaryEntry({ declensionNounTable: GreekDeclensionNounTables.S_OS, pos: GreekGrammar.PARTS_OF_SPEECH.ADJECTIVE, translation: 'all' }),
        'οὖν': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'therefore' }),
        'γενεὰ': new GreekDictionaryEntry({ gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables.A_AS, pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, translation: 'generation' }),
        'ἀπὸ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.PREPOSITION, translation: new Cases({ genitive: 'from' }) }),
        'ἕως': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.CONJUNCTION, translation: 'until' }),
        'οὕτως': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.ADVERB, translation: 'thus' }),
        'εἰμί': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.VERB, declensionVerbTable: GreekDeclensionVerbTables.W, translation: 'to be' }),
        'μνηστεύω': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.VERB, declensionVerbTable: GreekDeclensionVerbTables.W, translation: 'to engage' }),
        'μήτηρ': new GreekDictionaryEntry({ pos: GreekGrammar.PARTS_OF_SPEECH.NOUN, gender: GreekGrammar.GENDERS.FEMININE, declensionNounTable: GreekDeclensionNounTables._OS, translation: 'mother' }),
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