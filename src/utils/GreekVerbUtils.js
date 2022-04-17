import GreekDeclensionVerbTable from './GreekDeclensionVerbTable'
import StringUtils from './StringUtils'

export default class GreekVerbUtils
{
    /**
     * @param {string} lemma 
     * @param {GreekDeclensionVerbTable} table 
     */
    static getRadical (lemma, table)
    {
        const firstEndings =
        [
            ...table.present.indicative.active.thematic.singular.first,
            ...table.present.indicative.active.athematic.singular.first,
            ...table.present.indicative.passive.athematic.singular.first,
            ...table.present.indicative.passive.athematic.singular.first,
        ].map(e => StringUtils.removeAccents(e))
        const lemmaNoAccents = StringUtils.removeAccents(lemma)
        const subs = firstEndings
            .map(ending => lemmaNoAccents.endsWith(ending) ? StringUtils.replaceLast(lemmaNoAccents, ending, StringUtils.EMPTY) : null)
            .filter(a => !!a)
            .sort((a, b) => a.length - b.length)

        return lemma.substring(0, subs[0].length)
    }
}