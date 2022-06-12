import GreekGrammar, {Cases, Genders, Numbers} from '@/utils/GreekGrammar';
import ArrayUtils from './ArrayUtils';
import GreekArticles from './GreekArticles';
import GreekDeclension from './GreekDeclension';
import GreekWord from './GreekWord';
import ObjectUtils from './ObjectUtils';
import StringUtils from './StringUtils';

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
                accusative: ['ἅς'],
            }),
            neuter: new Cases
            ({
                nominative: ['ἄ'],
                genitive: ['ὧν'],
                dative: ['οἷς', 'οἷσι', 'οἷσιν'],
                accusative: ['ἄ'],
            })
        })
    })
    /**
     * @type {GreekPronoun}
     */
    // @ts-ignore
    static DEMONSTRATIVE = ObjectUtils.buildObjectFromPathes(Object.fromEntries(Object.entries(ObjectUtils.getValuesPathes(GreekPronouns.RELATIVE)).map(([key, value]) =>
    {
        if (!value) return [key, value]
        
        const decl = GreekDeclension.fromString(key)
        var built = (decl.case != GreekGrammar.CASES.NOMINATIVE || decl.gender == GreekGrammar.GENDERS.NEUTER ? 'τ' : '')
             + 'ουτ' + value
        const builtSyllables = GreekWord.getSyllables(built)

        var shifted = GreekWord.shiftAccent(builtSyllables.join(''), -1, {except: [GreekGrammar.ACCENTS.YPOGEGRAMMENI]})
        if (decl.case == GreekGrammar.CASES.NOMINATIVE)
        {
            if (decl.gender == GreekGrammar.GENDERS.MASCULINE) shifted = shifted.replace(/ὕ/gm, 'ὗ')
            if (decl.gender == GreekGrammar.GENDERS.NEUTER) shifted = shifted.replace(/ὕ|ὔ/gm, 'ῦ')
        }
        else if (decl.case == GreekGrammar.CASES.ACCUSATIVE && decl.gender == GreekGrammar.GENDERS.FEMININE)
        {
            shifted = shifted.replace(/ὕ/gm, 'ύ')
        }
        else
        {
            shifted = shifted.replace(/ὗ/gm, 'ύ')
            if (decl.gender != GreekGrammar.GENDERS.FEMININE) shifted = shifted.replace(/ὕ|ὔ/gm, 'ῦ')
        }

        const shiftedSyllables = GreekWord.getSyllables(shifted)
        if (StringUtils.includesSome(StringUtils.removeAccents(ArrayUtils.getLast(shiftedSyllables)), 'η', 'α')) shifted = shifted.replace('ο', 'α')

        return [key, shifted]
    })))
}