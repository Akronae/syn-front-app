import StringUtils from '@/utils/StringUtils'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDictionary from '@/utils/GreekDictionary'
import ObjectUtils from '@/utils/ObjectUtils'
import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclension from './GreekDeclension'

export default class GreekInflectionUtils
{
    /**
     * @type {Object.<string, GreekDeclensionNounTables.Table>}
     */
    static DICTIONARY_INFLECTED = {}

    static shortenDeclensionString (str)
    {
        str = str.replace(/accusative/gm, 'acc')
        str = str.replace(/nominative/gm, 'nom')
        str = str.replace(/dative/gm, 'dat')
        str = str.replace(/genitive/gm, 'gen')
        str = str.replace(/singular/gm, 'sing')
        str = str.replace(/plural/gm, 'plur')
        str = str.replace(/masculine/gm, 'mas')
        str = str.replace(/feminine/gm, 'fem')

        return str
    }

    static getDeclension (wordInflected)
    {
        wordInflected = wordInflected.toLowerCase()
        wordInflected = wordInflected.replace(/ί/gm, 'ί')

        for (const [key] of Object.entries(GreekDictionary.DICTIONARY))
        {
            if (!this.DICTIONARY_INFLECTED[key])
            {
                this.DICTIONARY_INFLECTED[key] = this.inflect(key)
            }
        }

        var entry = null
        const declension = new GreekDeclension()

        for (const [key, value] of Object.entries(this.DICTIONARY_INFLECTED))
        {
            const match = Object.entries(ObjectUtils.getValuesPathes(value)).find(([key, value]) => value == wordInflected)
            if (match)
            {
                entry = match[0]
                declension.lemma = key
                break
            }
        }
        if (!entry) return declension

        const dictEntry = GreekDictionary.get(declension.lemma)
        if (entry.includes(GreekGrammar.GENDERS.FEMININE)) declension.gender = GreekGrammar.GENDERS.FEMININE
        if (entry.includes(GreekGrammar.GENDERS.MASCULINE)) declension.gender = GreekGrammar.GENDERS.MASCULINE
        if (entry.includes(GreekGrammar.GENDERS.NEUTER)) declension.gender = GreekGrammar.GENDERS.NEUTER
        if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN) declension.gender = dictEntry.gender
        if (entry.includes(GreekGrammar.NUMBERS.SINGULAR)) declension.number = GreekGrammar.NUMBERS.SINGULAR
        if (entry.includes(GreekGrammar.NUMBERS.PLURAL)) declension.number = GreekGrammar.NUMBERS.PLURAL
        if (entry.includes(GreekGrammar.CASES.VOCATIVE)) declension.case = GreekGrammar.CASES.VOCATIVE
        if (entry.includes(GreekGrammar.CASES.NOMINATIVE)) declension.case = GreekGrammar.CASES.NOMINATIVE
        if (entry.includes(GreekGrammar.CASES.ACCUSATIVE)) declension.case = GreekGrammar.CASES.ACCUSATIVE
        if (entry.includes(GreekGrammar.CASES.DATIVE)) declension.case = GreekGrammar.CASES.DATIVE
        if (entry.includes(GreekGrammar.CASES.GENITIVE)) declension.case = GreekGrammar.CASES.GENITIVE

        return declension
    }

    static inflect (lemma)
    {
        lemma = lemma.toLowerCase()

        const dictEntry = GreekDictionary.get(lemma)
        
        var radical = StringUtils.EMPTY
        if (dictEntry.declensionTable)
        {
            const n = dictEntry.declensionTable.singular.nominative
            radical = StringUtils.replaceLast(StringUtils.removeAccents(lemma), StringUtils.removeAccents(n.masculine || n.feminine || n.neuter), StringUtils.EMPTY)
            radical = lemma.substring(0, radical.length)
        }
        
        if (dictEntry.declensionTable)
        {
            return GreekDeclensionNounTables.conjugateTable(dictEntry.declensionTable, radical, lemma)
        }
    }
}