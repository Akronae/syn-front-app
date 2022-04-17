import a from './GreekDeclensionNounTables';
import GreekDeclensionTableNoun from './GreekDeclensionTableNoun';
import { Cases, Genders } from './GreekGrammar';

export class GreekIrregularNoun
{
    radical
    table

    /**
     * @param {Object} args
     * @param {Genders} [args.radical] 
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
            radical: new Genders({ masculine: 'ἄνδρ' }),
            table: new GreekDeclensionTableNoun
            ({
                singular: new Cases
                ({
                    nominative: new Genders({ masculine: ['ἄνηρ'] }),
                    vocative: new Genders({ masculine: ['ἄνερ'] })
                })
            })
        }),
        'πᾶς': new GreekIrregularNoun
        ({
            radical: new Genders({ masculine: 'πᾶ[ντ]', feminine: 'πᾶσ' }),
        })
    }
}