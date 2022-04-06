import EnglishTranslator from '@/utils/EnglishTranslator'
import GreekDictionary from '@/utils/GreekDictionary'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import GreekParsedWord from '@/utils/GreekParsedWord'
import GreekSemantic from '@/utils/GreekSemantic'

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
            const declensions = GreekInflectionUtils.getDeclension(word.replace(/[.,]/g, ''))
            if (!declensions) return verseParsed.push(new GreekParsedWord({word}))
            var declension = declensions[0]
            const definition = GreekDictionary.get(declension.lemma)                
            
            verseParsed.push(new GreekParsedWord({word, declension, definition}))
        })
        GreekSemantic.correct(verseParsed)
        verseParsed.forEach(v => v.translation = EnglishTranslator.translateGreek(v))
        return verseParsed
    }
}