import {Cases, Genders, Numbers} from '@/utils/EnglishGrammar';

/**
 * @extends Numbers<Genders<Cases<string>>>
 */
export class EnglishPronoun extends Numbers
{
}

export default class EnglishPronouns
{
    static RELATIVE = new EnglishPronoun
    ({
        singular: new Genders
        ({
            masculine: new Cases
            ({
                nominative: 'who',
                genitive: 'whose',
                accusative: 'whom',
            }),
            neuter: new Cases
            ({
                nominative: 'which',
                genitive: 'whose',
                accusative: 'which',
            })
        }),
    })
}