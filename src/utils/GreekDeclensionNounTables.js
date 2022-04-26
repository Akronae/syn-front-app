import ObjectUtils from '@/utils/ObjectUtils'
import GreekWord from '@/utils/GreekWord'
import StringUtils from '@/utils/StringUtils'
import GreekGrammar, { Cases, Genders } from './GreekGrammar'
import GreekIrregularNouns from './GreekIrregularNouns'
import GreekDeclensionTableNoun from './GreekDeclensionTableNoun'
import GreekDeclension from './GreekDeclension'
import GreekAlphabet from './GreekAlphabet'
import ArrayUtils from './ArrayUtils'

export default class GreekDeclensionNounTables
{
    static INDECLINABLE = new GreekDeclensionTableNoun
    ({
       singular: new Cases
       ({
           nominative: new Genders(),
           accusative: new Genders(),
           dative: new Genders(),
           genitive: new Genders(),
           vocative: new Genders(),
       }),
       plural: new Cases
       ({
           nominative: new Genders(),
           accusative: new Genders(),
           dative: new Genders(),
           genitive: new Genders(),
           vocative: new Genders(),
       })
    })
    static SEMITIC_PROPER_NAME = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders(),
            accusative: new Genders(),
            dative: new Genders(),
            genitive: new Genders(),
            vocative: new Genders(),
        }),
        plural: new Cases
        ({
            nominative: new Genders(),
            accusative: new Genders(),
            dative: new Genders(),
            genitive: new Genders(),
            vocative: new Genders(),
        })
    })
    static OS_OU = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ feminine: ['ος'] }),
            accusative: new Genders({ feminine: ['ον'] }),
            dative: new Genders({ feminine: ['ω'] }),
            genitive: new Genders({ feminine: ['ου'] }),
            vocative: new Genders({ feminine: ['ε'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ feminine: ['οι'] }),
            accusative: new Genders({ feminine: ['ους'] }),
            dative: new Genders({ feminine: ['οις'] }),
            genitive: new Genders({ feminine: ['ων'] }),
            vocative: new Genders({ feminine: ['οι'] }),
        })
    })
    static IS_EWS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ feminine: ['ις'] }),
            accusative: new Genders({ feminine: ['ιν'] }),
            dative: new Genders({ feminine: ['ει'] }),
            genitive: new Genders({ feminine: ['εως'] }),
            vocative: new Genders({ feminine: ['ι'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ feminine: ['εις'] }),
            accusative: new Genders({ feminine: ['εις'] }),
            dative: new Genders({ feminine: ['εσι', 'εσιν'] }),
            genitive: new Genders({ feminine: ['εων'] }),
            vocative: new Genders({ feminine: ['εις'] }),
        })
    })
    static OUS_OU = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['οῦς'] }),
            accusative: new Genders({ masculine: ['οῦν'] }),
            dative: new Genders({ masculine: ['οῦ'] }),
            genitive: new Genders({ masculine: ['οῦ'] }),
            vocative: new Genders({ masculine: ['οῦ'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['οῖ'] }),
            accusative: new Genders({ masculine: ['οῦς'] }),
            dative: new Genders({ masculine: ['οῖς'] }),
            genitive: new Genders({ masculine: ['ῶν'] }),
            vocative: new Genders({ masculine: ['οῖ'] }),
        })
    })
    static AS_OU = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['ας'] }),
            accusative: new Genders({ masculine: ['αν'] }),
            dative: new Genders({ masculine: ['ᾳ'] }),
            genitive: new Genders({ masculine: ['ου'] }),
            vocative: new Genders({ masculine: ['α'] }),
        }),
    })
    static A_AS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['α'] }),
            genitive: new Genders({ masculine: ['ας'] }),
            dative: new Genders({ masculine: ['ᾳ'] }),
            accusative: new Genders({ masculine: ['αν'] }),
            vocative: new Genders({ masculine: ['α'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['αι'] }),
            genitive: new Genders({ masculine: ['ων'] }),
            dative: new Genders({ masculine: ['αις'] }),
            accusative: new Genders({ masculine: ['ας'] }),
            vocative: new Genders({ masculine: ['αι'] }),
        }),
    })
    static A_ATOS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ neuter: ['α'] }),
            genitive: new Genders({ neuter: ['ατος'] }),
            dative: new Genders({ neuter: ['ατι'] }),
            accusative: new Genders({ neuter: ['α'] }),
            vocative: new Genders({ neuter: ['α'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ neuter: ['ατα'] }),
            genitive: new Genders({ neuter: ['ατων'] }),
            dative: new Genders({ neuter: ['ασι', 'ασιν'] }),
            accusative: new Genders({ neuter: ['ατα'] }),
            vocative: new Genders({ neuter: ['ατα'] }),
        }),
    })
    static EUS_EWS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['εύς'] }),
            genitive: new Genders({ masculine: ['έως'] }),
            dative: new Genders({ masculine: ['εῖ'] }),
            accusative: new Genders({ masculine: ['έᾱ', 'έα'] }),
            vocative: new Genders({ masculine: ['εῦ'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['ῆς', 'εῖς'] }),
            genitive: new Genders({ masculine: ['έων'] }),
            dative: new Genders({ masculine: ['εῦσῐ', 'εῦσῐν'] }),
            accusative: new Genders({ masculine: ['έᾱς', 'έας'] }),
            vocative: new Genders({ masculine: ['ῆς', 'εῖς'] }),
        }),
    })
    static WN_WNOS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['ών', 'ὼν'] }),
            genitive: new Genders({ masculine: ['ῶνος', 'ῶντος'] }),
            dative: new Genders({ masculine: ['ῶνῐ', 'ῶντῐ'] }),
            accusative: new Genders({ masculine: ['ῶνᾰ', 'ῶνα', 'ῶντᾰ'] }),
            vocative: new Genders({ masculine: ['ών', 'ὼν'] }),
        }),
    })
    static HS_H = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['ῆς'] }),
            genitive: new Genders({ masculine: ['ῆ'] }),
            dative: new Genders({ masculine: [''] }),
            accusative: new Genders({ masculine: ['ῆ', 'ῆν'] }),
            vocative: new Genders({ masculine: [''] }),
        }),
    })
    static S_OS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['ς'], feminine: ['α'] }),
            genitive: new Genders({ masculine: ['ος'], feminine: ['ης'] }),
            dative: new Genders({ masculine: ['ῐ'], feminine: ['ῃ'] }),
            accusative: new Genders({ masculine: ['ᾰ', 'α', 'ν'], feminine: ['αν'] }),
            vocative: new Genders({ masculine: ['', 'ς'], feminine: ['α'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['ες'], feminine: ['αι'] }),
            genitive: new Genders({ masculine: ['ων'] }),
            dative: new Genders({ masculine: ['σῐ', 'σῐν'], feminine: ['αις'] }),
            accusative: new Genders({ masculine: ['ᾰς'], feminine: ['ας'] }),
            vocative: new Genders({ masculine: ['ες'], feminine: ['αι'] }),
        }),
    })
    static _OS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: [''] }),
            genitive: new Genders({ masculine: ['ος'] }),
            dative: new Genders({ masculine: ['ῐ'] }),
            accusative: new Genders({ masculine: ['ᾰ', 'α', 'ν'] }),
            vocative: new Genders({ masculine: ['', 'ς'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['ες'] }),
            genitive: new Genders({ masculine: ['ων'] }),
            dative: new Genders({ masculine: ['σῐ', 'σῐν'] }),
            accusative: new Genders({ masculine: ['ᾰς'] }),
            vocative: new Genders({ masculine: ['ες'] }),
        }),
    })
    static HR_EROS = new GreekDeclensionTableNoun
    ({
        singular: new Cases
        ({
            nominative: new Genders({ masculine: ['ηρ'] }),
            genitive: new Genders({ masculine: ['ερος', 'ρος'] }),
            dative: new Genders({ masculine: ['ερι', 'ρι'] }),
            accusative: new Genders({ masculine: ['ερα', 'ρα'] }),
            vocative: new Genders({ masculine: ['ηρ'] }),
        }),
        plural: new Cases
        ({
            nominative: new Genders({ masculine: ['ερες'] }),
            genitive: new Genders({ masculine: ['ερων'] }),
            dative: new Genders({ masculine: ['ηρσι', 'ηρσιν', 'ρασι', 'ρασιν'] }),
            accusative: new Genders({ masculine: ['ερας'] }),
            vocative: new Genders({ masculine: ['ερες'] }),
        }),
    })

    /**
     * 
     * @param {string} radical 
     * @param {string} ending 
     * @param {GreekDeclensionTableNoun} table 
     * @param {GreekDeclension} declension 
     * @returns {string}
     */
    static moveAccent (radical, ending, table, declension)
    {
        var syllables
        var rad = radical
        var end = ending

        if (table == this.IS_EWS && StringUtils.equalsSome(declension.case, GreekGrammar.CASES.GENITIVE, GreekGrammar.CASES.DATIVE))
        {
            rad = GreekWord.shiftAccent(radical, 1)
        }
        else if (table == this.SEMITIC_PROPER_NAME && StringUtils.equalsSome(declension.case, GreekGrammar.CASES.ACCUSATIVE, GreekGrammar.CASES.DATIVE))
        {
            syllables = GreekWord.getSyllables(radical)
            syllables[syllables.length - 1] = syllables[syllables.length - 1].replace('ὰ', 'ά').replace('ὼ', 'ώ').replace('ὶ', 'ί').replace('ὴ', 'ή').replace('ὲ', 'έ').replace('ὺ', 'ύ')
            rad = syllables.join('')
        }
        //https://en.wiktionary.org/wiki/ἀνήρ
        else if (table == this.HR_EROS)
        {
            const endingFirstVowel = GreekAlphabet.getFirstVowel(end)
            if (StringUtils.equalsSome(StringUtils.removeAccents(endingFirstVowel), 'α', 'ε'))
            {
                rad = GreekWord.accentuate(rad, GreekWord.getAccents(endingFirstVowel))
                end = GreekWord.removeAccents(end, GreekWord.getAccents(endingFirstVowel))
            }
        }
        // https://en.wiktionary.org/wiki/ἅγιος
        else if (ArrayUtils.areEqual(GreekWord.getAccents(rad[0]), [GreekGrammar.ACCENTS.DASIA, GreekGrammar.ACCENTS.OXIA]))
        {
            if (!StringUtils.equalsSome(declension.case, GreekGrammar.CASES.NOMINATIVE, GreekGrammar.CASES.VOCATIVE))
            {
                rad = GreekWord.accentuate(rad, [GreekGrammar.ACCENTS.OXIA])
                rad = GreekWord.removeAccents(rad, [GreekGrammar.ACCENTS.OXIA])
            }
        }

        // https://en.wiktionary.org/wiki/πνεῦμα#Ancient_Greek
        if (rad.includes('εῦ'))
        {
            if (declension.number == GreekGrammar.NUMBERS.PLURAL || StringUtils.equalsSome(declension.case, GreekGrammar.CASES.GENITIVE, GreekGrammar.CASES.DATIVE))
            {
                rad = rad.replace('εῦ', 'εύ')
            }
        }

        return rad + end
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
        const irregTable = GreekIrregularNouns.DICTIONARY[lemma]
        Object.entries(flatTable).forEach(([declension, ending]) =>
        {
            if (irregTable)
            {
                var declensionEndingsPath = declension.split('.')
                declensionEndingsPath.pop()
                const irregEndings = ObjectUtils.get(irregTable.table, declensionEndingsPath.join('.'))
                if (!ArrayUtils.isEmpty(irregEndings)) return irregEndings.forEach((e, i) => flatTable[declensionEndingsPath.join('.') + '.' + i] = e)
            }
            
            if (!ending) ending = StringUtils.EMPTY
            if (gender && !declension.includes(gender)) return flatTable[declension] = null
            const decl = GreekDeclension.fromString(declension)
            if (StringUtils.hasAccents(lemmaEnding))
            {
                ending = GreekWord.accentuate(ending, GreekWord.getAccents(lemmaEnding))

                if (table == GreekDeclensionNounTables.WN_WNOS)
                {
                    if (!StringUtils.equalsSome(decl.case, GreekGrammar.CASES.NOMINATIVE, GreekGrammar.CASES.VOCATIVE))
                    {
                        ending = GreekWord.accentuate(StringUtils.removeAccents(ending), [GreekGrammar.ACCENTS.PERISPOMENI])
                    } 
                }
            }
            
            const rad = irregTable ? irregTable.radical[decl.gender] : radical
            var builded = this.moveAccent(rad, ending, table, decl)

            while (StringUtils.includesEvery(builded, '[', ']'))
            {
                if (!GreekAlphabet.isVowel(builded[builded.indexOf(']') + 1])) builded = builded.replace(/\[.*?\]/, StringUtils.EMPTY)
                else builded = builded.replace('[', StringUtils.EMPTY).replace(']', StringUtils.EMPTY)
            }

            flatTable[declension] = builded
        })
        // @ts-ignore
        return ObjectUtils.buildObjectFromPathes(flatTable)
    }
}