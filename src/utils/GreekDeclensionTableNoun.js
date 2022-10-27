import { Numbers, Cases, Genders } from './GreekGrammar';

/**
 * @type {Numbers<Cases<Genders<string[]>>>}
 */
export default class GreekDeclensionTableNoun extends Numbers
{
    /**
     * @param {Object} args
     * @param {Cases<Genders<string[]>>} [args.singular]
     * @param {Cases<Genders<string[]>>} [args.plural]
     */
    constructor ({ singular = null, plural = null } = {})
    {
        super({ singular, plural })
    }
}