import { EnglishDeclensionVerbTable } from './EnglishDeclensionVerbTable';
import { Moods } from './EnglishGrammar';

export default class EnglishIrregularVerbs
{
    /**
     * @type {Object.<string, EnglishDeclensionVerbTable>}
     */
    static DICTIONARY =
    {
        'say': new EnglishDeclensionVerbTable
        ({
            present: new Moods
            ({
                participle: ['said']
            }),
            past: new Moods
            ({
                participle: ['said']
            })
        })
    }
}