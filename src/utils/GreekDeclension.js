export default class GreekDeclension
{
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
     * @type {string}
     */
    lemma
    
    /**
     * @param {Object} args
     * @param {import("@/utils/GreekGrammar").GENDERS} [args.gender]
     * @param {import("@/utils/GreekGrammar").NUMBERS} [args.number]
     * @param {import("@/utils/GreekGrammar").CASES} [args.gramCase]
     * @param {string} [args.lemma]
     */
    constructor({ gender = null, number = null, gramCase = null, lemma = null} = {})
    {
        this.gender = gender
        this.number = number
        this.case = gramCase
        this.lemma = lemma
    }
}