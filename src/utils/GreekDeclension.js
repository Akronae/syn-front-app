import GreekGrammar from '@/utils/GreekGrammar'

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
     * @type {import("@/utils/GreekGrammar").THEMES}
     */
    theme
    /**
     * @type {import("@/utils/GreekGrammar").PERSONS}
     */
    person
    /**
     * @type {number}
     */
    variation
    
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
     * @param {import("@/utils/GreekGrammar").THEMES} [args.theme]
     * @param {import("@/utils/GreekGrammar").PERSONS} [args.person]
     * @param {number} [args.variation] - The variation of the declension. (e.g. for σι(ν), 0: σι, 1: σιν)
     */
    constructor({ lemma = null, pos = null, gender = null, number = null, gramCase = null, tense = null, mood = null, voice = null, theme = null, person = null, variation = null} = {})
    {
        this.lemma = lemma
        this.pos = pos
        this.gender = gender
        this.number = number
        this.case = gramCase
        this.tense = tense
        this.mood = mood
        this.voice = voice
        this.theme = theme
        this.person = person
        this.variation = variation
    }

    clone ()
    {
        return new GreekDeclension({...this, gramCase: this.case})
    }

    /**
     * @param {string} str
     * @returns {GreekDeclension}
     */
    static fromString (str)
    {
        var declension = new GreekDeclension()
        const strSplit = str.split('.')
        Object.entries(GreekGrammar.NUMBERS).forEach(([k, v]) => { if (strSplit.includes(v)) declension.number = GreekGrammar.NUMBERS[k] })
        Object.entries(GreekGrammar.CASES).forEach(([k, v]) => { if (strSplit.includes(v)) declension.case = GreekGrammar.CASES[k] })
        Object.entries(GreekGrammar.TENSES).forEach(([k, v]) => { if (strSplit.includes(v)) declension.tense = GreekGrammar.TENSES[k] })
        Object.entries(GreekGrammar.MOODS).forEach(([k, v]) => { if (strSplit.includes(v)) declension.mood = GreekGrammar.MOODS[k] })
        Object.entries(GreekGrammar.VOICES).forEach(([k, v]) => { if (strSplit.includes(v)) declension.voice = GreekGrammar.VOICES[k] })
        Object.entries(GreekGrammar.THEMES).forEach(([k, v]) => { if (strSplit.includes(v)) declension.theme = GreekGrammar.THEMES[k] })
        Object.entries(GreekGrammar.NUMBERS).forEach(([k, v]) => { if (strSplit.includes(v)) declension.number = GreekGrammar.NUMBERS[k] })
        Object.entries(GreekGrammar.PERSONS).forEach(([k, v]) => { if (strSplit.includes(v)) declension.person = GreekGrammar.PERSONS[k] })
        Object.entries(GreekGrammar.GENDERS).forEach(([k, v]) => { if (strSplit.includes(v)) declension.gender = GreekGrammar.GENDERS[k] })
        Object.entries(GreekGrammar.PARTS_OF_SPEECH).forEach(([k, v]) => { if (strSplit.includes(v)) declension.pos = GreekGrammar.PARTS_OF_SPEECH[k] })
        declension.variation = Number.parseInt((str.match(/\d+/gm) || ['0'])[0])

        return declension
    }

    /**
     * @param {import("@/utils/GreekGrammar").PARTS_OF_SPEECH} pos 
     * @returns {Boolean}
     */
    static isNoun (pos)
    {
        return pos == GreekGrammar.PARTS_OF_SPEECH.NOUN || pos == GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN
    }

    get isNoun ()
    {
        return GreekDeclension.isNoun(this.pos)
    }
}