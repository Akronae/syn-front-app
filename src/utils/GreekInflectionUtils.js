import StringUtils from '@/utils/StringUtils'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDictionary from '@/utils/GreekDictionary'
import ObjectUtils from '@/utils/ObjectUtils'
import GreekGrammar from '@/utils/GreekGrammar'
import GreekDeclension from './GreekDeclension'
import GreekDeclensionVerbTables from './GreekDeclensionVerbTables'

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

        return str
    }

    static populate ()
    {
        delete this.DICTIONARY_INFLECTED
        this.DICTIONARY_INFLECTED = {}
        for (const [key, value] of Object.entries(GreekDictionary.DICTIONARY))
        {
            var table = this.inflect(key)
            var pathes = ObjectUtils.getValuesPathes(table)
            for (const [declStr, inflected] of Object.entries(pathes))
            {
                if (!inflected) continue
                var declension = new GreekDeclension()
                declension.lemma = key
                declension.pos = value.pos
                Object.entries(GreekGrammar.NUMBERS).forEach(([k, v]) => { if (declStr.includes(v)) declension.number = GreekGrammar.NUMBERS[k] })
                Object.entries(GreekGrammar.CASES).forEach(([k, v]) => { if (declStr.includes(v)) declension.case = GreekGrammar.CASES[k] })
                Object.entries(GreekGrammar.TENSES).forEach(([k, v]) => { if (declStr.includes(v)) declension.tense = GreekGrammar.TENSES[k] })
                Object.entries(GreekGrammar.MOODS).forEach(([k, v]) => { if (declStr.includes(v)) declension.mood = GreekGrammar.MOODS[k] })
                Object.entries(GreekGrammar.VOICES).forEach(([k, v]) => { if (declStr.includes(v)) declension.voice = GreekGrammar.VOICES[k] })
                Object.entries(GreekGrammar.NUMBERS).forEach(([k, v]) => { if (declStr.includes(v)) declension.number = GreekGrammar.NUMBERS[k] })
                Object.entries(GreekGrammar.PERSONS).forEach(([k, v]) => { if (declStr.includes(v)) declension.person = GreekGrammar.PERSONS[k] })
                Object.entries(GreekGrammar.GENDERS).forEach(([k, v]) => { if (declStr.includes(v)) declension.gender = GreekGrammar.GENDERS[k] })
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
        wordInflected = wordInflected.toLowerCase()
        wordInflected = wordInflected.replace(/ί/gm, 'ί')

        const declensions = this.DICTIONARY_INFLECTED[wordInflected]
        if (!declensions) return null
        return ObjectUtils.clone(declensions)
    }

    static inflect (lemma)
    {
        lemma = lemma.toLowerCase()

        const dictEntry = GreekDictionary.get(lemma)
        
        var radical = StringUtils.EMPTY
        if (dictEntry.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN)
        {
            const n = dictEntry.declensionNounTable.singular.nominative
            radical = StringUtils.replaceLast(StringUtils.removeAccents(lemma), StringUtils.removeAccents(n.masculine || n.feminine || n.neuter), StringUtils.EMPTY)
            radical = lemma.substring(0, radical.length)

            return GreekDeclensionNounTables.conjugateTable(dictEntry.declensionNounTable, radical, lemma)
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
        else return {[dictEntry.pos]: lemma}
    }
}