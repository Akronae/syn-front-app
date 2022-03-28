/**
* @typedef {"feminine" | "masculine" | "neuter"} GENDERS
*/
/**
* @typedef {"singular" | "plural"} NUMBERS
*/
/**
* @typedef {"vocative" | "nominative" | "accusative" | "dative" | "genitive"} CASES
*/
/**
* @typedef {"noun" | "pronoun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "interjection" | "particle" | "numeral" | "article" | "determiner"} PARTS_OF_SPEECH
*/

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
     * @type {{VOCATIVE: CASES, NOMINATIVE: CASES, ACCUSATIVE: CASES, DATIVE: CASES, GENITIVE: CASES}}
     */
    static CASES =
    {
        VOCATIVE: 'vocative',
        NOMINATIVE: 'nominative',
        ACCUSATIVE: 'accusative',
        DATIVE: 'dative',
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
}