import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'

class GreekDeclensionTableNounCase
{
    /**
     * @type {string}
     */
    feminine
    /**
     * @type {string}
     */
    masculine
    /**
     * @type {string}
     */
    neuter

    constructor ({ feminine = StringUtils.EMPTY, masculine = StringUtils.EMPTY, neuter = StringUtils.EMPTY } = {})
    {
        this.feminine = feminine || masculine || neuter
        this.masculine = masculine || feminine || neuter
        this.neuter = neuter || feminine || masculine
    }
}

class GreekDeclensionTableNounNumber
{
    /**
     * @type {GreekDeclensionTableNounCase}
     */
    nominative
    /**
     * @type {GreekDeclensionTableNounCase}
     */
     accusative
    /**
     * @type {GreekDeclensionTableNounCase}
     */
     dative
    /**
     * @type {GreekDeclensionTableNounCase}
     */
     genitive
    /**
     * @type {GreekDeclensionTableNounCase}
     */
     vocative
}

class GreekDeclensionTableNoun
{
    /**
     * @type {GreekDeclensionTableNounNumber}
     */
    singular
    /**
     * @type {GreekDeclensionTableNounNumber}
     */
    plural

    constructor ({ singular = new GreekDeclensionTableNounNumber(), plural = new GreekDeclensionTableNounNumber() } = {})
    {
        this.singular = singular
        this.plural = plural
    }
}

export default class GreekDeclensionNounTables
{
    /**
     * @type {GreekDeclensionTableNoun}
     */
    static Table = new GreekDeclensionTableNoun()
    /**
     * @type {typeof GreekDeclensionTableNoun}
     */
     static Table_Type = GreekDeclensionTableNoun

    /**
     * @type {GreekDeclensionTableNoun}
     */
    static INDECLINABLE =
    {
        singular:
        {
            nominative: new GreekDeclensionTableNounCase(),
            accusative: new GreekDeclensionTableNounCase(),
            dative: new GreekDeclensionTableNounCase(),
            genitive: new GreekDeclensionTableNounCase(),
            vocative: new GreekDeclensionTableNounCase(),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase(),
            accusative: new GreekDeclensionTableNounCase(),
            dative: new GreekDeclensionTableNounCase(),
            genitive: new GreekDeclensionTableNounCase(),
            vocative: new GreekDeclensionTableNounCase(),
        }
    }
    /**
     * @type {GreekDeclensionTableNoun}
     */
    static OS_OU =
    {
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: 'ος' }),
            accusative: new GreekDeclensionTableNounCase({ feminine: 'ον' }),
            dative: new GreekDeclensionTableNounCase({ feminine: 'ω' }),
            genitive: new GreekDeclensionTableNounCase({ feminine: 'ου' }),
            vocative: new GreekDeclensionTableNounCase({ feminine: 'ε' }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: 'οι' }),
            accusative: new GreekDeclensionTableNounCase({ feminine: 'ους' }),
            dative: new GreekDeclensionTableNounCase({ feminine: 'οις' }),
            genitive: new GreekDeclensionTableNounCase({ feminine: 'ων' }),
            vocative: new GreekDeclensionTableNounCase({ feminine: 'οι' }),
        }
    }
    /**
     * @type {GreekDeclensionTableNoun}
     */
    static IS_EWS =
    {
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: 'ις' }),
            accusative: new GreekDeclensionTableNounCase({ feminine: 'ιν' }),
            dative: new GreekDeclensionTableNounCase({ feminine: 'ει' }),
            genitive: new GreekDeclensionTableNounCase({ feminine: 'εως' }),
            vocative: new GreekDeclensionTableNounCase({ feminine: 'ι' }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: 'εις' }),
            accusative: new GreekDeclensionTableNounCase({ feminine: 'εις' }),
            dative: new GreekDeclensionTableNounCase({ feminine: 'εσι(ν)' }),
            genitive: new GreekDeclensionTableNounCase({ feminine: 'εων' }),
            vocative: new GreekDeclensionTableNounCase({ feminine: 'εις' }),
        }
    }
    /**
     * @type {GreekDeclensionTableNoun}
     */
    static OUS_OU =
    {
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ masculine: 'οῦς' }),
            accusative: new GreekDeclensionTableNounCase({ masculine: 'οῦν' }),
            dative: new GreekDeclensionTableNounCase({ masculine: 'οῦ' }),
            genitive: new GreekDeclensionTableNounCase({ masculine: 'οῦ' }),
            vocative: new GreekDeclensionTableNounCase({ masculine: 'οῦ' }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ masculine: 'οῖ' }),
            accusative: new GreekDeclensionTableNounCase({ masculine: 'οῦς' }),
            dative: new GreekDeclensionTableNounCase({ masculine: 'οῖς' }),
            genitive: new GreekDeclensionTableNounCase({ masculine: 'ῶν' }),
            vocative: new GreekDeclensionTableNounCase({ masculine: 'οῖ' }),
        }
    }

    static moveAccent (radical, table, declension)
    {
        if (table == this.IS_EWS && declension.includes('genitive'))
        {
            var syllables = GreekWord.getSyllables(radical)
            for (var i = syllables.length - 1; i >= 0; i--)
            {
                var syllable = syllables[i]
                for (var j = syllable.length - 1; j >= 0; j--)
                {
                    const letter = syllable[j]
                    if (letter == 'έ' && i < syllables.length - 1)
                    {
                        syllables[i + 1] = syllables[i + 1].replace(StringUtils.removeAccents(letter), letter)
                        syllables[i] = StringUtils.removeAccents(syllable)
                    }
                }
            }
            return syllables.join('')
        }
        return radical
    }

    static augmentEnding (ending)
    {
        ending = ending.replace('ος', 'ός')
        ending = ending.replace('ου', 'οῦ')
        ending = ending.replace('ῳ', 'ῷ')
        ending = ending.replace('ον', 'όν')
        ending = ending.replace('ε', 'έ')

        return ending
    }

    /**
     * 
     * @param {GreekDeclensionNounTables.Table} table 
     * @param {string} radical 
     * @param {string} lemma 
     * @returns {GreekDeclensionNounTables.Table}
     */
    static conjugateTable (table, radical, lemma)
    {
        const lemmaEnding = lemma.substring(radical.length)
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            if (StringUtils.hasAccents(lemmaEnding)) ending = this.augmentEnding(ending)
            flatTable[declension] = this.moveAccent(radical, table, declension) + ending
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}