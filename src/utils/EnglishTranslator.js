import EnglishDeclension from '@/utils/EnglishDeclension';
import EnglishDeclensionNounTables from '@/utils/EnglishDeclensionNounTables';
import EnglishDeclensionVerbTables from '@/utils/EnglishDeclensionVerbTables';
import EnglishGrammar from '@/utils/EnglishGrammar';
import EnglishPersonalPronoun from '@/utils/EnglishPersonalPronoun';
import GreekGrammar, { Cases } from '@/utils/GreekGrammar';
import GreekParsedWord from '@/utils/GreekParsedWord';
import StringUtils from '@/utils/StringUtils';
import GreekDeclension from './GreekDeclension';
import ObjectUtils from './ObjectUtils';

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

        const enTransDeclension = EnglishDeclension.fromGreek(declension)
        var finalTranslation = StringUtils.EMPTY

        if (!StringUtils.includesSome(word.definition.pos, GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN, GreekGrammar.PARTS_OF_SPEECH.PRONOUN))
        {
            if (declension.case == GreekGrammar.CASES.GENITIVE) finalTranslation += 'of '
            if (declension.case == GreekGrammar.CASES.DATIVE) finalTranslation += 'to '
        }
        
        
        if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB)
        {
            const table = EnglishDeclensionVerbTables.conjugateTable(EnglishDeclensionVerbTables.BASIC, translation)

            var gender = word.verbObject.declension.pos == GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN ? word.verbObject.declension.gender : EnglishGrammar.GENDERS.NEUTER
            if (enTransDeclension.mood == EnglishGrammar.MOODS.PARTICIPLE) gender = word.declension.gender
            const person = enTransDeclension.mood == GreekGrammar.MOODS.PARTICIPLE ? EnglishGrammar.PERSONS.THIRD : word.declension.person
            finalTranslation += EnglishPersonalPronoun[enTransDeclension.number][person][gender][enTransDeclension.case] + ' '
            if (enTransDeclension.mood == EnglishGrammar.MOODS.PARTICIPLE)
            {
                // TODO: EnglishVerb.inflect('be')[enTransDeclension.tense][enTransDeclension.number][enTransDeclension.person]
                if (word.declension.case == GreekGrammar.CASES.GENITIVE) finalTranslation += 'being '
                else if (enTransDeclension.tense == EnglishGrammar.TENSES.PRESENT) finalTranslation += (enTransDeclension.number == EnglishGrammar.NUMBERS.SINGULAR ? 'is' : 'are') + ' '
                else if (enTransDeclension.tense == EnglishGrammar.TENSES.PAST) finalTranslation += (enTransDeclension.number == EnglishGrammar.NUMBERS.SINGULAR ? 'was' : 'were') + ' '
            }

            if (declension.mood == EnglishGrammar.MOODS.PARTICIPLE) finalTranslation += table[enTransDeclension.tense][enTransDeclension.mood][0]
            else
            {
                const conj = ObjectUtils.get(table, enTransDeclension.tense, enTransDeclension.mood, enTransDeclension.number, enTransDeclension.person, enTransDeclension.voice, 0)
                if (conj == null) console.error('Cannot find English translation for verb', enTransDeclension, 'in', table)
                finalTranslation += conj
            }
        }
        else if (GreekDeclension.isNoun(definition.pos))
        {
            const table = EnglishDeclensionNounTables.conjugateTable(EnglishDeclensionNounTables.BASIC, translation)
            finalTranslation += table[enTransDeclension.number][enTransDeclension.case][0]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.PRONOUN)
        {
            finalTranslation += definition.translation[enTransDeclension.number][enTransDeclension.gender][enTransDeclension.case]
        }
        else if (definition.pos == GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN)
        {
            finalTranslation += definition.translation[enTransDeclension.number][enTransDeclension.person][enTransDeclension.gender][enTransDeclension.case]
        }
        else finalTranslation += definition.translation
        
        return finalTranslation.trim()
    }
}