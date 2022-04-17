import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar, { Cases, Genders, Numbers, Persons, Themes, Voices } from './GreekGrammar'
import GreekIrregularVerbs from './GreekIrregularVerbs'
import GreekVerbUtils from './GreekVerbUtils'
import GreekDeclensionVerbTable, { GreekDeclensionTableVerbMoods } from './GreekDeclensionVerbTable'

export default class GreekDeclensionVerbTables
{
    /**
     * @type {GreekDeclensionVerbTable}
     */
    static Table = new GreekDeclensionVerbTable()
    /**
     * @type {typeof GreekDeclensionVerbTable}
     */
     static Table_Type = GreekDeclensionVerbTable

    /**
     * @type {GreekDeclensionVerbTable}
     */
    static W = new GreekDeclensionVerbTable
    ({
        present: new GreekDeclensionTableVerbMoods
        ({
            indicative: new Voices
            ({
                active: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Persons({ first: ['ω'], second: ['εις'], third: ['ει'] }),
                    }),
                    athematic: new Numbers
                    ({
                        singular: new Persons({ first: ['μι'], second: ['ς'], third: ['σι', 'σιν'] }),
                        plural: new Persons({ first: ['μεν'], second: ['τε'], third: ['ασι', 'ασιν'] }),
                    })
                })
            }),
            infinitive: new Voices({ active: new Themes({ thematic: ['ειν'] }), middle: new Themes({ thematic: ['εσθαι'] }) }),
            participle: new Voices
            ({
                active: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Cases
                        ({
                            nominative: new Genders({ masculine: ['ων'], feminine: ['ουσᾰ'], neuter: ['ον'] }),
                        })
                    })
                }),
                passive: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Cases
                        ({
                            nominative: new Genders({ masculine: ['ομενος'], feminine: ['ομενη'], neuter: ['ομενον'] }),
                        })
                    })
                })
            })
        }),
        aorist: new GreekDeclensionTableVerbMoods
        ({
            indicative: new Voices
            ({
                active: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Persons({ first: ['σᾰ'], second: ['σᾰς'], third: ['σε', 'σεν'], }),
                        plural: new Persons({ first: ['σᾰμεν'], second: ['σᾰτε'], third: ['σᾰν'] })
                    })
                }),
                passive: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Persons({ first: ['θην'], second: ['θης'], third: ['θη'], }),
                    })
                })
            })
        }),
        imperfect: new GreekDeclensionTableVerbMoods
        ({
            indicative: new Voices
            ({
                active: new Themes
                ({
                    athematic: new Numbers
                    ({
                        singular: new Persons({ first: ['ν'], second: ['σ', 'σθα'], third: [''] }),
                        plural: new Persons({ first: ['μεν'], second: ['τε'], third: ['σαν'] }),
                    })
                }),
            })
        })
    })

    /**
     * 
     * @param {GreekDeclensionVerbTables.Table} table
     * @param {string} lemma 
     * @returns {GreekDeclensionVerbTables.Table}
     */
    static conjugateTable (table, lemma)
    {
        const radical = GreekVerbUtils.getRadical(lemma, table)
        const flatTable = ObjectUtils.getValuesPathes(ObjectUtils.clone(table))
        const irregTable = GreekIrregularVerbs.DICTIONARY[lemma]

        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            if (irregTable && ObjectUtils.get(irregTable, declension)) return flatTable[declension] = ObjectUtils.get(irregTable, declension)
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