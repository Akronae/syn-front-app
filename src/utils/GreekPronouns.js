import {Cases, Genders, Numbers} from '@/utils/GreekGrammar';

/**
 * @extends Numbers<Genders<Cases<string[]>>>
 */
export class GreekPronoun extends Numbers
{
}

export default class GreekPronouns
{
    static RELATIVE = new GreekPronoun
    ({
        singular: new Genders
        ({
            masculine: new Cases
            ({
                nominative: ['ὅς'],
                genitive: ['οὗ'],
                dative: ['ᾧ'],
                accusative: ['ὅν'],
            }),
            feminine: new Cases
            ({
                nominative: ['ἥ'],
                genitive: ['ἧς'],
                dative: ['ᾗ'],
                accusative: ['ἥν'],
            }),
            neuter: new Cases
            ({
                nominative: ['ὅ'],
                genitive: ['οὗ'],
                dative: ['ᾧ'],
                accusative: ['ὅ'],
            })
        }),
        plural: new Genders
        ({
            masculine: new Cases
            ({
                nominative: ['οἵ'],
                genitive: ['ὧν'],
                dative: ['οἷς', 'οἷσι', 'οἷσιν'],
                accusative: ['οὕς'],
            }),
            feminine: new Cases
            ({
                nominative: ['αἵ'],
                genitive: ['ὧν'],
                dative: ['αἷς'],
                accusative: ['ᾱ̔́ς'],
            }),
            neuter: new Cases
            ({
                nominative: ['ᾰ̔́'],
                genitive: ['ὧν'],
                dative: ['οἷς', 'οἷσι', 'οἷσιν'],
                accusative: ['ᾰ̔́'],
            })
        })
    })
}