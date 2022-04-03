import EnglishDeclension from '@/utils/EnglishDeclension';
import EnglishDeclensionNounTables from '@/utils/EnglishDeclensionNounTables';
import EnglishDeclensionVerbTables from '@/utils/EnglishDeclensionVerbTables';
import EnglishGrammar from '@/utils/EnglishGrammar';
import EnglishPersonalPronoun from '@/utils/EnglishPersonalPronoun';
import GreekGrammar from '@/utils/GreekGrammar';
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
        
        var translation = word.definition.translation
        var declension = word.declension
        var definition = word.definition

        const translatedDeclension = EnglishDeclension.fromGreek(declension)
        translation = StringUtils.EMPTY
        if (declension.case == GreekGrammar.CASES.GENITIVE) translation += 'of '
        if (declension.case == GreekGrammar.CASES.DATIVE) translation += 'to '
        
        if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB)
        {
            const table = EnglishDeclensionVerbTables.conjugateTable(EnglishDeclensionVerbTables.BASIC, definition.translation)
            const pronoun = EnglishPersonalPronoun[translatedDeclension.number][translatedDeclension.person][translatedDeclension.gender][translatedDeclension.case]
            translation += pronoun + ' ' + table[translatedDeclension.tense][translatedDeclension.mood][translatedDeclension.number][translatedDeclension.person][0]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN)
        {
            const table = EnglishDeclensionNounTables.conjugateTable(EnglishDeclensionNounTables.BASIC, definition.translation)
            translation += table[translatedDeclension.number][translatedDeclension.case][0]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.PRONOUN)
        {
            translation += EnglishPersonalPronoun[translatedDeclension.number][translatedDeclension.person][translatedDeclension.gender][translatedDeclension.case]
        }
        else translation += definition.translation
        
        return translation
    }
}