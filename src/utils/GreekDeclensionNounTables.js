import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar from './GreekGrammar'
import GreekAlphabet from './GreekAlphabet'
import ArrayUtils from './ArrayUtils'

class GreekDeclensionTableNounCase
{
    /**
     * @type {string[]}
     */
    feminine
    /**
     * @type {string[]}
     */
    masculine
    /**
     * @type {string[]}
     */
    neuter

    constructor ({ feminine =  [], masculine =  [], neuter =  [] } = {})
    {
        this.feminine = ArrayUtils.firstNotEmpty(feminine, masculine, neuter) || ['']
        this.masculine = ArrayUtils.firstNotEmpty(masculine, this.feminine, neuter)
        this.neuter = ArrayUtils.firstNotEmpty(neuter, this.feminine, this.masculine)
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

export class GreekDeclensionTableNoun
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

    static SEMITIC_PROPER_NAME = new GreekDeclensionTableNoun
    ({
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
    })
    static OS_OU = new GreekDeclensionTableNoun
    ({
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: ['ος'] }),
            accusative: new GreekDeclensionTableNounCase({ feminine: ['ον'] }),
            dative: new GreekDeclensionTableNounCase({ feminine: ['ω'] }),
            genitive: new GreekDeclensionTableNounCase({ feminine: ['ου'] }),
            vocative: new GreekDeclensionTableNounCase({ feminine: ['ε'] }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: ['οι'] }),
            accusative: new GreekDeclensionTableNounCase({ feminine: ['ους'] }),
            dative: new GreekDeclensionTableNounCase({ feminine: ['οις'] }),
            genitive: new GreekDeclensionTableNounCase({ feminine: ['ων'] }),
            vocative: new GreekDeclensionTableNounCase({ feminine: ['οι'] }),
        }
    })
    static IS_EWS = new GreekDeclensionTableNoun
    ({
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: ['ις'] }),
            accusative: new GreekDeclensionTableNounCase({ feminine: ['ιν'] }),
            dative: new GreekDeclensionTableNounCase({ feminine: ['ει'] }),
            genitive: new GreekDeclensionTableNounCase({ feminine: ['εως'] }),
            vocative: new GreekDeclensionTableNounCase({ feminine: ['ι'] }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ feminine: ['εις'] }),
            accusative: new GreekDeclensionTableNounCase({ feminine: ['εις'] }),
            dative: new GreekDeclensionTableNounCase({ feminine: ['εσι', 'εσιν'] }),
            genitive: new GreekDeclensionTableNounCase({ feminine: ['εων'] }),
            vocative: new GreekDeclensionTableNounCase({ feminine: ['εις'] }),
        }
    })
    static OUS_OU = new GreekDeclensionTableNoun
    ({
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ masculine: ['οῦς'] }),
            accusative: new GreekDeclensionTableNounCase({ masculine: ['οῦν'] }),
            dative: new GreekDeclensionTableNounCase({ masculine: ['οῦ'] }),
            genitive: new GreekDeclensionTableNounCase({ masculine: ['οῦ'] }),
            vocative: new GreekDeclensionTableNounCase({ masculine: ['οῦ'] }),
        },
        plural:
        {
            nominative: new GreekDeclensionTableNounCase({ masculine: ['οῖ'] }),
            accusative: new GreekDeclensionTableNounCase({ masculine: ['οῦς'] }),
            dative: new GreekDeclensionTableNounCase({ masculine: ['οῖς'] }),
            genitive: new GreekDeclensionTableNounCase({ masculine: ['ῶν'] }),
            vocative: new GreekDeclensionTableNounCase({ masculine: ['οῖ'] }),
        }
    })
    static AS_OU = new GreekDeclensionTableNoun
    ({
        singular:
        {
            nominative: new GreekDeclensionTableNounCase({ masculine: ['ς'] }),
            accusative: new GreekDeclensionTableNounCase({ masculine: ['ν'] }),
            dative: new GreekDeclensionTableNounCase({ masculine: [''] }),
            genitive: new GreekDeclensionTableNounCase({ masculine: [''] }),
            vocative: new GreekDeclensionTableNounCase({ masculine: [''] }),
        },
    })

    static moveAccent (radical, table, declension)
    {
        if (table == this.IS_EWS && declension.includes(GreekGrammar.CASES.GENITIVE))
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
        if (table == this.SEMITIC_PROPER_NAME && declension.includes(GreekGrammar.CASES.ACCUSATIVE))
        {
            syllables = GreekWord.getSyllables(radical)
            if (GreekAlphabet.isConsonant(ArrayUtils.getLast(ArrayUtils.getLast(syllables))))
            {
                syllables[syllables.length - 1] = syllables[syllables.length - 1].replace('ὰ', 'ά').replace('ὼ', 'ώ')
            }
            return syllables.join('')
        }
        return radical
    }

    /**
     * 
     * @param {GreekDeclensionTableNoun} table 
     * @param {string} radical 
     * @param {string} lemma 
     * @param {import('./GreekGrammar').GENDERS} gender
     * @returns {GreekDeclensionTableNoun}
     */
    static conjugateTable (table, radical, lemma, gender)
    {
        const lemmaEnding = lemma.substring(radical.length)
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            if (!declension.includes(gender)) return
            if (StringUtils.hasAccents(lemmaEnding)) ending = GreekWord.augment(ending)
            flatTable[declension] = this.moveAccent(radical, table, declension) + ending
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}