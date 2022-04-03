import {Cases, Genders, Numbers, Persons} from '@/utils/GreekGrammar';

/**
 * @type {Numbers<Persons<Genders<Cases<string[]>>>>}
 */
export default class GreekPersonalPronoun
{
    static singular = new Persons
    ({
        first: new Genders
        ({
            masculine: new Cases({ nominative: ['ἐγώ', 'ἔγωγε'], genitive: ['ἐμέ', 'μου', 'ἐμοῦγε'], dative: ['ἐμοί', 'μοι', 'ἔμοιγε'], accusative: ['ἐμέ', 'με', 'ἐμέγε'] })
        }),
        second: new Genders
        ({
            masculine: new Cases({ nominative: ['σῠ́'], genitive: ['σοῦ', 'σου'], dative: ['σοί', 'σοι'], accusative: ['σέ', 'σε'] })
        }),
        third: new Genders
        ({
            masculine: new Cases({ nominative: ['αὐτός'], genitive: ['αὐτοῦ'], dative: ['αὐτῷ'], accusative: ['αὐτόν'] }),
            feminine: new Cases({ nominative: ['αὐτή'], genitive: ['αὐτῆς'], dative: ['αὐτῇ'], accusative: ['αὐτήν'] }),
            neuter: new Cases({ nominative: ['αὐτό'], genitive: ['αὐτοῦ'], dative: ['αὐτῷ'], accusative: ['αὐτό'] }),
        })
    })
    static plural = new Persons
    ({
        first: new Genders
        ({
            masculine: new Cases({ nominative: ['ἡμεῖς'], genitive: ['ἡμῶν'], dative: ['ἡμῖν'], accusative: ['ἡμᾶς'] }),
        }),
        second: new Genders
        ({
            masculine: new Cases({ nominative: ['ῡ̔μεῖς'], genitive: ['ῡ̔μῶν'], dative: ['ῡ̔μῖν'], accusative: ['ῡ̔μᾶς'] }),
        }),
        third: new Genders
        ({
            masculine: new Cases({ nominative: ['αὐτοί'], genitive: ['αὐτῶν'], dative: ['αὐτοῖς'], accusative: ['αὐτούς'] }),
            feminine: new Cases({ nominative: ['αὐταί'], genitive: ['αὐτῶν'], dative: ['αὐταῖς'], accusative: ['αὐτᾱ́ς'] }),
            neuter: new Cases({ nominative: ['αὐτᾰ́'], genitive: ['αὐτῶν'], dative: ['αὐτοῖς'], accusative: ['αὐτᾰ́'] }),
        })
    })
}