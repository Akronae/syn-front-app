import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar from './GreekGrammar'

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

    constructor ({ indicative = null, subjunctive = null, optative = null, imperative = null } = {})
    {
        this.indicative = indicative
        this.subjunctive = subjunctive
        this.optative = optative
        this.imperative = imperative
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
                syllables[0] = GreekWord.augment(syllables[0])
                syllables[syllables.length - 1] = GreekWord.augment(syllables[syllables.length - 1])
                rad = 'ἐ' + syllables.join('')
            }
            flatTable[declension] = rad + ending
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}