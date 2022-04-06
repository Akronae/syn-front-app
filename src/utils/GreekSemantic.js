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

            if (i > 0 && word.definition.pos == GreekGrammar.PARTS_OF_SPEECH.NOUN)
            {
                const table = GreekInflectionUtils.inflect(word.declension.lemma)
                const w = table[word.declension.number][word.declension.case][word.declension.gender][word.declension.variation]

                if (words[i - 1].declension.case == GreekGrammar.CASES.GENITIVE && Object.values(table[word.declension.number][GreekGrammar.CASES.GENITIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.GENITIVE;
                }
                if (words[i - 1].declension.case == GreekGrammar.CASES.ACCUSATIVE && Object.values(table[word.declension.number][GreekGrammar.CASES.ACCUSATIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.ACCUSATIVE;
                }
                if (StringUtils.includesSome(words[i - 1].word, '.', ',') && Object.values(table[word.declension.number][GreekGrammar.CASES.NOMINATIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.NOMINATIVE;
                }
            }
        }
    }
}