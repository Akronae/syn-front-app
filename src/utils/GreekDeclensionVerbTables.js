import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar, { Cases, Genders, Numbers, Persons, Themes, Voices } from './GreekGrammar'
import GreekIrregularVerbs from './GreekIrregularVerbs'
import GreekVerbUtils from './GreekVerbUtils'
import GreekDeclensionVerbTable, { GreekDeclensionTableVerbMoods } from './GreekDeclensionVerbTable'
import GreekDeclension from './GreekDeclension'
import ArrayUtils from './ArrayUtils'
import GreekAlphabet from './GreekAlphabet'

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
                }),
                middle: new Themes
                ({
                    athematic: new Numbers
                    ({
                        singular: new Persons({ first: [] }),
                        plural: new Persons({ first: [] }),
                    }),
                    thematic: new Numbers
                    ({
                        singular: new Persons({ first: ['ομαι'], second: ['ῃ', 'ει', 'εσαι'], third: ['εται'] }),
                        plural: new Persons({ first: ['ομεθα'], second: ['εσθε'], third: ['ονται'] }),
                    }),
                }),
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
                            nominative: new Genders({ masculine: ['ων'], feminine: ['ουσα'], neuter: ['ον'] }),
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
                        plural: new Persons({ first: ['θωμεν'], second: ['θητε'], third: ['θωσι', 'θωσιν'], }),
                    })
                })
            }),
            infinitive: new Voices({ active: new Themes({ thematic: ['σαι'] }), middle: new Themes({ thematic: ['σασθαι'] }) }),
            participle: new Voices
            ({
                active: new Themes(),
                middle: new Themes(),
                passive: new Themes
                ({
                    thematic: new Numbers
                    ({
                        singular: new Cases
                        ({
                            nominative: new Genders({ masculine: ['θεις'], neuter: ['θεν'], feminine: ['θεισα'] }),
                            accusative: new Genders({ masculine: ['θεντα'], neuter: ['θεν'], feminine: ['θεισαν'] }),
                            dative: new Genders({ masculine: ['θεντι'], feminine: ['θειση'] }),
                            genitive: new Genders({ masculine: ['θεντος'], feminine: ['θεισης'] }),
                            vocative: new Genders({ masculine: ['θεις'], neuter: ['θεν'], feminine: ['θεισα'] }),
                        }),
                        plural: new Cases
                        ({
                            nominative: new Genders({ masculine: ['θεντες'], neuter: ['θεντα'], feminine: ['θεισαι'] }),
                            accusative: new Genders({ masculine: ['θεντας'], neuter: ['θεντα'], feminine: ['θεισας'] }),
                            dative: new Genders({ masculine: ['θεισι', 'θεισιν'], feminine: ['θεισαις'] }),
                            genitive: new Genders({ masculine: ['θεντων'], feminine: ['θεισων'] }),
                            vocative: new Genders({ masculine: ['θεντες'], neuter: ['θεντα'], feminine: ['θεισαι'] }),
                        })
                    })
                })
            })
        }),
        aorist_2nd: new GreekDeclensionTableVerbMoods
        ({
            infinitive: new Voices({ active: new Themes({ thematic: ['εῖν'] }) }),
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
            if (irregTable && ObjectUtils.get(irregTable.table, declension)) return flatTable[declension] = ObjectUtils.get(irregTable.table, declension)
            if (!ending) return
            const decl = GreekDeclension.fromString(declension)
            const irregRadicals = irregTable && irregTable.radicals && irregTable.radicals[decl.tense]
            var rad = ArrayUtils.isEmpty(irregRadicals) ? radical : irregRadicals[0]
            var syllables = GreekWord.getSyllables(rad)

            if (decl.tense == GreekGrammar.TENSES.AORIST && decl.mood == GreekGrammar.MOODS.INDICATIVE)
            {
                // γεννά(ω) -> γεννη
                if (StringUtils.removeAccents(ArrayUtils.getLast(syllables)).endsWith('α')) ArrayUtils.setLast(syllables, StringUtils.replaceLastLetter(ArrayUtils.getLast(syllables), 'η'))
                // the penultimate is sometimes accentued https://en.wikipedia.org/wiki/Aorist_(Ancient_Greek)#First_aorist_endings
                if (decl.voice == GreekGrammar.VOICES.PASSIVE || decl.number == GreekGrammar.NUMBERS.PLURAL)
                {
                    if (!GreekAlphabet.endsWithVowel(syllables[syllables.length - 1]))
                    {
                        // [βούλομαι] rad: βούλ -> βούλη
                        syllables = GreekWord.getSyllables(syllables.join('') + 'η')
                        // [βούλομαι] βούληθη -> βουλήθη
                        syllables = GreekWord.getSyllables(GreekWord.shiftAccent(syllables.join(''), 1))

                    }
                    // (ἐ)γεννη(θη) -> (ἐ)γεννή(θη)
                    syllables[syllables.length - 1] = GreekWord.augment(syllables[syllables.length - 1])
                }
                else
                {
                    syllables[0] = GreekWord.augment(syllables[0])
                }

                // verbs starting with 'ευ' do not take augment
                if (!StringUtils.removeAccents(rad).startsWith('ευ'))
                {
                    syllables = GreekWord.getSyllables('ἐ' + syllables.join(''))
                }
            }

            if (decl.tense == GreekGrammar.TENSES.AORIST && decl.mood == GreekGrammar.MOODS.INFINITIVE)
            {
                ArrayUtils.setLast(syllables, GreekWord.augment(ArrayUtils.getLast(syllables)))
            }

            rad = syllables.join('')

            flatTable[declension] = rad + ending

            if (decl.mood == GreekGrammar.MOODS.PARTICIPLE && decl.voice == GreekGrammar.VOICES.PASSIVE)
            {
                flatTable[declension] = GreekWord.shiftAccent(flatTable[declension], 1)

                if (decl.tense == GreekGrammar.TENSES.PRESENT && decl.gender == GreekGrammar.GENDERS.FEMININE)
                {
                    flatTable[declension] = GreekWord.shiftAccent(flatTable[declension], 1)
                }
            }

            flatTable[declension] = flatTable[declension].replace(/ζσ/gm, 'σ')
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}