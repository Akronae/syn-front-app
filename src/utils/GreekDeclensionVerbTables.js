import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar, { Cases, Genders, Numbers, Voices } from './GreekGrammar'

class GreekDeclensionTableVerbNumber
{
    /**
     * @type {string[]}
     */
    first
    /**
     * @type {string[]}
     */
    second
    /**
     * @type {string[]}
     */
    third

    constructor ({ first = [StringUtils.EMPTY], second = [StringUtils.EMPTY], third = [StringUtils.EMPTY] } = {})
    {
        this.first = first //|| second || third
        this.second = second //|| first || third
        this.third = third //|| first || second
    }
}

class GreekDeclensionTableVerbVoice
{
    /**
     * @type {GreekDeclensionTableVerbNumber}
     */
    singular
    /**
     * @type {GreekDeclensionTableVerbNumber}
     */
    plural

    constructor ({ singular = null, plural = null } = {})
    {
        this.singular = singular
        this.plural = plural
    }
}

class GreekDeclensionTableVerbMood
{
    /**
     * @type {GreekDeclensionTableVerbVoice}
     */
    active
    /**
     * @type {GreekDeclensionTableVerbVoice}
     */
    middle
    /**
     * @type {GreekDeclensionTableVerbVoice}
     */
    passive

    constructor ({ active = null, middle = null, passive = null } = {})
    {
        this.active = active
        this.middle = middle
        this.passive = passive
    }
}

class GreekDeclensionTableVerbTense
{
    /**
     * @type {GreekDeclensionTableVerbMood}
     */
    indicative
    /**
     * @type {GreekDeclensionTableVerbMood}
     */
    subjunctive
    /**
     * @type {GreekDeclensionTableVerbMood}
     */
    optative
    /**
     * @type {GreekDeclensionTableVerbMood}
     */
    imperative
    /**
     * @type {Voices<string[]>}
     */
    infinitive
    /**
     * @type {Voices<Numbers<Cases<Genders<string[]>>>>}
     */
    participle

    /**
     * @param {Object} args
     * @param {GreekDeclensionTableVerbMood} [args.indicative]
     * @param {GreekDeclensionTableVerbMood} [args.subjunctive]
     * @param {GreekDeclensionTableVerbMood} [args.optative]
     * @param {GreekDeclensionTableVerbMood} [args.imperative]
     * @param {Voices<string[]>} [args.infinitive]
     * @param {Voices<Numbers<Cases<Genders<string[]>>>>} [args.participle]
     */
    constructor ({ indicative = null, subjunctive = null, optative = null, imperative = null, infinitive = null, participle = null } = {})
    {
        this.indicative = indicative
        this.subjunctive = subjunctive
        this.optative = optative
        this.imperative = imperative
        this.infinitive = infinitive
        this.participle = participle
    }
}


class GreekDeclensionTableVerbTable
{
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    present
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    imperfect
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    future
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    aorist
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    perfect
    /**
     * @type {GreekDeclensionTableVerbTense}
     */
    pluperfect

    constructor ({ present = null, imperfect = null, future = null, aorist = null, perfect = null, pluperfect = null } = {})
    {
        this.present = present
        this.imperfect = imperfect
        this.future = future
        this.aorist = aorist
        this.perfect = perfect
        this.pluperfect = pluperfect
    }
}

export default class GreekDeclensionVerbTables
{
    /**
     * @type {GreekDeclensionTableVerbTable}
     */
    static Table = new GreekDeclensionTableVerbTable()
    /**
     * @type {typeof GreekDeclensionTableVerbTable}
     */
     static Table_Type = GreekDeclensionTableVerbTable

    /**
     * @type {GreekDeclensionTableVerbTable}
     */
    static W = new GreekDeclensionTableVerbTable
    ({
        present: new GreekDeclensionTableVerbTense
        ({
            indicative: new GreekDeclensionTableVerbMood
            ({
                active: new GreekDeclensionTableVerbVoice
                ({
                    singular: new GreekDeclensionTableVerbNumber({ first: ['ω'], second: ['εις'], third: ['ει'] }),
                })
            }),
            infinitive: new Voices({ active: ['ειν'], middle: ['εσθαι'] }),
            participle: new Voices
            ({

                active: new Numbers
                ({
                    singular: new Cases
                    ({
                        nominative: new Genders({ masculine: ['ων'], feminine: ['ουσᾰ'], neuter: ['ον'] }),
                    })
                }),
                passive: new Numbers
                ({
                    singular: new Cases
                    ({
                        nominative: new Genders({ masculine: ['ομενος'], feminine: ['ομενη'], neuter: ['ομενον'] }),
                    })
                })
            })
        }),
        aorist: new GreekDeclensionTableVerbTense
        ({
            indicative: new GreekDeclensionTableVerbMood
            ({
                active: new GreekDeclensionTableVerbVoice
                ({
                    singular: new GreekDeclensionTableVerbNumber({ first: ['σᾰ'], second: ['σᾰς'], third: ['σε', 'σεν'], }),
                    plural: new GreekDeclensionTableVerbNumber({ first: ['σᾰμεν'], second: ['σᾰτε'], third: ['σᾰν'] })
                }),
                passive: new GreekDeclensionTableVerbVoice
                ({
                    singular: new GreekDeclensionTableVerbNumber({ first: ['θην'], second: ['θης'], third: ['θη'], }),
                })
            })
        })
    })

    /**
     * 
     * @param {GreekDeclensionVerbTables.Table} table
     * @param {string} radical 
     * @returns {GreekDeclensionVerbTables.Table}
     */
    static conjugateTable (table, radical)
    {
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            if (!ending) return
            var rad = radical
            if (StringUtils.includesEvery(declension, GreekGrammar.TENSES.AORIST, GreekGrammar.MOODS.INDICATIVE))
            {
                const syllables = GreekWord.getSyllables(rad)
                syllables[syllables.length - 1] = GreekWord.augment(syllables[syllables.length - 1])
                // the penultimate is sometimes accentued https://en.wikipedia.org/wiki/Aorist_(Ancient_Greek)#First_aorist_endings
                if (StringUtils.includesEvery(declension, GreekGrammar.VOICES.PASSIVE) || StringUtils.includesEvery(declension, GreekGrammar.NUMBERS.PLURAL))
                {
                    syllables[syllables.length - 1] = GreekWord.augment(syllables[syllables.length - 1])
                }
                else
                {
                    syllables[0] = GreekWord.augment(syllables[0])
                }
                rad = 'ἐ' + syllables.join('')
            }

            flatTable[declension] = rad + ending

            if (StringUtils.includesEvery(declension, GreekGrammar.TENSES.PRESENT, GreekGrammar.MOODS.PARTICIPLE))
            {
                flatTable[declension] = GreekWord.shiftAccent(flatTable[declension], 1)

                if (StringUtils.includesEvery(declension, GreekGrammar.GENDERS.FEMININE))
                {
                    flatTable[declension] = GreekWord.shiftAccent(flatTable[declension], 1)
                }
            }
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}