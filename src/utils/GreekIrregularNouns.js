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
        'ἀνήρ': new GreekIrregularNoun
        ({
            radical: new Genders({ masculine: 'ἄνδ' }),
            table: new GreekDeclensionTableNoun
            ({
                singular: new Cases
                ({
                    nominative: new Genders({ masculine: ['ἀνήρ'] }),
                    vocative: new Genders({ masculine: ['ἄνερ'] })
                })
            })
        }),
        'μήτηρ': new GreekIrregularNoun
        ({
            radical: new Genders({ feminine: 'μητέρ' }),
            table: new GreekDeclensionTableNoun
            ({
                singular: new Cases
                ({
                    genitive: new Genders({ feminine: ['μητέρος', 'μητρός', 'μητρὸς'] }),
                    dative: new Genders({ feminine: ['μητέρῐ', 'μητρῐ́'] })
                })
            })
        }),
        'πᾶς': new GreekIrregularNoun
        ({
            radical: new Genders({ masculine: 'πᾶ[ντ]', feminine: 'πᾶσ' }),
        })
    }
}