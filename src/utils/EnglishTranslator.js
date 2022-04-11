import EnglishDeclension from '@/utils/EnglishDeclension';
import EnglishDeclensionNounTables from '@/utils/EnglishDeclensionNounTables';
import EnglishDeclensionVerbTables from '@/utils/EnglishDeclensionVerbTables';
import EnglishGrammar from '@/utils/EnglishGrammar';
import EnglishPersonalPronoun from '@/utils/EnglishPersonalPronoun';
import GreekGrammar, { Cases } from '@/utils/GreekGrammar';
import GreekParsedWord from '@/utils/GreekParsedWord';
import StringUtils from '@/utils/StringUtils';

export default class EnglishTranslator
{
    /**
     * 
     * @param {GreekParsedWord} word
     * @returns {string} 
     */
    static translateGreek (word)
    {
        if (!word.definition || !word.definition.translation) return StringUtils.EMPTY
        
        var declension = word.declension
        var definition = word.definition

        if (word.definition.translation instanceof Cases)
        {
            return word.definition.translation[word.declension.case]
        }
        /**
         * @type {string}
         */
        let translation = definition.translation.toString()

        const translatedDeclension = EnglishDeclension.fromGreek(declension)
        var finalTranslation = StringUtils.EMPTY

        if (!StringUtils.includesSome(word.definition.pos, GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN, GreekGrammar.PARTS_OF_SPEECH.PRONOUN))
        {
            if (declension.case == GreekGrammar.CASES.GENITIVE) finalTranslation += 'of '
            if (declension.case == GreekGrammar.CASES.DATIVE) finalTranslation += 'to '
        }
        
        
        if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB)
        {
            const table = EnglishDeclensionVerbTables.conjugateTable(EnglishDeclensionVerbTables.BASIC, translation)

            if (declension.mood != EnglishGrammar.MOODS.PARTICIPLE)
            {
                finalTranslation += EnglishPersonalPronoun[translatedDeclension.number][translatedDeclension.person][translatedDeclension.gender][translatedDeclension.case] + ' '
            }

            if (declension.mood == EnglishGrammar.MOODS.PARTICIPLE) finalTranslation += table[translatedDeclension.tense][translatedDeclension.mood][0]
            else finalTranslation += table[translatedDeclension.tense][translatedDeclension.mood][translatedDeclension.number][translatedDeclension.person][translatedDeclension.voice][0]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN)
        {
            const table = EnglishDeclensionNounTables.conjugateTable(EnglishDeclensionNounTables.BASIC, translation)
            finalTranslation += table[translatedDeclension.number][translatedDeclension.case][0]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.PRONOUN)
        {
            finalTranslation += definition.translation[translatedDeclension.number][translatedDeclension.gender][translatedDeclension.case]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN)
        {
            finalTranslation += definition.translation[translatedDeclension.number][translatedDeclension.person][translatedDeclension.gender][translatedDeclension.case]
        }
        else finalTranslation += definition.translation
        
        return finalTranslation.trim()
    }
}