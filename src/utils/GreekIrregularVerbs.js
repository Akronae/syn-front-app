import GreekDeclensionVerbTable, { GreekDeclensionTableVerbMoods } from './GreekDeclensionVerbTable';
import { Cases, Genders, Numbers, Persons, Tenses, Themes, Voices } from './GreekGrammar';

export class GreekIrregularVerb
{
    /**
     * @type {Tenses<string[]>}
     */
    radicals
    /**
     * @type {GreekDeclensionVerbTable}
     */
    table

    /**
     * @param {Object} args
     * @param {Tenses<string[]>} [args.radicals]
     * @param {GreekDeclensionVerbTable} [args.table]
     */
    constructor ({ radicals = null, table = null } = {})
    {
        this.radicals = radicals
        this.table = table
    }
}

export default class GreekIrregularVerbs
{
    /**
     * @type {Object.<string, GreekIrregularVerb>}
     */
    static DICTIONARY =
    {
        'εἰμί': new GreekIrregularVerb
        ({
            radicals: new Tenses
            ({
                imperfect: ['ἦ'],
            }),
            table: new GreekDeclensionVerbTable
            ({
                present: new GreekDeclensionTableVerbMoods
                ({
                    participle: new Voices
                    ({
                        active: new Themes
                        ({
                            thematic: new Numbers
                            ({
                                singular: new Cases
                                ({
                                    nominative: new Genders({ masculine: ['ὢν'], feminine: ['οὖσα'], neuter: ['ὄν'] }),
                                    genitive: new Genders({ masculine: ['ὄντος'], feminine: ['οὔσης'], neuter: ['ὄντος'] }),
                                    dative: new Genders({ masculine: ['ὄντι'], feminine: ['οὔσῃ'], neuter: ['ὄντι'] }),
                                    accusative: new Genders({ masculine: ['ὄντα'], feminine: ['οὖσαν'], neuter: ['ὄν'] }),
                                    vocative: new Genders({ masculine: ['ὤν'], feminine: ['οὖσα'], neuter: ['ὄν'] }),
                                }),
                                plural: new Cases
                                ({
                                    nominative: new Genders({ masculine: ['ὄντες'], feminine: ['οὖσαι'], neuter: ['ὄντα'] }),
                                    genitive: new Genders({ masculine: ['ὄντων'], feminine: ['οὐσῶν'], neuter: ['ὄντων'] }),
                                    dative: new Genders({ masculine: ['οὖσι', 'οὖσιν'], feminine: ['οὔσαις'], neuter: ['οὖσι', 'οὖσιν'] }),
                                    accusative: new Genders({ masculine: ['ὄντας'], feminine: ['οὔσᾱς'], neuter: ['ὄντα'] }),
                                    vocative: new Genders({ masculine: ['ὄντες'], feminine: ['οὖσαι'], neuter: ['ὄντα'] }),
                                })
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
                                singular: new Persons({ first: null, third: ['ἦν'] }),
                                plural: new Persons({ first: null }),
                            })
                        }),
                    })
                })
            })
        }),
        'ἔρχομαι': new GreekIrregularVerb
        ({
            radicals: new Tenses
            ({
                aorist: ['ἔλθ'],
                aorist_2nd: ['ἔλθ'],
            }),
        }),
        'συνέρχομαι': new GreekIrregularVerb
        ({
            table: new GreekDeclensionVerbTable
            ({
                aorist_2nd: new GreekDeclensionTableVerbMoods
                ({
                    infinitive: new Voices({ active: new Themes({ thematic: ['συνελθεῖν'] }) }),
                })
            })
        }),
        'εὑρίσκω': new GreekIrregularVerb
        ({
            radicals: new Tenses
            ({
                aorist: ['εὑρε']
            })
        }),
        'ὁράω': new GreekIrregularVerb
        ({
            radicals: new Tenses
            ({
                aorist_2nd: ['ἰδ']
            })
        })
    }
}