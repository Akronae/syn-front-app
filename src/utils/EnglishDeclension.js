import EnglishGrammar from '@/utils/EnglishGrammar'
import GreekDeclension from '@/utils/GreekDeclension'
import GreekGrammar from '@/utils/GreekGrammar'

export default class EnglishDeclension
{
    /**
     * @type {string}
     */
    lemma
    /**
     * @type {import("@/utils/EnglishGrammar").GENDERS}
     */
    gender
    /**
     * @type {import("@/utils/EnglishGrammar").NUMBERS}
     */
    number
    /**
     * @type {import("@/utils/EnglishGrammar").CASES}
     */
    case
    /**
     * @type {import("@/utils/EnglishGrammar").TENSES}
     */
    tense
    /**
     * @type {import("@/utils/EnglishGrammar").MOODS}
     */
    mood
    /**
     * @type {import("@/utils/EnglishGrammar").VOICES}
     */
    voice
    /**
     * @type {import("@/utils/EnglishGrammar").PERSONS}
     */
    person
    
    /**
     * @param {Object} args
     * @param {string} [args.lemma]
     * @param {import("@/utils/EnglishGrammar").GENDERS} [args.gender]
     * @param {import("@/utils/EnglishGrammar").NUMBERS} [args.number]
     * @param {import("@/utils/EnglishGrammar").CASES} [args.gramCase]
     * @param {import("@/utils/EnglishGrammar").TENSES} [args.tense]
     * @param {import("@/utils/EnglishGrammar").MOODS} [args.mood]
     * @param {import("@/utils/EnglishGrammar").VOICES} [args.voice]
     * @param {import("@/utils/EnglishGrammar").PERSONS} [args.person]
     */
    constructor({ lemma = null, gender = null, number = null, gramCase = null, tense = null, mood = null, voice = null, person = null} = {})
    {
        this.lemma = lemma
        this.gender = gender
        this.number = number
        this.case = gramCase
        this.tense = tense
        this.mood = mood
        this.voice = voice
        this.person = person
    }

    /**
     * @param {GreekDeclension} grc 
     * @returns {EnglishDeclension}
     */
    static fromGreek (grc)
    {
        const decl = new EnglishDeclension()
        decl.lemma = grc.lemma

        if (grc.case == GreekGrammar.CASES.ACCUSATIVE) decl.case = EnglishGrammar.CASES.ACCUSATIVE
        if (grc.case == GreekGrammar.CASES.GENITIVE) decl.case = EnglishGrammar.CASES.GENITIVE
        else decl.case = EnglishGrammar.CASES.NOMINATIVE

        if (grc.number == GreekGrammar.NUMBERS.SINGULAR) decl.number = EnglishGrammar.NUMBERS.SINGULAR
        if (grc.number == GreekGrammar.NUMBERS.PLURAL) decl.number = EnglishGrammar.NUMBERS.PLURAL

        if (grc.gender == GreekGrammar.GENDERS.FEMININE) decl.gender = EnglishGrammar.GENDERS.FEMININE
        if (grc.gender == GreekGrammar.GENDERS.NEUTER) decl.gender = EnglishGrammar.GENDERS.NEUTER
        else decl.gender = EnglishGrammar.GENDERS.MASCULINE
        
        if (grc.mood == GreekGrammar.MOODS.IMPERATIVE) decl.mood = EnglishGrammar.MOODS.IMPERATIVE
        else if (grc.mood == GreekGrammar.MOODS.SUBJUNCTIVE) decl.mood = EnglishGrammar.MOODS.SUBJUNCTIVE
        else if (grc.mood == GreekGrammar.MOODS.INFINITIVE) decl.mood = EnglishGrammar.MOODS.INFINITIVE
        else if (grc.mood == GreekGrammar.MOODS.PARTICIPLE) decl.mood = EnglishGrammar.MOODS.PARTICIPLE
        else decl.mood = EnglishGrammar.MOODS.INDICATIVE
        
        if (grc.tense == GreekGrammar.TENSES.AORIST) decl.tense = EnglishGrammar.TENSES.PAST
        else if (grc.tense == GreekGrammar.TENSES.FUTURE) decl.tense = EnglishGrammar.TENSES.FUTURE
        else if (grc.tense == GreekGrammar.TENSES.PERFECT || grc.tense == GreekGrammar.TENSES.PLUPERFECT)
        {
            decl.tense = EnglishGrammar.TENSES.PAST
            decl.mood = EnglishGrammar.MOODS.PERFECT
        }
        else if (grc.tense == GreekGrammar.TENSES.IMPERFECT)
        {
            decl.tense = EnglishGrammar.TENSES.PAST
            decl.mood = EnglishGrammar.MOODS.CONTINUOUS
        }
        else if (grc.tense == GreekGrammar.TENSES.PRESENT) decl.tense = EnglishGrammar.TENSES.PRESENT

        decl.voice = grc.voice == GreekGrammar.VOICES.ACTIVE ? EnglishGrammar.VOICES.ACTIVE : EnglishGrammar.VOICES.PASSIVE

        if (grc.person == GreekGrammar.PERSONS.FIRST) decl.person = EnglishGrammar.PERSONS.FIRST
        if (grc.person == GreekGrammar.PERSONS.SECOND) decl.person = EnglishGrammar.PERSONS.SECOND
        if (grc.person == GreekGrammar.PERSONS.THIRD) decl.person = EnglishGrammar.PERSONS.THIRD

        return decl
    }
}