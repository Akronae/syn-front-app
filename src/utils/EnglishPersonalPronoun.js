import {Cases, Genders, Numbers, Persons} from '@/utils/EnglishGrammar';

/**
 * @type {Numbers<Persons<Genders<Cases<string>>>>}
 */
export default class EnglishPersonalPronoun
{
    static singular = new Persons
    ({
        first: new Genders
        ({
            masculine: new Cases({ nominative: 'I', accusative: 'me', genitive: 'me' })
        }),
        second: new Genders
        ({
            masculine: new Cases({ nominative: 'you', accusative: 'you', genitive: 'your' })
        }),
        third: new Genders
        ({
            masculine: new Cases({ nominative: 'he', accusative: 'him', genitive: 'his' }),
            feminine: new Cases({ nominative: 'she', accusative: 'her', genitive: 'her' }),
            neuter: new Cases({ nominative: 'it', accusative: 'its', genitive: 'its' }),
        })
    })
    static plural = new Persons
    ({
        first: new Genders
        ({
            masculine: new Cases({ nominative: 'we', accusative: 'us', genitive: 'our' })
        }),
        second: new Genders
        ({
            masculine: new Cases({ nominative: 'you', accusative: 'you', genitive: 'your' })
        }),
        third: new Genders
        ({
            masculine: new Cases({ nominative: 'they', accusative: 'them', genitive: 'their' }),
        })
    })
}