/**
* @typedef {"feminine" | "masculine" | "neuter"} GENDERS
*/
/**
* @typedef {"singular" | "plural"} NUMBERS
*/
/**
* @typedef {"vocative" | "nominative" | "accusative" | "dative" | "genitive" | "indeclinable"} CASES
*/
/**
* @typedef {"noun" | "proper_noun" | "pronoun" | "personal_pronoun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "interjection" | "particle" | "numeral" | "article" | "determiner"} PARTS_OF_SPEECH
*/
/**
* @typedef {"first" | "second" | "third"} PERSONS
*/
/**
* @typedef {"active" | "middle" | "passive"} VOICES
*/
/**
* @typedef {"indicative" | "subjunctive" | "optative" | "imperative" | "infinitive" | "participle"} MOODS
*/
/**
* @typedef {"present" | "imperfect" | "future" | "aorist" | "aorist_2nd" | "perfect" | "pluperfect"} TENSES
*/
/**
* @typedef {"thematic" | "athematic"} THEMES
*/
/**
* @typedef { "psili" | "dasia" | "varia" | "oxia" | "perispomeni" | "ypogergammeni" | "vrachy" | "macron" | "dialytika" } ACCENTS
*/

/**
 * @template T
 * @type {{[key: GENDERS]: T}}
 */
export class Genders
{
    feminine
    masculine
    neuter

    /**
     * @param {Object} args
     * @param {T} [args.feminine]
     * @param {T} [args.masculine]
     * @param {T} [args.neuter]
     */
    constructor ({feminine = null, masculine = null, neuter = null} = {})
    {
        this.feminine = feminine || masculine || neuter
        this.masculine = masculine || this.feminine
        this.neuter = neuter || this.masculine
    }
}

/**
 * @template T
 * @type {{[key: NUMBERS]: T}}
 */
export class Numbers
{
    singular
    plural

    /**
     * @param {Object} args
     * @param {T} [args.singular]
     * @param {T} [args.plural]
     */
    constructor ({singular = null, plural = null} = {})
    {
        this.singular = singular
        this.plural = plural
    }
}

/**
 * @template T
 * @type {{[key: CASES]: T}}
 */
export class Cases
{
    nominative
    genitive
    dative
    accusative
    vocative

    /**
     * @param {Object} args
     * @param {T} [args.nominative]
     * @param {T} [args.genitive]
     * @param {T} [args.dative]
     * @param {T} [args.accusative]
     * @param {T} [args.vocative]
     */
    constructor ({nominative = null, genitive = null, dative = null, accusative = null, vocative = null} = {})
    {
        this.nominative = nominative
        this.genitive = genitive
        this.dative = dative
        this.accusative = accusative
        this.vocative = vocative
    }
}

/**
 * @template T
 * @type {{[key: PERSONS]: T}}
 */
export class Persons
{
    first
    second
    third

    /**
     * @param {Object} args
     * @param {T} [args.first]
     * @param {T} [args.second]
     * @param {T} [args.third]
     */
    constructor ({first = null, second = null, third = null} = {})
    {
        this.first = first
        this.second = second
        this.third = third
    }
}

/**
 * @template T
 * @type {{[key: VOICES]: T}}
 */
export class Voices
{
    active
    middle
    passive

    /**
     * @param {Object} args
     * @param {T} [args.active]
     * @param {T} [args.middle]
     * @param {T} [args.passive]
     */
    constructor ({active = null, middle = null, passive = null} = {})
    {
        this.active = active || middle || passive
        this.middle = middle || this.active
        this.passive = passive || this.middle
    }
}

/**
 * @template T, T2, T3
 * @type {{[key: MOODS]: T}}
 */
export class Moods
{
    /** @type {T} */
    indicative
    /** @type {T} */
    subjunctive
    /** @type {T} */
    optative
    /** @type {T} */
    imperative
    /** @type {T2} */
    infinitive
    /** @type {T3} */
    participle

    /**
     * @param {Object} args
     * @param {T} [args.indicative]
     * @param {T} [args.subjunctive]
     * @param {T} [args.optative]
     * @param {T} [args.imperative]
     * @param {T2} [args.infinitive]
     * @param {T3} [args.participle]
     */
    constructor ({indicative = null, subjunctive = null, optative = null, imperative = null, infinitive = null, participle = null} = {})
    {
        this.indicative = indicative 
        this.subjunctive = subjunctive 
        this.optative = optative
        this.imperative = imperative
        this.infinitive = infinitive
        this.participle = participle
    }
}

/**
 * @template T
 * @type {{[key: TENSES]: T}}
 */
export class Tenses
{
    present
    imperfect
    future
    aorist
    aorist_2nd
    perfect
    pluperfect

    /**
     * @param {Object} args
     * @param {T} [args.present]
     * @param {T} [args.imperfect]
     * @param {T} [args.future]
     * @param {T} [args.aorist]
     * @param {T} [args.aorist_2nd]
     * @param {T} [args.perfect]
     * @param {T} [args.pluperfect]
     */
    constructor ({present = null, imperfect = null, future = null, aorist = null, aorist_2nd = null, perfect = null, pluperfect = null} = {})
    {
        this.present = present
        this.imperfect = imperfect
        this.future = future
        this.aorist = aorist
        this.aorist_2nd = aorist_2nd
        this.perfect = perfect
        this.pluperfect = pluperfect
    }
}

/**
* @template T
* @type {{[key: THEMES]: T}}
*/
export class Themes
{
    thematic
    athematic

    /**
     * @param {Object} args
     * @param {T} [args.thematic]
     * @param {T} [args.athematic]
     */
    constructor ({thematic = null, athematic = null} = {})
    {
        this.thematic = thematic
        this.athematic = athematic
    }
}

export default class GreekGrammar
{
    /**
     * @type {{FEMININE: GENDERS, MASCULINE: GENDERS, NEUTER: GENDERS}}
     */
    static GENDERS =
    {
        FEMININE: 'feminine',
        MASCULINE: 'masculine',
        NEUTER: 'neuter'
    }
    /**
     * @type {{SINGULAR: NUMBERS, PLURAL: NUMBERS}}
     */
    static NUMBERS =
    {
        SINGULAR: 'singular',
        PLURAL: 'plural'
    }
    /**
     * @type {{VOCATIVE: CASES, NOMINATIVE: CASES, ACCUSATIVE: CASES, DATIVE: CASES, GENITIVE: CASES, INDECLINABLE: CASES}}
     */
    static CASES =
    {
        VOCATIVE: 'vocative',
        NOMINATIVE: 'nominative',
        ACCUSATIVE: 'accusative',
        DATIVE: 'dative',
        GENITIVE: 'genitive',
        INDECLINABLE: 'indeclinable',
    }
    /**
     * @type {{NOUN: PARTS_OF_SPEECH, PROPER_NOUN: PARTS_OF_SPEECH, PRONOUN: PARTS_OF_SPEECH, PERSONAL_PRONOUN, VERB: PARTS_OF_SPEECH, ADJECTIVE: PARTS_OF_SPEECH, ADVERB: PARTS_OF_SPEECH, PREPOSITION: PARTS_OF_SPEECH, CONJUNCTION: PARTS_OF_SPEECH, INTERJECTION: PARTS_OF_SPEECH, PARTICLE: PARTS_OF_SPEECH, NUMERAL: PARTS_OF_SPEECH, ARTICLE: PARTS_OF_SPEECH, DETERMINER: PARTS_OF_SPEECH}}
     */
    static PARTS_OF_SPEECH =
    {
        NOUN: 'noun',
        PROPER_NOUN: 'proper_noun',
        PRONOUN: 'pronoun',
        PERSONAL_PRONOUN: 'personal_pronoun',
        VERB: 'verb',
        ADJECTIVE: 'adjective',
        ADVERB: 'adverb',
        PREPOSITION: 'preposition',
        CONJUNCTION: 'conjunction',
        INTERJECTION: 'interjection',
        PARTICLE: 'particle',
        NUMERAL: 'numeral',
        ARTICLE: 'article',
        DETERMINER: 'determiner',
    }
    /**
    * @type {{FIRST: PERSONS, SECOND: PERSONS, THIRD: PERSONS}}
    */
    static PERSONS =
    {
        FIRST: 'first',
        SECOND: 'second',
        THIRD: 'third'
    }
    /**
    * @type {{ACTIVE: VOICES, MIDDLE: VOICES, PASSIVE: VOICES}}
    */
    static VOICES =
    {
        ACTIVE: 'active',
        MIDDLE: 'middle',
        PASSIVE: 'passive'
    }
    /**
    * @type {{INDICATIVE: MOODS, SUBJUNCTIVE: MOODS, OPTATIVE: MOODS, IMPERATIVE: MOODS, INFINITIVE: MOODS, PARTICIPLE: MOODS}}
    */
    static MOODS =
    {
        INDICATIVE: 'indicative',
        SUBJUNCTIVE: 'subjunctive',
        OPTATIVE: 'optative',
        IMPERATIVE: 'imperative',
        INFINITIVE: 'infinitive',
        PARTICIPLE: 'participle'
    }
    /**
    * @type {{PRESENT: TENSES, IMPERFECT: TENSES, FUTURE: TENSES, AORIST: TENSES, AORIST_2ND: TENSES, PERFECT: TENSES, PLUPERFECT: TENSES}}
    */
    static TENSES =
    {
        PRESENT: 'present',
        IMPERFECT: 'imperfect',
        FUTURE: 'future',
        AORIST: 'aorist',
        AORIST_2ND: 'aorist_2nd',
        PERFECT: 'perfect',
        PLUPERFECT: 'pluperfect'
    }
    /**
    * @type {{THEMATIC: THEMES, ATHEMATIC: THEMES}}
    */
    static THEMES =
    {
        THEMATIC: 'thematic',
        ATHEMATIC: 'athematic',
    }
    /**
     * @type {{PSILI: ACCENTS, DASIA: ACCENTS, VARIA: ACCENTS, OXIA: ACCENTS, PERISPOMENI: ACCENTS, YPOGEGRAMMENI: ACCENTS, VRACHY: ACCENTS, MACRON: ACCENTS, DIALYTIKA: ACCENTS}}
     */
    static ACCENTS =
    {
        PSILI: 'psili',
        DASIA: 'dasia',
        VARIA: 'varia',
        OXIA: 'oxia',
        PERISPOMENI: 'perispomeni',
        YPOGEGRAMMENI: 'ypogergammeni',
        VRACHY: 'vrachy',
        MACRON: 'macron',
        DIALYTIKA: 'dialytika',
    }
}