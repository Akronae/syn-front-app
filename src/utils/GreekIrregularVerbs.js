import GreekDeclensionVerbTable, { GreekDeclensionTableVerbMoods } from './GreekDeclensionVerbTable';
import { Numbers, Persons, Themes, Voices } from './GreekGrammar';

export default class GreekIrregularVerbs
{
    static DICTIONARY =
    {
        'εἰμί': new GreekDeclensionVerbTable
        ({
            imperfect: new GreekDeclensionTableVerbMoods
            ({
                indicative: new Voices
                ({
                    active: new Themes
                    ({
                        athematic: new Numbers
                        ({
                            singular: new Persons({ first: ['ἦ', 'ἦν'], second: ['ἦς', 'ἦσθα'], third: ['ἦν'] }),
                            plural: new Persons({ first: ['ἦμεν'], second: ['ἦτε'], third: ['ἦσαν'] }),
                        })
                    }),
                })
            })
        })
    }
}