import EnglishTranslator from '@/utils/EnglishTranslator'
import GreekDictionary, { GreekDictionaryEntry } from '@/utils/GreekDictionary'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import GreekParsedWord from '@/utils/GreekParsedWord'
import GreekSemantic from '@/utils/GreekSemantic'
import ArrayUtils from './ArrayUtils'
import GreekGrammar from './GreekGrammar'
import GreekNumerals from './GreekNumerals'

export default class GreekParser
{
    /**
     * @param {string} verse 
     * @returns {GreekParsedWord[]}
     */
    static parseVerse (verse)
    {
        const verseParsed = []
        verse.split(' ').forEach(word =>
        {
            const declensions = GreekInflectionUtils.getDeclensions(word)
            if (ArrayUtils.isEmpty(declensions)) return verseParsed.push(new GreekParsedWord({word}))
            var declension = declensions[0]
            
            var definition
            if (declension.pos != GreekGrammar.PARTS_OF_SPEECH.NUMERAL) definition = GreekDictionary.get(declension.lemma)
            else definition = new GreekDictionaryEntry({pos: GreekGrammar.PARTS_OF_SPEECH.NUMERAL, lemma: declension.lemma, translation: GreekNumerals.wordsToNumber(declension.lemma)})

            verseParsed.push(new GreekParsedWord({word, declension, definition}))
        })
        GreekSemantic.correct(verseParsed)
        verseParsed.forEach(v => v.translation = EnglishTranslator.translateGreek(v))
        return verseParsed
    }
}