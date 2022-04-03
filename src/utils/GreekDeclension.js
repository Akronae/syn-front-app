export default class GreekDeclension
{
    /**
     * @type {string}
     */
    lemma
    pos
    /**
     * @type {import("@/utils/GreekGrammar").GENDERS}
     */
    gender
    /**
     * @type {import("@/utils/GreekGrammar").NUMBERS}
     */
    number
    /**
     * @type {import("@/utils/GreekGrammar").CASES}
     */
    case
    /**
     * @type {import("@/utils/GreekGrammar").TENSES}
     */
    tense
    /**
     * @type {import("@/utils/GreekGrammar").MOODS}
     */
    mood
    /**
     * @type {import("@/utils/GreekGrammar").VOICES}
     */
    voice
    /**
     * @type {import("@/utils/GreekGrammar").PERSONS}
     */
    person
    
    /**
     * @param {Object} args
     * @param {string} [args.lemma]
     * @param {import("@/utils/GreekGrammar").PARTS_OF_SPEECH} [args.pos]
     * @param {import("@/utils/GreekGrammar").GENDERS} [args.gender]
     * @param {import("@/utils/GreekGrammar").NUMBERS} [args.number]
     * @param {import("@/utils/GreekGrammar").CASES} [args.gramCase]
     * @param {import("@/utils/GreekGrammar").TENSES} [args.tense]
     * @param {import("@/utils/GreekGrammar").MOODS} [args.mood]
     * @param {import("@/utils/GreekGrammar").VOICES} [args.voice]
     * @param {import("@/utils/GreekGrammar").PERSONS} [args.person]
     */
    constructor({ lemma = null, pos = null, gender = null, number = null, gramCase = null, tense = null, mood = null, voice = null, person = null} = {})
    {
        this.lemma = lemma
        this.pos = pos
        this.gender = gender
        this.number = number
        this.case = gramCase
        this.tense = tense
        this.mood = mood
        this.voice = voice
        this.person = person
    }
}