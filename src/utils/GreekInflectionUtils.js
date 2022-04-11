import StringUtils from '@/utils/StringUtils'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDictionary from '@/utils/GreekDictionary'
import ObjectUtils from '@/utils/ObjectUtils'
import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclension from './GreekDeclension'
import GreekDeclensionVerbTables from './GreekDeclensionVerbTables'
import ArrayUtils from './ArrayUtils'
import GreekAlphabet from './GreekAlphabet'

export default class GreekInflectionUtils
{
    /**
     * @type {Object.<string, GreekDeclension[]>}
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
        str = str.replace(/aorist/gm, 'aor')
        str = str.replace(/active/gm, 'act')
        str = str.replace(/indicative/gm, 'ind')
        str = str.replace(/third/gm, '3rd')
        str = str.replace(/personal/gm, 'pers')
        str = str.replace(/present/gm, 'pres')
        str = str.replace(/passive/gm, 'pas')
        str = str.replace(/participle/gm, 'par')
        str = str.replace(/_/gm, ' ')

        return str
    }

    static populate ()
    {
        delete this.DICTIONARY_INFLECTED
        this.DICTIONARY_INFLECTED = {}
        for (var [key, value] of Object.entries(GreekDictionary.DICTIONARY))
        {
            var table = this.inflect(key)
            var pathes = ObjectUtils.getValuesPathes(table)
            for (const [declStr, inflected] of Object.entries(pathes))
            {
                if (!inflected) continue
                var declension = GreekDeclension.fromString(declStr)
                declension.lemma = key
                declension.pos = value.pos
                if (!this.DICTIONARY_INFLECTED[inflected]) this.DICTIONARY_INFLECTED[inflected] = []
                this.DICTIONARY_INFLECTED[inflected].push(declension)
            }
        }
    }

    /**
     * 
     * @param {string} wordInflected 
     * @returns {GreekDeclension[]}
     */
    static getDeclension (wordInflected)
    {
        wordInflected = GreekAlphabet.sanitizeLetters(wordInflected).toLowerCase()

        const declensions = this.DICTIONARY_INFLECTED[wordInflected]
        if (!declensions) return null
        return ObjectUtils.clone(declensions)
    }

    static inflect (lemma)
    {
        lemma = lemma.toLowerCase()

        const dictEntry = GreekDictionary.get(lemma)
        if (!dictEntry) return null
        
        var radical = StringUtils.EMPTY
        if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN)
        {
            const n = dictEntry.declensionNounTable.singular.nominative
            radical = StringUtils.replaceLast(StringUtils.removeAccents(lemma), StringUtils.removeAccents(ArrayUtils.firstNotEmpty(n.masculine, n.feminine, n.neuter)[0]), StringUtils.EMPTY)
            radical = lemma.substring(0, radical.length)

            return GreekDeclensionNounTables.conjugateTable(dictEntry.declensionNounTable, radical, lemma, dictEntry.gender)
        }
        else if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.VERB)
        {
            const firstEnding = dictEntry.declensionVerbTable.present.indicative.active.singular.first[0]
            radical = StringUtils.replaceLast(StringUtils.removeAccents(lemma), StringUtils.removeAccents(firstEnding), StringUtils.EMPTY)
            radical = lemma.substring(0, radical.length)

            return GreekDeclensionVerbTables.conjugateTable(dictEntry.declensionVerbTable, radical)
        }
        else if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.ARTICLE)
        {
            return dictEntry.articleTable
        }
        else if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.PRONOUN)
        {
            return dictEntry.pronounTable
        }
        else if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN)
        {
            return dictEntry.personalPronounTable
        }
        else return {[dictEntry.pos]: lemma}
    }
}