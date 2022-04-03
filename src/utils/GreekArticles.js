import {Cases, Genders, Numbers} from '@/utils/GreekGrammar';

/**
 * @typedef {Numbers<Genders<Cases<string[]>>>} GreekArticle
 */

export default class GreekArticles
{
    /**
     * @type {GreekArticle}
     */
    static DEFINITE = new Numbers
    ({
        singular: new Genders
        ({
            masculine: new Cases({ nominative: ['ὁ'], genitive: ['τοῦ'], dative: ['τῷ'], accusative: ['τόν', 'τὸν'] }),
            feminine: new Cases({ nominative: ['ἡ'], genitive: ['τῆς'], dative: ['τῇ'], accusative: ['τήν'] }),
            neuter: new Cases({ nominative: ['τό'], genitive: ['τοῦ'], dative: ['τῷ'], accusative: ['τόν', 'τὸν'] }),
        }),
        plural: new Genders
        ({
            masculine: new Cases({ nominative: ['οἱ'], genitive: ['τῶν'], dative: ['τοῖς'], accusative: ['τούς', 'τοὺς'] }),
            feminine: new Cases({ nominative: ['αἱ'], genitive: ['τῶν'], dative: ['ταῖς'], accusative: ['τᾱ́ς'] }),
            neuter: new Cases({ nominative: ['τᾰ́'], genitive: ['τῶν'], dative: ['τοῖς'], accusative: ['τούς', 'τοὺς'] }),
        }),
    })
}