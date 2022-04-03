import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables';
import GreekGrammar from '@/utils/GreekGrammar';
import GreekInflectionUtils from '@/utils/GreekInflectionUtils';
import GreekParsedWord from '@/utils/GreekParsedWord';
import GreekWord from './GreekWord';
import StringUtils from './StringUtils';

export default class GreekSemantic
{
    static TONOS = ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ'];

    /**
     * @param {GreekParsedWord[]} words 
     */
    static correct (words)
    {
        var i = -1;
        for (const word of words)
        {
            i++
            if (word.declension.case == GreekGrammar.CASES.DATIVE && words.every(w => w.definition.pos != GreekGrammar.PARTS_OF_SPEECH.VERB))
            {
                const table = GreekInflectionUtils.inflect(word.declension.lemma)
                if (table[word.declension.number].dative[word.declension.gender] == table[word.declension.number].genitive[word.declension.gender])
                {
                    word.declension.case = GreekGrammar.CASES.GENITIVE;
                }
            }

            if (word.definition.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN && word.definition.declensionNounTable == GreekDeclensionNounTables.SEMITIC_PROPER_NAME)
            {
                const table = GreekInflectionUtils.inflect(word.declension.lemma)
                const w = table[word.declension.number][word.declension.case][word.declension.gender]

                if (i > 0 && words[i - 1].declension.case == GreekGrammar.CASES.GENITIVE && w == table[word.declension.number][GreekGrammar.CASES.GENITIVE][word.declension.gender] && !StringUtils.includesSome(words[i - 1].word, '.', ','))
                {
                    word.declension.case = GreekGrammar.CASES.GENITIVE;
                }
                if (i > 0 && words[i - 1].declension.case == GreekGrammar.CASES.ACCUSATIVE && w == table[word.declension.number][GreekGrammar.CASES.ACCUSATIVE][word.declension.gender] && !StringUtils.includesSome(words[i - 1].word, '.', ','))
                {
                    word.declension.case = GreekGrammar.CASES.ACCUSATIVE;
                }
            }
        }
    }
}