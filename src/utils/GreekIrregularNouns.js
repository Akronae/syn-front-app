import a from './GreekDeclensionNounTables';
import GreekDeclensionTableNoun from './GreekDeclensionTableNoun';
import { Cases, Genders } from './GreekGrammar';

export class GreekIrregularNoun
{
    radical
    table

    /**
     * @param {Object} args
     * @param {string} [args.radical] 
     * @param {GreekDeclensionTableNoun} [args.table] 
     */
    constructor ({ radical = null, table = null } = {})
    {
        this.radical = radical
        this.table = table
    }
}

export default class GreekIrregularNouns
{
    /**
     * @type {Object.<string, GreekIrregularNoun>}
     */
    static DICTIONARY =
    {
        'ἄνηρ': new GreekIrregularNoun
        ({
            radical: 'ἄνδρ',
            table: new GreekDeclensionTableNoun
            ({
                singular: new Cases
                ({
                    nominative: new Genders({ masculine: ['ἄνηρ'] }),
                    vocative: new Genders({ masculine: ['ἄνερ'] })
                })
            })
        })
    }
}