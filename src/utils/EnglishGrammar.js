/**
* @typedef {"feminine" | "masculine" | "neuter"} GENDERS
*/
/**
* @typedef {"singular" | "plural"} NUMBERS
*/
/**
* @typedef {"nominative" | "accusative" | "genitive"} CASES
*/
/**
* @typedef {"noun" | "pronoun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "interjection" | "particle" | "numeral" | "article" | "determiner"} PARTS_OF_SPEECH
*/
/**
* @typedef {"first" | "second" | "third"} PERSONS
*/
/**
* @typedef {"active" | "passive"} VOICES
*/
/**
* @typedef {"indicative" | "perfect" | "continuous" | "compound" | "conditional" | "imperative" | "subjunctive" | "infinitive" | "participle"} MOODS
*/
/**
* @typedef {"present" | "past" | "future"} TENSES
*/

/**
 * @template T
 * @type {{[key: GENDERS]: T}}
 */
export class Genders
{
    /** @type {T} */
    feminine
    /** @type {T} */
    masculine
    /** @type {T} */
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
        this.masculine = masculine || neuter || feminine
        this.neuter = neuter || masculine || feminine
    }
}

/**
 * @template T
 * @type {{[key: NUMBERS]: T}}
 */
export class Numbers
{
    /** @type {T} */
    singular
    /** @type {T} */
    plural

    /**
     * @param {Object} args
     * @param {T} [args.singular]
     * @param {T} [args.plural]
     */
    constructor ({singular = null, plural = null} = {})
    {
        this.singular = singular || plural
        this.plural = plural || singular
    }
}

/**
 * @template T
 * @type {{[key: CASES]: T}}
 */
export class Cases
{
    /** @type {T} */
    nominative
    /** @type {T} */
    accusative
    /** @type {T} */
    genitive

    /**
     * @param {Object} args
     * @param {T} [args.nominative]
     * @param {T} [args.accusative]
     * @param {T} [args.genitive]
     */
    constructor ({nominative = null, accusative = null, genitive = null} = {})
    {
        this.nominative = nominative
        this.accusative = accusative || this.nominative
        this.genitive = genitive || this.accusative
    }
}

/**
 * @template T
 * @type {{[key: Persons]: T}}
 */
export class Persons
{
    /** @type {T} */
    first
    /** @type {T} */
    second
    /** @type {T} */
    third

    /**
     * @param {Object} args
     * @param {T} [args.first]
     * @param {T} [args.second]
     * @param {T} [args.third]
     */
    constructor ({first = null, second = null, third = null} = {})
    {
        this.first = first || second || third
        this.second = second || this.first
        this.third = third || this.second
    }
}

/**
 * @template T
 * @type {{[key: VOICES]: T}}
 */
export class Voices
{
    /** @type {T} */
    active
    /** @type {T} */
    middle
    /** @type {T} */
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
    /** @type  {T} */
    indicative
    /** @type {T} */
    perfect
    /** @type {T} */
    continuous
    /** @type {T} */
    compound
    /** @type {T} */
    conditional
    /** @type {T} */
    imperative
    /** @type {T} */
    subjunctive
    /** @type {T2} */
    infinitive
    /** @type {T3} */
    participle

    /**
     * @param {Object} args
     * @param {T} [args.indicative]
     * @param {T} [args.perfect]
     * @param {T} [args.continuous]
     * @param {T} [args.compound]
     * @param {T} [args.conditional]
     * @param {T} [args.imperative]
     * @param {T} [args.subjunctive]
     * @param {T2} [args.infinitive]
     * @param {T3} [args.participle]
     */
    constructor ({indicative = null, perfect = null, continuous = null, compound = null, conditional = null, imperative = null, subjunctive = null, infinitive = null, participle = null} = {})
    {
        this.indicative = indicative
        this.perfect = perfect
        this.continuous = continuous
        this.compound = compound
        this.conditional = conditional
        this.imperative = imperative
        this.subjunctive = subjunctive
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
    /**
     * @type {T}
     */
    present
    /**
     * @type {T}
     */
    past
    /**
     * @type {T}
     */
    future

    /**
     * @param {Object} args
     * @param {T} [args.present]
     * @param {T} [args.past]
     * @param {T} [args.future]
     */
    constructor ({present = null, past = null, future = null} = {})
    {
        this.present = present
        this.past = past
        this.future = future
    }
}

export default class EnglishGrammar
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
     * @type {{NOMINATIVE: CASES, ACCUSATIVE: CASES, GENITIVE: CASES}}
     */
    static CASES =
    {
        NOMINATIVE: 'nominative',
        ACCUSATIVE: 'accusative',
        GENITIVE: 'genitive',
    }
    /**
     * @type {{NOUN: PARTS_OF_SPEECH, PRONOUN: PARTS_OF_SPEECH, VERB: PARTS_OF_SPEECH, ADJECTIVE: PARTS_OF_SPEECH, ADVERB: PARTS_OF_SPEECH, PREPOSITION: PARTS_OF_SPEECH, CONJUNCTION: PARTS_OF_SPEECH, INTERJECTION: PARTS_OF_SPEECH, PARTICLE: PARTS_OF_SPEECH, NUMERAL: PARTS_OF_SPEECH, ARTICLE: PARTS_OF_SPEECH, DETERMINER: PARTS_OF_SPEECH}}
     */
    static PARTS_OF_SPEECH =
    {
        NOUN: 'noun',
        PRONOUN: 'pronoun',
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
    * @type {{ACTIVE: VOICES, PASSIVE: VOICES}}
    */
    static VOICES =
    {
        ACTIVE: 'active',
        PASSIVE: 'passive'
    }
    /**
    * @type {{INDICATIVE: MOODS, PERFECT: MOODS, CONTINUOUS: MOODS, COMPOUND: MOODS, CONDITIONAL: MOODS, IMPERATIVE: MOODS, SUBJUNCTIVE: MOODS, INFINITIVE: MOODS, PARTICIPLE: MOODS}}
    */
    static MOODS =
    {
        INDICATIVE: 'indicative',
        PERFECT: 'perfect',
        CONTINUOUS: 'continuous',
        COMPOUND: 'compound',
        CONDITIONAL: 'conditional',
        IMPERATIVE: 'imperative',
        SUBJUNCTIVE: 'subjunctive',
        INFINITIVE: 'infinitive',
        PARTICIPLE: 'participle',
    }
    /**
    * @type {{PRESENT: TENSES, PAST: TENSES, FUTURE: TENSES}}
    */
    static TENSES =
    {
        PRESENT: 'present',
        PAST: 'past',
        FUTURE: 'future'
    }
}